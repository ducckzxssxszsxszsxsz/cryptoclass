import React, { useState } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import { X, ArrowUpRight, ArrowDown } from 'lucide-react';
import { toast } from 'react-toastify';

const SendModal = ({ onClose }) => {
  const { sendETH, loading, networkConfig, balances, activeChain, shortenAddress, wallet } = useInAppWallet();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState('form');

  const balance = balances[activeChain] || '0';

  const handleMax = () => {
    setAmount(parseFloat(balance).toFixed(6));
  };

  const handleSend = async () => {
    if (!toAddress || !amount) {
      toast.error('Please fill all fields');
      return;
    }
    if (parseFloat(amount) <= 0) {
      toast.error('Amount must be greater than 0');
      return;
    }
    if (parseFloat(amount) > parseFloat(balance)) {
      toast.error('Insufficient balance');
      return;
    }

    setStep('confirm');
  };

  const handleConfirm = async () => {
    const result = await sendETH(toAddress, amount);
    if (result) {
      setStep('success');
    } else {
      setStep('form');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Send {networkConfig.symbol}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'form' && (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Balance: {parseFloat(balance).toFixed(6)} {networkConfig.symbol}</span>
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">To Address</label>
              <input
                type="text"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                placeholder="0x..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-tombol/50 transition-all"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Amount</label>
              <div className="relative">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.0"
                  step="0.000001"
                  min="0"
                  className="w-full px-3.5 py-2.5 pr-16 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-tombol/50 transition-all"
                />
                <button
                  onClick={handleMax}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 text-xs text-tombol hover:bg-tombol/10 rounded-lg transition-all"
                >
                  MAX
                </button>
              </div>
            </div>

            <button
              onClick={handleSend}
              disabled={!toAddress || !amount || loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gradient text-white text-sm font-medium disabled:opacity-50 transition-all"
            >
              <ArrowUpRight className="w-4 h-4" />
              Continue
            </button>
          </div>
        )}

        {step === 'confirm' && (
          <div className="p-4 space-y-4">
            <div className="rounded-xl bg-white/5 p-3.5 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Sending</span>
                <span className="text-white font-medium">{amount} {networkConfig.symbol}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">To</span>
                <span className="text-white font-mono">{shortenAddress(toAddress, 6)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Network</span>
                <span className="text-white">{networkConfig.name}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setStep('form')}
                className="flex-1 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Confirm</>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <ArrowDown className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Transaction Sent!</p>
              <p className="text-xs text-gray-500 mt-1">{amount} {networkConfig.symbol} sent</p>
            </div>
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendModal;
