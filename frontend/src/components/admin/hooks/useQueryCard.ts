import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getAllCardList, type CardSearchParams } from "../services/getAllCardList";

export function useQueryCard (params: CardSearchParams, page: number , limit: number = 10 ){
    return useQuery({
        queryKey: ['cards' , params, page, limit],
        queryFn: () => getAllCardList(params, page , limit),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    })
}