import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email inválido').min(1,'Email obrigatório'),
    password: z.string().min(8 , "Deve ter no mímimo 8 caracteres"),
})



export type LoginType = z.infer<typeof loginSchema>;

