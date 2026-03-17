package com.tcghub.backend.repository;

import com.tcghub.backend.model.Card;
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
public class CardRepository {

    private final JdbcTemplate jdbcTemplate;

    public CardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Card> cardRowMapper = (rs, rowNum) -> new Card(
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
            rs.getString("subtypes"));

    public Card save(Card card) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO cards (name, collection, card_number, rarity, treatment, card_type, cost, power, counter, combat_attribute, colors, subtypes) "
                            +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, card.getName());
            ps.setString(2, card.getCollection());
            ps.setString(3, card.getCardNumber());
            ps.setString(4, card.getRarity());
            ps.setString(5, card.getTreatment().name());
            ps.setString(6, card.getCardType());
            ps.setObject(7, card.getCost());
            ps.setObject(8, card.getPower());
            ps.setObject(9, card.getCounter());
            ps.setString(10, card.getCombatAttribute());
            ps.setString(11, card.getColors());
            ps.setString(12, card.getSubtypes());
            return ps;
        }, keyHolder);
        card.setId(keyHolder.getKey().longValue());
        return card;
    }

    public Optional<Card> findById(Long id) {
        List<Card> result = jdbcTemplate.query(
                "SELECT * FROM cards WHERE id = ?",
                cardRowMapper, id);
        return result.stream().findFirst();
    }

    public List<Card> findAll(String name, String collection, String color, String cardType, int offset, int size) {
        StringBuilder sql = new StringBuilder("SELECT * FROM cards WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            sql.append(" AND name LIKE ?");
            params.add("%" + name + "%");
        }
        if (collection != null && !collection.isBlank()) {
            sql.append(" AND collection = ?");
            params.add(collection);
        }
        if (color != null && !color.isBlank()) {
            sql.append(" AND colors LIKE ?");
            params.add("%" + color + "%");
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND card_type = ?");
            params.add(cardType);
        }

        sql.append(" LIMIT ? OFFSET ?");
        params.add(size);
        params.add(offset);

        return jdbcTemplate.query(sql.toString(), cardRowMapper, params.toArray());
    }

    public int count(String name, String collection, String color, String cardType) {
        StringBuilder sql = new StringBuilder("SELECT COUNT(*) FROM cards WHERE 1=1");
        List<Object> params = new ArrayList<>();

        if (name != null && !name.isBlank()) {
            sql.append(" AND name LIKE ?");
            params.add("%" + name + "%");
        }
        if (collection != null && !collection.isBlank()) {
            sql.append(" AND collection = ?");
            params.add(collection);
        }
        if (color != null && !color.isBlank()) {
            sql.append(" AND colors LIKE ?");
            params.add("%" + color + "%");
        }
        if (cardType != null && !cardType.isBlank()) {
            sql.append(" AND card_type = ?");
            params.add(cardType);
        }

        return jdbcTemplate.queryForObject(sql.toString(), Integer.class, params.toArray());
    }
}
