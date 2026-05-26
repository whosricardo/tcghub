import { z } from 'zod';

export const formAddListingSchema = z.object({
    productId: z.number({ required_error: 'Preenchimento obrigatório' }).int().positive('Selecione uma carta válida'),
    currentPrice: z.number({ required_error: 'Preenchimento obrigatório' }).positive('O preço deve ser maior que 0'),
    availableQuantity: z.number({ required_error: 'Preenchimento obrigatório' }).int().nonnegative('A quantidade não pode ser negativa'),
    itemCondition: z.string().min(1, 'Preenchimento obrigatório'),
    productLanguage: z.string().min(1, 'Preenchimento obrigatório'),
});

export type formAddListingType = z.infer<typeof formAddListingSchema>;
