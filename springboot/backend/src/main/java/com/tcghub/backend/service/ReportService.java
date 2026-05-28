package com.tcghub.backend.service;

import com.tcghub.backend.dto.reports.OrdersAboveAverageReportResponse;
import com.tcghub.backend.dto.reports.PendingOrderReportResponse;
import com.tcghub.backend.dto.reports.ProductWithoutListingReportResponse;
import com.tcghub.backend.dto.reports.SupplierSalesReportResponse;
import com.tcghub.backend.repository.ReportRepository;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    @Transactional(readOnly = true)
    public List<SupplierSalesReportResponse> findSupplierSales() {
        return reportRepository.findSupplierSales();
    }

    @Transactional(readOnly = true)
    public List<PendingOrderReportResponse> findPendingOrders() {
        return reportRepository.findPendingOrders();
    }

    @Transactional(readOnly = true)
    public List<ProductWithoutListingReportResponse> findProductsWithoutListings() {
        return reportRepository.findProductsWithoutListings();
    }

    @Transactional(readOnly = true)
    public List<OrdersAboveAverageReportResponse> findOrdersAboveAverage() {
        return reportRepository.findOrdersAboveAverage();
    }
}
