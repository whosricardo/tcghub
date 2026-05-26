"use server"

import { fetchData } from "@/utils/fetchData";
import { ListingResponse, PageResponseListingResponse } from "@/types/api";

export async function getListingsByProductId(productId: number): Promise<ListingResponse[]> {
    try {
        const res = await fetchData(`/listings?page=0&size=5000`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao buscar anúncios');
        }

        const data: PageResponseListingResponse = await res.json();

        return (data.content || []).filter(listing => Number(listing.productId) === Number(productId));
    } catch (error) {
        throw error;
    }
}

