package com.tcghub.backend.dto.dashboard;

import java.math.BigDecimal;

public record SalesTrendPointResponse(
    String label,
    BigDecimal totalRevenue
) {}
