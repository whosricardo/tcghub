'use server'

import { fetchData } from "@/utils/fetchData";

export async function deleteSealedProduct(id: string | number) {
    try {
        const res = await fetchData(`/sealed-products/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao deletar produto selado');
        }

        return true;
    } catch (error) {
        throw error;
    }
}