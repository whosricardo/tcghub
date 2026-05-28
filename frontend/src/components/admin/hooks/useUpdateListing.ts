import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateListing } from '../services/updateListing';
import { ListingUpdateRequest } from '@/types/api';

export function useUpdateListing() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: ListingUpdateRequest }) => 
            updateListing(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['listings'] });
        },
    });
}
