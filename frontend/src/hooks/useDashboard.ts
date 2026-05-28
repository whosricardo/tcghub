import { useQuery } from "@tanstack/react-query";
import {
    getDashboardSummary,
    getSalesTrend,
    getOrderStatusDistribution,
    getTopSuppliers,
    getPaymentMethodDistribution,
    getOrderValueRanges,
    getOrderStatistics
} from "@/components/services/dashboardServices";
import { DashboardFilters } from "@/types/api";

export function useQueryDashboardSummary() {
    return useQuery({
        queryKey: ["dashboard", "summary"],
        queryFn: () => getDashboardSummary(),
        staleTime: 1000 * 60 * 5, // 5 minutos de cache staleTime
    });
}

export function useQuerySalesTrend(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "sales-trend", filters],
        queryFn: () => getSalesTrend(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryOrderStatusDistribution(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "order-status-distribution", filters],
        queryFn: () => getOrderStatusDistribution(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryTopSuppliers(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "top-suppliers", filters],
        queryFn: () => getTopSuppliers(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryPaymentMethodDistribution(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "payment-method-distribution", filters],
        queryFn: () => getPaymentMethodDistribution(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryOrderValueRanges(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "order-value-ranges", filters],
        queryFn: () => getOrderValueRanges(filters),
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryOrderStatistics(filters?: DashboardFilters) {
    return useQuery({
        queryKey: ["dashboard", "order-statistics", filters],
        queryFn: () => getOrderStatistics(filters),
        staleTime: 1000 * 60 * 5,
    });
}
