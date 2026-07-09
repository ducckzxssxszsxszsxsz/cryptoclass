import React from 'react';
import FormAuth from '../../components/form/FormAuth';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/userSlice';
import { useWeb3 } from '../../context/Web3Context';
import { Wallet, Hexagon, Shield, Zap, Globe, Diamond } from 'lucide-react';
import { t } from '../../i18n';

const RegisterView = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account, isConnected, connectWallet, connecting, hasMetaMask } = useWeb3();

  const handleRegister = async (data) => {
    try {
      const response = await customAPI.post('/user/register', data);
      if (response.data.user) {
        dispatch(registerUser({ data: response.data.user }));
      }
      toast.success(response.data.message || t('toast.registerSuccess'));
      navigate('/otp');
    } catch (error) {
      const errorMessage = error?.response?.data?.message || t('toast.error');
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-utama flex items-center justify-center py-20 relative overflow-hidden">
      <div className="dot-grid absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="hero-glow top-1/4 -left-48 w-[500px] h-[500px]" />
      <div className="hero-glow-yellow bottom-1/4 -right-48 w-[500px] h-[500px]" />

      <div className="relative w-full max-w-md mx-auto px-4">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tombol/20 via-purple-500/10 to-yellow-500/5 flex items-center justify-center mx-auto mb-4 relative group">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-tombol/20 to-purple-500/20 blur-xl animate-pulse-glow" />
            <Diamond className="w-7 h-7 text-tombol relative z-10" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">{t("auth.createHeader")}</h1>
          <p className="text-sm text-gray-500 mt-2">{t("auth.joinBootcamp")}</p>
        </div>

        <div className="glass-card rounded-3xl p-8 neon-border relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tombol/30 to-transparent" />

          {!isConnected ? (
            <div className="text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-500/15 to-purple-500/10 flex items-center justify-center mx-auto border border-yellow-500/20">
                <Wallet className="w-6 h-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{t("auth.connectPrompt")}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {hasMetaMask
                    ? t("auth.connectDescReg")
                    : t("auth.connectDescRegNoMM")}
                </p>
              </div>
              <button
                onClick={connectWallet}
                disabled={connecting}
                className="w-full flex items-center justify-center gap-2.5 btn-gradient text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-tombol/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
              >
                {connecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t("auth.connecting")}
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    {hasMetaMask ? t("auth.connectMM") : t("auth.installMM")}
                  </>
                )}
              </button>
              {!hasMetaMask && (
                <p className="text-xs text-gray-600">
                  <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-tombol hover:underline">
                    {t("auth.downloadMM")}
                  </a>
                </p>
              )}
              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <span className="text-xs text-gray-600">{t("auth.orContinue")}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
              <FormAuth isRegister={true} onSubmit={handleRegister} />
            </div>
          ) : (
            <div className="text-center space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-green-500/10 to-tombol/10 text-green-400 text-sm border border-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
                {t("auth.walletConnected")}
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-gray-500 mb-1">{t("auth.connectedAccount")}</p>
                <p className="text-sm text-white font-mono tracking-wide">{account}</p>
              </div>
              <div className="flex items-center gap-2 py-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tombol/20 to-transparent" />
                <Globe className="w-4 h-4 text-tombol" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-tombol/20 to-transparent" />
              </div>
              <FormAuth isRegister={true} onSubmit={handleRegister} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterView;