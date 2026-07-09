import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import WalletService from '../services/WalletService';

const InAppWalletContext = createContext();

const STORAGE_KEY = 'inapp_wallet';
const TX_KEY = 'inapp_tx_history';

const loadWallet = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return null;
};

const saveWallet = (data) => {
  if (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

const loadTxHistory = () => {
  try {
    const data = localStorage.getItem(TX_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  return [];
};

const saveTxHistory = (txs) => {
  localStorage.setItem(TX_KEY, JSON.stringify(txs));
};

export const InAppWalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(loadWallet);
  const [balances, setBalances] = useState({});
  const [activeChain, setActiveChain] = useState(11155111);
  const [txHistory, setTxHistory] = useState(loadTxHistory);
  const [loading, setLoading] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  const isConnected = !!wallet;

  const refreshBalance = useCallback(async () => {
    if (!wallet) return;
    setLoading(true);
    try {
      const bal = await WalletService.getBalance(wallet.address, activeChain);
      setBalances(prev => ({ ...prev, [activeChain]: bal }));
    } catch (err) {
      console.error('Balance refresh error:', err);
    } finally {
      setLoading(false);
    }
  }, [wallet, activeChain]);

  useEffect(() => {
    if (wallet) refreshBalance();
  }, [wallet, activeChain, refreshBalance]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (wallet) refreshBalance();
    }, 30000);
    return () => clearInterval(interval);
  }, [wallet, refreshBalance]);

  const generateWallet = useCallback(() => {
    try {
      const newWallet = WalletService.generateWallet();
      setWallet({
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        mnemonic: newWallet.mnemonic,
      });
      saveWallet({
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        mnemonic: newWallet.mnemonic,
      });
      toast.success('Wallet created successfully!');
      return newWallet;
    } catch (err) {
      toast.error('Failed to create wallet');
      return null;
    }
  }, []);

  const importWallet = useCallback((privateKey) => {
    try {
      const imported = WalletService.importFromPrivateKey(privateKey.trim());
      setWallet({
        address: imported.address,
        privateKey: imported.privateKey,
      });
      saveWallet({
        address: imported.address,
        privateKey: imported.privateKey,
      });
      toast.success('Wallet imported successfully!');
      return imported;
    } catch {
      toast.error('Invalid private key');
      return null;
    }
  }, []);

  const importFromMnemonic = useCallback((mnemonic) => {
    try {
      const imported = WalletService.importFromMnemonic(mnemonic.trim());
      setWallet({
        address: imported.address,
        privateKey: imported.privateKey,
        mnemonic: imported.mnemonic,
      });
      saveWallet({
        address: imported.address,
        privateKey: imported.privateKey,
        mnemonic: imported.mnemonic,
      });
      toast.success('Wallet imported successfully!');
      return imported;
    } catch {
      toast.error('Invalid mnemonic phrase');
      return null;
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setWallet(null);
    setBalances({});
    saveWallet(null);
    toast.success('Wallet disconnected');
  }, []);

  const sendETH = useCallback(async (toAddress, amount) => {
    if (!wallet) {
      toast.error('Please connect a wallet first');
      return null;
    }
    if (!WalletService.isAddress(toAddress)) {
      toast.error('Invalid recipient address');
      return null;
    }
    const balance = balances[activeChain] || '0';
    if (parseFloat(balance) < parseFloat(amount)) {
      toast.error('Insufficient balance');
      return null;
    }

    setLoading(true);
    try {
      const receipt = await WalletService.sendETH(wallet.privateKey, toAddress, amount, activeChain);
      const txRecord = {
        ...receipt,
        chainId: activeChain,
        amount,
        timestamp: Date.now(),
        type: 'send',
        to: toAddress,
      };
      const updated = [txRecord, ...txHistory];
      setTxHistory(updated);
      saveTxHistory(updated);
      toast.success(`Transaction sent! Hash: ${receipt.hash.slice(0, 10)}...`);
      await refreshBalance();
      return receipt;
    } catch (err) {
      toast.error('Transaction failed: ' + (err.message || 'Unknown error'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [wallet, balances, activeChain, txHistory, refreshBalance]);

  const sendToken = useCallback(async (tokenAddress, toAddress, amount) => {
    if (!wallet) {
      toast.error('Please connect a wallet first');
      return null;
    }
    setLoading(true);
    try {
      const receipt = await WalletService.sendToken(wallet.privateKey, tokenAddress, toAddress, amount, activeChain);
      const txRecord = {
        ...receipt,
        chainId: activeChain,
        amount,
        timestamp: Date.now(),
        type: 'send_token',
        to: toAddress,
        tokenAddress,
      };
      const updated = [txRecord, ...txHistory];
      setTxHistory(updated);
      saveTxHistory(updated);
      toast.success(`Token transfer sent!`);
      return receipt;
    } catch (err) {
      toast.error('Token transfer failed: ' + (err.message || 'Unknown error'));
      return null;
    } finally {
      setLoading(false);
    }
  }, [wallet, activeChain, txHistory]);

  const switchNetwork = useCallback((chainId) => {
    setActiveChain(chainId);
    toast.success(`Switched to ${WalletService.getNetworkConfig(chainId).name}`);
  }, []);

  const clearHistory = useCallback(() => {
    setTxHistory([]);
    saveTxHistory([]);
    toast.success('Transaction history cleared');
  }, []);

  const shortenAddress = useCallback((addr) => {
    return WalletService.shortenAddress(addr);
  }, []);

  const networkConfig = WalletService.getNetworkConfig(activeChain);

  return (
    <InAppWalletContext.Provider
      value={{
        wallet,
        balances,
        activeChain,
        networkConfig,
        txHistory,
        loading,
        isConnected,
        showWalletModal,
        setShowWalletModal,
        generateWallet,
        importWallet,
        importFromMnemonic,
        disconnectWallet,
        sendETH,
        sendToken,
        switchNetwork,
        refreshBalance,
        clearHistory,
        shortenAddress,
        WalletService,
      }}
    >
      {children}
    </InAppWalletContext.Provider>
  );
};

export const useInAppWallet = () => {
  const context = useContext(InAppWalletContext);
  if (!context) {
    throw new Error('useInAppWallet must be used within InAppWalletProvider');
  }
  return context;
};
