import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import customAPI from '../../api';
import { useWeb3 } from '../../context/Web3Context';
import { FiHexagon, FiZap, FiShield } from 'react-icons/fi';

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
        if (Array.isArray(data)) {
          setCourses(data);
        } else {
          throw new Error('Data tidak valid');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setPageLoading(false);
      }
    };
    fetchCourses();
    insertSnapScript();
  }, []);

  const handleFiatPayment = async (courseId) => {
    setLoading(true);
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) throw new Error("Course not found");

      const uniqueOrderId = `${courseId}-${Date.now()}`;

      const tokenResponse = await customAPI.post("/pay/generate-token", {
        amount: parseFloat(course.monthlyPrice || course.price),
        order_id: uniqueOrderId,
      });

      const tokenId = tokenResponse.data.tokenId;

      window.snap.pay(tokenId, {
        onSuccess: async (result) => {
          console.log(result);
          toast.success("Payment successful via Midtrans!");
          await customAPI.post("/subs/subscribe", { courseId, orderId: uniqueOrderId });
          navigate('/');
        },
        onPending: (result) => {
          console.log(result);
          toast.info("Waiting for payment confirmation.");
        },
        onError: (result) => {
          console.log(result);
          toast.error("Payment failed!");
        },
        onClose: () => {
          toast.warn("Payment window closed.");
        },
      });
    } catch (err) {
      toast.error(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCryptoPayment = async (courseId) => {
    if (!isConnected) {
      toast.info("Connect your wallet first");
      await connectWallet();
      if (!account) return;
    }

    setProcessingPay(true);
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) throw new Error("Course not found");

      const price = parseFloat(course.monthlyPrice || course.price);
      const uniqueOrderId = `${courseId}-${Date.now()}`;

      const response = await customAPI.post("/pay/crypto", {
        courseId,
        walletAddress: account,
        amount: price,
        order_id: uniqueOrderId,
      });

      if (response.data.paymentUrl) {
        window.open(response.data.paymentUrl, '_blank');
      }

      toast.success("Crypto payment initiated!");
      await customAPI.post("/subs/subscribe", { courseId, orderId: uniqueOrderId });
      navigate('/');
    } catch (err) {
      toast.error(`Crypto payment error: ${err.message}`);
    } finally {
      setProcessingPay(false);
    }
  };

  const handleSubscribe = (courseId) => {
    setSelectedCourse(courseId);
    if (paymentMethod === 'crypto') {
      handleCryptoPayment(courseId);
    } else {
      handleFiatPayment(courseId);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#06F8D0] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-utama pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="glass-card rounded-xl p-8 inline-block">
            <p className="text-red-400">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12 relative overflow-hidden">
      <div className="hex-grid opacity-10 absolute inset-0 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm font-medium mb-4">
            <FiZap /> Web3 Enabled
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Membership{" "}
            <span className="bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">Plans</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            Choose your plan — pay with crypto or fiat
          </p>

          {/* Payment Method Toggle */}
          <div className="flex items-center justify-center gap-4 p-2 glass-card rounded-2xl w-fit mx-auto">
            <button
              onClick={() => setPaymentMethod('midtrans')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                paymentMethod === 'midtrans'
                  ? 'bg-gradient-to-r from-[#06F8D0] to-[#00E5FF] text-utama'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Fiat / Card
            </button>
            <button
              onClick={() => setPaymentMethod('crypto')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                paymentMethod === 'crypto'
                  ? 'bg-gradient-to-r from-[#7C3AED] to-[#06F8D0] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <FiHexagon />
              Crypto
              {isConnected && <span className="w-2 h-2 rounded-full bg-[#06F8D0] animate-pulse" />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={course._id}
                className="group glass-card rounded-2xl p-8 card-hover animate-in flex flex-col relative overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#06F8D0]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06F8D0]/20 to-[#7C3AED]/20 flex items-center justify-center mb-6">
                    <FiHexagon className="text-xl text-[#06F8D0]" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{course.title}</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">{course.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">
                      {paymentMethod === 'crypto' ? '$' : 'Rp'} {course.monthlyPrice || course.price}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">/month</span>
                  </div>
                  {course.roles && course.roles.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.roles.map((role) => (
                        <span
                          key={role}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                    <FiShield />
                    {paymentMethod === 'crypto' ? 'Smart Contract Secured' : 'SSL Encrypted Payment'}
                  </div>
                </div>

                <button
                  onClick={() => handleSubscribe(course._id)}
                  disabled={loading || processingPay}
                  className="relative w-full bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300 disabled:opacity-50"
                >
                  {loading && selectedCourse === course._id ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-utama border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : processingPay && selectedCourse === course._id ? (
                    <span className="flex items-center justify-center gap-2">
                      <FiZap className="animate-pulse" />
                      Confirm Crypto...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      {paymentMethod === 'crypto' ? <FiZap /> : null}
                      {paymentMethod === 'crypto' ? 'Pay with Crypto' : 'Subscribe'}
                    </span>
                  )}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <FiHexagon className="text-5xl text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No courses available yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
