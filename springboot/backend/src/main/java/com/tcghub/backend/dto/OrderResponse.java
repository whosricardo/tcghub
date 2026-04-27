package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record OrderResponse(
    Long id,
    Long buyerId,
    LocalDateTime createdAt,
    BigDecimal totalAmount,
    OrderStatus status
) {}
