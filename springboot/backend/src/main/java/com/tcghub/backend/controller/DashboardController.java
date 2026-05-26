package com.tcghub.backend.controller;

import com.tcghub.backend.dto.dashboard.DashboardSummaryResponse;
import com.tcghub.backend.dto.dashboard.OrderStatisticsResponse;
import com.tcghub.backend.dto.dashboard.OrderStatusDistributionResponse;
import com.tcghub.backend.dto.dashboard.OrderValueRangeResponse;
import com.tcghub.backend.dto.dashboard.PaymentMethodDistributionResponse;
import com.tcghub.backend.dto.dashboard.SalesTrendPointResponse;
import com.tcghub.backend.dto.dashboard.TopSupplierDashboardResponse;
import com.tcghub.backend.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.time.LocalDate;
import java.util.List;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@Tag(name = "Dashboard", description = "Endpoints agregados para o dashboard estatístico integrado")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/summary")
    @Operation(
        summary = "Obter resumo geral do dashboard",
        description = "Retorna indicadores consolidados de pedidos, pagamentos aprovados, receita, ticket médio, fornecedores com vendas e produtos sem anúncio."
    )
    public DashboardSummaryResponse getSummary() {
        return dashboardService.getSummary();
    }

    @GetMapping("/sales-trend")
    @Operation(
        summary = "Obter tendência de vendas",
        description = "Retorna faturamento por dia ou mês para gráfico de linha, com filtros opcionais por período, status do pedido e coleção do produto."
    )
    public List<SalesTrendPointResponse> findSalesTrend(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        @Parameter(description = "Agrupamento dos dados: day ou month")
        @RequestParam(defaultValue = "day")
        String groupBy,
        @Parameter(description = "Filtro opcional por status do pedido")
        @RequestParam(required = false)
        String status,
        @Parameter(description = "Filtro opcional por coleção do produto")
        @RequestParam(required = false)
        String collection
    ) {
        return dashboardService.findSalesTrend(
            startDate,
            endDate,
            groupBy,
            status,
            collection
        );
    }

    @GetMapping("/order-status-distribution")
    @Operation(
        summary = "Obter distribuição de status dos pedidos",
        description = "Retorna a quantidade de pedidos por status, com filtro opcional por período."
    )
    public List<OrderStatusDistributionResponse> findOrderStatusDistribution(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate
    ) {
        return dashboardService.findOrderStatusDistribution(
            startDate,
            endDate
        );
    }

    @GetMapping("/top-suppliers")
    @Operation(
        summary = "Obter fornecedores com maior faturamento",
        description = "Retorna fornecedores ordenados por faturamento e itens vendidos, com filtros opcionais por período, status do pedido e coleção do produto."
    )
    public List<TopSupplierDashboardResponse> findTopSuppliers(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        @Parameter(description = "Quantidade máxima de fornecedores retornados")
        @RequestParam(defaultValue = "10")
        int limit,
        @Parameter(description = "Filtro opcional por status do pedido")
        @RequestParam(required = false)
        String status,
        @Parameter(description = "Filtro opcional por coleção do produto")
        @RequestParam(required = false)
        String collection
    ) {
        return dashboardService.findTopSuppliers(
            startDate,
            endDate,
            limit,
            status,
            collection
        );
    }

    @GetMapping("/payment-method-distribution")
    @Operation(
        summary = "Obter distribuição de métodos de pagamento",
        description = "Retorna a quantidade de pagamentos por método, com filtros opcionais por período e status do pagamento."
    )
    public List<PaymentMethodDistributionResponse> findPaymentMethodDistribution(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        @Parameter(description = "Filtro opcional por status do pagamento")
        @RequestParam(required = false)
        String paymentStatus
    ) {
        return dashboardService.findPaymentMethodDistribution(
            startDate,
            endDate,
            paymentStatus
        );
    }

    @GetMapping("/order-value-ranges")
    @Operation(
        summary = "Obter faixas de valor dos pedidos",
        description = "Retorna a quantidade de pedidos nas faixas 0-99.99, 100-299.99, 300-599.99 e 600+, com filtros opcionais por período e status."
    )
    public List<OrderValueRangeResponse> findOrderValueRanges(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        @Parameter(description = "Filtro opcional por status do pedido")
        @RequestParam(required = false)
        String status
    ) {
        return dashboardService.findOrderValueRanges(
            startDate,
            endDate,
            status
        );
    }

    @GetMapping("/order-statistics")
    @Operation(
        summary = "Obter estatísticas de valor dos pedidos",
        description = "Retorna média, mediana, moda, variância populacional e desvio padrão populacional dos valores dos pedidos, com filtros opcionais por período e status."
    )
    public OrderStatisticsResponse getOrderStatistics(
        @Parameter(description = "Data inicial no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate startDate,
        @Parameter(description = "Data final no formato YYYY-MM-DD")
        @RequestParam(required = false)
        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate endDate,
        @Parameter(description = "Filtro opcional por status do pedido")
        @RequestParam(required = false)
        String status
    ) {
        return dashboardService.getOrderStatistics(
            startDate,
            endDate,
            status
        );
    }
}
