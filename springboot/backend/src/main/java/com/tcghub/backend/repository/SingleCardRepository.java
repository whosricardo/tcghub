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
            sc.colors AS colors,
            sc.subtypes AS subtypes,
            sc.description AS description
        FROM products p
        JOIN single_cards sc ON sc.product_id = p.id
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
            rs.getString("colors"),
            rs.getString("subtypes"),
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
                    cost, power, counter, combat_attribute, colors, subtypes, description
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
                singleCard.getColors(),
                singleCard.getSubtypes(),
                singleCard.getDescription()
        );

        singleCard.setId(productId);
        return singleCard;
    }

    public Optional<SingleCard> findById(Long id) {
        String sql = CARD_SELECT + " WHERE p.id = ?";
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
            sql.append(" AND sc.colors LIKE ?");
            params.add("%" + color + "%");
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND sc.card_type = ?");
            params.add(cardType);
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(size);
        params.add(offset);

        return jdbcTemplate.query(sql.toString(), cardRowMapper, params.toArray());
    }

    public int count(String name, String collection, String color, String cardType) {
        StringBuilder sql = new StringBuilder("""
            SELECT COUNT(*)
            FROM products p
            JOIN single_cards sc ON sc.product_id = p.id
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
            sql.append(" AND sc.colors LIKE ?");
            params.add("%" + color + "%");
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND sc.card_type = ?");
            params.add(cardType);
        }

        Integer count = jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
        return count != null ? count : 0;
    }

    public boolean update(SingleCard card) {
        int updatedProducts = jdbcTemplate.update("""
                UPDATE products
                SET name = ?, collection = ?
                WHERE id = ?
                """,
                card.getName(),
                card.getCollection(),
                card.getId()
        );

        int updatedSingleCards = jdbcTemplate.update("""
                UPDATE single_cards
                SET card_number = ?, rarity = ?, treatment = ?, card_type = ?,
                    cost = ?, power = ?, counter = ?, combat_attribute = ?,
                    colors = ?, subtypes = ?, description = ?
                WHERE product_id = ?
                """,
                card.getCardNumber(),
                card.getRarity(),
                card.getTreatment().name(),
                card.getCardType(),
                card.getCost(),
                card.getPower(),
                card.getCounter(),
                card.getCombatAttribute(),
                card.getColors(),
                card.getSubtypes(),
                card.getDescription(),
                card.getId()
        );

        return updatedProducts > 0 && updatedSingleCards > 0;
    }

    public boolean deleteById(Long id) {
        int rowsAffected = jdbcTemplate.update("DELETE FROM products WHERE id = ?", id);
        return rowsAffected > 0;
    }
}