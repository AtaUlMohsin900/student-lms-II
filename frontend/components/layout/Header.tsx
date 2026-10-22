import { ROLE_DASHBOARD_MAPPING, USER_ROLES_CONFIG } from '@/constants';
import { useAuthStore } from '@/features/auth/authStore';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';


function Header() {
    const [isMenuOpen, setIsMenuOpen,] = useState(false);
    const { user, isAuthenticated, authChecked } = useAuthStore();
    const pathName = usePathname();

    const getDashboardLink = () => {
        if (!user) return '/login';
        return ROLE_DASHBOARD_MAPPING[user.role] || '/login';
    }

    const getRoleLabel = () => {
        if (!user) return '';
        const role = USER_ROLES_CONFIG.find((r) => r.value === user.role);
        return role ? role.label : user.role;
    }
    return (
        <div>Header</div>
    )
}

export default Header

