package com.tcghub.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShipmentRequest(
    String trackingCode,
    @NotNull @DecimalMin("0.0") BigDecimal freightCost,
    @NotBlank String carrier,
    LocalDateTime estimatedDeliveryDate,
    @NotNull Long orderId,
    Long addressId
) {}
