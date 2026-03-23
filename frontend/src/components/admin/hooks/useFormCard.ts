import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCardRegister } from "../services/sendCardRegister";

export function useFormCard (){

    const query = useQueryClient();

    return useMutation ({
        mutationFn: sendCardRegister,
        onSuccess: (data) => {
            console.log('Envio com sucesso', data);
            query.invalidateQueries({ queryKey: ['cards']})
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}