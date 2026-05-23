package com.tcghub.backend.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class DatabaseFunctionRepository {

    private final JdbcTemplate jdbcTemplate;

    public DatabaseFunctionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public String canShipOrder(Long orderId) {
        String sql = "SELECT fn_can_ship_order(?)";
        return jdbcTemplate.queryForObject(sql, String.class, orderId);
    }
}
