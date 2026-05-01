package com.tcghub.backend.dto;

import java.math.BigDecimal;

public record ListingResponse(
        Long id,
        Integer availableQuantity,
        BigDecimal currentPrice,
        String itemCondition,
        String productLanguage,
        Long productId,
        Long supplierId) {
}
