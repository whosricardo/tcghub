package com.tcghub.backend.repository;

import com.tcghub.backend.dto.reports.OrdersAboveAverageReportResponse;
import com.tcghub.backend.dto.reports.PendingOrderReportResponse;
import com.tcghub.backend.dto.reports.ProductWithoutListingReportResponse;
import com.tcghub.backend.dto.reports.SupplierSalesReportResponse;
import com.tcghub.backend.model.enums.OrderStatus;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class ReportRepository {

    private final JdbcTemplate jdbcTemplate;

    public ReportRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<SupplierSalesReportResponse> supplierSalesRowMapper = (rs, rowNum) ->
        new SupplierSalesReportResponse(
            rs.getLong("supplier_id"),
            rs.getString("supplier_name"),
            rs.getString("store_name"),
            rs.getInt("total_orders"),
            rs.getInt("total_items_sold"),
            rs.getBigDecimal("total_revenue")
        );

    private final RowMapper<PendingOrderReportResponse> pendingOrderRowMapper = (rs, rowNum) ->
        new PendingOrderReportResponse(
            rs.getLong("order_id"),
            rs.getLong("buyer_id"),
            rs.getString("buyer_name"),
            rs.getTimestamp("created_at").toLocalDateTime(),
            rs.getBigDecimal("total_amount"),
            OrderStatus.valueOf(rs.getString("status"))
        );

    private final RowMapper<ProductWithoutListingReportResponse> productWithoutListingRowMapper = (rs, rowNum) ->
        new ProductWithoutListingReportResponse(
            rs.getLong("product_id"),
            rs.getString("name"),
            rs.getString("collection")
        );

    private final RowMapper<OrdersAboveAverageReportResponse> ordersAboveAverageRowMapper = (rs, rowNum) ->
        new OrdersAboveAverageReportResponse(
            rs.getLong("order_id"),
            rs.getLong("buyer_id"),
            rs.getString("buyer_name"),
            rs.getTimestamp("created_at").toLocalDateTime(),
            rs.getBigDecimal("total_amount"),
            OrderStatus.valueOf(rs.getString("status"))
        );

    public List<SupplierSalesReportResponse> findSupplierSales() {
        String sql = """
            SELECT
                s.user_id AS supplier_id,
                u.username AS supplier_name,
                s.store_name AS store_name,
                COUNT(DISTINCT oi.order_id) AS total_orders,
                SUM(oi.quantity_bought) AS total_items_sold,
                SUM(oi.quantity_bought * oi.unit_price_paid) AS total_revenue
            FROM suppliers s
                     JOIN users u
                          ON u.id = s.user_id
                     JOIN listings l
                          ON l.supplier_id = s.user_id
                     JOIN order_items oi
                          ON oi.listing_id = l.id
            GROUP BY s.user_id, u.username, s.store_name
            HAVING SUM(oi.quantity_bought) >= 1
            ORDER BY total_revenue DESC, total_items_sold DESC
            """;

        return jdbcTemplate.query(sql, supplierSalesRowMapper);
    }

    public List<PendingOrderReportResponse> findPendingOrders() {
        String sql = """
            SELECT
                o.id AS order_id,
                o.buyer_id AS buyer_id,
                u.username AS buyer_name,
                o.created_at,
                o.total_amount,
                o.status
            FROM orders o
                     JOIN buyers b
                          ON b.user_id = o.buyer_id
                     JOIN users u
                          ON u.id = b.user_id
            WHERE o.status = 'PENDING'
            ORDER BY o.created_at DESC
            """;

        return jdbcTemplate.query(sql, pendingOrderRowMapper);
    }

    public List<ProductWithoutListingReportResponse> findProductsWithoutListings() {
        String sql = """
            SELECT
                p.id AS product_id,
                p.name,
                p.collection
            FROM products p
                     LEFT JOIN listings l
                               ON l.product_id = p.id
            WHERE l.id IS NULL
            ORDER BY p.id
            """;

        return jdbcTemplate.query(sql, productWithoutListingRowMapper);
    }

    public List<OrdersAboveAverageReportResponse> findOrdersAboveAverage() {
        String sql = """
            SELECT
                o.id AS order_id,
                o.buyer_id AS buyer_id,
                u.username AS buyer_name,
                o.created_at,
                o.total_amount,
                o.status
            FROM orders o
                     JOIN users u
                          ON u.id = o.buyer_id
            WHERE o.total_amount > (
                SELECT AVG(total_amount)
                FROM orders
            )
            ORDER BY o.total_amount DESC
            """;

        return jdbcTemplate.query(sql, ordersAboveAverageRowMapper);
    }
}
