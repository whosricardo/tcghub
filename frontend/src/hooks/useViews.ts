import { useQuery } from "@tanstack/react-query";
import { 
    getActiveListingsDetail, 
    getAboveAvgCommissionSuppliers 
} from "@/components/services/viewServices";

/**
 * Hook do React Query para consultar a view de detalhes de anúncios ativos.
 * O cache é invalidado automaticamente quando os filtros mudam.
 */
export function useQueryActiveListingsDetail(filters?: { 
    productName?: string; 
    supplierName?: string; 
    collection?: string; 
}) {
    return useQuery({
        queryKey: ["views", "active-listings-detail", filters],
        queryFn: () => getActiveListingsDetail(filters),
        staleTime: 1000 * 60 * 5, // 5 minutos de cache staleTime
    });
}

/**
 * Hook do React Query para consultar a view de fornecedores acima da média de comissão.
 * O cache é invalidado automaticamente quando o filtro de loja muda.
 */
export function useQueryAboveAvgCommissionSuppliers(filters?: { 
    storeName?: string; 
}) {
    return useQuery({
        queryKey: ["views", "above-avg-commission-suppliers", filters],
        queryFn: () => getAboveAvgCommissionSuppliers(filters),
        staleTime: 1000 * 60 * 5, // 5 minutos de cache staleTime
    });
}
