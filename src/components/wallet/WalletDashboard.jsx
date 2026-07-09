import React, { useState } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import NetworkSelector from './NetworkSelector';
import SendModal from './SendModal';
import ReceiveModal from './ReceiveModal';
import ImportWallet from './ImportWallet';
import CreateWallet from './CreateWallet';
import {
  X, Send, Download, Copy, Check, ExternalLink, LogOut,
  ArrowUpRight, History, Plus, RefreshCw, Wallet,
} from 'lucide-react';
import { toast } from 'react-toastify';

const WalletDashboard = ({ onClose }) => {
  const {
    wallet, balances, activeChain, networkConfig, txHistory, loading,
    isConnected, disconnectWallet, refreshBalance, shortenAddress, clearHistory,
  } = useInAppWallet();

  const [view, setView] = useState(isConnected ? 'wallet' : 'landing');
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);

  const balance = balances[activeChain] || '0';
  const recentTxs = txHistory.slice(0, showFullHistory ? txHistory.length : 3);

  const handleCopy = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const openExplorer = () => {
    window.open(`${networkConfig.explorer}/address/${wallet?.address}`, '_blank');
  };

  if (!isConnected) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Wallet</h3>
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-6 space-y-3">
            <div className="text-center mb-2">
              <div className="w-14 h-14 rounded-full bg-tombol/10 flex items-center justify-center mx-auto mb-3">
                <Wallet className="w-7 h-7 text-tombol" />
              </div>
              <p className="text-white font-semibold">No Wallet Connected</p>
              <p className="text-xs text-gray-500 mt-1">Create a new wallet or import an existing one</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gradient text-white text-sm font-medium transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Wallet
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition-all"
            >
              <Download className="w-4 h-4" />
              Import Wallet
            </button>
          </div>
        </div>

        {showImport && <ImportWallet onClose={() => setShowImport(false)} onSuccess={() => setView('wallet')} />}
        {showCreate && <CreateWallet onClose={() => setShowCreate(false)} onSuccess={() => setView('wallet')} />}
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-glow" />
              <span className="text-xs text-gray-400">Connected</span>
            </div>
            <div className="flex items-center gap-1.5">
              <NetworkSelector />
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="p-4 text-center">
            <p className="text-3xl font-bold text-white">
              {parseFloat(balance).toFixed(6)}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{networkConfig.symbol}</p>
          </div>

          <div className="px-4 pb-3 flex gap-2">
            <button
              onClick={() => setShowSend(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl btn-gradient text-white text-xs font-medium transition-all"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Send
            </button>
            <button
              onClick={() => setShowReceive(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl border border-white/10 text-gray-300 text-xs hover:bg-white/5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              Receive
            </button>
          </div>

          <div className="px-4 pb-3">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-6 h-6 rounded-full bg-tombol/10 flex items-center justify-center shrink-0">
                  <Wallet className="w-3 h-3 text-tombol" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-white/80 truncate">{shortenAddress(wallet.address, 8)}</p>
                  <p className="text-[10px] text-gray-500">{networkConfig.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-tombol transition-all">
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                </button>
                <button onClick={openExplorer} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-tombol transition-all">
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button onClick={refreshBalance} className="p-1.5 rounded-lg hover:bg-white/10 text-gray-500 hover:text-tombol transition-all">
                  <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
                </button>
                <button onClick={() => { disconnectWallet(); onClose(); }} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-all">
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {txHistory.length > 0 && (
            <div className="border-t border-white/5">
              <div className="px-4 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-400">History</span>
                </div>
                <div className="flex gap-2">
                  {txHistory.length > 3 && (
                    <button
                      onClick={() => setShowFullHistory(!showFullHistory)}
                      className="text-[10px] text-tombol hover:underline"
                    >
                      {showFullHistory ? 'Show Less' : `View All (${txHistory.length})`}
                    </button>
                  )}
                  <button onClick={clearHistory} className="text-[10px] text-red-400 hover:underline">
                    Clear
                  </button>
                </div>
              </div>
              <div className="px-4 pb-3 space-y-1.5 max-h-40 overflow-y-auto">
                {recentTxs.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        tx.status === 'success' ? 'bg-green-500/10' : 'bg-red-500/10'
                      }`}>
                        <ArrowUpRight className={`w-3 h-3 ${
                          tx.status === 'success' ? 'text-green-400' : 'text-red-400'
                        }`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-white/80 truncate">{shortenAddress(tx.to, 6)}</p>
                        <p className="text-[10px] text-gray-500">
                          {new Date(tx.timestamp).toLocaleDateString()} · {tx.status}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-white/80">-{tx.amount}</p>
                      <button
                        onClick={() => window.open(`${networkConfig.explorer}/tx/${tx.hash}`, '_blank')}
                        className="text-[10px] text-tombol hover:underline"
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-3 border-t border-white/5 text-center">
            <p className="text-[10px] text-gray-600">
              Private keys are stored locally. Never share your seed phrase.
            </p>
          </div>
        </div>
      </div>

      {showSend && <SendModal onClose={() => setShowSend(false)} />}
      {showReceive && <ReceiveModal onClose={() => setShowReceive(false)} />}
    </>
  );
};

export default WalletDashboard;
