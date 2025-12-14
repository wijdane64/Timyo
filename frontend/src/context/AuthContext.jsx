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
    const [token, setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Derived from token presence + user fetch
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = user?.role === 'admin';

    const setTokenAndStorage = (newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem('ACCESS_TOKEN', newToken);
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const checkAuth = async () => {
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            // Token is injected via interceptor (we will add it next)
            const { data } = await axiosClient.get('/user');
            setUser(data);
            setIsAuthenticated(true);
        } catch (error) {
            setTokenAndStorage(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        // No need for csrf-cookie
        const { data } = await axiosClient.post('/login', { email, password });
        setUser(data.user);
        setTokenAndStorage(data.token);
    };

    const register = async (name, email, password, password_confirmation) => {
        // No need for csrf-cookie
        const { data } = await axiosClient.post('/register', { name, email, password, password_confirmation });
        setUser(data.user);
        setTokenAndStorage(data.token);
    };

    const logout = async () => {
        try {
            await axiosClient.post('/logout');
        } catch (e) {
            // ignore error
        }
        setTokenAndStorage(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isAdmin, login, register, logout, checkAuth, isLoading, token }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
