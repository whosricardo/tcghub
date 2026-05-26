import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "../services/deleteListing";

export function useDeleteListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteListing(id),
        onSuccess: async () => {
            console.log('Anúncio deletado com sucesso');
            await queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
        onError: (error: any) => {
            console.error('Erro ao deletar anúncio', error.message);
        },
    });
}
