import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import customAPI from "../../api";

const FormAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRegister = location.pathname === "/register";
  const [form, setForm] = useState({ name: "", email: "", password: "", refcode: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint = isRegister ? "/user/register" : "/user/login";
      const payload = isRegister ? form : { email: form.email, password: form.password, refcode: form.refcode };
      const { data } = await customAPI.post(endpoint, payload);
      if (data.meta?.message === "Login Success" && !isRegister) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
        toast.success("Login berhasil");
      } else if (isRegister) {
        setStep("otp");
        toast.success("Kode OTP dikirim ke email");
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || "Terjadi kesalahan");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    try {
      const { default: customAPI } = await import("../../api");
      const { default: toast } = await import("react-toastify");
      await customAPI.post("/user/resend-otp", { email: form.email });
      toast.success("OTP berhasil dikirim!");
    } catch {
      toast.error("Gagal mengirim OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await customAPI.post("/user/verify-otp", { email: form.email, otp });
      if (data.meta?.message === "Register Success") {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/");
        toast.success("Registrasi berhasil");
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || "OTP salah");
    }
    setLoading(false);
  };

  const inputs = isRegister
    ? [
        { name: "name", type: "text", placeholder: "Full Name", icon: "user" },
        { name: "email", type: "email", placeholder: "Email", icon: "email" },
        { name: "password", type: "password", placeholder: "Password", icon: "lock" },
        { name: "refcode", type: "text", placeholder: "Referral Code (optional)", icon: "code" },
      ]
    : [
        { name: "email", type: "email", placeholder: "Email", icon: "email" },
        { name: "password", type: "password", placeholder: "Password", icon: "lock" },
      ];

  return (
    <>
      {step === "otp" ? (
        <form onSubmit={handleVerifyOtp} className="space-y-4 mt-4">
          <FormInput
            type="text"
            placeholder="Kode OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-utama font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Resend OTP
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {inputs.map((input) => (
            <FormInput
              key={input.name}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
              icon={input.icon}
              value={form[input.name]}
              onChange={handleChange}
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-utama font-semibold py-2.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Loading..." : isRegister ? "Register" : "Login"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <Link
              to={isRegister ? "/login" : "/register"}
              className="text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default FormAuth;
