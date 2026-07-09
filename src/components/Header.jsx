import React from "react";
import { useAuth } from "../context/AuthContext";
import UserIcon from "./UserIcon";
import WalletButton from "./WalletButton";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { t } from "../i18n";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success(t("toast.logoutSuccess"));
  };

  return (
    <div className="flex items-center gap-2">
      <WalletButton />
      {user ? (
        <>
          <span className="hidden sm:block text-sm text-gray-400">{user.name}</span>
          <UserIcon />
          <button onClick={handleLogout} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{t("header.exit")}</button>
        </>
      ) : (
        <>
          <Link to="/login" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">{t("header.login")}</Link>
          <Link to="/register" className="inline-flex items-center gap-1.5 text-sm px-3.5 py-2 rounded-xl btn-gradient text-white font-medium shadow-lg shadow-tombol/20 transition-all">{t("header.register")}</Link>
        </>
      )}
    </div>
  );
};

export default Header;