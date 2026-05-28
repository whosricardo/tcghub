package com.tcghub.backend.repository;

import com.tcghub.backend.dto.logs.PaymentLogResponse;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class PaymentLogRepository {

    private final JdbcTemplate jdbcTemplate;

    public PaymentLogRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<PaymentLogResponse> paymentLogRowMapper = (rs, rowNum) ->
        new PaymentLogResponse(
            rs.getLong("id"),
            rs.getLong("payment_id"),
            rs.getLong("order_id"),
            rs.getString("old_status"),
            rs.getString("new_status"),
            rs.getTimestamp("changed_at").toLocalDateTime()
        );

    public List<PaymentLogResponse> findAll() {
        String sql = """
            SELECT
                id,
                payment_id,
                order_id,
                old_status,
                new_status,
                changed_at
            FROM payment_logs
            ORDER BY changed_at DESC, id DESC
            """;

        return jdbcTemplate.query(sql, paymentLogRowMapper);
    }

    public List<PaymentLogResponse> findByPaymentId(Long paymentId) {
        String sql = """
            SELECT
                id,
                payment_id,
                order_id,
                old_status,
                new_status,
                changed_at
            FROM payment_logs
            WHERE payment_id = ?
            ORDER BY changed_at DESC, id DESC
            """;

        return jdbcTemplate.query(sql, paymentLogRowMapper, paymentId);
    }
}
