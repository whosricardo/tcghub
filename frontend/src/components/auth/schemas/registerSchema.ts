import {z} from 'zod'

export const registerSchema = z.object({
    username : z.string().min(3 , "Deve ter no mímino 3 caracteres"),
    email: z.string().email('Email inválido').min(1,'Email obrigatório'),
    password: z.string().min(8 , "Deve ter no mímimo 8 caracteres"),
})



export type registerType = z.infer<typeof registerSchema>;