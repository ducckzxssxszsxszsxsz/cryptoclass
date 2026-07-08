import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import customAPI from "../../api";
import Checkout from "./Checkout";
import { BarChart3, ChevronDown, Hexagon, Loader2, AlertCircle, Wallet } from "lucide-react";
import { toast } from "react-toastify";

const PaymentModal = ({ courseId, price, paymentMethod, selectedCrypto, onClose }) => {
  const [snapToken, setSnapToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFiat = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.post("/pay/generate-token", {
        courseId,
        paymentMethod,
        callback_url: window.location.origin + "/payment-status",
      });
      setSnapToken(data.data.token);
    } catch {
      toast.error("Gagal generate token pembayaran");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!snapToken) return;
    if (window.snap) {
      window.snap.embed(snapToken, { onClose });
    } else {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS);
      script.onload = () => window.snap.embed(snapToken, { onClose });
      document.body.appendChild(script);
    }
  }, [snapToken]);

  const handleCrypto = () => onClose();
  if (loading) return <div className="text-white text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />Processing...</div>;

  return (
    <div className="text-center">
      {paymentMethod === "fiat" ? (
        <div>
          <p className="text-lg font-semibold text-white mb-2">Fiat Payment</p>
          <p className="text-sm text-gray-400 mb-6">Price: {price}</p>
          <button
            onClick={handleFiat}
            className="px-5 py-2.5 rounded-xl bg-yellow-500 text-utama font-semibold hover:bg-yellow-400 transition-all cursor-pointer"
          >
            Pay Now
          </button>
        </div>
      ) : (
        <Checkout courseId={courseId} price={price} selectedCrypto={selectedCrypto} />
      )}
    </div>
  );
};

const SubscriptionView = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("fiat");
  const [selectedCrypto, setSelectedCrypto] = useState("ethereum");
  const [cryptoDropdown, setCryptoDropdown] = useState(false);

  useEffect(() => {
    customAPI
      .get("/course/allcourse")
      .then(({ data }) => setCourses(data.data || []))
      .catch((err) => setError(err.response?.data?.meta?.message || "Gagal memuat kursus"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-utama flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Memuat kursus...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-utama flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      </div>
    );

  if (!courses.length)
    return (
      <div className="min-h-screen bg-utama flex items-center justify-center">
        <div className="text-center">
          <Hexagon className="w-8 h-8 text-yellow-500/30 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Belum ada kursus tersedia.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-utama py-20 lg:py-24">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <Hexagon className="w-6 h-6 text-yellow-500/30 mx-auto mb-3" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Choose Your Plan</h2>
          <p className="text-gray-400 mt-2 text-sm">Pick a course and payment method</p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {["fiat", "crypto"].map((m) => (
            <button
              key={m}
              onClick={() => setPaymentMethod(m)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                paymentMethod === m
                  ? "bg-yellow-500 text-utama shadow-lg shadow-yellow-500/20"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {m === "fiat" ? "Fiat" : "Crypto"}
            </button>
          ))}
        </div>

        {/* Crypto dropdown */}
        {paymentMethod === "crypto" && (
          <div className="relative max-w-[200px] mx-auto mb-10">
            <button
              onClick={() => setCryptoDropdown(!cryptoDropdown)}
              className="w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-white hover:bg-white/10 transition-all"
            >
              <span>{selectedCrypto === "ethereum" ? "Ethereum" : "USDT"}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>
            {cryptoDropdown && (
              <div className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-white/10 bg-kempat/95 backdrop-blur-xl z-10 overflow-hidden">
                {["ethereum", "usdt"].map((c) => (
                  <button
                    key={c}
                    onClick={() => { setSelectedCrypto(c); setCryptoDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 transition-all"
                  >
                    {c === "ethereum" ? "Ethereum" : "USDT"}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Course cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="glass-card rounded-2xl p-6 card-hover animate-in flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/15 to-yellow-500/5 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-base font-semibold text-white mb-1">{course.namaKelas}</h3>
              <p className="text-xs text-gray-500 mb-2">{course.namaSekolah}</p>
              {course.deskripsi && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{course.deskripsi}</p>}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                <span className="text-lg font-bold gradient-text">{course.harga}</span>
                {user ? (
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="px-4 py-2 rounded-xl bg-yellow-500 text-utama text-xs font-semibold hover:bg-yellow-400 transition-all cursor-pointer"
                  >
                    Subscribe
                  </button>
                ) : (
                  <span className="text-xs text-gray-500">Login to subscribe</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedCourse(null)} />
          <div className="relative glass-card rounded-2xl p-6 max-w-sm w-full animate-in">
            <PaymentModal
              courseId={selectedCourse.id}
              price={selectedCourse.harga}
              paymentMethod={paymentMethod}
              selectedCrypto={selectedCrypto}
              onClose={() => setSelectedCourse(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionView;
