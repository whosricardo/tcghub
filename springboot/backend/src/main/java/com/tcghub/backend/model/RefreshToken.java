package com.tcghub.backend.model;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RefreshToken {
    private Long id;
    private String token;
    private String email;
    private Instant expiry;
    private boolean revoked;
}
