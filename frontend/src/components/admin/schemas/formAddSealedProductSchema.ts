import { z } from 'zod';

export const formAddSealedProductSchema = z.object({
    name: z.string().min(1, 'Preenchimento obrigatório'),
    collection: z.string().min(1, 'Preenchimento obrigatório'),
    sealedType: z.string().min(1, 'Preenchimento obrigatório'),
    description: z.string()
        .min(1, { message: 'Preenchimento obrigatório' })
        .max(400, { message: 'Máximo de 400 caracteres' })
});

export type formAddSealedProductType = z.infer<typeof formAddSealedProductSchema>;