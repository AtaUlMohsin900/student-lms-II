import { ROLE_DASHBOARD_MAPPING, USER_ROLES_CONFIG, NAV_LINKS } from '@/constants';
import { useAuthStore } from '@/features/auth/authStore';
import { BookOpen, GraduationCap, Info, Mail, Menu, Shield, User, X } from 'lucide-react';
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
                    <div className='hidden md:flex items-center gap-3'>
                        {authChecked && !isAuthenticated && (
                            <Link
                                href='/signup?role=instructor'
                            >

                                <Button variant='ghost' size='sm' className='text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-4'>
                                    Become an Instructor
                                </Button>
                            </Link>
                        )}

                        {authChecked && isAuthenticated ? (
                            <div className='flex items-center gap-3 pl-3 border-l border-gray-200'>
                                <div className='flex items-center gap-2.5'>
                                    <div className='w-9 h-9 rounded-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200'>
                                        {user?.role === 'super_admin' ? (
                                            <Shield className='w-4 h-4 text-gray-600' />
                                        ) : user?.role === "instructor" ? (
                                            <BookOpen className='w-4 h-4 text-purple-600' />
                                        ) : (
                                            <User className='w-4 h-4 text-blue-600' />
                                        )}
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className='text-xs font-medium text-gray-500'>{getRoleLabel()}</span>
                                        <span className='text-sm font-semibold text-gray-900 capitalize'>{user?.name}</span>
                                    </div>
                                    <Link href={getDashboardLink()}>
                                        <Button size='sm' variant='secondary' className='rounded-lg'>
                                            Dashboard
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>

                                <Button
                                    variant='outline'
                                    asChild
                                    className='rounded-lg px-4 py-4'
                                >
                                    <Link href='/login'>Sign in</Link>
                                </Button>


                                <Button variant='default' size='sm' className='rounded-lg'>
                                    <Link href='/signup'> Sign UP</Link>
                                </Button>

                            </div>
                        )}
                    </div>
                    <Button
                        variant='ghost'
                        size='icon'
                        className="md:hidden rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white">
                    <div className="px-4 py-4 space-y-1">
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
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${active
                                        ? 'text-blue-600 bg-blue-100'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    {link.name}
                                </Link>
                            );
                        })}




                        {authChecked && !isAuthenticated && (
                            <Link href="/signup?role=instructor"
                                className="flex items-center gap-2 px-4 py-3 rounded-xl text-base text-purple-600 hover:bg-purple-50"
                            >
                                <GraduationCap className="w-5 h-5" />
                                Become an Instructor

                            </Link>
                        )}
                        <div className='pt-4 mt-4 border-t border-gray-100'>
                            {authChecked && isAuthenticated ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                                            {user?.role === "super_admin" ? (
                                                <Shield className="w-4 h-4 @text-red-600" />
                                            ) : user?.role === "instructor" ? (
                                                <BookOpen className="w-4 h-4 textpurple-600" />
                                            ) : (
                                                <User className="w-4 h-4 text-blue-600" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 leading-tight">
                                                {user?.name}
                                            </p>
                                            <p className="text-xs Itext-gray-500">{getRoleLabel()}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                        className="rounded-lg"
                                    >
                                        <Link onClick={() => setIsMenuOpen(false)} href={getDashboardLink()}>Dashboard</Link>
                                    </Button>

                                </div>

                            ) : (
                                <div className='space-y-2'>

                                    <Button
                                        variant='outline'
                                        asChild
                                        className='rounded-lg w-full'
                                    >
                                        <Link onClick={() => setIsMenuOpen(false)} href="/login">Sign in</Link>
                                    </Button>


                                    <Button
                                        asChild
                                        className='w-full rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-4'
                                    >
                                        <Link onClick={() => setIsMenuOpen(false)} href='/signup'> Sign UP</Link>
                                    </Button>

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
            }
        </header >
    );
};

export default Header;