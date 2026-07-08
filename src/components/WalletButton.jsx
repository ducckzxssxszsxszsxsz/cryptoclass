import React, { useState, useRef, useEffect } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { Copy, ExternalLink, LogOut, Wallet } from 'lucide-react';
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
        className="inline-flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-xl bg-yellow-500 text-utama font-medium hover:bg-yellow-400 transition-all disabled:opacity-50"
      >
        <Wallet className="w-3.5 h-3.5" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm px-3.5 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition-all"
      >
        <span className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-white font-mono text-xs">{shortenAddress(account)}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl z-50 animate-in overflow-hidden">
          <div className="p-3.5 border-b border-white/5">
            <p className="text-xs text-gray-500 font-mono break-all">{account}</p>
            <p className="text-xs text-gray-500 mt-1.5">{parseFloat(balance).toFixed(4)} ETH</p>
            <p className="text-xs text-yellow-400 mt-1">{chainName}</p>
          </div>
          <div className="p-1.5">
            {[
              { icon: Copy, label: 'Copy Address', action: () => { navigator.clipboard.writeText(account); toast.success('Copied!'); } },
              { icon: ExternalLink, label: 'Etherscan', action: () => window.open(`https://etherscan.io/address/${account}`, '_blank') },
              { icon: LogOut, label: 'Disconnect', action: () => { disconnectWallet(); setOpen(false); }, red: true },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm transition-all ${
                  item.red ? 'text-red-400 hover:bg-red-500/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
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
