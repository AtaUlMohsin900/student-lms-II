import { UserRole } from '@/lib/types';
import { Users, BookOpen, Award } from 'lucide-react';

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

export const SECTION_CONTENT = {
    HERO: {
        TITLE_START: 'Master New Skills with ',
        TITLE_HIGHLIGHT: 'Expert-Led Online Courses',
        TITLE_END: 'Anywhere, Anytime',
        SUBTITLE: 'Advance your career with industry-recognized courses taught by expert instructors.',
        DESCRIPTION: 'Advance your career with industry-recognized courses taught by expert instructors.',
        CTA_EXPLORE: 'Explore Courses',
        CTA_GET_STARTED: 'Get Started',
        RATING: '4.9/5 from over 10,000+ reviews',
    },
};

export const HERO_STATS = [
    {
        icon: Users,
        value: '10K+',
        label: 'Active Students',
    },
    {
        icon: BookOpen,
        value: '500+',
        label: 'Quality Courses',
    },
    {
        icon: Award,
        value: '99%',
        label: 'Success Rate',
    },
];