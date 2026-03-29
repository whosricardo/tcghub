'use server'

import { fetchData } from "@/utils/fetchData";

export async function deleteCardList(id: string | number) {
    try {
        const res = await fetchData(`/single-cards/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao deletar carta');
        }

        return true;
    } catch (error) {
        throw error;
    }
}