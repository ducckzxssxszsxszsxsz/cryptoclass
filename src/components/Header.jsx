import React from "react";
import { useAuth } from "../context/AuthContext";
import UserIcon from "./UserIcon";
import WalletButton from "./WalletButton";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Logout berhasil");
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <WalletButton />

      {user ? (
        <>
          <span className="hidden sm:block text-sm text-gray-400">
            <span className="text-yellow-400 font-semibold">{user.name}</span>
          </span>
          <div className="w-px h-6 bg-white/10" />
          <UserIcon />
          <button
            onClick={handleLogout}
            className="text-sm px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Exit
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-sm px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-200"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
