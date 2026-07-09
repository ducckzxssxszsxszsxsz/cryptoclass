import React from 'react';
import { useInAppWallet } from '../context/InAppWalletContext';
import WalletDashboard from './wallet/WalletDashboard';
import { Wallet } from 'lucide-react';

const WalletButton = () => {
  const { isConnected, wallet, networkConfig, showWalletModal, setShowWalletModal, shortenAddress } = useInAppWallet();

  if (!isConnected) {
    return (
      <>
        <button
          onClick={() => setShowWalletModal(true)}
          className="inline-flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-xl btn-gradient text-white font-medium shadow-lg shadow-tombol/20 transition-all"
        >
          <Wallet className="w-3.5 h-3.5" />
          Wallet
        </button>
        {showWalletModal && <WalletDashboard onClose={() => setShowWalletModal(false)} />}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowWalletModal(true)}
        className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-xl border border-tombol/20 hover:bg-white/5 transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
        <span className="text-white font-mono text-xs">{shortenAddress(wallet.address)}</span>
      </button>
      {showWalletModal && <WalletDashboard onClose={() => setShowWalletModal(false)} />}
    </>
  );
};

export default WalletButton;
