import { useMutation } from "@tanstack/react-query";
import { sendCardRegister } from "../services/sendCardRegister";

export function useFormCard (){
    return useMutation ({
        mutationFn: sendCardRegister,
        onSuccess: (data) => {
            console.log('Envio com sucesso', data)
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}