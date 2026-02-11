import { useQuery } from "@tanstack/react-query"
import { getProductByIdAction } from "../actions/get-product-by-id.action"

export const useQueryProduct = (id: string) => {

    const query = useQuery({
        queryKey: ['product', { id }],
        queryFn: () => getProductByIdAction(id),
        staleTime: 60 * 5 * 1000, //5 minutes
        retry: false,
        // enabled: !!id  // The request will continue to be triggered until it has an ID.
    })

    // TODO: Add a mutation to update the product

    return {
        ...query,
    }
}
