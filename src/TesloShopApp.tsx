import { RouterProvider } from "react-router"
import { type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

import { appRouter } from "./app.router"
import { useAuthQuery } from "./auth/hooks/useAuthQuery";
import { CustomFullScreenLoading } from "./components/custom/CustomFullScreenLoading";


const queryClient = new QueryClient();

// Custom provider Fix: No QueryClient set, use QueryClientProvider to set one
const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    // Verify the authentication status based on the query client tanStack Query
    const { isLoading } = useAuthQuery();

    // console.log({ data });

    // Update user in Zustand store, It's not optimal
    // useEffect(() => {
    //     if (data) {
    //         // TODO: Action function Zustand for update user
    //     }
    // }, [data]);

    // Test loading CustomFullScreenLoading
    //return <CustomFullScreenLoading />;

    if (isLoading) return <CustomFullScreenLoading />;

    // "return <>{children}</>;" the same as "return children;"
    //return children;
    return <>{children}</>;
}

export const TesloShopApp = () => {




    return (
        <QueryClientProvider client={queryClient}>
            {/* The rest of your application */}
            <Toaster />
            {/* Custom provider */}
            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}

// TanStack Query
{/* <QueryClientProvider client={queryClient}>
    The rest of your application
    <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider> */}
