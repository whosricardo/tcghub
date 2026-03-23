'use server'

import { fetchData } from "@/utils/fetchData";

export async function sendCardRegister (data: any){
    try {
        const res = await fetchData('/cards' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(data),
        })

        if (!res.ok){
            const errorMessage = await res.json().catch(() => ({}))
            throw new Error(errorMessage.error || 'Algo inesperado aconteceu')
        }

        const resData = await res.json();

        console.log(resData)
        return resData
    }
    catch (error){
        throw error
    }
}