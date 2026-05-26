package com.tcghub.backend.dto.dashboard;

import java.math.BigDecimal;

public record TopSupplierDashboardResponse(
    Long supplierId,
    String supplierName,
    String storeName,
    BigDecimal totalRevenue,
    Long totalItemsSold
) {}
