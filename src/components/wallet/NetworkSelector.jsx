import React, { useState } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import { Check, ChevronDown } from 'lucide-react';

const NetworkSelector = () => {
  const { activeChain, switchNetwork, WalletService } = useInAppWallet();
  const [open, setOpen] = useState(false);

  const networks = WalletService.getNetworks();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-tombol/30 transition-all bg-white/5"
      >
        <span className={`w-1.5 h-1.5 rounded-full ${activeChain === 1 ? 'bg-green-400' : 'bg-yellow-400'}`} />
        {networks[Object.keys(networks).find(k => networks[k].chainId === activeChain)]?.name || 'Unknown'}
        <ChevronDown className="w-3 h-3 text-gray-500" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-1 w-48 rounded-xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden animate-in">
            <div className="p-1.5 space-y-0.5">
              {Object.entries(networks).map(([key, net]) => (
                <button
                  key={key}
                  onClick={() => { switchNetwork(net.chainId); setOpen(false); }}
                  className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-xs transition-all ${
                    activeChain === net.chainId
                      ? 'text-tombol bg-tombol/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${net.chainId === 1 ? 'bg-green-400' : 'bg-yellow-400'}`} />
                  <span className="flex-1 text-left">{net.name}</span>
                  {activeChain === net.chainId && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NetworkSelector;
