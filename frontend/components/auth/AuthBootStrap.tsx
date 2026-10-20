import { authApi } from "@/features/auth/authApi";
import { clearAuthState, useAuthStore } from "@/features/auth/authStore";
import { useEffect } from "react";

export default function AuthBootStrap() {
    const { token, setUser, setToken, setLoading, setAuthChecked } = useAuthStore()

    useEffect(() => {
        const vailidateSession = async () => {
            const persistedtoken = typeof window !== 'undefined' ? localStorage.getItem('token') || token : token;
            if (!persistedtoken) {
                clearAuthState()
                return;
            }

            setLoading(true);
            try {
                const response = await authApi.getCurrentUser();
                setToken(persistedtoken);
                setUser(response.data.user);
                setAuthChecked(true);
            } catch (error) {
                clearAuthState();


            } finally {
                setLoading(false);
            }
        };
        void vailidateSession();
    }, [setAuthChecked, setLoading, setToken, setUser, token])
    return null;
}
