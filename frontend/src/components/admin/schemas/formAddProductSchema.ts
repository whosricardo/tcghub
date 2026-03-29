import { z } from 'zod';


export const formAddProductSchema = z.object({
    name: z.string().min(1 , 'Preenchimento obrigatório'),
    cardNumber: z.string().min(1 , 'Preenchimento obrigatório'),
    rarity: z.string().min(1 , 'Preenchimento Obrigatório'),
    cost: z.number().int().nonnegative('Preenchimento Obrigatório'),
    power: z.number().int().min(0 , 'Preenchimento obrigatório'),
    colors: z.array(z.string()).min(1, 'Selecione pelo menos uma cor'),
    collection: z.string().min(1 , 'Preenchimento obrigatório'),
    treatment: z.string().min(1 , 'Preenchimento obrigatório'),
    cardType: z.string().min(1 , 'Preenchimento obrigatório'),
    counter: z.number().int().nonnegative('Preenchimento Obrigatório'),
    combatAttribute: z.string().min(1 , 'Preenchimento obrigatório'),
    subtypes: z.array(z.string()).min(1, 'Adicione pelo menos um subtipo'),
    description: z.string().min(1 , { message: 'Preenchimento obrigatório'}).max(255 , {message: 'Máximo de 250 caracteres'})
})


export type formAddProductType = z.infer<typeof formAddProductSchema>