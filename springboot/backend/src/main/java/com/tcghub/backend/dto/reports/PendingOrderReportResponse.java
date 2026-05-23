package com.tcghub.backend.dto.reports;

import com.tcghub.backend.model.enums.OrderStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PendingOrderReportResponse(
    Long orderId,
    Long buyerId,
    String buyerName,
    LocalDateTime createdAt,
    BigDecimal totalAmount,
    OrderStatus status
) {}
