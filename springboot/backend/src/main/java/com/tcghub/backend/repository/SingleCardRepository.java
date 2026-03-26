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
public class CardRepository {

    private final JdbcTemplate jdbcTemplate;

    public CardRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

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
            rs.getString("description"));

    public SingleCard save(SingleCard singleCard) {
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(
                    "INSERT INTO cards (name, collection, card_number, rarity, treatment, card_type, cost, power, counter, combat_attribute, colors, subtypes, description) "
                            +
                            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, singleCard.getName());
            ps.setString(2, singleCard.getCollection());
            ps.setString(3, singleCard.getCardNumber());
            ps.setString(4, singleCard.getRarity());
            ps.setString(5, singleCard.getTreatment().name());
            ps.setString(6, singleCard.getCardType());
            ps.setObject(7, singleCard.getCost());
            ps.setObject(8, singleCard.getPower());
            ps.setObject(9, singleCard.getCounter());
            ps.setString(10, singleCard.getCombatAttribute());
            ps.setString(11, singleCard.getColors());
            ps.setString(12, singleCard.getSubtypes());
            ps.setString(13, singleCard.getDescription());
            return ps;
        }, keyHolder);
        singleCard.setId(keyHolder.getKey().longValue());
        return singleCard;
    }

    public Optional<SingleCard> findById(Long id) {
        List<SingleCard> result = jdbcTemplate.query(
                "SELECT * FROM cards WHERE id = ?",
                cardRowMapper, id);
        return result.stream().findFirst();
    }

    public List<SingleCard> findAll(String name, String collection, String color, String cardType, int offset, int size) {
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
