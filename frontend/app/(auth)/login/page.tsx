'use client'
import { useAuthStore } from '@/features/auth/authStore';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'


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