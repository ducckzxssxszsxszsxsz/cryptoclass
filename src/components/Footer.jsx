import React from "react";
import { Link } from "react-router-dom";
import { FiHexagon, FiGithub, FiTwitter, FiMessageCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-kempat border-t border-[#06F8D0]/10 relative overflow-hidden">
      <div className="hex-grid opacity-5 absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-extrabold bg-gradient-to-r from-[#06F8D0] via-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent">
              <FiHexagon className="text-[#06F8D0]" />
              CryptoClass
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
              Decentralized bootcamp for professional forex trading. 
              Learn XAU/USD analysis with blockchain-secured credentials & crypto payments.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#06F8D0] hover:bg-[#06F8D0]/10 transition-all">
                <FiGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#06F8D0] hover:bg-[#06F8D0]/10 transition-all">
                <FiTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-[#06F8D0] hover:bg-[#06F8D0]/10 transition-all">
                <FiMessageCircle />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Protocol
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/classview", label: "Courses" },
                { to: "/createsubs", label: "Pricing" },
                { to: "/posting", label: "Community" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-[#06F8D0] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-sm text-gray-500 hover:text-[#06F8D0] transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-[#06F8D0] transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Web3
            </h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-500">MetaMask</span></li>
              <li><span className="text-sm text-gray-500">WalletConnect</span></li>
              <li><span className="text-sm text-gray-500">Ethereum Network</span></li>
              <li><span className="text-sm text-gray-500">Smart Contract</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} CryptoClass. Built on Web3.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-[#06F8D0] animate-pulse" />
            Ethereum Network
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
