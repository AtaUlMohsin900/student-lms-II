
import { useAuthStore } from '@/features/auth/authStore';
import { Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect } from 'react'
import toast from 'react-hot-toast';

function AuthCallbackContext() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser, setToken, setAuthChecked } = useAuthStore()

    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (!token || !userStr) {
            toast.error('invalid callback, plaase try again')
            router.push('/login')
            return;
        }
        try {
            const user = JSON.parse(decodeURIComponent(userStr));
            setUser(user);
            setToken(token);
            setAuthChecked(true);
            localStorage.setItem('token', token);
            toast.success('Login successfully! Welcome back.')

            if (user.role === 'instructor') {
                router.push('/instructor/dashboard');
            } else if (user.role === 'student') {
                router.push('/instructor/dashboard');
            } else if (user.role === 'super_admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }

        } catch (error) {
            console.error('Auth callback error:', error)
            toast.error('failed to complete login. please try again')
            router.replace('/login')

        }
    }, [searchParams, router, setUser, setToken, setAuthChecked]);
    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50'>
            <div className="text-center">
                <Loader2 className="w-12 h-12 animate-pulse text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Completing sign in...</p>
            </div>
        </div>


    )
}


const page = () => {
    return (
        <Suspense fallback={
            <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50'>
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-pulse text-blue-600 mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        }>
            <AuthCallbackContext />
        </Suspense>
    )
}

export default page