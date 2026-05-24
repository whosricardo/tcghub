"use server"

import { fetchData } from "@/utils/fetchData";
import { OrderRequest, PageResponseOrderResponse, OrderCancelResponse } from "@/types/api";

export async function getOrders(page: number = 0, size: number = 20): Promise<PageResponseOrderResponse> {
    const res = await fetchData(`/orders?page=${page}&size=${size}`);
    if (!res.ok) throw new Error('Erro ao buscar pedidos');
    return res.json();
}

export async function createOrder(data: OrderRequest) {
    const res = await fetchData('/orders', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Erro ao criar pedido');
    return res.json();
}

export async function cancelOrder(orderId: number): Promise<OrderCancelResponse> {
    const res = await fetchData(`/orders/${orderId}/cancel`, {
        method: 'POST',
    });
    if (!res.ok) throw new Error('Erro ao cancelar pedido');
    return res.json();
}
