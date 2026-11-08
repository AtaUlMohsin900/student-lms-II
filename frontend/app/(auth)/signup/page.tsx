'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authApi } from '@/features/auth/authApi';
import { useAuthStore } from '@/features/auth/authStore';
import { useMutation } from '@tanstack/react-query';
import { Mail, Lock, EyeOff, Eye, User } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export function GoogleLogoSvg({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24">
            <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
        </svg>
    );
}

function SignupContent() {
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const roleFromUrl = searchParams.get('role');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: (roleFromUrl === 'instructor' ? 'instructor' : 'student') as 'student' | 'instructor'
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const router = useRouter();

    useEffect(() => {
        if (roleFromUrl === 'instructor') {
            setFormData((prev) => ({ ...prev, role: 'instructor' }));
        }
    }, [roleFromUrl]);

    const { setUser, setToken, isAuthenticated, user, authChecked } = useAuthStore();
    const [isRedirecting, setIsRedirecting] = useState(false);

    const signupMutation = useMutation({
        mutationFn: authApi.signup,
        onSuccess: (data) => {
            if (data.success) {
                toast.success('Account created successfully! Welcome to LMS');
                setUser(data.data.user);
                setToken(data.data.token);
                localStorage.setItem('token', data.data.token);

                setIsRedirecting(true);
                setTimeout(() => {
                    if (data.data.user.role === 'instructor') {
                        router.push('/instructor/onboarding');
                    } else {
                        router.push('/instructor/dashboard');
                    }
                }, 100);
            }
        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || 'Signup failed, please try again';
            toast.error(errorMessage);
            setErrors({ general: errorMessage });
        }
    });

    useEffect(() => {
        if (!authChecked || signupMutation.isPending || isRedirecting) {
            return;
        }

        if (isAuthenticated && user) {
            if (user.role === 'instructor') {
                router.push('/instructor/dashboard');
            } else if (user.role === 'student') {
                router.push('/instructor/dashboard');
            } else if (user.role === 'super_admin') {
                router.push('/admin/dashboard');
            }
        }
    }, [authChecked, isAuthenticated, user, router, signupMutation.isPending, isRedirecting]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const newErrors: { [key: string]: string } = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const { confirmPassword, ...signupData } = formData;
        toast.loading('Creating your account...', { id: 'signup' });
        signupMutation.mutate(signupData);
    };

    const handleGoogleLogin = () => {
        toast.loading('Redirecting to Google...', { id: 'google-signup' });
        authApi.googleLogin(formData.role);
    };

    return (
        <div className='min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4'>
            <Card className='w-full max-w-md'>
                <CardHeader className='text-center'>
                    <CardTitle className='text-2xl font-bold text-gray-900'>
                        Create Account
                    </CardTitle>
                    <CardDescription className='text-gray-600'>
                        Join LMS and start your journey
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
                            <Label htmlFor='name'>Name</Label>
                            <div className='relative'>
                                <User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='Enter your name'
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className={`pl-10 pr-10 ${errors.name ? 'border-red-500' : ''} py-4`}
                                />
                            </div>
                            {errors.name && <p className='text-sm text-red-600'>{errors.name}</p>}
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor='email'>Email</Label>
                            <div className='relative'>
                                <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
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

                        <div className="space-y-2">
                            <Label>I want to join as</Label>
                            <RadioGroup
                                value={formData.role}
                                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value as 'student' | 'instructor' }))}
                                className="flex space-x-4"
                            >
                                <div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    onClick={() => setFormData((prev) => ({ ...prev, role: 'student' }))}
                                >
                                    <RadioGroupItem value="student" id="student" />
                                    <Label htmlFor="student" className="cursor-pointer">Student</Label>
                                </div>
                                <div
                                    className="flex items-center space-x-2 cursor-pointer"
                                    onClick={() => setFormData((prev) => ({ ...prev, role: 'instructor' }))}
                                >
                                    <RadioGroupItem value="instructor" id="instructor" />
                                    <Label htmlFor="instructor" className="cursor-pointer">Instructor</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='password'>Password</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                <Input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter your password'
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''} py-4`}
                                />
                                <button
                                    type='button'
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600'
                                >
                                    {showPassword ? <EyeOff className='w-4 h-4' /> : <Eye className='w-4 h-4' />}
                                </button>
                            </div>
                            {errors.password && <p className='text-sm text-red-600'>{errors.password}</p>}
                        </div>

                        <div className='space-y-2'>
                            <Label htmlFor='confirmPassword'>Confirm Password</Label>
                            <div className='relative'>
                                <Lock className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
                                <Input
                                    id='confirmPassword'
                                    type='password'
                                    placeholder='Confirm your password'
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''} py-4`}
                                />
                            </div>
                            {errors.confirmPassword && <p className='text-sm text-red-600'>{errors.confirmPassword}</p>}
                        </div>

                        <Button
                            type='submit'
                            className='w-full'
                            disabled={signupMutation.isPending}
                        >
                            {signupMutation.isPending ? 'Signing up...' : 'Sign up'}
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

                        <div className="text-center">
                            <span className="text-gray-600 text-sm">
                                Already have an account?
                            </span>
                            <Link href='/login' className="text-blue-600 hover:text-blue-700 font-medium ml-1">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

const page = () => {
    return (
        <Suspense fallback={
            <div className='min-h-screen flex items-center justify-center bg-gray-50'>
                <p className='text-gray-600'>Loading...</p>
            </div>
        }>
            <SignupContent />
        </Suspense>
    );
};

export default page;
