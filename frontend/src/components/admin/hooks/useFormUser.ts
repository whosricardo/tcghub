import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendUserRegister, UserProps } from "../services/sendUserRegister";

export function useFormUser (){
    const query = useQueryClient();
    return useMutation({
        mutationFn: sendUserRegister,
        onSuccess: async (data) => {
            console.log('ENvio de formulárip', data);
            await query.invalidateQueries({ queryKey: ['users']})
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}