"use server"

import { fetchData } from "@/utils/fetchData";
import { CardProps } from "./getAllMarketplaceCards";

export async function getMarketplaceCardById(id: string | number): Promise<CardProps> {
    try {
        const res = await fetchData(`/single-cards/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({}));
            throw new Error(error?.message || 'Erro ao buscar carta');
        }

        return await res.json();
    } catch (error) {
        throw error;
    }
}
