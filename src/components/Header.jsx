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
    <div className="flex items-center gap-2">
      <WalletButton />

      {user ? (
        <>
          <span className="hidden sm:block text-sm text-gray-400">{user.name}</span>
          <UserIcon />
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Exit
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">Login</Link>
          <Link to="/register" className="text-sm px-3.5 py-2 rounded-lg bg-yellow-500 text-utama font-medium hover:bg-yellow-400 transition-colors">Register</Link>
        </>
      )}
    </div>
  );
};

export default Header;
