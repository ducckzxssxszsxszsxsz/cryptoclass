import { ethers } from 'ethers';

const NETWORKS = {
  ethereum: {
    name: 'Ethereum Mainnet',
    chainId: 1,
    rpc: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    explorer: 'https://etherscan.io',
    symbol: 'ETH',
    decimals: 18,
  },
  sepolia: {
    name: 'Sepolia Testnet',
    chainId: 11155111,
    rpc: 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
    symbol: 'ETH',
    decimals: 18,
    faucet: 'https://sepoliafaucet.com',
  },
  polygon: {
    name: 'Polygon Mainnet',
    chainId: 137,
    rpc: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    symbol: 'MATIC',
    decimals: 18,
  },
  bsc: {
    name: 'BSC Mainnet',
    chainId: 56,
    rpc: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    symbol: 'BNB',
    decimals: 18,
  },
};

class WalletService {
  static getNetworks() {
    return NETWORKS;
  }

  static getNetworkConfig(chainId) {
    return Object.values(NETWORKS).find(n => n.chainId === chainId) || NETWORKS.sepolia;
  }

  static getProvider(chainId) {
    const config = this.getNetworkConfig(chainId);
    return new ethers.providers.JsonRpcProvider(config.rpc, config.chainId);
  }

  static generateWallet() {
    const wallet = ethers.Wallet.createRandom();
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
      mnemonic: wallet.mnemonic.phrase,
    };
  }

  static importFromPrivateKey(privateKey) {
    try {
      const wallet = new ethers.Wallet(privateKey);
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };
    } catch {
      throw new Error('Invalid private key');
    }
  }

  static importFromMnemonic(mnemonic) {
    try {
      const wallet = ethers.Wallet.fromMnemonic(mnemonic);
      return {
        address: wallet.address,
        privateKey: wallet.privateKey,
        mnemonic: wallet.mnemonic.phrase,
      };
    } catch {
      throw new Error('Invalid mnemonic phrase');
    }
  }

  static async getBalance(address, chainId) {
    try {
      const provider = this.getProvider(chainId);
      const balance = await provider.getBalance(address);
      const config = this.getNetworkConfig(chainId);
      return ethers.utils.formatUnits(balance, config.decimals);
    } catch (err) {
      console.error('Error fetching balance:', err);
      return '0';
    }
  }

  static async getBalances(address) {
    const result = {};
    for (const [key, net] of Object.entries(NETWORKS)) {
      try {
        result[key] = await this.getBalance(address, net.chainId);
      } catch {
        result[key] = '0';
      }
    }
    return result;
  }

  static async sendETH(privateKey, toAddress, amount, chainId) {
    const config = this.getNetworkConfig(chainId);
    const provider = this.getProvider(chainId);
    const wallet = new ethers.Wallet(privateKey, provider);

    const tx = {
      to: toAddress,
      value: ethers.utils.parseUnits(amount.toString(), config.decimals),
    };

    const txResponse = await wallet.sendTransaction(tx);
    const receipt = await txResponse.wait();

    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      from: receipt.from,
      to: receipt.to,
      gasUsed: receipt.gasUsed.toString(),
      status: receipt.status === 1 ? 'success' : 'failed',
    };
  }

  static async getTransactionCount(address, chainId) {
    const provider = this.getProvider(chainId);
    return provider.getTransactionCount(address);
  }

  static async estimateGas(toAddress, amount, chainId) {
    const config = this.getNetworkConfig(chainId);
    const provider = this.getProvider(chainId);
    const gasPrice = await provider.getGasPrice();
    const gasLimit = await provider.estimateGas({
      to: toAddress,
      value: ethers.utils.parseUnits(amount.toString(), config.decimals),
    });

    return {
      gasPrice: ethers.utils.formatUnits(gasPrice, 'gwei'),
      gasLimit: gasLimit.toString(),
      totalWei: gasPrice.mul(gasLimit).toString(),
      totalEth: ethers.utils.formatEther(gasPrice.mul(gasLimit)),
    };
  }

  static encryptPrivateKey(privateKey, password) {
    const wallet = new ethers.Wallet(privateKey);
    return wallet.encrypt(password);
  }

  static async decryptKeystore(keystore, password) {
    const wallet = await ethers.Wallet.fromEncryptedJson(keystore, password);
    return {
      address: wallet.address,
      privateKey: wallet.privateKey,
    };
  }

  static isAddress(address) {
    return ethers.utils.isAddress(address);
  }

  static shortenAddress(address, chars = 4) {
    if (!address) return '';
    return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
  }

  static async getGasPrices(chainId) {
    const provider = this.getProvider(chainId);
    const gasPrice = await provider.getGasPrice();
    const slow = gasPrice.mul(90).div(100);
    const fast = gasPrice.mul(110).div(100);

    return {
      slow: ethers.utils.formatUnits(slow, 'gwei'),
      standard: ethers.utils.formatUnits(gasPrice, 'gwei'),
      fast: ethers.utils.formatUnits(fast, 'gwei'),
    };
  }

  static async getTokenBalance(tokenAddress, walletAddress, chainId) {
    const provider = this.getProvider(chainId);
    const abi = ['function balanceOf(address) view returns (uint256)', 'function decimals() view returns (uint8)', 'function symbol() view returns (string)'];
    const contract = new ethers.Contract(tokenAddress, abi, provider);
    const balance = await contract.balanceOf(walletAddress);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    return {
      balance: ethers.utils.formatUnits(balance, decimals),
      symbol,
      decimals,
    };
  }

  static async sendToken(privateKey, tokenAddress, toAddress, amount, chainId) {
    const provider = this.getProvider(chainId);
    const wallet = new ethers.Wallet(privateKey, provider);
    const abi = ['function transfer(address to, uint256 amount) returns (bool)', 'function decimals() view returns (uint8)'];
    const contract = new ethers.Contract(tokenAddress, abi, wallet);
    const decimals = await contract.decimals();
    const parsedAmount = ethers.utils.parseUnits(amount.toString(), decimals);
    const tx = await contract.transfer(toAddress, parsedAmount);
    const receipt = await tx.wait();
    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      status: receipt.status === 1 ? 'success' : 'failed',
    };
  }
}

export default WalletService;
