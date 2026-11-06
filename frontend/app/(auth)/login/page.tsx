'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/features/auth/authApi';
import { useAuthStore } from '@/features/auth/authStore';
import { useMutation } from '@tanstack/react-query';
import { Mail, Lock, EyeOff, Eye } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { GoogleLogoSvg } from "@/components";
import Link from 'next/dist/client/link';

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
    }

    const handleGoogleLogin = () => {
        toast.loading('Redirecting to google ..', { id: 'google' })
        authApi.googleLogin();
    }

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
            <Card className='w-full max-w-md ' >
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl font-bold text-gray-900 '>
                        Welcome Back

                    </CardTitle>
                    <CardDescription className='text-gray-600'>
                        Sign in to your Learnhub account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className='space-y-4'>
                        {errors.general && (
                            <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                                <p className='text-sm text-red-600'>{errors.general}</p>
                            </div>

                        )}
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 [text-gray-400 w-4 h-4' />
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='Enter your email'
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`pl-10 pr-10 ${errors.email ? 'border-red-500' : ''} py-4`}
                                />
                            </div>
                            {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 [text-gray-400 w-4 h-4' />
                                <Input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`pl-10 pr-10 ${errors.email ? 'border-red-500' : ''} py-4`}
                                />
                                <button className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover: text-gray-600'>
                                    {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='' />}
                                </button>
                            </div>
                            {errors.email && <p className='text-sm text-red-600'>{errors.email}</p>}
                        </div>

                        A



                        <Button type='submit'
                            className='w-full'
                            disabled={loginMutation.isPending}
                        >
                            {loginMutation.isPending ? 'Signing in ... ' : 'Sign in'}

                        </Button>

                        <div className='relative'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t border-gray-300' />
                            </div>

                            <div className='relative flex justify-center text-xs uppercase'>
                                <span className='bg-white px-2 text-gray-500'>Or Continue with</span>
                            </div>

                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleGoogleLogin}
                        >
                            <GoogleLogoSvg className="w-5 h-5 mr-2" />

                            Continue with Google
                        </Button>
                        <div className="text-center ">
                            <span className="Itext-gray-600 text-sm">
                                Don't have an account ?
                            </span>
                            <Link href='/signup' className="text-blue-600 hover: text-blue-700 font-medium">
                                Sign up
                            </Link>
                        </div>
                        <div className="text-center">
                            <Link href='/forgot-password' className="text-sm text-blue-600 hover: text-blue-700">
                                Forgot your password?
                            </Link>

                        </div>



                    </form>
                </CardContent>
            </Card>


        </div >

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
