package com.tcghub.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank(message = "Username não pode ser nulo") String username,
        @Email(message = "Email inválido") @NotBlank(message = "Email não pode ser nulo") String email,
        @NotBlank(message = "Password não pode ser nulo") @Size(message = "Password deve ter no mínimo 8 caracteres") String password) {
}
