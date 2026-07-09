import React, { useState } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import { X, Key, FileText } from 'lucide-react';
import { toast } from 'react-toastify';

const ImportWallet = ({ onClose, onSuccess }) => {
  const { importWallet, importFromMnemonic } = useInAppWallet();
  const [mode, setMode] = useState('privateKey');
  const [privateKey, setPrivateKey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImport = async () => {
    setLoading(true);
    try {
      let result;
      if (mode === 'privateKey') {
        if (!privateKey.trim()) {
          toast.error('Please enter a private key');
          setLoading(false);
          return;
        }
        result = importWallet(privateKey);
      } else {
        if (!mnemonic.trim()) {
          toast.error('Please enter a mnemonic phrase');
          setLoading(false);
          return;
        }
        result = importFromMnemonic(mnemonic);
      }
      if (result) {
        onSuccess?.();
        onClose?.();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Import Wallet</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setMode('privateKey')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all ${
                mode === 'privateKey'
                  ? 'bg-tombol/10 text-tombol border border-tombol/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              Private Key
            </button>
            <button
              onClick={() => setMode('mnemonic')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium transition-all ${
                mode === 'mnemonic'
                  ? 'bg-tombol/10 text-tombol border border-tombol/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Seed Phrase
            </button>
          </div>

          {mode === 'privateKey' ? (
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Private Key</label>
              <input
                type="password"
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="0x..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-tombol/50 transition-all"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Paste your private key (64 hex characters or 0x-prefixed)
              </p>
            </div>
          ) : (
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Seed Phrase</label>
              <textarea
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="word1 word2 word3 ... word12"
                rows={3}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono focus:border-tombol/50 transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1.5">
                Enter your 12 or 24-word seed phrase separated by spaces
              </p>
            </div>
          )}

          <button
            onClick={handleImport}
            disabled={loading || (mode === 'privateKey' && !privateKey) || (mode === 'mnemonic' && !mnemonic)}
            className="w-full py-2.5 rounded-xl btn-gradient text-white text-sm font-medium disabled:opacity-50 transition-all"
          >
            {loading ? 'Importing...' : 'Import Wallet'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportWallet;
