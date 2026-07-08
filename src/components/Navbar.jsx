import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { useWeb3 } from "../context/Web3Context";
import { FiBarChart2, FiHexagon } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isConnected, chainName } = useWeb3();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { closeMenu(); }, [location]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/classview", label: "Courses" },
    { path: "/createsubs", label: "Pricing" },
    { path: "/posting", label: "Community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-utama/90 backdrop-blur-xl border-b border-[#06F8D0]/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <FiBarChart2 className="text-xl text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xl lg:text-2xl font-extrabold gradient-text">
                ForexClass
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === link.path
                      ? "text-[#06F8D0] bg-[#06F8D0]/10 border border-[#06F8D0]/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {isConnected && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/5 border border-yellow-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs text-gray-400">{chainName}</span>
              </div>
            )}
            <Header />
            <button
              className="lg:hidden btn btn-ghost btn-circle text-white"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-utama/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-1">
            <div className="flex items-center gap-2 px-4 py-3 text-sm border-b border-white/5 mb-2">
              <FiBarChart2 className="text-yellow-400" />
              <span className="gradient-text font-bold">ForexClass</span>
              {isConnected && (
                <span className="ml-auto text-xs text-gray-500">{chainName}</span>
              )}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={closeMenu}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === link.path
                    ? "text-[#06F8D0] bg-[#06F8D0]/10"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
