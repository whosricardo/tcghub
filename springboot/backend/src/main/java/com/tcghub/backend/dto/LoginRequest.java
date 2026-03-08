package com.tcghub.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Email não pode ser nulo") @Email(message = "Email inválido") String email,
        @NotBlank(message = "Password não pode ser nulo") String password) {
}
