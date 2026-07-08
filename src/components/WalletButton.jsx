import React, { useState, useRef, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { FiCopy, FiExternalLink, FiLogOut } from 'react-icons/fi';
import { toast } from 'react-toastify';

const WalletButton = () => {
  const { account, balance, chainName, connecting, isConnected, connectWallet, disconnectWallet, shortenAddress } = useWeb3();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!isConnected) {
    return (
      <button
        onClick={connectWallet}
        disabled={connecting}
        className="text-sm px-3.5 py-2 rounded-lg bg-yellow-500 text-utama font-medium hover:bg-yellow-400 transition-colors disabled:opacity-50"
      >
        {connecting ? 'Connecting...' : 'Connect'}
      </button>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm px-3 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        <span className="text-white font-mono">{shortenAddress(account)}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1.5 w-56 rounded-lg border border-white/10 bg-kempat shadow-lg z-50 animate-in">
          <div className="p-3 border-b border-white/5">
            <p className="text-xs text-gray-500 font-mono break-all">{account}</p>
            <p className="text-xs text-gray-500 mt-1">{parseFloat(balance).toFixed(4)} ETH</p>
            <p className="text-xs text-yellow-400 mt-0.5">{chainName}</p>
          </div>
          <div className="p-1">
            {[
              { icon: FiCopy, label: 'Copy Address', action: () => { navigator.clipboard.writeText(account); toast.success('Copied!'); } },
              { icon: FiExternalLink, label: 'Etherscan', action: () => window.open(`https://etherscan.io/address/${account}`, '_blank') },
              { icon: FiLogOut, label: 'Disconnect', action: () => { disconnectWallet(); setOpen(false); }, red: true },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded text-sm transition-colors ${
                  item.red ? 'text-red-400 hover:bg-white/5' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="text-sm" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;
