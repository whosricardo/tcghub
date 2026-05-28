package com.tcghub.backend.dto;

import jakarta.validation.constraints.Min;

import java.math.BigDecimal;

public record ListingUpdateRequest(
        @Min(0) Integer availableQuantity,
        BigDecimal currentPrice,
        String itemCondition,
        String productLanguage) {
}
