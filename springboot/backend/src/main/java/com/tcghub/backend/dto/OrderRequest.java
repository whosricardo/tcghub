package com.tcghub.backend.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record OrderRequest(
    @NotNull Long buyerId,
    @NotNull @DecimalMin("0.0") BigDecimal totalAmount
) {}
