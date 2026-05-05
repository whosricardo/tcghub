package com.tcghub.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderItemResponse(
    Long listingId,
    Long orderId,
    Integer quantityBought,
    BigDecimal unitPricePaid,
    String technicalReport,
    LocalDateTime inspectionDate
) {}
