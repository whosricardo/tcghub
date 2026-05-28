package com.tcghub.backend.controller;

import com.tcghub.backend.dto.reports.OrdersAboveAverageReportResponse;
import com.tcghub.backend.dto.reports.PendingOrderReportResponse;
import com.tcghub.backend.dto.reports.ProductWithoutListingReportResponse;
import com.tcghub.backend.dto.reports.SupplierSalesReportResponse;
import com.tcghub.backend.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports")
@Tag(name = "Relatórios", description = "Endpoints para consultas e relatórios da Etapa 04")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/supplier-sales")
    @Operation(
        summary = "Listar fornecedores com volume de vendas",
        description = "Retorna fornecedores com quantidade de pedidos atendidos, itens vendidos e faturamento total."
    )
    public List<SupplierSalesReportResponse> findSupplierSales() {
        return reportService.findSupplierSales();
    }

    @GetMapping("/pending-orders")
    @Operation(
        summary = "Listar pedidos pendentes com dados do comprador",
        description = "Retorna pedidos pendentes com comprador, data de criação, valor total e status."
    )
    public List<PendingOrderReportResponse> findPendingOrders() {
        return reportService.findPendingOrders();
    }

    @GetMapping("/products-without-listings")
    @Operation(
        summary = "Listar produtos sem anúncio",
        description = "Retorna produtos cadastrados que ainda não possuem anúncio no marketplace."
    )
    public List<ProductWithoutListingReportResponse> findProductsWithoutListings() {
        return reportService.findProductsWithoutListings();
    }

    @GetMapping("/orders-above-average")
    @Operation(
        summary = "Listar pedidos acima da média",
        description = "Retorna pedidos cujo valor total está acima da média geral dos pedidos cadastrados."
    )
    public List<OrdersAboveAverageReportResponse> findOrdersAboveAverage() {
        return reportService.findOrdersAboveAverage();
    }
}
