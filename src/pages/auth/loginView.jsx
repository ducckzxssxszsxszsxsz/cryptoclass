import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/userSlice';
import { useAuth } from '../../context/AuthContext';
import { useWeb3 } from '../../context/Web3Context';
import { FiBarChart2, FiZap } from 'react-icons/fi';

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
      toast.error(error?.response?.data?.message || 'Login gagal');
    }
  };

  const handleWalletLogin = async () => {
    if (!isConnected) {
      await connectWallet();
      return;
    }
    try {
      const message = `ForexClass Auth\nWallet: ${account}\nTimestamp: ${Date.now()}`;
      const signature = await signMessage(message);
      if (!signature) return;
      const response = await customAPI.post('/user/wallet-login', {
        walletAddress: account, signature, message,
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
    <div className="min-h-screen flex items-center justify-center bg-utama">
      <div className="w-full max-w-sm mx-auto px-4 py-8 animate-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-xl font-bold gradient-text">
            <FiBarChart2 className="text-yellow-400" />
            ForexClass
          </Link>
          <p className="text-xs text-gray-500 mt-1">XAU/USD Specialist</p>
        </div>

        <div className="border border-white/10 rounded-xl p-6 mb-6">
          <div className="text-center">
            <FiBarChart2 className="text-3xl text-yellow-500/40 mx-auto mb-3" />
            <p className="text-sm text-gray-300 font-medium mb-1">Wallet Login</p>
            <p className="text-xs text-gray-500 mb-4">Connect MetaMask to sign in instantly</p>
            <button
              onClick={handleWalletLogin}
              className="w-full flex items-center justify-center gap-2 bg-yellow-500 text-utama font-medium py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
            >
              <FiZap />
              {isConnected ? `Sign with ${account.slice(0, 6)}...` : 'Connect MetaMask'}
            </button>
            {isConnected && (
              <p className="text-xs text-gray-600 mt-2">{account.slice(0, 6)}...{account.slice(-4)}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-white/5" />
          <span className="text-xs text-gray-600">or email</span>
          <div className="flex-1 h-px bg-white/5" />
        </div>

        <FormAuth isRegister={false} onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default LoginView;
