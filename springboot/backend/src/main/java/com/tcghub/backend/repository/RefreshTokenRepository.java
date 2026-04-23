package com.tcghub.backend.repository;

import com.tcghub.backend.model.RefreshToken;
import java.sql.Timestamp;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

@Repository
public class RefreshTokenRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public RefreshTokenRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<RefreshToken> refreshTokenMapper = (rs, rowNum) ->
        new RefreshToken(
            rs.getLong("id"),
            rs.getString("token"),
            rs.getString("email"),
            rs.getTimestamp("expiry").toInstant(),
            rs.getBoolean("revoked")
        );

    public RefreshToken save(RefreshToken refreshToken) {
        String sql =
            "INSERT INTO refresh_tokens (token, email, expiry, revoked) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(
            sql,
            refreshToken.getToken(),
            refreshToken.getEmail(),
            Timestamp.from(refreshToken.getExpiry()),
            refreshToken.isRevoked()
        );
        return refreshToken;
    }

    public Optional<RefreshToken> findByToken(String token) {
        String sql = "SELECT * FROM refresh_tokens WHERE token = ?";
        return jdbcTemplate
            .query(sql, refreshTokenMapper, token)
            .stream()
            .findFirst();
    }

    public void revokeByEmail(String email) {
        String sql = "UPDATE refresh_tokens SET revoked = TRUE WHERE email = ?";
        jdbcTemplate.update(sql, email);
    }
}
