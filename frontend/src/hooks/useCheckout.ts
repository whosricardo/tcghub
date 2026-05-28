import { useMutation, useQueryClient } from "@tanstack/react-query";
import { processCheckout } from "@/components/services/checkoutServices";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { PaymentMethod } from "@/types/api";

export function useCheckoutMutation() {
    const queryClient = useQueryClient();
    const clearCart = useCartStore((state) => state.clearCart);
    const { setCheckoutSuccess, setCheckoutError, setSubmissionStatus } = useCheckoutStore();

    return useMutation({
        mutationFn: async (params: {
            paymentMethod: PaymentMethod;
            totalAmount: number;
            shippingTotal: number;
        }) => {
            const items = useCartStore.getState().items;
            if (items.length === 0) {
                throw new Error("Seu carrinho está vazio.");
            }

            setSubmissionStatus('loading');
            
            return await processCheckout({
                items,
                paymentMethod: params.paymentMethod,
                totalAmount: params.totalAmount,
                shippingTotal: params.shippingTotal,
            });
        },
        onSuccess: (data) => {
            // Update local state to success with the generated order ID
            setCheckoutSuccess(data.id);
            
            // Invalidate queries to reload orders in order lists
            queryClient.invalidateQueries({ queryKey: ['orders'] });
            
            // Clear cart since the purchase completed successfully
            clearCart();
        },
        onError: (error: any) => {
            const message = error?.message || "Ocorreu um erro inesperado ao finalizar a compra.";
            setCheckoutError(message);
        }
    });
}
