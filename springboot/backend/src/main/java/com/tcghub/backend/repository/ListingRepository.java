package com.tcghub.backend.repository;

import com.tcghub.backend.model.Listing;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.Optional;

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

    public Listing save(Listing listing) {
        String sql = """
                INSERT INTO listings
                (available_quantity, current_price, item_condition, product_language, product_id, supplier_id)
                VALUES (?, ?, ?, ?, ?, ?)
                """;

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setInt(1, listing.getAvailableQuantity());
            ps.setBigDecimal(2, listing.getCurrentPrice());
            ps.setString(3, listing.getItemCondition());
            ps.setString(4, listing.getProductLanguage());
            ps.setLong(5, listing.getProductId());
            ps.setLong(6, listing.getSupplierId());
            return ps;
        }, keyHolder);

        listing.setId(keyHolder.getKey().longValue());
        return listing;
    }

    public Optional<Listing> findById(Long id) {
        String sql = "SELECT * FROM listings WHERE id = ?";
        return jdbcTemplate.query(sql, listingRowMapper, id).stream().findFirst();
    }

    public List<Listing> findAll(int offset, int size) {
        String sql = "SELECT * FROM listings LIMIT ? OFFSET ?";
        return jdbcTemplate.query(sql, listingRowMapper, size, offset);
    }

    public int count() {
        String sql = "SELECT COUNT(*) FROM listings";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count != null ? count : 0;
    }

    public boolean update(Long id, Listing listing) {
        String sql = """
                UPDATE listings
                SET available_quantity = ?, current_price = ?, item_condition = ?, product_language = ?
                WHERE id = ?
                """;

        int rows = jdbcTemplate.update(
                sql,
                listing.getAvailableQuantity(),
                listing.getCurrentPrice(),
                listing.getItemCondition(),
                listing.getProductLanguage(),
                id);

        return rows > 0;
    }

    public boolean deleteById(Long id) {
        String sql = "DELETE FROM listings WHERE id = ?";
        int rows = jdbcTemplate.update(sql, id);
        return rows > 0;
    }
}
