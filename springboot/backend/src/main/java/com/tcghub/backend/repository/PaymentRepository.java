package com.tcghub.backend.repository;

import com.tcghub.backend.model.Payment;
import com.tcghub.backend.model.enums.PaymentMethod;
import com.tcghub.backend.model.enums.PaymentStatus;
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
public class PaymentRepository {

    private final JdbcTemplate jdbcTemplate;

    public PaymentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Payment> paymentRowMapper = (rs, rowNum) -> {
        Timestamp paymentTimestamp = rs.getTimestamp("payment_date_time");

        return new Payment(
            rs.getLong("id"),
            paymentTimestamp != null
                ? paymentTimestamp.toLocalDateTime()
                : null,
            PaymentMethod.valueOf(rs.getString("payment_method")),
            PaymentStatus.valueOf(rs.getString("status")),
            rs.getBigDecimal("amount_paid"),
            rs.getLong("order_id")
        );
    };

    public Payment save(Payment payment) {
        String sql = """
            INSERT INTO payments (
                payment_date_time,
                payment_method,
                status,
                amount_paid,
                order_id
            )
            VALUES (?, ?, ?, ?, ?)
            """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(
            connection -> {
                PreparedStatement ps = connection.prepareStatement(
                    sql,
                    Statement.RETURN_GENERATED_KEYS
                );
                ps.setTimestamp(
                    1,
                    Timestamp.valueOf(payment.getPaymentDateTime())
                );
                ps.setString(2, payment.getPaymentMethod().name());
                ps.setString(3, payment.getStatus().name());
                ps.setBigDecimal(4, payment.getAmountPaid());
                ps.setLong(5, payment.getOrderId());
                return ps;
            },
            keyHolder
        );

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException(
                "Failed to obtain generated payment ID"
            );
        }

        payment.setId(key.longValue());
        return payment;
    }

    public Optional<Payment> findById(Long id) {
        String sql = "SELECT * FROM payments WHERE id = ?";
        return jdbcTemplate
            .query(sql, paymentRowMapper, id)
            .stream()
            .findFirst();
    }

    public List<Payment> findAll(int offset, int size) {
        String sql = """
            SELECT * FROM payments
            ORDER BY payment_date_time DESC
            LIMIT ? OFFSET ?
            """;
        return jdbcTemplate.query(sql, paymentRowMapper, size, offset);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM payments";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }

    public boolean updateStatus(Long id, PaymentStatus status) {
        String sql = """
            UPDATE payments
            SET status = ?
            WHERE id = ?
            """;

        int rowsAffected = jdbcTemplate.update(sql, status.name(), id);
        return rowsAffected > 0;
    }

    public boolean deleteById(Long id) {
        String sql = "DELETE FROM payments WHERE id = ?";
        int rowsAffected = jdbcTemplate.update(sql, id);
        return rowsAffected > 0;
    }
}
