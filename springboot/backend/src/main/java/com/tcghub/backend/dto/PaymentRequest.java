package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.PaymentMethod;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record PaymentRequest(
    @NotNull PaymentMethod paymentMethod,
    @NotNull @DecimalMin("0.0") BigDecimal amountPaid,
    @NotNull Long orderId
) {}
