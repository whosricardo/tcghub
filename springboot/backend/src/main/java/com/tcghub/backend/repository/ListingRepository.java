package com.tcghub.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.tcghub.backend.model.Listing;

@Repository
public class ListingRepository {
    private final JdbcTemplate jdbcTemplate;

    public ListingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Listing> listingRowMapper = (rs, rowNum) -> new Listing(
            rs.getLong("id"),
            rs.getInt("available_quantity"),
            rs.getBigDecimal("current_price"),
            rs.getString("item_condition"),
            rs.getString("product_language"),
            rs.getLong("product_id"),
            rs.getLong("supplier_id"));

    public Optional<Listing> findById(Long id) {
        String sql = "SELECT * FROM listings WHERE id = ?";
        return jdbcTemplate.query(sql, listingRowMapper, id).stream().findFirst();
    }

    public Boolean existById(Long id) {
        String sql = "SELECT COUNT(*) FROM listings WHERE id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }

    public List<Listing> findAll(int offset, int size) {
        String sql = "SELECT * FROM listings LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, listingRowMapper, size, offset);
    }

    public boolean deleteById(Long id) {
        String sql = "SELECT FROM listings WHERE id = ?";
        int rows = jdbcTemplate.update(sql, id);
        return rows > 0;
    }
}
