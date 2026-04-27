package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

public record OrderUpdateRequest(@NotNull OrderStatus status) {}
