import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import customAPI from '../../api';

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
  const navigate = useNavigate();

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

  const handleSubscribe = async (courseId) => {
    setLoading(true);
    try {
      const course = courses.find((c) => c._id === courseId);
      if (!course) throw new Error("Course not found");

      const uniqueOrderId = `${courseId}-${Date.now()}`;

      const tokenResponse = await customAPI.post("/pay/generate-token", {
        amount: parseFloat(course.monthlyPrice),
        order_id: uniqueOrderId,
      });

      const tokenId = tokenResponse.data.tokenId;

      window.snap.pay(tokenId, {
        onSuccess: async (result) => {
          console.log(result);
          toast.success("Payment successful!");
          await customAPI.post("/subs/subscribe", { courseId, orderId: uniqueOrderId });
          navigate('/');
        },
        onPending: (result) => {
          console.log(result);
          toast.info("Waiting for your payment confirmation.");
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

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
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
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Membership <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Pilih plan yang sesuai dengan kebutuhan trading Anda
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.length > 0 ? (
            courses.map((course, index) => (
              <div
                key={course._id}
                className="glass-card rounded-2xl p-8 card-hover animate-in flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-3">{course.title}</h2>
                  <p className="text-gray-400 mb-6 leading-relaxed">{course.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold gradient-text">
                      Rp {course.monthlyPrice || course.price}
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
                </div>
                <button
                  onClick={() => handleSubscribe(course._id)}
                  disabled={loading}
                  className="w-full bg-tombol text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Subscribe"}
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-500">Tidak ada kursus tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseList;
