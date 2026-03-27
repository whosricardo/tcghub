package com.tcghub.backend.repository;

import com.tcghub.backend.model.SealedProduct;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class SealedProductRepository {

    private final JdbcTemplate jdbcTemplate;

    public SealedProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final String SEALED_PRODUCT_SELECT = """
        SELECT
            p.id AS id,
            p.name AS name,
            p.collection AS collection,
            sp.sealed_type AS sealed_type,
            sp.description AS description
        FROM products p
        JOIN sealed_products sp ON sp.product_id = p.id
        """;

    private final RowMapper<SealedProduct> sealedProductRowMapper = (rs, rowNum) -> new SealedProduct(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("collection"),
            rs.getString("sealed_type"),
            rs.getString("description")
    );

    public SealedProduct save(SealedProduct sealedProduct) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO products (name, collection) VALUES (?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, sealedProduct.getName());
            ps.setString(2, sealedProduct.getCollection());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException("Failed to obtain generated product ID");
        }

        Long productId = key.longValue();

        jdbcTemplate.update("""
                INSERT INTO sealed_products (
                    product_id, sealed_type, description
                ) VALUES (?, ?, ?)
                """,
                productId,
                sealedProduct.getSealedType(),
                sealedProduct.getDescription()
        );

        sealedProduct.setId(productId);
        return sealedProduct;
    }

    public Optional<SealedProduct> findById(Long id) {
        String sql = SEALED_PRODUCT_SELECT + " WHERE p.id = ?";
        List<SealedProduct> result = jdbcTemplate.query(sql, sealedProductRowMapper, id);
        return result.stream().findFirst();
    }

    public List<SealedProduct> findAll(String name, String collection, String sealedType, int offset, int size) {
        StringBuilder sql = new StringBuilder(SEALED_PRODUCT_SELECT + " WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            sql.append(" AND p.name LIKE ?");
            params.add("%" + name + "%");
        }
        if (collection != null && !collection.isBlank()) {
            sql.append(" AND p.collection = ?");
            params.add(collection);
        }
        if (sealedType != null && !sealedType.isBlank()) {
            sql.append(" AND sp.sealed_type = ?");
            params.add(sealedType);
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(size);
        params.add(offset);

        return jdbcTemplate.query(sql.toString(), sealedProductRowMapper, params.toArray());
    }

    public int count(String name, String collection, String sealedType) {
        StringBuilder sql = new StringBuilder("""
            SELECT COUNT(*)
            FROM products p
            JOIN sealed_products sp ON sp.product_id = p.id
            WHERE 1=1
            """);

        List<Object> params = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            sql.append(" AND p.name LIKE ?");
            params.add("%" + name + "%");
        }
        if (collection != null && !collection.isBlank()) {
            sql.append(" AND p.collection = ?");
            params.add(collection);
        }
        if (sealedType != null && !sealedType.isBlank()) {
            sql.append(" AND sp.sealed_type = ?");
            params.add(sealedType);
        }

        Integer count = jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
        return count != null ? count : 0;
    }

    public boolean updateDescription(Long id, String description) {
        int rowsAffected = jdbcTemplate.update("""
            UPDATE sealed_products
            SET description = ?
            WHERE product_id = ?
            """,
                description,
                id
        );
        return rowsAffected > 0;
    }

    public boolean deleteById(Long id) {
        int rowsAffected = jdbcTemplate.update("DELETE FROM products WHERE id = ?", id);
        return rowsAffected > 0;
    }
}