import React, { useState, useEffect } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import { X, Copy, Check, Shield, AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';

const CreateWallet = ({ onClose, onSuccess }) => {
  const { generateWallet } = useInAppWallet();
  const [step, setStep] = useState('info');
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [wallet, setWallet] = useState(null);

  const handleCreate = () => {
    const newWallet = generateWallet();
    if (newWallet) {
      setWallet(newWallet);
      setStep('seed');
    }
  };

  const handleCopyMnemonic = () => {
    if (wallet?.mnemonic) {
      navigator.clipboard.writeText(wallet.mnemonic);
      setCopied(true);
      toast.success('Seed phrase copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDone = () => {
    onSuccess?.();
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Create Wallet</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        {step === 'info' && (
          <div className="p-6 space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-tombol/10 flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7 text-tombol" />
            </div>
            <div>
              <p className="text-white font-semibold">Generate New Wallet</p>
              <p className="text-xs text-gray-500 mt-1.5">
                You will receive a unique wallet address and a 12-word seed phrase. 
                Keep your seed phrase safe and never share it with anyone.
              </p>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/20 text-left">
              <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
              <p className="text-xs text-yellow-300/80">
                If you lose your seed phrase, your funds will be permanently inaccessible. 
                Write it down and store it somewhere safe.
              </p>
            </div>
            <button
              onClick={handleCreate}
              className="w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium transition-all"
            >
              Generate Wallet
            </button>
          </div>
        )}

        {step === 'seed' && wallet && (
          <div className="p-4 space-y-4">
            <div className="text-center">
              <p className="text-sm text-white font-semibold">Your Seed Phrase</p>
              <p className="text-xs text-gray-500 mt-1">Save these 12 words securely</p>
            </div>

            {!revealed ? (
              <div className="text-center py-6">
                <button
                  onClick={() => setRevealed(true)}
                  className="px-6 py-2.5 rounded-xl btn-gradient text-white text-sm font-medium transition-all"
                >
                  Click to Reveal
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                  {wallet.mnemonic.split(' ').map((word, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs">
                      <span className="text-gray-500">{i + 1}.</span>
                      <span className="text-white font-mono">{word}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleCopyMnemonic}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-white/10 text-gray-300 text-xs hover:bg-white/5 transition-all"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied!' : 'Copy Seed Phrase'}
                </button>
              </>
            )}

            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-xs text-gray-400 mb-1">Wallet Address</p>
              <p className="text-xs font-mono text-white/80 break-all">{wallet.address}</p>
            </div>

            <button
              onClick={handleDone}
              className="w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium transition-all"
            >
              I've Saved My Seed Phrase
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateWallet;
