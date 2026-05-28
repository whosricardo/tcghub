'use server'

import { fetchData } from "@/utils/fetchData";
import { PageResponseListingResponse } from "@/types/api";

export async function getAllListings(page: number, limit: number): Promise<PageResponseListingResponse> {
    const apiPage = page - 1;
    try {
        const res = await fetchData(`/listings?page=${apiPage}&size=${limit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            const errorMessage = error?.message || JSON.stringify(error);
            throw new Error(errorMessage || 'Algo inesperado aconteceu');
        }

        const resData = await res.json();
        return resData;
    } catch (error) {
        throw error;
    }
}
