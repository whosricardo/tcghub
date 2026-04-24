package com.tcghub.backend.repository;

import com.tcghub.backend.model.Buyer;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class BuyerRepository {

    private final JdbcTemplate jdbcTemplate;

    public BuyerRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Buyer> buyerRowMapper = (rs, rowNum) ->
        new Buyer(rs.getLong("user_id"), rs.getBigDecimal("wallet_balance"));

    public Optional<Buyer> findById(Long userId) {
        String sql = "SELECT * FROM buyers WHERE user_id = ?";
        return jdbcTemplate
            .query(sql, buyerRowMapper, userId)
            .stream()
            .findFirst();
    }

    public boolean existsById(Long userId) {
        String sql = "SELECT COUNT(*) FROM buyers WHERE user_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null && count > 0;
    }
}
