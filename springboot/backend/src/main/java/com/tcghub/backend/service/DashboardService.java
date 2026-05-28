package com.tcghub.backend.service;

import com.tcghub.backend.dto.dashboard.DashboardSummaryResponse;
import com.tcghub.backend.dto.dashboard.OrderStatisticsResponse;
import com.tcghub.backend.dto.dashboard.OrderStatusDistributionResponse;
import com.tcghub.backend.dto.dashboard.OrderValueRangeResponse;
import com.tcghub.backend.dto.dashboard.PaymentMethodDistributionResponse;
import com.tcghub.backend.dto.dashboard.SalesTrendPointResponse;
import com.tcghub.backend.dto.dashboard.TopSupplierDashboardResponse;
import com.tcghub.backend.repository.DashboardRepository;
import java.time.LocalDate;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final DashboardRepository dashboardRepository;

    public DashboardService(DashboardRepository dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryResponse getSummary() {
        return dashboardRepository.getSummary();
    }

    @Transactional(readOnly = true)
    public List<SalesTrendPointResponse> findSalesTrend(
        LocalDate startDate,
        LocalDate endDate,
        String groupBy,
        String status,
        String collection
    ) {
        String normalizedGroupBy = "month".equalsIgnoreCase(groupBy)
            ? "month"
            : "day";
        return dashboardRepository.findSalesTrend(
            startDate,
            endDate,
            normalizedGroupBy,
            status,
            collection
        );
    }

    @Transactional(readOnly = true)
    public List<OrderStatusDistributionResponse> findOrderStatusDistribution(
        LocalDate startDate,
        LocalDate endDate
    ) {
        return dashboardRepository.findOrderStatusDistribution(
            startDate,
            endDate
        );
    }

    @Transactional(readOnly = true)
    public List<TopSupplierDashboardResponse> findTopSuppliers(
        LocalDate startDate,
        LocalDate endDate,
        int limit,
        String status,
        String collection
    ) {
        int normalizedLimit = Math.max(1, limit);
        return dashboardRepository.findTopSuppliers(
            startDate,
            endDate,
            normalizedLimit,
            status,
            collection
        );
    }

    @Transactional(readOnly = true)
    public List<PaymentMethodDistributionResponse> findPaymentMethodDistribution(
        LocalDate startDate,
        LocalDate endDate,
        String paymentStatus
    ) {
        return dashboardRepository.findPaymentMethodDistribution(
            startDate,
            endDate,
            paymentStatus
        );
    }

    @Transactional(readOnly = true)
    public List<OrderValueRangeResponse> findOrderValueRanges(
        LocalDate startDate,
        LocalDate endDate,
        String status
    ) {
        return dashboardRepository.findOrderValueRanges(
            startDate,
            endDate,
            status
        );
    }

    @Transactional(readOnly = true)
    public OrderStatisticsResponse getOrderStatistics(
        LocalDate startDate,
        LocalDate endDate,
        String status
    ) {
        return dashboardRepository.getOrderStatistics(
            startDate,
            endDate,
            status
        );
    }
}
