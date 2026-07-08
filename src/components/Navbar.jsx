import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";
import { BarChart3, Hexagon } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location]);

  const links = [
    { path: "/", label: "Home" },
    { path: "/classview", label: "Courses" },
    { path: "/createsubs", label: "Pricing" },
    { path: "/posting", label: "Community" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-utama/80 backdrop-blur-lg border-b border-white/5" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BarChart3 className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-base font-bold gradient-text">ForexClass</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`px-3.5 py-2 text-sm rounded-lg transition-all duration-200 ${
                    location.pathname === l.path
                      ? "text-yellow-400 bg-yellow-500/10"
                      : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Header />
            <button
              className="lg:hidden btn btn-ghost btn-square text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="lg:hidden border-t border-white/5 bg-utama/95 backdrop-blur-lg">
          <div className="px-4 py-3 space-y-0.5">
            {links.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`block px-3.5 py-2.5 rounded-lg text-sm transition-all ${
                  location.pathname === l.path
                    ? "text-yellow-400 bg-yellow-500/10"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
