package com.tcghub.backend.dto.views;

import java.math.BigDecimal;

public record AboveAvgCommissionSupplierViewResponse(
    Long supplierId,
    String storeName,
    String contactEmail,
    BigDecimal commissionRate,
    Integer totalProductsListed
) {}
