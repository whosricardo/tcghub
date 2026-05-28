"use server"

import { fetchData } from "@/utils/fetchData";
import { PaymentResponse, PaymentStatus } from "@/types/api";

export async function updatePaymentStatus(
    paymentId: number, 
    status: PaymentStatus
): Promise<PaymentResponse> {
    const res = await fetchData(`/payments/${paymentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    });
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        const errorMessage = error?.message || 'Erro ao atualizar status do pagamento';
        throw new Error(errorMessage);
    }
    return res.json();
}
