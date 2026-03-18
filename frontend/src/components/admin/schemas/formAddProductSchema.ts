import { z } from 'zod';


export const formAddProductSchema = z.object({
    nomeCarta: z.string().min(1 , 'Preenchimento obrigatório'),
    numeroCarta: z.string().min(1 , 'Preenchimento obrigatório'),
    raridade: z.string().min(1 , 'Preenchimento Obrigatório'),
    custoCarta: z.number().int().nonnegative().min(1 , 'Preenchimento Obrigatório'),
    poder: z.string().min(1 , 'Preenchimento obrigatório'),
    cor : z.string().min(1 , 'Preenchimento obrigatório'),
    colecao: z.string().min(1 , 'Preenchimento obrigatório'),
    tratamento: z.string().min(1 , 'Preenchimento obrigatório'),
    tipoCarta: z.string().min(1 , 'Preenchimento obrigatório'),
    counter: z.number().int().nonnegative().min(1 , 'Preenchimento Obrigatório'),
    atributoCombate: z.string().min(1 , 'Preenchimento obrigatório'),
    subtipos: z.string().min(1 , 'Preenchimento obrigatório'),
    description: z.string().max(30 , 'Número máximo de 30 caracteres'),
})


export type formAddProductType = z.infer<typeof formAddProductSchema>