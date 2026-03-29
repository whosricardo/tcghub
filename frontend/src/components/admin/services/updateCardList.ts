'use server'

import { fetchData } from "@/utils/fetchData";


export async function updateCardList(id: string | number, description: string) {
    try {
        const res = await fetchData(`/single-cards/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ description }) 
        })

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao atualizar a descrição da carta');
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}