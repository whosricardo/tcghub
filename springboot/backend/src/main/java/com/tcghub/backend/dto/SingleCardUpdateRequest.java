package com.tcghub.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SingleCardUpdateRequest(@NotBlank String description) {
}