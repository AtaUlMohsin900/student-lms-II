import { User } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";





interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    authChecked: boolean;

}

interface AuthAction {
    setUser: (user: User) => void;
    setToken: (token: string) => void;
    logout: () => void;
    setLoading: (loading: boolean) => void;
    setAuthChecked: (checked: boolean) => void;
}

export const useAuthStore = create<AuthState & AuthAction>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            authChecked: false,

            setToken: (token) => set({ token }),
            setUser: (user) =>
                set({
                    user,
                    isAuthenticated: true
                }),
            logout: () => set({ user: null, token: null, isAuthenticated: false }),
            setLoading: (isLoading) => set({ isLoading }),
            setAuthChecked: (authChecked) => set({ authChecked })


        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated })
        }
    )

);
export const clearAuthState = () => {
    useAuthStore.getState().logout();
    useAuthStore.getState().setAuthChecked(true);
    if (typeof window !== undefined) {
        localStorage.removeItem('token');
        localStorage.removeItem('auth-storage')
    }
}