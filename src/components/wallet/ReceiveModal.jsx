import React, { useRef, useEffect, useState } from 'react';
import { useInAppWallet } from '../../context/InAppWalletContext';
import { X, Copy, Check } from 'lucide-react';
import { toast } from 'react-toastify';

const QRCodeSVG = ({ address }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !address) return;

    const ctx = canvas.getContext('2d');
    const size = 180;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#0B1120';
    ctx.fillRect(0, 0, size, size);

    const data = address;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash) + data.charCodeAt(i);
      hash |= 0;
    }

    const moduleCount = 15;
    const moduleSize = size / (moduleCount + 2);
    const offset = moduleSize;

    ctx.fillStyle = '#06F8D0';

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const idx = row * moduleCount + col;
        const charCode = data.charCodeAt(idx % data.length);
        const bit = (charCode >> (idx % 8)) & 1;
        const extra = (hash >> (idx % 16)) & 1;
        if (bit || extra) {
          const x = offset + col * moduleSize;
          const y = offset + row * moduleSize;
          ctx.fillRect(Math.round(x), Math.round(y), Math.ceil(moduleSize), Math.ceil(moduleSize));
        }
      }
    }

    if (address) {
      const centerX = size / 2;
      const centerY = size / 2;
      const logoSize = 28;
      ctx.fillStyle = '#0B1120';
      ctx.fillRect(centerX - logoSize / 2, centerY - logoSize / 2, logoSize, logoSize);
      ctx.fillStyle = '#06F8D0';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('W', centerX, centerY);
    }
  }, [address]);

  return <canvas ref={canvasRef} className="rounded-xl" />;
};

const ReceiveModal = ({ onClose }) => {
  const { wallet, networkConfig } = useInAppWallet();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (wallet?.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      toast.success('Address copied!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-kempat/95 backdrop-blur-xl shadow-2xl animate-in overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold text-white">Receive {networkConfig.symbol}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col items-center space-y-4">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
            <QRCodeSVG address={wallet?.address || ''} />
          </div>

          <div className="w-full text-center">
            <p className="text-xs text-gray-400 mb-1">Your {networkConfig.name} Address</p>
            <p className="text-xs font-mono text-white/80 break-all bg-white/5 rounded-xl px-3 py-2 border border-white/5">
              {wallet?.address}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 text-gray-300 text-sm hover:bg-white/5 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={() => {
                window.open(`${networkConfig.explorer}/address/${wallet?.address}`, '_blank');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gradient text-white text-sm transition-all"
            >
              View on Explorer
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            Only send {networkConfig.symbol} on the {networkConfig.name} network to this address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReceiveModal;
