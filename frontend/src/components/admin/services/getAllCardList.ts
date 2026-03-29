'use server'

import { fetchData } from "@/utils/fetchData";

interface CardResponse<T>{
    content: T[];
    currentPage: number;
    totalPages: number;
    totalElements: number;
}

export interface CardProps {
    id: string | number;
    name: string;
    collection: string;
    cardNumber: string;
    rarity: string;
    treatment: string;
    cardType: string;
    cost: number;
    power: number;
    combatAttribute: string;
    colors: string[];
    subtypes: string[];
    description: string;
}

export interface CardSearchParams {
    name?: string;
    collection?: string;
    color?: string;
    cardType?: string;
}

const buildSearch = (param:CardSearchParams) => {
    const query = new URLSearchParams();
    Object.entries(param).forEach(([key, value]) => {
        if (value !== undefined && value !== ""){
            query.append(key,String(value))
        }
    })
    return query;
}



export async function getAllCardList (param: CardSearchParams, page: number , limit: number):Promise<CardResponse<CardProps>>{
    const apiPage  = page - 1;
    const searchParams = buildSearch(param).toString();
    const url_base = `/single-cards?page=${apiPage}&limit=${limit}`
    const url_final = `${url_base}&${searchParams}`

    try {
        const res = await fetchData(url_final , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (!res.ok){
            const error = await res.json().catch((e) => ({}));
            const errorMessage = error?.message || JSON.stringify(error);
            throw new Error (errorMessage || 'Algo inesperado aconteceu');
        }

        const resData = await res.json();
        return resData;

    }
    catch(error){
        throw error;
    }
}