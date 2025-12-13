import { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isAdmin: false,
    login: () => { },
    register: () => { },
    logout: () => { },
    checkAuth: () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = user?.role === 'admin';

    const checkAuth = async () => {
        try {
            const { data } = await axiosClient.get('/user');
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        await axiosClient.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' });
        await axiosClient.post('/login', { email, password });
        await checkAuth();
    };

    const register = async (name, email, password, password_confirmation) => {
        await axiosClient.get('/sanctum/csrf-cookie', { baseURL: 'http://localhost:8000' });
        await axiosClient.post('/register', { name, email, password, password_confirmation });
        await checkAuth();
    };

    const logout = async () => {
        await axiosClient.post('/logout');
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, checkAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
