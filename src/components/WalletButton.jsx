import React, { useState, useRef, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { FiWifi, FiCopy, FiExternalLink, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const WalletButton = () => {
  const { account, balance, chainName, connecting, isConnected, connectWallet, disconnectWallet, shortenAddress } = useWeb3();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      toast.success('Address copied!');
    }
  };

  const openExplorer = () => {
    if (account) {
      window.open(`https://etherscan.io/address/${account}`, '_blank');
    }
  };

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={connecting}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 disabled:opacity-50"
      >
        {connecting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Connecting...
          </>
        ) : (
          <>
            <FiWifi className="text-base" />
            Connect Wallet
          </>
        )}
      </button>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-yellow-500/20 hover:bg-white/10 transition-all duration-200"
      >
        <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
        <span className="text-sm font-mono text-white">{shortenAddress(account)}</span>
        <span className="text-xs text-yellow-400">
          {parseFloat(balance).toFixed(3)} ETH
        </span>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50 animate-in">
          <div className="p-4 border-b border-white/5">
            <p className="text-xs text-gray-400 mb-1">Connected Wallet</p>
            <p className="text-sm font-mono text-white">{account}</p>
            <p className="text-xs text-gray-500 mt-1">
              {parseFloat(balance).toFixed(4)} ETH
            </p>
            <p className="text-xs text-yellow-400 mt-1">{chainName}</p>
          </div>
          <div className="p-2">
            <button
              onClick={copyAddress}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <FiCopy /> Copy Address
            </button>
            <button
              onClick={openExplorer}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <FiExternalLink /> View on Etherscan
            </button>
            <button
              onClick={() => { disconnectWallet(); setShowDropdown(false); }}
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-all"
            >
              <FiLogOut /> Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
