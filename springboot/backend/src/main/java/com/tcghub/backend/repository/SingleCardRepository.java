package com.tcghub.backend.repository;

import com.tcghub.backend.model.SingleCard;
import com.tcghub.backend.model.enums.Treatment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Repository
public class SingleCardRepository {

    private final JdbcTemplate jdbcTemplate;

    public SingleCardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final String CARD_SELECT = """
        SELECT
            p.id AS id,
            p.name AS name,
            p.collection AS collection,
            sc.card_number AS card_number,
            sc.rarity AS rarity,
            sc.treatment AS treatment,
            sc.card_type AS card_type,
            sc.cost AS cost,
            sc.power AS power,
            sc.counter AS counter,
            sc.combat_attribute AS combat_attribute,
            GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ',') AS colors,
            GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ',') AS subtypes,
            sc.description AS description
        FROM products p
        JOIN single_cards sc ON sc.product_id = p.id
        LEFT JOIN single_card_colors scc ON scc.product_id = sc.product_id
        LEFT JOIN colors c ON c.id = scc.color_id
        LEFT JOIN single_card_subtypes scs ON scs.product_id = sc.product_id
        LEFT JOIN subtypes s ON s.id = scs.subtype_id
        """;

    private static final String CARD_GROUP_BY = """
        GROUP BY
            p.id, p.name, p.collection,
            sc.card_number, sc.rarity, sc.treatment, sc.card_type,
            sc.cost, sc.power, sc.counter, sc.combat_attribute, sc.description
        """;

    private final RowMapper<SingleCard> cardRowMapper = (rs, rowNum) -> new SingleCard(
            rs.getLong("id"),
            rs.getString("name"),
            rs.getString("collection"),
            rs.getString("card_number"),
            rs.getString("rarity"),
            Treatment.valueOf(rs.getString("treatment")),
            rs.getString("card_type"),
            rs.getObject("cost", Integer.class),
            rs.getObject("power", Integer.class),
            rs.getObject("counter", Integer.class),
            rs.getString("combat_attribute"),
            parseCsv(rs.getString("colors")),
            parseCsv(rs.getString("subtypes")),
            rs.getString("description")
    );

    public SingleCard save(SingleCard singleCard) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO products (name, collection) VALUES (?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, singleCard.getName());
            ps.setString(2, singleCard.getCollection());
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException("Failed to obtain generated product ID");
        }

        Long productId = key.longValue();

        jdbcTemplate.update("""
                INSERT INTO single_cards (
                    product_id, card_number, rarity, treatment, card_type,
                    cost, power, counter, combat_attribute, description
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                productId,
                singleCard.getCardNumber(),
                singleCard.getRarity(),
                singleCard.getTreatment().name(),
                singleCard.getCardType(),
                singleCard.getCost(),
                singleCard.getPower(),
                singleCard.getCounter(),
                singleCard.getCombatAttribute(),
                singleCard.getDescription()
        );

        saveColors(productId, singleCard.getColors());
        saveSubtypes(productId, singleCard.getSubtypes());

        singleCard.setId(productId);
        return singleCard;
    }

    public Optional<SingleCard> findById(Long id) {
        String sql = CARD_SELECT + " WHERE p.id = ? " + CARD_GROUP_BY;
        List<SingleCard> result = jdbcTemplate.query(sql, cardRowMapper, id);
        return result.stream().findFirst();
    }

    public List<SingleCard> findAll(String name, String collection, String color, String cardType, int offset, int size) {
        StringBuilder sql = new StringBuilder(CARD_SELECT + " WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            sql.append(" AND p.name LIKE ?");
            params.add("%" + name + "%");
        }
        if (collection != null && !collection.isBlank()) {
            sql.append(" AND p.collection = ?");
            params.add(collection);
        }
        if (color != null && !color.isBlank()) {
            sql.append(" AND c.name = ?");
            params.add(color);
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND sc.card_type = ?");
            params.add(cardType);
        }

        sql.append(" ").append(CARD_GROUP_BY);
        sql.append(" LIMIT ? OFFSET ?");
        params.add(size);
        params.add(offset);

        return jdbcTemplate.query(sql.toString(), cardRowMapper, params.toArray());
    }

    public int count(String name, String collection, String color, String cardType) {
        StringBuilder sql = new StringBuilder("""
            SELECT COUNT(DISTINCT p.id)
            FROM products p
            JOIN single_cards sc ON sc.product_id = p.id
            LEFT JOIN single_card_colors scc ON scc.product_id = sc.product_id
            LEFT JOIN colors c ON c.id = scc.color_id
            LEFT JOIN single_card_subtypes scs ON scs.product_id = sc.product_id
            LEFT JOIN subtypes s ON s.id = scs.subtype_id
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
        if (color != null && !color.isBlank()) {
            sql.append(" AND c.name = ?");
            params.add(color);
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND sc.card_type = ?");
            params.add(cardType);
        }

        Integer count = jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
        return count != null ? count : 0;
    }

    public boolean updateDescription(Long id, String description) {
        int rowsAffected = jdbcTemplate.update("""
            UPDATE single_cards
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

    private void saveColors(Long productId, List<String> colors) {
        if (colors == null || colors.isEmpty()) {
            return;
        }

        for (String color : colors) {
            if (color == null || color.isBlank()) {
                continue;
            }

            Long colorId = findColorIdByName(color.trim())
                    .orElseGet(() -> insertColor(color.trim()));

            jdbcTemplate.update("""
                    INSERT INTO single_card_colors (product_id, color_id)
                    VALUES (?, ?)
                    """,
                    productId,
                    colorId
            );
        }
    }

    private void saveSubtypes(Long productId, List<String> subtypes) {
        if (subtypes == null || subtypes.isEmpty()) {
            return;
        }

        for (String subtype : subtypes) {
            if (subtype == null || subtype.isBlank()) {
                continue;
            }

            Long subtypeId = findSubtypeIdByName(subtype.trim())
                    .orElseGet(() -> insertSubtype(subtype.trim()));

            jdbcTemplate.update("""
                    INSERT INTO single_card_subtypes (product_id, subtype_id)
                    VALUES (?, ?)
                    """,
                    productId,
                    subtypeId
            );
        }
    }

    private Optional<Long> findColorIdByName(String name) {
        List<Long> result = jdbcTemplate.query(
                "SELECT id FROM colors WHERE name = ?",
                (rs, rowNum) -> rs.getLong("id"),
                name
        );
        return result.stream().findFirst();
    }

    private Optional<Long> findSubtypeIdByName(String name) {
        List<Long> result = jdbcTemplate.query(
                "SELECT id FROM subtypes WHERE name = ?",
                (rs, rowNum) -> rs.getLong("id"),
                name
        );
        return result.stream().findFirst();
    }

    private Long insertColor(String name) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO colors (name) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, name);
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException("Failed to obtain generated color ID");
        }

        return key.longValue();
    }

    private Long insertSubtype(String name) {
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO subtypes (name) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, name);
            return ps;
        }, keyHolder);

        Number key = keyHolder.getKey();
        if (key == null) {
            throw new IllegalStateException("Failed to obtain generated subtype ID");
        }

        return key.longValue();
    }

    private List<String> parseCsv(String value) {
        if (value == null || value.isBlank()) {
            return Collections.emptyList();
        }

        return Arrays.stream(value.split(","))
                .map(String::trim)
                .filter(item -> !item.isBlank())
                .toList();
    }
}