"use server"

import { fetchData } from "@/utils/fetchData";
import { 
    ActiveListingDetailViewResponse, 
    AboveAvgCommissionSupplierViewResponse 
} from "@/types/api";

interface ActiveListingFilters {
    productName?: string;
    supplierName?: string;
    collection?: string;
}

interface AboveAvgSupplierFilters {
    storeName?: string;
}

/**
 * Busca a view de detalhes de anúncios ativos no banco de dados,
 * permitindo filtragem opcional por nome do produto, fornecedor ou coleção.
 */
export async function getActiveListingsDetail(
    filters?: ActiveListingFilters
): Promise<ActiveListingDetailViewResponse[]> {
    const params = new URLSearchParams();
    if (filters) {
        if (filters.productName) params.append("productName", filters.productName);
        if (filters.supplierName) params.append("supplierName", filters.supplierName);
        if (filters.collection) params.append("collection", filters.collection);
    }
    
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await fetchData(`/views/active-listings-detail${queryString}`);
    
    if (!res.ok) {
        throw new Error("Erro ao buscar detalhes dos anúncios ativos (View)");
    }
    
    return res.json();
}

/**
 * Busca a view de fornecedores com comissão acima da média no banco de dados,
 * permitindo filtragem opcional por nome da loja.
 */
export async function getAboveAvgCommissionSuppliers(
    filters?: AboveAvgSupplierFilters
): Promise<AboveAvgCommissionSupplierViewResponse[]> {
    const params = new URLSearchParams();
    if (filters?.storeName) {
        params.append("storeName", filters.storeName);
    }
    
    const queryString = params.toString() ? `?${params.toString()}` : "";
    const res = await fetchData(`/views/above-average-commission-suppliers${queryString}`);
    
    if (!res.ok) {
        throw new Error("Erro ao buscar fornecedores acima da média (View)");
    }
    
    return res.json();
}
