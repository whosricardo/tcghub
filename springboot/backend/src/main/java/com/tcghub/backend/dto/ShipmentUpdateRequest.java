package com.tcghub.backend.dto;

import com.tcghub.backend.model.enums.DeliveryStatus;
import jakarta.validation.constraints.NotNull;

public record ShipmentUpdateRequest(@NotNull DeliveryStatus deliveryStatus) {}
