import React, { useState } from "react";
import { Link } from "react-router-dom";
import FormInput from "../form/FormInput";

const FormAuth = ({ isRegister, isOtp, onSubmit, isExpired }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    otp: "",
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
      const response = await customAPI.post("/v1/user/resend-otp", {
        email: formData.email,
      });
      const toast = (await import("react-toastify")).toast;
      toast.success(response.data.message);
    } catch (error) {
      const toast = (await import("react-toastify")).toast;
      const errorMessage =
        error?.response?.data?.message ||
        "Terjadi kesalahan saat mengirim ulang OTP";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-utama relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tombol/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md mx-auto px-4 py-8 animate-in">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-3xl font-extrabold gradient-text inline-block"
          >
            CryptoClass
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="glass-card rounded-2xl p-8 space-y-6"
        >
          <h3 className="text-2xl font-bold text-white text-center">
            {isRegister
              ? "Create Account"
              : isOtp
              ? "Verify OTP"
              : "Welcome Back"}
          </h3>

          {isRegister && (
            <>
              <FormInput
                type="text"
                name="name"
                label="Nama"
                value={formData.name}
                onChange={handleChange}
              />
              <FormInput
                type="text"
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </>
          )}

          <FormInput
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {!isOtp && (
            <FormInput
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          )}

          {isOtp && (
            <>
              <FormInput
                type="text"
                name="otp"
                label="Kode OTP"
                placeholder="Masukkan kode OTP"
                value={formData.otp}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-sm text-tombol hover:text-white transition-colors"
              >
                Kirim Ulang Kode OTP
              </button>
              {isExpired && (
                <p className="text-sm text-red-400">
                  Waktu untuk memasukkan kode OTP telah habis.
                </p>
              )}
            </>
          )}

          <button
            type="submit"
            className="w-full bg-tombol text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
          >
            {isRegister
              ? "Register"
              : isOtp
              ? "Verifikasi OTP"
              : "Login"}
          </button>

          <div className="text-center">
            {isOtp ? null : !isRegister ? (
              <p className="text-gray-400 text-sm">
                Belum punya akun?{" "}
                <Link
                  to="/register"
                  className="text-tombol font-semibold hover:text-white transition-colors"
                >
                  Register
                </Link>
              </p>
            ) : (
              <p className="text-gray-400 text-sm">
                Sudah punya akun?{" "}
                <Link
                  to="/login"
                  className="text-tombol font-semibold hover:text-white transition-colors"
                >
                  Login
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAuth;
