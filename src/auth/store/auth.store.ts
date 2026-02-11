import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { toast } from 'sonner'

import { loginAction } from '../actions/login.action';
import { checkAuthAction } from '../actions/check-action';
import { registerAction } from '../actions/register.action';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthState = {
    // Properties
    user: User | null;
    token: string | null;
    authStatus: AuthStatus;
    // Getters
    isAdmin: () => boolean;
    // Actions
    login(email: string, password: string): Promise<boolean>;
    logout: () => void;
    checkAuthStatus: () => Promise<boolean>;
    registerUser: (email: string, password: string, fullName: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    // Store implementation
    user: null,
    token: null,
    authStatus: 'checking',

    // Getters
    isAdmin: () => {
        //const roles = get().user?.roles || [];
        //return roles.includes('admin');
        // !! convert undefined to boolean to prevent error: Type 'boolean | undefined' is not assignable to type 'boolean'.
        return !!get().user?.roles.includes('admin');
    },

    // Actions
    login: async (email: string, password: string) => {

        console.log({ email, password });

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            toast.success('Bienvenido!', { description: 'Has iniciado sesión correctamente!' });
            return true;

        } catch (error) {
            console.log(error);
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token');
            toast.error('Login: Correo y/o contraseña no válidos!!!', { description: 'Intenta nuevamente!' });
            return false;
        }
    },

    registerUser: async (email: string, password: string, fullName: string) => {

        console.log({ email, password, fullName });

        try {
            const data = await registerAction(email, password, fullName);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token, authStatus: 'authenticated' });
            toast.success('Bienvenido!', { description: 'Te has registrado correctamente!' });
            return true;

        } catch (error) {
            console.log(error);
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token');
            toast.error('Registro: Correo y/o contraseña no válidos!!!', { description: 'Intenta nuevamente!' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null, authStatus: 'not-authenticated' });
        toast.success('Hasta luego!', { description: 'Has cerrado sesión correctamente!' });

    },

    checkAuthStatus: async () => {
        try {
            const { user, token } = await checkAuthAction();
            set({ user, token, authStatus: 'authenticated' });
            localStorage.setItem('token', token);
            return true;
        } catch (error) {

            console.log(error);
            set({ user: null, token: null, authStatus: 'not-authenticated' });
            localStorage.removeItem('token');
            toast.error('Error: Correo y/o contraseña no válidos!!!', { description: 'Intente nuevamente!' });
            return false;
        }
    }
}));
