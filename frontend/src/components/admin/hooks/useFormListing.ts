import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendListingRegister } from "../services/sendListingRegister";

export function useFormListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: sendListingRegister,
        onSuccess: async (data) => {
            console.log('Envio com sucesso', data);
            await queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
        onError: (error: any) => {
            console.error('Erro ao enviar dados', error.message);
        },
    });
}
