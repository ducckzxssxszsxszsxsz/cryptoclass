import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/userSlice';

const RegisterView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (data) => {
    try {
      const response = await customAPI.post('/user/register', data);
      if (response.data.user) {
        dispatch(registerUser({ data: response.data.user }));
      }
      toast.success(response.data.message || 'Registrasi berhasil');
      navigate('/otp');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || 'Registrasi gagal';
      toast.error(errorMessage);
    }
  };

  return (
    <main>
      <FormAuth isRegister={true} onSubmit={handleRegister} />
    </main>
  );
};

export default RegisterView;
