package com.tcghub.backend.dto.reports;

import java.math.BigDecimal;

public record SupplierSalesReportResponse(
    Long supplierId,
    String supplierName,
    String storeName,
    Integer totalOrders,
    Integer totalItemsSold,
    BigDecimal totalRevenue
) {}
