import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendUserRegister, UserProps } from "../services/sendUserRegister";

export function useFormUser (){
    const query = useQueryClient();
    return useMutation({
        mutationFn: sendUserRegister,
        onSuccess: (data) => {
            console.log('Envio com sucesso', data);
            query.invalidateQueries({ queryKey: ['users']})
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}