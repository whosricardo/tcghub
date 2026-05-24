package com.tcghub.backend.dto.logs;

import java.time.LocalDateTime;

public record PaymentLogResponse(
    Long id,
    Long paymentId,
    Long orderId,
    String oldStatus,
    String newStatus,
    LocalDateTime changedAt
) {}
