import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { CardSearchParams } from "../services/getAllMarketplaceCards";
import { getEnrichedMarketplaceCards } from "../services/getEnrichedMarketplaceCards";

export function useMarketplaceCards(params: CardSearchParams, page: number, limit: number = 12) {
    return useQuery({
        queryKey: ['marketplaceCards', params, page, limit],
        queryFn: async () => {
            // Toda a lógica de fetch do DB e enriquecimento (external API) 
            // foi movida para o backend (Server Action) para evitar requisições N+1 a partir do client
            return await getEnrichedMarketplaceCards(params, page, limit);
        },
        staleTime: 1000 * 60 * 5, // 5 minutes cache
        placeholderData: keepPreviousData,
    });
}
