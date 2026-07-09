import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser as reduxLogoutUser } from '../features/userSlice';
import { toast } from 'react-toastify';
import { t } from '../i18n';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState(() => {
        const userString = localStorage.getItem('user');
        return userString ? JSON.parse(userString) : null;
    });

    const login = (userData) => {
        if (!userData || !userData.id) {
            toast.error(t('toast.invalidData'));
            return;
        }

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch(loginUser({ data: userData }));
        toast.success(t('toast.loginSuccess'));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        dispatch(reduxLogoutUser());
        toast.success(t('toast.logoutSuccess'));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};