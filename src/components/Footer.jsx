import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-kempat border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-extrabold gradient-text">
              CryptoClass
            </Link>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Bootcamp trading forex profesional. Belajar analisa XAU/USD dari ahlinya dan tingkatkan skill trading Anda.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/classview", label: "Courses" },
                { to: "/createsubs", label: "Pricing" },
                { to: "/posting", label: "Community" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-400 hover:text-tombol transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Account
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/login"
                  className="text-sm text-gray-400 hover:text-tombol transition-colors duration-200"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-sm text-gray-400 hover:text-tombol transition-colors duration-200"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-gray-400">contact@cryptoclass.com</span>
              </li>
              <li>
                <span className="text-sm text-gray-400">Discord Community</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CryptoClass. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Built with passion for traders
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
