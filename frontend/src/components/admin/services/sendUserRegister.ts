'use server'

import { fetchData } from "@/utils/fetchData"

export interface UserProps {
    username: string;
    email: string;
    password: string;
}

export async function sendUserRegister (params: UserProps){
    try {
        const res = await fetchData('/auth/register' , {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify(params)
        })

        if (!res.ok){
            const error =  await res.json().catch(() => ({}));
            const errorMessage = error.message || JSON.stringify(error);
            throw new Error (errorMessage || 'Algum erro inesperado aconteceu.');
        }
    }
    catch (error){
        throw error;
    }
}