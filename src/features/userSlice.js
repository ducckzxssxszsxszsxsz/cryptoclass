import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { t } from '../i18n';

const getInitialUser = () => {
    const userString = localStorage.getItem('user');
    if (!userString || userString === 'undefined') {
        localStorage.removeItem('user');
        return null;
    }

    try {
        return JSON.parse(userString);
    } catch (error) {
        console.error('Error parsing user from localStorage:', error);
        localStorage.removeItem('user');
        return null;
    }
};

const initialState = {
    user: getInitialUser(),
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            const user = action.payload.data;
            if (user && user.id) {
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                toast.success(t('toast.loginSuccess'));
            } else {
                toast.error(t('toast.invalidData'));
            }
        },
        registerUser: (state, action) => {
            const user = action.payload.data;
            if (user && user.id) {
                state.user = user;
                localStorage.setItem('user', JSON.stringify(user));
                toast.success(t('toast.registerSuccess'));
            } else {
                toast.error(t('toast.invalidData'));
            }
        },
        logoutUser: (state) => {
            const userId = state.user?.id;
            state.user = null;
            localStorage.removeItem('user');
            if (userId) {
                localStorage.removeItem(`cart_${userId}`);
            }
            toast.success(t('toast.logoutSuccess'));
        },
    },
});

export const { loginUser, registerUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;