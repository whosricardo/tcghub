'use server'

import { fetchData } from "@/utils/fetchData";

export async function sendSealedProductRegister(data: any) {
    try {
        // Atualizado para o novo endpoint
        const res = await fetchData('/sealed-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok) {
            const errorMessage = await res.json().catch(() => ({}))
            throw new Error(errorMessage.error || 'Algo inesperado aconteceu')
        }

        const resData = await res.json();

        console.log(resData)
        return resData
    }
    catch (error) {
        throw error
    }
}