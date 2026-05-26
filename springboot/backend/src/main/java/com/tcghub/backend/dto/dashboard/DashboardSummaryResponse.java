package com.tcghub.backend.dto.dashboard;

import java.math.BigDecimal;

public record DashboardSummaryResponse(
    Long totalOrders,
    Long totalApprovedPayments,
    BigDecimal totalRevenue,
    BigDecimal averageTicket,
    Long totalSuppliersWithSales,
    Long totalProductsWithoutListings
) {}
