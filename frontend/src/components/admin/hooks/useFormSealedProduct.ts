import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendSealedProductRegister } from "../services/sendSealedProductRegister";

export function useFormSealedProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendSealedProductRegister,
        onSuccess: async (data) => {
            console.log('Envio com sucesso', data);
            // Invalida a query de selados para recarregar a tabela automaticamente
            await queryClient.invalidateQueries({ queryKey: ['sealed-products'] }) 
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}