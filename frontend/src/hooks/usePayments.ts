import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePaymentStatus } from "@/components/services/paymentServices";
import { PaymentStatus } from "@/types/api";

export function useUpdatePaymentStatus() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ paymentId, status }: { paymentId: number; status: PaymentStatus }) =>
            updatePaymentStatus(paymentId, status),
        onSuccess: () => {
            // Invalida os logs de pagamento para o trigger refletir o novo log em tempo real
            queryClient.invalidateQueries({ queryKey: ['paymentLogs'] });
        },
    });
}
