import { useMutation } from '@tanstack/react-query'
import { sendRegister } from '../services/sendRegister'

export function useUserRegister() {
    return useMutation({
        mutationFn: sendRegister,
        onSuccess: (data) => {
            console.log('Envio com sucesso', data)
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}
