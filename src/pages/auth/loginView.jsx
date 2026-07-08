import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';
import { useWeb3 } from '../../context/Web3Context';
import { FiHexagon, FiZap } from 'react-icons/fi';

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();
  const { account, isConnected, connectWallet, signMessage } = useWeb3();

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

  const handleWalletLogin = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }

    try {
      const message = `CryptoClass Authentication\nWallet: ${account}\nTimestamp: ${Date.now()}`;
      const signature = await signMessage(message);

      if (!signature) return;

      const response = await customAPI.post('/user/wallet-login', {
        walletAddress: account,
        signature,
        message,
      });

      const userData = response.data.user;
      if (userData && userData.id) {
        dispatch(loginUser({ data: userData }));
        login(userData);
        toast.success('Wallet login berhasil');
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Wallet login gagal');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-utama relative overflow-hidden">
      <div className="absolute inset-0 hex-grid opacity-10" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#06F8D0]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C3AED]/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-in">
          <Link to="/" className="inline-flex items-center gap-2 text-3xl font-extrabold bg-gradient-to-r from-[#06F8D0] via-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
            <FiHexagon className="text-[#06F8D0]" />
            CryptoClass
          </Link>
        </div>

        {/* Wallet Login */}
        <div className="glass-card rounded-2xl p-8 mb-6 animate-in">
          <div className="text-center">
            <FiHexagon className="text-5xl text-[#06F8D0]/40 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Web3 Login</h3>
            <p className="text-gray-400 text-sm mb-6">
              Connect your wallet to login instantly
            </p>
            <button
              onClick={handleWalletLogin}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
            >
              <FiZap />
              {isConnected ? `Sign with ${account.slice(0, 6)}...` : 'Connect Wallet'}
            </button>
            {isConnected && (
              <p className="text-xs text-gray-500 mt-3">
                Connected: {account.slice(0, 6)}...{account.slice(-4)}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-gray-500">or login with email</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <FormAuth isRegister={false} onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginView;
