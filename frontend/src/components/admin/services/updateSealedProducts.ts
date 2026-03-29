'use server'

import { fetchData } from "@/utils/fetchData";

export async function updateSealedProducts(id: string | number, description: string) {
    try {
        const res = await fetchData(`/sealed-products/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description }) 
        })

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao atualizar a descrição do produto selado');
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}