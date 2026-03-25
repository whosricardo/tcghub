import { useQuery } from "@tanstack/react-query";
import { CardVerification } from "../services/cardVerification";

export function useQueryCardVerification(paramSearch:string, cardType:string){
    return useQuery({
        queryKey: ['cards', paramSearch , cardType],
        queryFn: () => CardVerification(paramSearch, cardType),
        enabled: paramSearch.length > 2,
    })
}