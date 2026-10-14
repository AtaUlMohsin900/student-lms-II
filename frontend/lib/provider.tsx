'use client';

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast';
import { usePathname } from "next/navigation";



export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000,
                        retry: 1,
                    }
                }
            })
    )
    return (
        <QueryClientProvider client={queryClient}>

            <LayoutWrapper>
                {children}
            </LayoutWrapper>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363625',
                        color: '#fff'
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff'
                        }
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff'
                        }
                    }
                }}
            />

            <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
        </QueryClientProvider>

    )

}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathName = usePathname();
    const isAdminRoute = pathName?.startsWith('/admin')
    const isStudentRoute = pathName?.startsWith('/student')
    const isInstructorRoute = pathName?.startsWith('/instructor')

    if (isAdminRoute || isStudentRoute || isInstructorRoute) {
        return <>{children}</>
    }
    return (
        <>
            {children}
        </>
    )
}

