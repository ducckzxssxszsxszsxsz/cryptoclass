import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleLogin = async (data) => {
    try {
      const response = await customAPI.post('/user/login', data);
      const userData = response.data.user;

      if (userData && userData.id) {
        dispatch(loginUser({ data: userData }));
        login(userData);
        toast.success('Login berhasil');
        navigate('/');
      } else {
        toast.error('Data pengguna tidak valid.');
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Login gagal';
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <FormAuth isRegister={false} onSubmit={handleLogin} />
    </main>
  );
};

export default LoginView;
