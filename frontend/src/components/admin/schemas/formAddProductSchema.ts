import { z } from 'zod';


export const formAddProductSchema = z.object({
    name: z.string().min(1 , 'Preenchimento obrigatório'),
    cardNumber: z.string().min(1 , 'Preenchimento obrigatório'),
    rarity: z.string().min(1 , 'Preenchimento Obrigatório'),
    cost: z.number().int().nonnegative().min(1 , 'Preenchimento Obrigatório'),
    power: z.string().min(1 , 'Preenchimento obrigatório'),
    colors : z.string().min(1 , 'Preenchimento obrigatório'),
    collection: z.string().min(1 , 'Preenchimento obrigatório'),
    treatment: z.string().min(1 , 'Preenchimento obrigatório'),
    cardType: z.string().min(1 , 'Preenchimento obrigatório'),
    counter: z.number().int().nonnegative().min(1 , 'Preenchimento Obrigatório'),
    combatAttribute: z.string().min(1 , 'Preenchimento obrigatório'),
    subTypes: z.string().min(1 , 'Preenchimento obrigatório'),
    description: z.string().min(1 , { message: 'Preenchimento obrigatório'}).max(30 , {message: 'Máximo de 30 caracteres'})
})


export type formAddProductType = z.infer<typeof formAddProductSchema>