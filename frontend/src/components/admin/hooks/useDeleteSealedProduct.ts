import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteSealedProduct } from '../services/deleteSealedProduct'


export function useDeleteSealedProduct() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (id: string | number) => deleteSealedProduct(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['sealed-products'] }) 
        },
    })
}