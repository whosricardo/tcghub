import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateCardList } from '../services/updateCardList'


export function useUpdateCard() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, description }: { id: string | number; description: string }) => 
            updateCardList(id, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cards'] })
        },
    })
}