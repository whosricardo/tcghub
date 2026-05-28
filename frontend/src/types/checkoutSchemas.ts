import { z } from 'zod';

export const addressSchema = z.object({
    fullName: z.string()
        .min(3, 'Nome completo deve ter pelo menos 3 caracteres')
        .max(100, 'Nome completo muito longo'),
    zipCode: z.string()
        .min(8, 'CEP é obrigatório')
        .refine((val) => /^\d{5}-?\d{3}$/.test(val), {
            message: 'Formato de CEP inválido (Ex: 12345-678 ou 12345678)',
        }),
    street: z.string().min(1, 'Rua/Avenida é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    complement: z.string().optional(),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string()
        .length(2, 'Use a sigla do estado com 2 letras (Ex: SP)')
        .transform((val) => val.toUpperCase()),
    phone: z.string()
        .min(10, 'Telefone inválido (mínimo 10 dígitos com DDD)')
        .max(15, 'Telefone muito longo'),
});

export type AddressType = z.infer<typeof addressSchema>;

export const paymentSchema = z.object({
    paymentMethod: z.enum(['CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'BOLETO', 'CASH'], {
        required_error: 'Selecione um método de pagamento',
    }),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
}).superRefine((data, ctx) => {
    if (data.paymentMethod === 'CREDIT_CARD' || data.paymentMethod === 'DEBIT_CARD') {
        if (!data.cardName || data.cardName.trim().length < 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Nome impresso no cartão é obrigatório',
                path: ['cardName'],
            });
        }
        if (!data.cardNumber || !/^\d{16}$|^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(data.cardNumber)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Número do cartão inválido (deve conter 16 dígitos)',
                path: ['cardNumber'],
            });
        }
        if (!data.expiryDate || !/^\d{2}\/\d{2}$/.test(data.expiryDate)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Data de validade inválida (MM/AA)',
                path: ['expiryDate'],
            });
        }
        if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'CVV inválido (3 ou 4 dígitos)',
                path: ['cvv'],
            });
        }
    }
});

export type PaymentType = z.infer<typeof paymentSchema>;
