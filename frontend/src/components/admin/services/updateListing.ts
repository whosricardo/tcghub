'use server'

import { fetchData } from "@/utils/fetchData";
import { ListingUpdateRequest, ListingResponse } from "@/types/api";

export async function updateListing(id: number, data: ListingUpdateRequest): Promise<ListingResponse> {
    try {
        const res = await fetchData(`/listings/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            const errorMessage = error?.message || 'Erro ao atualizar o anúncio';
            throw new Error(errorMessage);
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}
