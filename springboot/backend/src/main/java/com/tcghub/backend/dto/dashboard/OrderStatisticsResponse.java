package com.tcghub.backend.dto.dashboard;

import java.math.BigDecimal;

public record OrderStatisticsResponse(
    BigDecimal average,
    BigDecimal median,
    BigDecimal mode,
    BigDecimal variance,
    BigDecimal standardDeviation
) {}
