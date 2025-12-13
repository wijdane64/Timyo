import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import GuestLayout from "./layouts/GuestLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import Dashboard from "./views/Dashboard";
import AdminDashboard from "./views/AdminDashboard";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const { isAuthenticated, isLoading, isAdmin } = useAuth();

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" />; // Redirect non-admins to user dashboard
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <DefaultLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/admin',
                element: (
                    <ProtectedRoute requireAdmin={true}>
                        <AdminDashboard />
                    </ProtectedRoute>
                )
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export default router;
