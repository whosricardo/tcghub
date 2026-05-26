package com.tcghub.backend.dto.views;

import java.math.BigDecimal;

public record ActiveListingDetailViewResponse(
    Long listingId,
    String productName,
    String collection,
    String supplierName,
    BigDecimal commissionRate,
    BigDecimal currentPrice,
    Integer availableQuantity,
    String itemCondition,
    String productLanguage
) {}
