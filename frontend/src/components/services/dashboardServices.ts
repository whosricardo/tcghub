"use server"

import { fetchData } from "@/utils/fetchData";
import {
    DashboardSummaryResponse,
    SalesTrendPointResponse,
    OrderStatusDistributionResponse,
    TopSupplierDashboardResponse,
    PaymentMethodDistributionResponse,
    OrderValueRangeResponse,
    OrderStatisticsResponse,
    DashboardFilters
} from "@/types/api";

function buildQueryString(filters?: DashboardFilters): string {
    if (!filters) return "";
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);
    if (filters.groupBy) params.append("groupBy", filters.groupBy);
    if (filters.status) params.append("status", filters.status);
    if (filters.collection) params.append("collection", filters.collection);
    if (filters.limit !== undefined) params.append("limit", String(filters.limit));
    if (filters.paymentStatus) params.append("paymentStatus", filters.paymentStatus);
    
    const qs = params.toString();
    return qs ? `?${qs}` : "";
}

export async function getDashboardSummary(): Promise<DashboardSummaryResponse> {
    const res = await fetchData("/dashboard/summary");
    if (!res.ok) throw new Error("Erro ao buscar resumo do dashboard");
    return res.json();
}

export async function getSalesTrend(filters?: DashboardFilters): Promise<SalesTrendPointResponse[]> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/sales-trend${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar tendência de vendas");
    return res.json();
}

export async function getOrderStatusDistribution(filters?: DashboardFilters): Promise<OrderStatusDistributionResponse[]> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/order-status-distribution${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar distribuição de status de pedidos");
    return res.json();
}

export async function getTopSuppliers(filters?: DashboardFilters): Promise<TopSupplierDashboardResponse[]> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/top-suppliers${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar top fornecedores");
    return res.json();
}

export async function getPaymentMethodDistribution(filters?: DashboardFilters): Promise<PaymentMethodDistributionResponse[]> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/payment-method-distribution${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar distribuição de métodos de pagamento");
    return res.json();
}

export async function getOrderValueRanges(filters?: DashboardFilters): Promise<OrderValueRangeResponse[]> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/order-value-ranges${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar faixas de valores de pedidos");
    return res.json();
}

export async function getOrderStatistics(filters?: DashboardFilters): Promise<OrderStatisticsResponse> {
    const qs = buildQueryString(filters);
    const res = await fetchData(`/dashboard/order-statistics${qs}`);
    if (!res.ok) throw new Error("Erro ao buscar estatísticas de pedidos");
    return res.json();
}
