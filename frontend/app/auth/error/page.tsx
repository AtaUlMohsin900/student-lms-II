'use client';

import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { Suspense } from 'react';

function AuthErrorContext() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Authentication failed';
    return (
        <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50 p-4'>
            <div className='text-center max-w-md'>
                <AlertCircle className='w-16 h-16 text-red-500 mx-auto mb-4' />
                <h1 className='text-xl font-semibold text-gray-900 mb-2'>
                    Sign in Failed
                </h1>
                <p className='text-gray-600 mb-6'>
                    {decodeURIComponent(message)}
                </p>
                <Button asChild className='px-4 py-2'>
                    <Link href='/login'>Back to Login</Link>
                </Button>
            </div>
        </div>
    );
}

const page = () => {
    return (
        <Suspense fallback={
            <div className='min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-purple-50'>
                <p className="text-gray-600">Loading...</p>
            </div>
        }>
            <AuthErrorContext />
        </Suspense>
    );
};

export default page;
