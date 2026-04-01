package com.tcghub.backend.repository;

import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.RowMapper;

import com.tcghub.backend.model.Supplier;

@Repository
public class SupplierRepository {
    private final JdbcTemplate jdbcTemplate;

    public SupplierRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Supplier> supplierRowMapper = (rs, rowNum) -> new Supplier(
            rs.getLong("user_id"),
            rs.getString("cnpj"),
            rs.getString("store_name"),
            rs.getString("contact_email"),
            rs.getBigDecimal("commission_rate"));

    public Optional<Supplier> findById(Long userId) {
        String sql = "SELECT * FROM suppliers WHERE user_id = ?";
        return jdbcTemplate.query(sql, supplierRowMapper, userId).stream().findFirst();
    }

    public boolean existsById(Long userId) {
        String sql = "SELECT COUNT(*) FROM suppliers WHERE user_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId);
        return count != null && count > 0;
    }
}
