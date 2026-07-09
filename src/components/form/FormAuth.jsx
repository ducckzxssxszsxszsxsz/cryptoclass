import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import customAPI from "../../api";
import { t } from "../../i18n";

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
        toast.success(t("toast.loginSuccess"));
      } else if (isRegister) {
        setStep("otp");
        toast.success(t("toast.otpSent"));
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || t("toast.error"));
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    try {
      await customAPI.post("/user/resend-otp", { email: form.email });
      toast.success(t("toast.otpResent"));
    } catch {
      toast.error(t("toast.otpResendFailed"));
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
        toast.success(t("toast.registerSuccess"));
      }
    } catch (err) {
      toast.error(err.response?.data?.meta?.message || t("toast.otpError"));
    }
    setLoading(false);
  };

  const inputs = isRegister
    ? [
        { name: "name", type: "text", placeholder: t("auth.fullName"), icon: "user" },
        { name: "email", type: "email", placeholder: t("auth.email"), icon: "email" },
        { name: "password", type: "password", placeholder: t("auth.password"), icon: "lock" },
        { name: "refcode", type: "text", placeholder: t("auth.referralCode"), icon: "code" },
      ]
    : [
        { name: "email", type: "email", placeholder: t("auth.email"), icon: "email" },
        { name: "password", type: "password", placeholder: t("auth.password"), icon: "lock" },
      ];

  return (
    <>
      {step === "otp" ? (
        <form onSubmit={handleVerifyOtp} className="space-y-4 mt-4">
          <FormInput
            type="text"
            placeholder={t("auth.kodeOtp")}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gradient text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-tombol/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? t("auth.connecting") : t("auth.verify")}
          </button>
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-xs text-tombol hover:text-tombol/80 transition-colors"
            >
              {t("auth.resend")}
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
            className="w-full btn-gradient text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-tombol/20 hover:opacity-90 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? t("auth.loading") : isRegister ? t("auth.register") : t("auth.login")}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            {isRegister ? t("auth.alreadyAccount") : t("auth.noAccount")}{" "}
            <Link
              to={isRegister ? "/login" : "/register"}
              className="text-tombol hover:text-tombol/80 transition-colors"
            >
              {isRegister ? t("auth.loginLink") : t("auth.registerLink")}
            </Link>
          </p>
        </form>
      )}
    </>
  );
};

export default FormAuth;