import React from "react";
import FormAuth from "../../components/form/FormAuth";
import { useWeb3 } from "../../context/Web3Context";
import { Wallet, Hexagon } from "lucide-react";

const LoginView = () => {
  const { account, isConnected, connectWallet } = useWeb3();

  return (
    <div className="min-h-screen bg-utama flex items-center justify-center py-20">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="relative w-full max-w-sm mx-auto px-4">
        <div className="text-center mb-8">
          <Hexagon className="w-6 h-6 text-yellow-500/40 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-white">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1">Login to continue</p>
        </div>

        <div className="glass-card rounded-2xl p-6">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="w-full flex items-center justify-center gap-2.5 bg-yellow-500 text-utama font-semibold px-5 py-3 rounded-xl hover:bg-yellow-400 transition-all duration-200 cursor-pointer"
            >
              <Wallet className="w-4 h-4" />
              Connect Wallet
            </button>
          ) : (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 text-green-400 text-xs mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                Wallet Connected
              </div>
              <p className="text-xs text-gray-500 font-mono break-all mb-4">{account}</p>
              <FormAuth />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginView;
