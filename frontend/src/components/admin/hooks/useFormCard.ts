import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCardRegister } from "../services/sendCardRegister";

export function useFormCard (){

    const query = useQueryClient();

    return useMutation ({
        mutationFn: sendCardRegister,
        onSuccess: async (data) => {
            console.log('Envio com sucesso', data);
            await query.invalidateQueries({ queryKey: ['cards']})
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}