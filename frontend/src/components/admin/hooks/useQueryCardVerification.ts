import { useQuery } from "@tanstack/react-query";
import { CardVerification } from "../services/cardVerification";

export function useQueryCardVerification(paramSearch:string){
    return useQuery({
        queryKey: ['cards'],
        queryFn: () => CardVerification(paramSearch),
        enabled: paramSearch.length > 2,
    })
}