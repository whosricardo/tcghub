package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.DeliveryStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ShipmentResponse(
    Long id,
    String trackingCode,
    LocalDateTime shippingDate,
    BigDecimal freightCost,
    String carrier,
    DeliveryStatus deliveryStatus,
    LocalDateTime estimatedDeliveryDate,
    Long orderId,
    Long addressId
) {}
