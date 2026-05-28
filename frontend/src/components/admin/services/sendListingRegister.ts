'use server'

import { fetchData } from "@/utils/fetchData";
import { ListingRequest, ListingResponse } from "@/types/api";

export async function sendListingRegister(data: ListingRequest): Promise<ListingResponse> {
    try {
        const res = await fetchData('/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            const errorMessage = error?.message || error?.error || 'Erro ao cadastrar anúncio';
            throw new Error(errorMessage);
        }

        const resData = await res.json();
        return resData;
    } catch (error) {
        throw error;
    }
}
