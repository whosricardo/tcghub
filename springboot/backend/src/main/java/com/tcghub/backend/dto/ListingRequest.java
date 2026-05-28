package com.tcghub.backend.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public record ListingRequest(
        @NotNull @Min(0) Integer availableQuantity,
        @NotNull BigDecimal currentPrice,
        @NotBlank String itemCondition,
        @NotBlank String productLanguage,
        @NotNull Long productId,
        @NotNull Long supplierId) {
}
