package com.tcghub.backend.repository;

import com.tcghub.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
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
}
