import React from "react";
import { Link } from "react-router-dom";
import { FiBarChart2, FiGithub, FiTwitter, FiMessageCircle } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-kempat border-t border-yellow-500/10 relative overflow-hidden">
      <div className="hex-grid opacity-5 absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-extrabold gradient-text">
              <FiBarChart2 className="text-yellow-400" />
              ForexClass
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
              Forex trading bootcamp — khusus XAU/USD — dengan infrastruktur Web3. 
              Wallet login, crypto payment, dan sertifikat on-chain untuk trader profesional.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all">
                <FiGithub />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all">
                <FiTwitter />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 transition-all">
                <FiMessageCircle />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Menu
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/classview", label: "Courses" },
                { to: "/createsubs", label: "Pricing" },
                { to: "/posting", label: "Community" },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">
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
              <li><Link to="/login" className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
              Web3 Stack
            </h3>
            <ul className="space-y-3">
              <li><span className="text-sm text-gray-500">MetaMask Wallet</span></li>
              <li><span className="text-sm text-gray-500">Ethereum Network</span></li>
              <li><span className="text-sm text-gray-500">Crypto Payments</span></li>
              <li><span className="text-sm text-gray-500">On-Chain Cert</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} ForexClass. XAU/USD Specialist.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <FiBarChart2 className="text-yellow-400" />
            Powered by Web3
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
