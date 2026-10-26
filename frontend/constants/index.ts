import { UserRole } from '@/lib/types';

export const USER_ROLES_CONFIG = [
    { value: 'student', label: 'Student' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
] as const;

export const PRICE_FILTER_OPTIONS = [
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },

];

export const ANALYTICS_PERIODS = [
    { value: 'all', label: 'Last 90 Days' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' },
];
export const NAV_LINKS = [
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
];

export const ROLE_DASHBOARD_MAPPING: Record<string, string> = {
    super_admin: '/admin/dashboard',
    instructor: '/instructor/dashboard',
    student: '/student/dashboard',

};

export const COURSE_STATUS = {
    DRAFT: 'draft',
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
};