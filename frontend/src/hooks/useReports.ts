import { useQuery } from "@tanstack/react-query";
import { 
    getSupplierSales, 
    getPendingOrders, 
    getProductsWithoutListings, 
    getOrdersAboveAverage 
} from "@/components/services/reportServices";

export function useQuerySupplierSales() {
    return useQuery({
        queryKey: ['reports', 'supplier-sales'],
        queryFn: getSupplierSales,
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryPendingOrders() {
    return useQuery({
        queryKey: ['reports', 'pending-orders'],
        queryFn: getPendingOrders,
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryProductsWithoutListings() {
    return useQuery({
        queryKey: ['reports', 'products-without-listings'],
        queryFn: getProductsWithoutListings,
        staleTime: 1000 * 60 * 5,
    });
}

export function useQueryOrdersAboveAverage() {
    return useQuery({
        queryKey: ['reports', 'orders-above-average'],
        queryFn: getOrdersAboveAverage,
        staleTime: 1000 * 60 * 5,
    });
}
