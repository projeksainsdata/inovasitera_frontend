import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import OverlaySpinner from '@/components/Loading/OverlayLoading';
interface PrivateRouteProps {
    children: React.ReactNode;
    role?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
    const auth = useAuth();
    const location = useLocation();




    if (auth?.isLoading) {
        return <OverlaySpinner show />;
    }

    if (!auth?.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (role && role.length > 0) {
        const hasRole = role.includes(auth?.user?.role || '');
        if (!hasRole) {
            // redirect to before page if user does not have role
            return <Navigate to="/" />;
        }
    }
    return <>{children}</>;
};