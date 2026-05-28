import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllListings } from "../services/getAllListings";

export function useQueryListings(page: number, limit: number = 10) {
    return useQuery({
        queryKey: ['listings', page, limit],
        queryFn: () => getAllListings(page, limit),
        staleTime: 1000 * 60 * 5,
        placeholderData: keepPreviousData,
    });
}
