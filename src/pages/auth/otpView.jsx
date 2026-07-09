import React, { useEffect, useState } from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';
import { KeyRound, Shield } from 'lucide-react';
import { t } from '../../i18n';

const OTPView = () => {
  const [isExpired, setIsExpired] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpired(true);
      toast.error(t('toast.otpExpired'));
    }, 120000);
    return () => clearTimeout(timer);
  }, []);

  const handleVerifyOtp = async (data) => {
    if (isExpired) {
      toast.error(t('toast.otpExpired'));
      return;
    }

    try {
      const response = await customAPI.post('/user/verify-otp', { email: data.email, otp: data.otp });

      if (response.status === 200) {
        const userData = response.data.user;
        if (userData && userData.id) {
          dispatch(loginUser({ data: userData }));
          login(userData);
        }
        toast.success(t('toast.otpVerifySuccess'));
        navigate('/');
      } else {
        toast.error(t('toast.invalidData'));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || t('toast.otpFailed'));
    }
  };

  return (
    <div className="min-h-screen bg-utama flex items-center justify-center py-20 relative overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="hero-glow top-1/3 -left-48 w-[500px] h-[500px]" />
      <div className="hero-glow-yellow bottom-1/3 -right-48 w-[500px] h-[500px]" />

      <div className="relative w-full max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tombol/20 via-purple-500/10 to-tombol/5 flex items-center justify-center mx-auto mb-4 relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-tombol/20 to-purple-500/20 blur-xl animate-pulse-glow" />
            <KeyRound className="w-7 h-7 text-tombol relative z-10" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">{t("auth.verifyHeader")}</h1>
          <p className="text-sm text-gray-500 mt-2">{t("auth.enterOtp")}</p>
        </div>

        <div className="glass-card rounded-3xl p-8 neon-border relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tombol/30 to-transparent" />
          {!isExpired && (
            <div className="w-full bg-white/5 rounded-2xl p-3 mb-5 border border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{t("auth.otpTimer")}</span>
                <span className="text-xs text-tombol font-mono">2:00</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-tombol to-purple-500 rounded-full animate-pulse-glow" style={{ width: '100%' }} />
              </div>
            </div>
          )}
          {isExpired && (
            <div className="w-full bg-red-500/10 rounded-2xl p-3 mb-5 border border-red-500/20">
              <p className="text-xs text-red-400 text-center">{t("auth.otpExpired")}</p>
            </div>
          )}
          <FormAuth isOtp={true} onSubmit={handleVerifyOtp} isExpired={isExpired} />
        </div>
      </div>
    </div>
  );
};

export default OTPView;