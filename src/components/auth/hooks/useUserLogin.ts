import { useMutation } from '@tanstack/react-query'
import { sendLogin } from '../services/sendLogin'

export function useUserLogin() {
    return useMutation({
        mutationFn: sendLogin,
        onSuccess: (data) => {
            console.log('Envio com sucesso', data)
        },
        onError: (error) => {
            console.error('Erro ao enviar dados', error.message)
        },
    })
}
