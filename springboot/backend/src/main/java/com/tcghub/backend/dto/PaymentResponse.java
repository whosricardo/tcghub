package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.PaymentMethod;
import com.tcghub.backend.model.enums.PaymentStatus;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record PaymentResponse(
    Long id,
    LocalDateTime paymentDateTime,
    PaymentMethod paymentMethod,
    PaymentStatus status,
    BigDecimal amountPaid,
    Long orderId
) {}
