package com.tcghub.backend.service;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.tcghub.backend.exception.InvalidTokenException;
import com.tcghub.backend.model.RefreshToken;
import com.tcghub.backend.repository.RefreshTokenRepository;

@Service
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${jwt.refresh-expiration}")
    private long refreshExpirationMs;

    public RefreshTokenService(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public RefreshToken createRefreshToken(String email) {
        refreshTokenRepository.revokeByEmail(email);

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setEmail(email);
        refreshToken.setExpiry(Instant.now().plusMillis(refreshExpirationMs));
        refreshToken.setRevoked(false);

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken validateRefreshToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Refresh token inválido"));

        if (refreshToken.isRevoked()) {
            throw new InvalidTokenException("Refresh token revogado");
        }

        if (refreshToken.getExpiry().isBefore(Instant.now())) {
            throw new InvalidTokenException("Refresh token expirado");
        }

        return refreshToken;
    }

    public void revokeByEmail(String email) {
        refreshTokenRepository.revokeByEmail(email);
    }
}
