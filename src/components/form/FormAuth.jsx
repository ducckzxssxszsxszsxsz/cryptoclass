import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../form/FormInput";
import { FiBarChart2 } from "react-icons/fi";

const FormAuth = ({ isRegister, isOtp, onSubmit, isExpired }) => {
  const [formData, setFormData] = useState({
    name: "", username: "", email: "", password: "", otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  const handleResendOtp = async () => {
    try {
      const customAPI = (await import("../../api")).default;
      const response = await customAPI.post("/v1/user/resend-otp", { email: formData.email });
      const toast = (await import("react-toastify")).toast;
      toast.success(response.data.message);
    } catch (error) {
      const toast = (await import("react-toastify")).toast;
      toast.error(error?.response?.data?.message || "Gagal mengirim ulang OTP");
    }
  };

  return (
    <div className="w-full animate-in">
      <div className="text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold gradient-text">
          <FiBarChart2 className="text-yellow-400" />
          ForexClass
        </Link>
        <p className="text-xs text-gray-500 mt-1">XAU/USD Specialist</p>
      </div>

      <form onSubmit={handleSubmit} className="border border-white/10 rounded-xl p-6 space-y-4">
        <h3 className="text-base font-semibold text-white text-center">
          {isRegister ? "Create Account" : isOtp ? "Verify OTP" : "Welcome Back"}
        </h3>

        {isRegister && (
          <>
            <FormInput type="text" name="name" label="Nama" value={formData.name} onChange={handleChange} />
            <FormInput type="text" name="username" label="Username" value={formData.username} onChange={handleChange} />
          </>
        )}

        <FormInput type="email" name="email" label="Email" value={formData.email} onChange={handleChange} />

        {!isOtp && (
          <FormInput type="password" name="password" label="Password" value={formData.password} onChange={handleChange} />
        )}

        {isOtp && (
          <>
            <FormInput type="text" name="otp" label="Kode OTP" placeholder="Masukkan kode OTP" value={formData.otp} onChange={handleChange} />
            <button type="button" onClick={handleResendOtp} className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors">
              Kirim Ulang OTP
            </button>
            {isExpired && <p className="text-xs text-red-400">Waktu OTP telah habis.</p>}
          </>
        )}

        <button
          type="submit"
          className="w-full bg-yellow-500 text-utama font-medium py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm"
        >
          {isRegister ? "Register" : isOtp ? "Verifikasi OTP" : "Login"}
        </button>

        <div className="text-center text-xs">
          {isOtp ? null : !isRegister ? (
            <p className="text-gray-500">
              Belum punya akun?{" "}
              <Link to="/register" className="text-yellow-400 hover:text-yellow-300 transition-colors">Register</Link>
            </p>
          ) : (
            <p className="text-gray-500">
              Sudah punya akun?{" "}
              <Link to="/login" className="text-yellow-400 hover:text-yellow-300 transition-colors">Login</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormAuth;
