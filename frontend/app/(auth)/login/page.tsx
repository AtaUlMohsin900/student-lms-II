'use client'
import { authApi } from '@/features/auth/authApi';
import { useAuthStore } from '@/features/auth/authStore';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast';


function LoginContent() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const router = useRouter();
    const searchParams = useSearchParams();
    const { setUser, setToken, isAuthenticated, user, authChecked } = useAuthStore();
    const redirectTo = searchParams.get('redirect');

    useEffect(() => {
        if (!authChecked) {
            return;
        }

        if (isAuthenticated && user) {
            if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
                router.push(redirectTo);

            } else if (user.role === 'instructor') {
                router.push('/instructor/dashboard')
            } else if (user.role === 'student') {
                router.push('/instructor/dashboard')
            }
            else if (user.role === 'super_admin') {
                router.push('/admin/dashboard')
            }

        }
    }, [authChecked, isAuthenticated, user, router, redirectTo])

    const loginMutation = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            if (data.success) {
                if (data.data.user.role === 'super_admin') {
                    toast.error('Please use the admin login page for administration access')
                    return;
                }
                toast.success('Login successfully! Welecom back.')
                setUser(data.data.user)
                setToken(data.data.token)
                localStorage.setItem('token', data.data.token);

                const redirect = searchParams.get('redirect')
                if (redirectTo && redirectTo.startsWith('/') && !redirectTo.startsWith('//')) {
                    router.push(redirectTo);

                } else if (data.data.user.role === 'instructor') {
                    router.push('/instructor/dashboard')
                } else if (data.data.user.role === 'student') {
                    router.push('/instructor/dashboard')
                } else {
                    router.push('/')
                }
            }
        },
        onError: (error: any) => {
            const errorMessage = error.response.data?.message || 'Login failed please try again'
            toast.error(errorMessage)
            setErrors({ general: errorMessage })
        }
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: { [key: string]: string } = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        toast.loading('Signing in ...', { id: 'login' })
        loginMutation.mutate(formData);

        try {
            await loginMutation.mutateAsync(formData);
        } catch (error) {
            // Error handled in onError callback
        }
    }


    return (
        <div>

        </div>
    )
}

const page = () => {
    return (
        <Suspense fallback={
            <div className='min-h-screen flex item-center justify-center bg-gray-50'>
                <p className='text-gray-600'>Loading...</p>
            </div>
        }>
            <LoginContent />

        </Suspense>
    )
}

export default page
