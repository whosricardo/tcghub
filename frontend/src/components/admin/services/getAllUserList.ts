'use server'

import { fetchData } from "@/utils/fetchData"


export interface UserResponse<T>{
    content: T[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

export interface User {
    id: string;
    username : string;
    email: string;
}


export async function getAllUserList (page: number , limit: number):Promise<UserResponse<User>>{
    try {
        const apiPage  = page - 1;
        const res = await fetchData(`/users?page=${apiPage}&limit=${limit}` , {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        if (!res.ok){
            const errorData = await res.json().catch(() => ({}));
            const errorMessage = errorData?.message || JSON.stringify(errorData);
            throw new Error (errorMessage || 'Algo inesperado aconteceu');
        }
        const resData = await res.json();
        return resData;
    }
    catch (error){
        throw error;
    }
}