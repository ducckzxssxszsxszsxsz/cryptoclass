import React from "react";
import { useAuth } from "../context/AuthContext";
import UserIcon from "./UserIcon";
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

  const handleUserIconClick = () => {
    if (user) {
      navigate(user.role === "admin" ? "/admindashboard" : "/userdashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="hidden sm:block text-sm text-gray-400">
            Hello, <span className="text-tombol font-semibold">{user.name}</span>
          </span>
          <UserIcon onClick={handleUserIconClick} />
          <button
            onClick={handleLogout}
            className="text-sm px-4 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="text-sm px-4 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm px-4 py-2 rounded-xl bg-tombol text-utama font-semibold hover:shadow-lg hover:shadow-tombol/20 transition-all duration-200"
          >
            Register
          </Link>
        </>
      )}
    </div>
  );
};

export default Header;
