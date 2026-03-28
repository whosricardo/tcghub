package com.tcghub.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SealedProductUpdateRequest(@NotBlank String description) {
}
