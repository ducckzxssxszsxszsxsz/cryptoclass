import React, { useState } from 'react';
import customAPI from '../../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Hexagon, Shield, ArrowLeft, Diamond } from 'lucide-react';
import { t } from '../../i18n';

const CreateCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const [roles, setRoles] = useState({ student: false, king: false, knight: false });

  const handleRoleChange = (role) => {
    setRoles((prev) => ({ ...prev, [role]: !prev[role] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedRoles = Object.keys(roles).filter((role) => roles[role]);

    try {
      const response = await customAPI.post('/course/create', {
        title,
        description,
        content,
        price: coursePrice,
        roles: selectedRoles,
      });

      if (response.status === 201) {
        toast.success(response.data.message || t("pricing.success"));
        setTitle('');
        setDescription('');
        setContent('');
        setCoursePrice('');
        setRoles({ student: false, king: false, knight: false });
        navigate('/classview');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t("pricing.error"));
    }
  };

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12 hex-pattern">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/classview")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tombol/15 to-purple-500/10 flex items-center justify-center neon-border">
            <Diamond className="w-5 h-5 text-tombol" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{t("pricing.title")}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{t("pricing.desc")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6 neon-border">
          <input
            type="text"
            placeholder={t("pricing.titleLabel")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <textarea
            placeholder={t("pricing.description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <textarea
            placeholder={t("pricing.content")}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={5}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <input
            type="number"
            placeholder={t("pricing.price")}
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <div>
            <p className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-tombol" /> {t("pricing.roles")}
            </p>
            <div className="flex flex-wrap gap-4">
              {Object.keys(roles).map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={roles[role]}
                    onChange={() => handleRoleChange(role)}
                    className="w-4 h-4 rounded border-gray-600 bg-white/5 text-tombol focus:ring-tombol focus:ring-offset-0"
                  />
                  <span className="text-white text-sm">{role.charAt(0).toUpperCase() + role.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-tombol/20 hover:opacity-90 transition-all duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;