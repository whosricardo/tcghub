"use server"

import { fetchData } from "@/utils/fetchData";
import { 
    SupplierSalesReportResponse, 
    PendingOrderReportResponse, 
    ProductWithoutListingReportResponse, 
    OrdersAboveAverageReportResponse 
} from "@/types/api";

export async function getSupplierSales(): Promise<SupplierSalesReportResponse[]> {
    const res = await fetchData('/reports/supplier-sales');
    if (!res.ok) throw new Error('Erro ao buscar vendas por fornecedor');
    return res.json();
}

export async function getPendingOrders(): Promise<PendingOrderReportResponse[]> {
    const res = await fetchData('/reports/pending-orders');
    if (!res.ok) throw new Error('Erro ao buscar pedidos pendentes');
    return res.json();
}

export async function getProductsWithoutListings(): Promise<ProductWithoutListingReportResponse[]> {
    const res = await fetchData('/reports/products-without-listings');
    if (!res.ok) throw new Error('Erro ao buscar produtos sem anúncio');
    return res.json();
}

export async function getOrdersAboveAverage(): Promise<OrdersAboveAverageReportResponse[]> {
    const res = await fetchData('/reports/orders-above-average');
    if (!res.ok) throw new Error('Erro ao buscar pedidos acima da média');
    return res.json();
}
