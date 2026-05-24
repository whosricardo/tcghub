package com.tcghub.backend.dto;

public record OrderCancelResponse(
    Long orderId,
    boolean cancelled,
    String message
) {}
