import { Link, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function DefaultLayout() {
    const { user, logout, isAuthenticated, isLoading } = useAuth();

    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/login" />
    }

    const onLogout = async (ev) => {
        ev.preventDefault();
        await logout();
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                                <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">Timyo</Link>
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                                <Link to="/" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                                    Dashboard
                                </Link>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white">
                                        Admin
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <div className="relative ml-3">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user?.name}
                                    </span>
                                    <button
                                        onClick={onLogout}
                                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:hover:bg-gray-600"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <header>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white">
                            {user?.role === 'admin' ? 'Admin Dashboard' : 'My Appointments'}
                        </h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
