'use server'

import { fetchData } from "@/utils/fetchData"


export interface UserResponse<T>{
    data: T[];
    currentPage: string;
    totalPages: string;
    totalElements: string;
}

export interface User {
    id: string;
    name : string;
    email: string;
}


export async function getAllUserList (page: number , limit: number):Promise<UserResponse<User>>{
    try {
        const res = await fetchData(`/users?page=${page}&limit=${limit}` , {
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            }
        })

        if (!res.ok){
            const errorData = await res.json().catch(() => ({}));
            throw new Error (errorData || 'Algo inesperado aconteceu');
        }
        const resData = await res.json();
        return resData;
    }
    catch (error){
        throw error;
    }
}