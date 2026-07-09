<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=06F8D0:A855F7&height=200&section=header&text=Cryptoclass&fontSize=50&fontColor=fff&animation=fadeIn" width="100%" />
</div>

<h1 align="center">Forex Bootcamp Platform with Web3</h1>

<div align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite" />
  <img src="https://img.shields.io/badge/ethers.js-5-2535A0?style=for-the-badge&logo=ethereum" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel" />
</div>

<br/>

<p align="center">
  A modern forex bootcamp platform — XAU/USD specialist — powered by Web3 infrastructure.<br/>
  Wallet login, crypto payments, and on-chain certificates.
</p>

<div align="center">
  <a href="https://cryptoclass.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live_Demo-06F8D0?style=for-the-badge&logo=vercel&logoColor=black" />
  </a>
  &nbsp;
  <a href="#features">
    <img src="https://img.shields.io/badge/Features-7C3AED?style=for-the-badge&logo=readme&logoColor=white" />
  </a>
</div>

---

## ✨ Features

### 🔐 In-App Wallet (No MetaMask Required)
- **Create Wallet** — Generate a new Ethereum wallet with 12-word seed phrase
- **Import Wallet** — Import existing wallet via private key or seed phrase
- **Send ETH** — Send real ETH across multiple networks (Ethereum, Sepolia, Polygon, BSC)
- **Receive** — Display address with QR code for receiving funds
- **Multi-Network** — Switch between Ethereum Mainnet, Sepolia Testnet, Polygon, and BSC
- **Transaction History** — Track sent transactions with status

### 🌐 Web3 Infrastructure
- MetaMask wallet integration (browser extension)
- Real-time wallet balance & network detection
- Wallet-based authentication
- Crypto payment for course subscriptions

### 📚 Education Platform
- XAU/USD forex bootcamp courses
- Community announcements & posts
- Role-based access (admin, student, king, knight)
- Course subscription management

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, Vite, Tailwind CSS, DaisyUI |
| **State** | Redux Toolkit, React Context |
| **Web3** | ethers.js v5, RPC Providers |
| **Routing** | React Router v6 |
| **Icons** | Lucide React, React Icons |
| **Auth** | JWT, Wallet-based authentication |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

```bash
# Clone the repo
git clone https://github.com/ducckzxssxszsxszsxsz/cryptoclass.git

# Navigate to project
cd cryptoclass

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 📂 Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── wallet/        # In-app wallet system
│   │   ├── CreateWallet.jsx
│   │   ├── ImportWallet.jsx
│   │   ├── WalletDashboard.jsx
│   │   ├── SendModal.jsx
│   │   ├── ReceiveModal.jsx
│   │   └── NetworkSelector.jsx
│   ├── subscription/  # Course subscription & checkout
│   └── ...
├── context/           # React Context providers
│   ├── Web3Context.jsx     # MetaMask integration
│   ├── InAppWalletContext.jsx  # In-app wallet state
│   └── AuthContext.jsx     # Authentication
├── services/          # Core services
│   └── WalletService.js   # Wallet operations (send, balance, etc.)
├── features/          # Redux slices
├── pages/             # Route pages
├── i18n/              # Internationalization (EN/ID)
├── player/            # Player/student management
└── layout/            # Layout components
```

---

## 🌍 Networks Supported

| Network | Chain ID | Currency | Type |
|---------|----------|----------|------|
| Ethereum Mainnet | 1 | ETH | Production |
| Sepolia Testnet | 11155111 | ETH | Testnet |
| Polygon Mainnet | 137 | MATIC | Production |
| BSC Mainnet | 56 | BNB | Production |

---

## 📸 Screenshots

<div align="center">
  <i>Wallet Dashboard — Send & Receive ETH — Network Switcher</i>
</div>

*(Add screenshots here)*

---

## 🧑‍💻 Author

**Duckzzxs** — Full-Stack Web Developer

[![GitHub](https://img.shields.io/badge/GitHub-ducckzxssxszsxszsxsz-100000?style=flat&logo=github)](https://github.com/ducckzxssxszsxszsxsz)
[![Live Demo](https://img.shields.io/badge/Demo-cryptoclass.vercel.app-06F8D0?style=flat&logo=vercel)](https://cryptoclass.vercel.app)

---

<div align="center">
  <sub>Built with ❤️ using React & Web3</sub>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=06F8D0:A855F7&height=100&section=footer" width="100%" />
</div>
