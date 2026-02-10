import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/auth/store/auth.store";

// Higher order component
export const AuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') return null;

    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

    return children;
};

// Higher order component
export const NotAuthenticatedRoute = ({ children }: PropsWithChildren) => {
    const { authStatus } = useAuthStore();

    if (authStatus === 'checking') return null;

    if (authStatus === 'authenticated') return <Navigate to="/" />;

    return children;
};

// Higher order component
export const AdminRoute = ({ children }: PropsWithChildren) => {
    const { authStatus, isAdmin } = useAuthStore();
    console.log({ authStatus, isAdmin });

    if (authStatus === 'checking') return null;

    if (authStatus === 'not-authenticated') return <Navigate to="/auth/login" />;

    //if (authStatus === 'authenticated' && !isAdmin) return <Navigate to="/" />;
    if (!isAdmin()) return <Navigate to="/" />;

    return children;
};