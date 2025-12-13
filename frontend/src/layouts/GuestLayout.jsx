import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestLayout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
                <Outlet />
            </div>
        </div>
    );
}
