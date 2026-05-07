package com.tcghub.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderItemRequest(
    @NotNull Long listingId,
    @NotNull Long orderId,
    @NotNull @Min(1) Integer quantityBought,
    @NotNull @DecimalMin("0.0") BigDecimal unitPricePaid,
    String technicalReport,
    LocalDateTime inspectionDate
) {}
