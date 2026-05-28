package com.tcghub.backend.repository;

import com.tcghub.backend.dto.dashboard.DashboardSummaryResponse;
import com.tcghub.backend.dto.dashboard.OrderStatisticsResponse;
import com.tcghub.backend.dto.dashboard.OrderStatusDistributionResponse;
import com.tcghub.backend.dto.dashboard.OrderValueRangeResponse;
import com.tcghub.backend.dto.dashboard.PaymentMethodDistributionResponse;
import com.tcghub.backend.dto.dashboard.SalesTrendPointResponse;
import com.tcghub.backend.dto.dashboard.TopSupplierDashboardResponse;
import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class DashboardRepository {

    private final JdbcTemplate jdbcTemplate;

    public DashboardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<SalesTrendPointResponse> salesTrendRowMapper = (rs, rowNum) ->
        new SalesTrendPointResponse(
            rs.getString("label"),
            getBigDecimalOrZero(rs.getBigDecimal("total_revenue"))
        );

    private final RowMapper<OrderStatusDistributionResponse> orderStatusDistributionRowMapper = (rs, rowNum) ->
        new OrderStatusDistributionResponse(
            rs.getString("status"),
            rs.getLong("total")
        );

    private final RowMapper<TopSupplierDashboardResponse> topSupplierRowMapper = (rs, rowNum) ->
        new TopSupplierDashboardResponse(
            rs.getLong("supplier_id"),
            rs.getString("supplier_name"),
            rs.getString("store_name"),
            getBigDecimalOrZero(rs.getBigDecimal("total_revenue")),
            rs.getLong("total_items_sold")
        );

    private final RowMapper<PaymentMethodDistributionResponse> paymentMethodDistributionRowMapper = (rs, rowNum) ->
        new PaymentMethodDistributionResponse(
            rs.getString("payment_method"),
            rs.getLong("total")
        );

    private final RowMapper<OrderValueRangeResponse> orderValueRangeRowMapper = (rs, rowNum) ->
        new OrderValueRangeResponse(
            rs.getString("range_label"),
            rs.getLong("total_orders")
        );

    public DashboardSummaryResponse getSummary() {
        String sql = """
            SELECT
                (SELECT COUNT(*) FROM orders) AS total_orders,
                (SELECT COUNT(*) FROM payments WHERE status = 'APPROVED') AS total_approved_payments,
                COALESCE((SELECT SUM(amount_paid) FROM payments WHERE status = 'APPROVED'), 0) AS total_revenue,
                COALESCE((SELECT AVG(amount_paid) FROM payments WHERE status = 'APPROVED'), 0) AS average_ticket,
                (
                    SELECT COUNT(DISTINCT l.supplier_id)
                    FROM order_items oi
                             JOIN listings l
                                  ON l.id = oi.listing_id
                ) AS total_suppliers_with_sales,
                (
                    SELECT COUNT(*)
                    FROM products p
                             LEFT JOIN listings l
                                       ON l.product_id = p.id
                    WHERE l.id IS NULL
                ) AS total_products_without_listings
            """;

        return jdbcTemplate.queryForObject(
            sql,
            (rs, rowNum) ->
                new DashboardSummaryResponse(
                    rs.getLong("total_orders"),
                    rs.getLong("total_approved_payments"),
                    getBigDecimalOrZero(rs.getBigDecimal("total_revenue")),
                    getBigDecimalOrZero(rs.getBigDecimal("average_ticket")),
                    rs.getLong("total_suppliers_with_sales"),
                    rs.getLong("total_products_without_listings")
                )
        );
    }

    public List<SalesTrendPointResponse> findSalesTrend(
        LocalDate startDate,
        LocalDate endDate,
        String groupBy,
        String status,
        String collection
    ) {
        String dateExpression = "month".equalsIgnoreCase(groupBy)
            ? "DATE_FORMAT(o.created_at, '%Y-%m')"
            : "DATE_FORMAT(o.created_at, '%Y-%m-%d')";

        String sql = """
            SELECT
                %s AS label,
                COALESCE(SUM(oi.quantity_bought * oi.unit_price_paid), 0) AS total_revenue
            FROM orders o
                     JOIN order_items oi
                          ON oi.order_id = o.id
                     JOIN listings l
                          ON l.id = oi.listing_id
                     JOIN products p
                          ON p.id = l.product_id
            WHERE (? IS NULL OR DATE(o.created_at) >= ?)
              AND (? IS NULL OR DATE(o.created_at) <= ?)
              AND (? IS NULL OR o.status = ?)
              AND (? IS NULL OR p.collection = ?)
            GROUP BY label
            ORDER BY label
            """.formatted(dateExpression);

        return jdbcTemplate.query(
            sql,
            salesTrendRowMapper,
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate),
            status,
            status,
            collection,
            collection
        );
    }

    public List<OrderStatusDistributionResponse> findOrderStatusDistribution(
        LocalDate startDate,
        LocalDate endDate
    ) {
        String sql = """
            SELECT
                o.status,
                COUNT(*) AS total
            FROM orders o
            WHERE (? IS NULL OR DATE(o.created_at) >= ?)
              AND (? IS NULL OR DATE(o.created_at) <= ?)
            GROUP BY o.status
            ORDER BY total DESC, o.status ASC
            """;

        return jdbcTemplate.query(
            sql,
            orderStatusDistributionRowMapper,
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate)
        );
    }

    public List<TopSupplierDashboardResponse> findTopSuppliers(
        LocalDate startDate,
        LocalDate endDate,
        int limit,
        String status,
        String collection
    ) {
        String sql = """
            SELECT
                s.user_id AS supplier_id,
                u.username AS supplier_name,
                s.store_name AS store_name,
                COALESCE(SUM(oi.quantity_bought * oi.unit_price_paid), 0) AS total_revenue,
                COALESCE(SUM(oi.quantity_bought), 0) AS total_items_sold
            FROM suppliers s
                     JOIN users u
                          ON u.id = s.user_id
                     JOIN listings l
                          ON l.supplier_id = s.user_id
                     JOIN products p
                          ON p.id = l.product_id
                     JOIN order_items oi
                          ON oi.listing_id = l.id
                     JOIN orders o
                          ON o.id = oi.order_id
            WHERE (? IS NULL OR DATE(o.created_at) >= ?)
              AND (? IS NULL OR DATE(o.created_at) <= ?)
              AND (? IS NULL OR o.status = ?)
              AND (? IS NULL OR p.collection = ?)
            GROUP BY s.user_id, u.username, s.store_name
            ORDER BY total_revenue DESC, total_items_sold DESC
            LIMIT ?
            """;

        return jdbcTemplate.query(
            sql,
            topSupplierRowMapper,
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate),
            status,
            status,
            collection,
            collection,
            limit
        );
    }

    public List<PaymentMethodDistributionResponse> findPaymentMethodDistribution(
        LocalDate startDate,
        LocalDate endDate,
        String paymentStatus
    ) {
        String sql = """
            SELECT
                p.payment_method,
                COUNT(*) AS total
            FROM payments p
                     JOIN orders o
                          ON o.id = p.order_id
            WHERE (? IS NULL OR DATE(p.payment_date_time) >= ?)
              AND (? IS NULL OR DATE(p.payment_date_time) <= ?)
              AND (? IS NULL OR p.status = ?)
            GROUP BY p.payment_method
            ORDER BY total DESC, p.payment_method ASC
            """;

        return jdbcTemplate.query(
            sql,
            paymentMethodDistributionRowMapper,
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate),
            paymentStatus,
            paymentStatus
        );
    }

    public List<OrderValueRangeResponse> findOrderValueRanges(
        LocalDate startDate,
        LocalDate endDate,
        String status
    ) {
        String sql = """
            SELECT
                range_label,
                COUNT(*) AS total_orders
            FROM (
                SELECT
                    CASE
                        WHEN o.total_amount < 100 THEN '0-99.99'
                        WHEN o.total_amount < 300 THEN '100-299.99'
                        WHEN o.total_amount < 600 THEN '300-599.99'
                        ELSE '600+'
                    END AS range_label,
                    CASE
                        WHEN o.total_amount < 100 THEN 1
                        WHEN o.total_amount < 300 THEN 2
                        WHEN o.total_amount < 600 THEN 3
                        ELSE 4
                    END AS range_order
                FROM orders o
                WHERE (? IS NULL OR DATE(o.created_at) >= ?)
                  AND (? IS NULL OR DATE(o.created_at) <= ?)
                  AND (? IS NULL OR o.status = ?)
            ) order_ranges
            GROUP BY range_label, range_order
            ORDER BY range_order
            """;

        return jdbcTemplate.query(
            sql,
            orderValueRangeRowMapper,
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate),
            status,
            status
        );
    }

    public OrderStatisticsResponse getOrderStatistics(
        LocalDate startDate,
        LocalDate endDate,
        String status
    ) {
        String sql = """
            WITH filtered_orders AS (
                SELECT total_amount
                FROM orders
                WHERE (? IS NULL OR DATE(created_at) >= ?)
                  AND (? IS NULL OR DATE(created_at) <= ?)
                  AND (? IS NULL OR status = ?)
            ),
            numbered_orders AS (
                SELECT
                    total_amount,
                    ROW_NUMBER() OVER (ORDER BY total_amount) AS rn,
                    COUNT(*) OVER () AS total_count
                FROM filtered_orders
            ),
            median_value AS (
                SELECT AVG(total_amount) AS median
                FROM numbered_orders
                WHERE rn IN (
                    FLOOR((total_count + 1) / 2),
                    FLOOR((total_count + 2) / 2)
                )
            ),
            mode_value AS (
                SELECT total_amount AS mode
                FROM filtered_orders
                GROUP BY total_amount
                ORDER BY COUNT(*) DESC, total_amount ASC
                LIMIT 1
            )
            SELECT
                (SELECT AVG(total_amount) FROM filtered_orders) AS average,
                (SELECT median FROM median_value) AS median,
                (SELECT mode FROM mode_value) AS mode,
                (SELECT VAR_POP(total_amount) FROM filtered_orders) AS variance,
                (SELECT STDDEV_POP(total_amount) FROM filtered_orders) AS standard_deviation
            """;

        return jdbcTemplate.queryForObject(
            sql,
            (rs, rowNum) ->
                new OrderStatisticsResponse(
                    getBigDecimalOrZero(rs.getBigDecimal("average")),
                    getBigDecimalOrZero(rs.getBigDecimal("median")),
                    getBigDecimalOrZero(rs.getBigDecimal("mode")),
                    getBigDecimalOrZero(rs.getBigDecimal("variance")),
                    getBigDecimalOrZero(rs.getBigDecimal("standard_deviation"))
                ),
            toSqlDate(startDate),
            toSqlDate(startDate),
            toSqlDate(endDate),
            toSqlDate(endDate),
            status,
            status
        );
    }

    private Date toSqlDate(LocalDate date) {
        return date == null ? null : Date.valueOf(date);
    }

    private static BigDecimal getBigDecimalOrZero(BigDecimal value) {
        return value == null ? BigDecimal.ZERO : value;
    }
}
