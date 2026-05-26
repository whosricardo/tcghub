import { useQuery } from "@tanstack/react-query";
import { getListingsByProductId } from "../services/getListingsByProductId";

export function useListingsByProductId(productId: number) {
    return useQuery({
        queryKey: ['listings', 'byProduct', productId],
        queryFn: () => getListingsByProductId(productId),
        staleTime: 1000 * 60 * 2, // 2 minutes stale time
    });
}
