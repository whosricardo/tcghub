import { useMemo, useState } from "react"

interface UsePaginationProps {
    totalElements: number;
    page: number;
    limit: number;
}
export function usePagination({totalElements = 0, page, limit}:UsePaginationProps){
    return useMemo(() => {
        const startItem = totalElements === 0 ? 0 : (page - 1) * limit + 1;
        const endItem = Math.min(page * limit, totalElements);
        
        return {
            startItem,
            endItem
        }
    }, [totalElements, page, limit])
}