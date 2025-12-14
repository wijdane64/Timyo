import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function GuestLayout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8 dark:from-gray-900 dark:to-gray-800">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-white/80 backdrop-blur-lg p-8 shadow-xl border border-white/20 dark:bg-gray-800/80 dark:border-gray-700">
                <Outlet />
            </div>
        </div>
    );
}
