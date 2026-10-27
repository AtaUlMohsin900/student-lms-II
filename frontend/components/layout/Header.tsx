import { ROLE_DASHBOARD_MAPPING, USER_ROLES_CONFIG, NAV_LINKS } from '@/constants';
import { useAuthStore } from '@/features/auth/authStore';
import { BookOpen, GraduationCap, Info, Mail, Shield, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, isAuthenticated, authChecked } = useAuthStore();
    const pathName = usePathname();

    const getDashboardLink = () => {
        if (!user) return '/login';
        return ROLE_DASHBOARD_MAPPING[user.role] || '/login';
    };

    const getRoleLabel = () => {
        if (!user) return '';
        const role = USER_ROLES_CONFIG.find((r) => r.value === user.role);
        return role ? role.label : '';
    };

    const isActive = (href: string) =>
        pathName === href || (href !== '/' && pathName?.startsWith(href + '/'));

    return (
        <header className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center space-x-2.5 group">
                        <div className="w-9 h-9 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-200">
                            <GraduationCap className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                            LearnHub
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const active = isActive(link.href);
                            const Icon =
                                link.href === '/courses' ? BookOpen :
                                    link.href === '/about' ? Info :
                                        link.href === '/contact' ? Mail : null;

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${active
                                        ? 'text-blue-600 bg-blue-100'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className='hidden md: flex items-center gap-3'>
                        {authChecked && !isAuthenticated && (
                            <Link
                                href='/signup?role=instructor'
                            >

                                <Button variant='ghost' size='sm' className=' Otext-purple-600 hover: text-purple-700 hover:bg-purple-50'>

                                    Become an Instructor
                                </Button>
                            </Link>

                        )}

                        {authChecked && isAuthenticated ? (
                            <div className='flex items-center gap-3 pl-3 border-l bordr-gray-200'>
                                <div className='flex items-center gap-2.5'>
                                    <div className='w-9 h-9 rounded-full flex items-center justify-center bg-linear-to-br from-gray-100 Ito-gray-200'>
                                        {user?.role === 'super_admin' ? (
                                            <Shield className='w-4 h-4 text-gray-600 /> 
                                        ):user?.role === 'instructor'  ? (
                                        <BookOpen className=' w-4 h-4 text-purple-600' />
                                        ):  (
                                        <User className='w-4 h-4 text-blue-600' />
                                        )}
                                    </div>
                                    <div>

                                    </div>

                                    ) : (

                     )}

                                </div>
                            </div>
                </div>
                </header>
                );
}

                export default Header;