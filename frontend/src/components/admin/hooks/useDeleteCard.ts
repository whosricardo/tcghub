import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteCardList } from '../services/deleteCardList'

export function useDeleteCard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string | number) => deleteCardList(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] }) 
        },
    })
}