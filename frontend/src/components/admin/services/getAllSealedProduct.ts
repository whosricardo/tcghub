'use server'

import { fetchData } from "@/utils/fetchData";

interface SealedProductResponse<T>{
    content: T[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

export interface SealedProductProps {
    id: string | number;
    name: string;
    collection: string;
    sealedType: string;
    description: string;
}

export interface SealedProductSearchParams {
    name?: string;
    collection?: string;
    sealedType?: string;
}

const buildSearch = (param: SealedProductSearchParams) => {
    const query = new URLSearchParams();
    Object.entries(param).forEach(([key, value]) => {
        if (value !== undefined && value !== ""){
            query.append(key, String(value))
        }
    })
    return query;
}

export async function getAllSealedProducts(param: SealedProductSearchParams, page: number, limit: number): Promise<SealedProductResponse<SealedProductProps>>{
    const apiPage  = page - 1;
    const searchParams = buildSearch(param).toString();
    const url_base = `/sealed-products?page=${apiPage}&limit=${limit}`
    const url_final = `${url_base}&${searchParams}`

    try {
        const res = await fetchData(url_final , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok){
            const error = await res.json().catch(() => ({}));
            const errorMessage = error?.message || JSON.stringify(error);
            throw new Error(errorMessage || 'Algo inesperado aconteceu');
        }

        const resData = await res.json();
        return resData;

    }
    catch(error){
        throw error;
    }
}