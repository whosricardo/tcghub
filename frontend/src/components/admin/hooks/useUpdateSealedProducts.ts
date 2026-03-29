import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateSealedProducts } from '../services/updateSealedProducts';

export function useUpdateSealedProducts() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ id, description }: { id: string | number; description: string }) => 
            updateSealedProducts(id, description),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sealed-products'] })
        },
    })
}