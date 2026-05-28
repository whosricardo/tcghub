import { useQuery, useMutation } from "@tanstack/react-query";
import { checkShippingEligibility, getPaymentLogs } from "@/components/services/functionServices";

export function useCheckShippingEligibility() {
    return useMutation({
        mutationFn: (orderId: number) => checkShippingEligibility(orderId),
    });
}

export function useQueryPaymentLogs() {
    return useQuery({
        queryKey: ['paymentLogs'],
        queryFn: () => getPaymentLogs(),
        staleTime: 1000 * 30, // 30 seconds
    });
}
