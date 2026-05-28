package com.tcghub.backend.dto.dashboard;

public record PaymentMethodDistributionResponse(
    String paymentMethod,
    Long total
) {}
