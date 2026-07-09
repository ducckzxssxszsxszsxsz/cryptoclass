import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { t } from '../i18n';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState(null);
  const [chainName, setChainName] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);

  useEffect(() => {
    setHasMetaMask(!!(window.ethereum && window.ethereum.isMetaMask));
  }, []);

  const getChainName = (id) => {
    const chains = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Mumbai Testnet',
      56: 'BSC Mainnet',
      97: 'BSC Testnet',
      43114: 'Avalanche C-Chain',
      42161: 'Arbitrum One',
      10: 'Optimism',
    };
    return chains[id] || `Chain ID: ${id}`;
  };

  const updateBalance = useCallback(async (provider, address) => {
    try {
      const bal = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(bal));
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast.error('MetaMask tidak terdeteksi! Silakan install MetaMask.');
      window.open('https://metamask.io', '_blank');
      return;
    }
    if (!window.ethereum.isMetaMask) {
      toast.warning('Wallet terdeteksi tapi bukan MetaMask. Beberapa fitur mungkin terbatas.');
    }

    setConnecting(true);
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      if (!accounts || accounts.length === 0) {
        toast.error('Tidak ada akun yang dipilih. Buka MetaMask dan pilih akun.');
        return;
      }
      const signer = provider.getSigner();
      const network = await provider.getNetwork();
      const chainId = network.chainId;

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setChainId(chainId);
      setChainName(getChainName(chainId));
      setHasMetaMask(true);

      await updateBalance(provider, accounts[0]);

      toast.success(`Wallet connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`);
    } catch (err) {
      console.error('Error connecting wallet:', err);
      if (err.code === 4001) {
        toast.error('Koneksi ditolak oleh user.');
      } else if (err.code === -32002) {
        toast.error('Permintaan koneksi sedang diproses. Buka MetaMask.');
      } else {
        toast.error('Gagal connect wallet: ' + (err.message || 'Unknown error'));
      }
    } finally {
      setConnecting(false);
    }
  }, [updateBalance]);

  const disconnectWallet = useCallback(() => {
    setAccount(null);
    setBalance('0');
    setChainId(null);
    setChainName('');
    setProvider(null);
    setSigner(null);
    toast.success('Wallet disconnected');
  }, []);

  const signMessage = useCallback(async (message) => {
    if (!signer) {
      toast.error('Please connect your wallet first');
      return null;
    }
    try {
      const signature = await signer.signMessage(message);
      return signature;
    } catch (err) {
      console.error('Error signing message:', err);
      toast.error('Failed to sign message');
      return null;
    }
  }, [signer]);

  const switchNetwork = useCallback(async (targetChainId) => {
    if (!window.ethereum) return;
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      });
    } catch (err) {
      if (err.code === 4902) {
        toast.error('Network not available in MetaMask');
      }
    }
  }, []);

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        if (provider) updateBalance(provider, accounts[0]);
        toast.info('Akun MetaMask berubah.');
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    const handleDisconnect = () => {
      disconnectWallet();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
      window.ethereum.removeListener('disconnect', handleDisconnect);
    };
  }, [provider, updateBalance, disconnectWallet]);

  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) return;
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const network = await provider.getNetwork();
          setProvider(provider);
          setSigner(signer);
          setAccount(accounts[0]);
          setChainId(network.chainId);
          setChainName(getChainName(network.chainId));
          await updateBalance(provider, accounts[0]);
        }
      } catch (err) {
        console.error('Error checking existing connection:', err);
      }
    };
    checkConnection();
  }, []);

  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        balance,
        chainId,
        chainName,
        connecting,
        hasMetaMask,
        provider,
        signer,
        connectWallet,
        disconnectWallet,
        signMessage,
        switchNetwork,
        shortenAddress,
        isConnected: !!account,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};