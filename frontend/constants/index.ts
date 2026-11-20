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
    FEATURED_COURSES: {
        TITLE: 'Featured Courses',
        SUBTITLE: 'Explore top-rated courses picked for you',
    },
    CATEGORIES: {
        TITLE: 'Explore Categories',
        SUBTITLE: 'Find the right topic to boost your career',
    },
    TESTIMONIALS: {
        TITLE: 'What Our Students Say',
        SUBTITLE: 'Hear from learners who transformed their careers with our courses',
        CTA_TITLE: 'Ready to Start Your Learning Journey?',
        CTA_SUBTITLE: 'Join thousands of students and begin learning from top instructors today.',
        CTA_PRIMARY: 'Get Started for Free',
        CTA_SECONDARY: 'Browse All Courses',
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

export const TESTIMONIALS = [
    {
        id: '1',
        name: 'Sarah Johnson',
        role: 'Full Stack Developer',
        course: 'Full Stack Web Development Bootcamp',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        content: 'The courses on Learnhub helped me transition from a junior role to a senior developer in just 6 months. The hands-on projects were incredible!',
        rating: 5,
    },
    {
        id: '2',
        name: 'Alex Rivera',
        role: 'UI/UX Designer',
        course: 'Complete UI/UX Design Masterclass',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        content: 'High-quality instructors and structured curriculum. I gained real-world design skills that immediately helped me land freelance clients.',
        rating: 5,
    },
    {
        id: '3',
        name: 'Emily Chen',
        role: 'Data Scientist',
        course: 'Data Science & Machine Learning A-Z',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        content: 'The best investment in my learning journey. The community support and instructor feedback made complex ML topics easy to understand.',
        rating: 5,
    },
];