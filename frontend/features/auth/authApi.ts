import api from "@/lib/api";
import { AuthResponse, LoginData, InstructorApplicationData, SignupData } from "@/lib/types";
import axios from "axios";


const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const authApiInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export const authApi = {
    login: async (data: LoginData): Promise<Response> => {
        const response = await authApiInstance.post('/auth/login', data)
        return response.data;
    },
    signup: async (data: SignupData): Promise<Response> => {
        const response = await authApiInstance.post('/auth/signup', data)
        return response.data;
    },
    googleLogin: async (role?: 'student' | 'instructor'):
        Promise<void> => {
        const url = role ?
            `${API_BASE_URL}/auth/google?role={role}` : `{API_BASE_URL}/auth/google`
        window.location.href = url;
    },
    getCurrentUser: async (): Promise<AuthResponse> => {
        const response = await api.get('/auth/me');
        return response.data
    },
    logout: async (): Promise<void> => {
        await api.post('/auth/logout')
    },
    // Apply instructor Role

    applyInstructor: async (data: InstructorApplicationData): Promise<AuthResponse> => {
        const response = await api.post('/auth/apply-instructor', data);
        return response.data;
    }

}