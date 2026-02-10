import type { User } from '@/interfaces/user.interface';
import { create } from 'zustand'
import { toast } from 'sonner'

import { loginAction } from '../actions/login.actions';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

type AuthState = {
    // Properties
    user: User | null,
    token: string | null,
    status: AuthStatus,
    // Getters
    //isAdmin: boolean,
    // Actions
    login(email: string, password: string): Promise<boolean>,
    logout: () => void,
}

export const useAuthStore = create<AuthState>()((set) => ({
    // Store implementation
    user: null,
    token: null,
    status: 'checking',

    // Actions
    login: async (email: string, password: string) => {

        console.log({ email, password });

        try {
            const data = await loginAction(email, password);
            localStorage.setItem('token', data.token);
            set({ user: data.user, token: data.token });
            toast.error('Bienvenido!', { description: 'Has iniciado sesión correctamente!' });
            set({ status: 'authenticated' });
            return true;

        } catch (error) {
            console.log(error);
            set({ user: null, token: null });
            localStorage.removeItem('token');
            toast.error('Correo y/o contraseña no válidos!!!', { description: 'Intente nuevamente!' });
            set({ status: 'not-authenticated' });
            return false;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
        toast.error('Hasta luego!', { description: 'Has cerrado sesión correctamente!' });
        set({ status: 'not-authenticated' });
    }
}));
