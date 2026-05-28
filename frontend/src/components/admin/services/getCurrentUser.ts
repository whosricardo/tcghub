'use server'

import { cookies } from 'next/headers'
import { fetchData } from '@/utils/fetchData'

export async function getCurrentUser() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;
        if (!token) return null;

        const parts = token.split('.');
        if (parts.length < 2) return null;

        const payloadBase64 = parts[1];
        const payloadJson = Buffer.from(payloadBase64, 'base64').toString('ascii');
        const payload = JSON.parse(payloadJson);
        const email = payload.sub || payload.email || payload.username;
        if (!email) return null;

        const res = await fetchData(`/users?page=0&size=100`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) return null;

        const usersData = await res.json();

        // Fetch supplier sales report to see active suppliers
        let suppliersList = [];
        try {
            const salesRes = await fetchData('/reports/supplier-sales', { method: 'GET' });
            if (salesRes.ok) {
                suppliersList = await salesRes.json();
            }
        } catch (err) {
            console.error("Erro ao buscar fornecedores:", err);
        }

        const matchedUser = (usersData.content || []).find(
            (u: any) => u.email === email || u.username === email
        );

        const matchedUserId = matchedUser ? Number(matchedUser.id) : null;
        const isValidSupplier = suppliersList.some((s: any) => Number(s.supplierId) === matchedUserId);

        let finalSupplierId = 31; // Default fallback
        if (isValidSupplier && matchedUserId) {
            finalSupplierId = matchedUserId;
        } else if (suppliersList.length > 0) {
            finalSupplierId = Number(suppliersList[0].supplierId);
        }

        return {
            id: finalSupplierId,
            username: matchedUser ? matchedUser.username : 'DefaultSupplier',
            email: matchedUser ? matchedUser.email : 'supplier@email.com'
        };
    } catch (error) {
        console.error('Erro ao buscar usuário atual:', error);
        return null;
    }
}

