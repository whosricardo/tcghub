package com.tcghub.backend.repository;

import com.tcghub.backend.model.Order;
import com.tcghub.backend.model.enums.OrderStatus;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {

    private final JdbcTemplate jdbcTemplate;

    public OrderRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Order> orderRowMapper = (rs, rowNum) ->
        new Order(
            rs.getLong("id"),
            rs.getLong("buyer_id"),
            rs.getTimestamp("created_at").toLocalDateTime(),
            rs.getBigDecimal("total_amount"),
            OrderStatus.valueOf(rs.getString("status"))
        );

    public Order save(Order order) {
        String sql = """
            INSERT INTO orders (buyer_id, created_at, total_amount, status)
            VALUES (?, ?, ?, ?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(
            connection -> {
                PreparedStatement ps = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
                );
                ps.setLong(1, order.getBuyerId());
                ps.setTimestamp(2, Timestamp.valueOf(order.getCreatedAt()));
                ps.setBigDecimal(3, order.getTotalAmount());
                ps.setString(4, order.getStatus().name());
                return ps;
            },
            keyHolder
        );

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException(
                "Failed to obtain generated order ID"
            );
        }

        order.setId(key.longValue());
        return order;
    }

    public Optional<Order> findById(Long id) {
        String sql = "SELECT * FROM orders WHERE id = ?";
        return jdbcTemplate.query(sql, orderRowMapper, id).stream().findFirst();
    }

    public List<Order> findAll(int offset, int size) {
        String sql =
            "SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, orderRowMapper, size, offset);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM orders";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }

    public boolean updateStatus(Long id, OrderStatus status) {
        String sql = """
            UPDATE orders
            SET status = ?
            WHERE id = ?
            """;

        int rowsAffected = jdbcTemplate.update(sql, status.name(), id);
        return rowsAffected > 0;
    }

    public boolean deleteById(Long id) {
        String sql = "DELETE FROM orders WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}
