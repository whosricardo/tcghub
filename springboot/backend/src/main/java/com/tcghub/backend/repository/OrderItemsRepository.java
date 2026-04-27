package com.tcghub.backend.repository;


import com.tcghub.backend.model.OrderItems;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import java.sql.Timestamp;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository

public class OrderItemsRepository {
    private final JdbcTemplate jdbcTemplate;

    public OrderItemsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<OrderItems> orderItemsRowMapper = (rs, rowNum) -> {
        Timestamp inspectionTimestamp = rs.getTimestamp("inspection_date");
        return new OrderItems(
                rs.getLong("listing_id"),
                rs.getLong("order_id"),
                rs.getInt("quantity_bought"),
                rs.getBigDecimal("unit_price_paid"),
                rs.getString("technical_report"),
                inspectionTimestamp != null ? inspectionTimestamp.toLocalDateTime() : null
        );
    };

    public OrderItems save(OrderItems orderItems) {
        String sql = """
        INSERT INTO order_items (listing_id, order_id, quantity_bought, unit_price_paid, technical_report, inspection_date)
        VALUES (?, ?, ?, ?, ?, ?)
        """;

        jdbcTemplate.update(sql,
                orderItems.getIdListing(),
                orderItems.getIdOrder(),
                orderItems.getQuantityBought(),
                orderItems.getUnitPricePaid(),
                orderItems.getTechnicalReport(),
                orderItems.getInspectionDate()
        );

        return orderItems;
    }

    public Optional<OrderItems> findById(long listingId, long orderId) {
        String sql = "SELECT * FROM order_items WHERE listing_id = ? AND order_id = ?";
        return jdbcTemplate.query(sql, orderItemsRowMapper, listingId, orderId).stream().findFirst();
    }

    public List<OrderItems> findAll(int offset, int size) {
        String sql = "SELECT * FROM order_items LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, orderItemsRowMapper, size, offset);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM order_items";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }

    public boolean updateTechnicalReport(long listingId, long orderId, String technicalReport) {
        String sql = """
                UPDATE order_items
                SET technical_report = ?
                WHERE listing_id = ? AND order_id = ?
                """;
        int rowsAffected = jdbcTemplate.update(sql, technicalReport, listingId, orderId);
        return rowsAffected > 0;
    }

    public boolean deleteById(long listingId, long orderId) {
        String sql = "DELETE FROM order_items WHERE listing_id = ? AND order_id = ?";
        int rowsAffected = jdbcTemplate.update(sql, listingId, orderId);
        return rowsAffected > 0;
    }
}