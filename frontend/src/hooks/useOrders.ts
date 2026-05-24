import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, createOrder, cancelOrder } from "@/components/services/orderServices";
import { OrderRequest } from "@/types/api";

export function useQueryOrders(page: number = 0, size: number = 20) {
    return useQuery({
        queryKey: ['orders', page, size],
        queryFn: () => getOrders(page, size),
        staleTime: 1000 * 60 * 5,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: OrderRequest) => createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}

export function useCancelOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (orderId: number) => cancelOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
}
