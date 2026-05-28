"use server"

import { fetchData } from "@/utils/fetchData";
import { ShippingEligibilityResponse, PaymentLogResponse } from "@/types/api";

export async function checkShippingEligibility(orderId: number): Promise<ShippingEligibilityResponse> {
    const res = await fetchData(`/functions/orders/${orderId}/shipping-eligibility`);
    if (!res.ok) throw new Error('Erro ao verificar elegibilidade de envio');
    return res.json();
}

export async function getPaymentLogs(): Promise<PaymentLogResponse[]> {
    const res = await fetchData('/logs/payments');
    if (!res.ok) throw new Error('Erro ao buscar logs de pagamento');
    return res.json();
}
