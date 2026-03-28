package com.tcghub.backend.dto;

public record SealedProductResponse(
        Long id,
        String name,
        String collection,
        String sealedType,
        String description
) {
}