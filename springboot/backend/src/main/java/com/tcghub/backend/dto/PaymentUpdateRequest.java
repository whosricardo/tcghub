package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.PaymentStatus;
import jakarta.validation.constraints.NotNull;

public record PaymentUpdateRequest(@NotNull PaymentStatus status) {}
