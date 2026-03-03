package com.tcghub.backend.repository;

import com.tcghub.backend.model.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    private final JdbcTemplate jTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jTemplate) {
        this.jTemplate = jTemplate;
    }

    public void save(User user) {
        String sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        jTemplate.update(sql, user.getUsername(), user.getEmail(), user.getPassword());
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

            user.setId(id);
            user.setUsername(username);
            user.setEmail(u_email);
            user.setPassword(password);

            return user;
        };

        return jTemplate.query(sql, rowMapper, email).stream().findFirst();
    }
}
