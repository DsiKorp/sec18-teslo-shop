import { useQuery } from "@tanstack/react-query"
import { useAuthStore } from "../store/auth.store";

export const useAuthQuery = () => {
    const { checkAuthStatus } = useAuthStore();

    return useQuery({
        queryKey: ['auth'],
        queryFn: checkAuthStatus,
        retry: false,
        //refetchInterval: 1000 * 60 * 1.5, //  1 hora y media curso
        refetchInterval: 1000 * 60 * 90, // 90 minutos = 1 hora y media
        //refetchInterval: 1000 * 60, // 1 minute
        refetchOnWindowFocus: true,
    })
}
