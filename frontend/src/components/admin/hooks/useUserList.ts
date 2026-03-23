import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllUserList } from "../services/getAllUserList";

export function useUserList (page: number , limit: number = 10){
    return useQuery({
        queryKey: ['users' , page , limit],
        queryFn: () => getAllUserList(page , limit),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 5,
    })
}