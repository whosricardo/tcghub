package com.tcghub.backend.repository;

import com.tcghub.backend.model.User;

import java.util.Optional;

import java.sql.PreparedStatement;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final JdbcTemplate jTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jTemplate) {
        this.jTemplate = jTemplate;
    }

    public User save(User user) {
        String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getUsername());
            ps.setString(2, user.getEmail());
            ps.setString(3, user.getPassword());
            return ps;
        }, keyHolder);

        user.setId(keyHolder.getKey().intValue());

    }

    public Optional<User> findByEmail(String email) {
        String sql = "SELECT * FROM users WHERE email = ?";

        RowMapper<User> rowMapper = (rs, rowNum) -> {
            User user = new User();

            // rowsetter -> spring does row.next by itself so there's no need to
            int id = rs.getInt("id");
            String username = rs.getString("username");
            String u_email = rs.getString("email");
            String password = rs.getString("password");

            // populating user entity
            user.setId(id);
            user.setUsername(username);
            user.setEmail(u_email);
            user.setPassword(password);

            return user;
        };

        return jTemplate.query(sql, rowMapper, email).stream().findFirst();
    }

    public boolean existByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }
}
