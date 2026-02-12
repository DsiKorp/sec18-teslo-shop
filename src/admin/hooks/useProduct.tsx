import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProductByIdAction } from '../actions/get-product-by-id.action';
import type { Product } from '@/interfaces/product.interface';
import { createUpdateProductAction } from '../actions/create-update-product.action';

export const useProduct = (id: string) => {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutos
        // enabled: !!id  // The request will continue to be triggered until it has an ID.
    });

    // con el useMutation se especifica cuando se va a llamar a la función createUpdateProductAction
    // no se llama directamente, sino que se llama cuando se hace submit del formulario con el mutateAsync
    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product: Product) => {
            // Invalidar caché
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({
                queryKey: ['product', { id: product.id }],
            });

            // Actualizar queryData
            queryClient.setQueryData(['products', { id: product.id }], product);
        },
    });

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //   console.log({ productLike });
    // };

    return {
        ...query,
        mutation,
    };
};