import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import customAPI from '../../api';
import { useWeb3 } from '../../context/Web3Context';
import { FiBarChart2, FiZap } from 'react-icons/fi';

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", import.meta.env.VITE_CLIENT_MIDTRANS);
    script.onload = () => resolve();
    document.body.appendChild(script);
  });
};

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('midtrans');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [processingPay, setProcessingPay] = useState(false);
  const navigate = useNavigate();
  const { isConnected, account, connectWallet } = useWeb3();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await customAPI.get('/course/allcourse');
        const data = response.data;
        if (Array.isArray(data)) setCourses(data);
        else throw new Error('Data tidak valid');
      } catch (err) {
        setError(err.message);
      } finally { setPageLoading(false); }
    };
    fetchCourses();
    insertSnapScript();
  }, []);

  const handleFiatPayment = async (courseId) => {
    setLoading(true);
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) throw new Error("Course not found");
      const orderId = `${courseId}-${Date.now()}`;
      const res = await customAPI.post("/pay/generate-token", {
        amount: parseFloat(course.monthlyPrice || course.price), order_id: orderId,
      });
      window.snap.pay(res.data.tokenId, {
        onSuccess: async () => {
          toast.success("Payment successful!");
          await customAPI.post("/subs/subscribe", { courseId, orderId });
          navigate('/');
        },
        onPending: () => toast.info("Waiting for confirmation."),
        onError: () => toast.error("Payment failed!"),
        onClose: () => toast.warn("Window closed."),
      });
    } catch (err) { toast.error(err.message); }
    finally { setLoading(false); }
  };

  const handleCryptoPayment = async (courseId) => {
    if (!isConnected) { await connectWallet(); if (!account) return; }
    setProcessingPay(true);
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) throw new Error("Course not found");
      const orderId = `${courseId}-${Date.now()}`;
      const res = await customAPI.post("/pay/crypto", {
        courseId, walletAddress: account, amount: parseFloat(course.monthlyPrice || course.price), order_id: orderId,
      });
      if (res.data.paymentUrl) window.open(res.data.paymentUrl, '_blank');
      toast.success("Crypto payment initiated!");
      await customAPI.post("/subs/subscribe", { courseId, orderId });
      navigate('/');
    } catch (err) { toast.error(err.message); }
    finally { setProcessingPay(false); }
  };

  const handleSubscribe = (id) => {
    setSelectedCourse(id);
    paymentMethod === 'crypto' ? handleCryptoPayment(id) : handleFiatPayment(id);
  };

  if (pageLoading) return (
    <div className="min-h-screen bg-utama pt-20 flex items-center justify-center">
      <div className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-utama pt-20 pb-12 flex items-center justify-center">
      <p className="text-red-400 text-sm">{error}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-utama pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">XAU/USD Only</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-2">Membership Plans</h1>
          <p className="text-gray-400 text-sm mt-1">Choose your plan — pay with card or crypto</p>

          <div className="flex items-center justify-center gap-2 mt-5 p-1 border border-white/10 rounded-lg w-fit mx-auto">
            {['midtrans', 'crypto'].map((m) => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`px-4 py-1.5 rounded text-xs font-medium transition-colors ${
                  paymentMethod === m ? 'bg-yellow-500 text-utama' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {m === 'midtrans' ? 'Fiat / Card' : 'Crypto'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {courses.length > 0 ? courses.map((course, i) => (
            <div key={course._id} className="border border-white/10 rounded-xl p-6 card-hover animate-in flex flex-col" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="flex-1">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <FiBarChart2 className="text-sm text-yellow-400" />
                </div>
                <h2 className="text-lg font-semibold text-white mb-1.5">{course.title}</h2>
                <p className="text-sm text-gray-400 mb-4">{course.description}</p>
                <p className="text-2xl font-bold text-white mb-4">
                  {paymentMethod === 'crypto' ? '$' : 'Rp'} {course.monthlyPrice || course.price}
                  <span className="text-xs text-gray-500 font-normal ml-1">/mo</span>
                </p>
              </div>
              <button
                onClick={() => handleSubscribe(course._id)}
                disabled={loading || processingPay}
                className="w-full bg-yellow-500 text-utama font-medium py-2.5 rounded-lg hover:bg-yellow-400 transition-colors text-sm disabled:opacity-50"
              >
                {loading && selectedCourse === course._id ? 'Processing...' :
                 processingPay && selectedCourse === course._id ? 'Confirming...' :
                 paymentMethod === 'crypto' ? 'Pay with Crypto' : 'Subscribe'}
              </button>
            </div>
          )) : (
            <div className="col-span-full text-center py-16">
              <FiBarChart2 className="text-3xl text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">No courses available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
