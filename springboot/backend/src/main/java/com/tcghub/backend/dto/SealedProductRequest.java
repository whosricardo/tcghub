package com.tcghub.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SealedProductRequest(
        @NotBlank String name,
        @NotBlank String collection,
        @NotBlank String sealedType,
        String description
) {
}
