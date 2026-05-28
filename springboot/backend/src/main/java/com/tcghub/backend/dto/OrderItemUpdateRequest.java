package com.tcghub.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record OrderItemUpdateRequest(@NotBlank String technicalReport) {}
