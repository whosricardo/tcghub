'use server'

import { fetchData } from "@/utils/fetchData";

export async function deleteListing(id: number): Promise<void> {
    try {
        const res = await fetchData(`/listings/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            const errorMessage = error?.message || 'Erro ao deletar o anúncio';
            throw new Error(errorMessage);
        }
    } catch (error) {
        throw error;
    }
}
