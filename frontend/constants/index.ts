import { UserRole } from '@/lib/types';

export const USER_ROLES_CONFIG = [
    { value: 'student', label: 'Student' },
    { value: 'instructor', label: 'Instructor' },
    { value: 'admin', label: 'Admin' },
    { value: 'super_admin', label: 'Super Admin' },
] as const;

export const ROLE_DASHBOARD_MAPPING: Record<UserRole, string> = {
    student: '/dashboard/student',
    instructor: '/dashboard/instructor',
    admin: '/dashboard/admin',
    super_admin: '/dashboard/super-admin',
};
