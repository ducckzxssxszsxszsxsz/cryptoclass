import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Hexagon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-kempat border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2 text-base font-bold gradient-text">
              <BarChart3 className="w-4 h-4 text-yellow-400" />
              ForexClass
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              Forex bootcamp — XAU/USD specialist with Web3 infrastructure.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Menu</p>
            <ul className="space-y-2.5">
              {[{ to: "/", label: "Home" }, { to: "/classview", label: "Courses" }, { to: "/posting", label: "Community" }].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Account</p>
            <ul className="space-y-2.5">
              <li><Link to="/login" className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">Login</Link></li>
              <li><Link to="/register" className="text-sm text-gray-500 hover:text-yellow-400 transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Web3</p>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2 text-sm text-gray-500"><Hexagon className="w-3 h-3 text-yellow-400/50" /> MetaMask</li>
              <li className="flex items-center gap-2 text-sm text-gray-500"><Hexagon className="w-3 h-3 text-yellow-400/50" /> Crypto Payments</li>
              <li className="flex items-center gap-2 text-sm text-gray-500"><Hexagon className="w-3 h-3 text-yellow-400/50" /> On-Chain Cert</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} ForexClass.</p>
          <span className="text-xs text-gray-600">XAU/USD Specialist</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
