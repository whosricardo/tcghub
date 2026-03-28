import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllSealedProducts ,type SealedProductSearchParams } from "./../services/getAllSealedProduct"


export function useQuerySealedProduct(params: SealedProductSearchParams, page: number, limit: number = 10) {
    return useQuery({
        queryKey: ['sealed-products', params, page, limit],
        queryFn: () => getAllSealedProducts(params, page, limit),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
}