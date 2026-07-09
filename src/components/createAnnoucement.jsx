import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Hexagon, Shield, ArrowLeft } from "lucide-react";
import { t } from "../i18n";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    message: "",
    roles: [],
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await customAPI.get("/post/caripost");
      setAnnouncements(response.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newAnnouncement.title);
    formData.append("content", newAnnouncement.message);
    formData.append("rolesAllowed", JSON.stringify(newAnnouncement.roles));
    if (newAnnouncement.image) {
      formData.append("image", newAnnouncement.image);
    }

    try {
      await customAPI.post("/post/createpost", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(t("createPost.success"));
      setNewAnnouncement({ title: "", message: "", roles: [], image: null });
      fetchAnnouncements();
      navigate("/posting");
    } catch (error) {
      toast.error(
        t("createPost.error") +
          (error.response?.data?.message || t("createPost.errorFallback"))
      );
    }
  };

  const toggleRole = (role) => {
    setNewAnnouncement((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };

  const roles = ["user", "king", "knight", "student", "admin"];

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12 hex-pattern">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate("/posting")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tombol/15 to-purple-500/10 flex items-center justify-center neon-border">
            <MessageSquare className="w-5 h-5 text-tombol" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">{t("createPost.title")}</h2>
            <p className="text-sm text-gray-500 mt-0.5">{t("createPost.desc")}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 mb-12 space-y-6 neon-border">
          <input
            type="text"
            placeholder={t("createPost.titleLabel")}
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <textarea
            placeholder={t("createPost.content")}
            value={newAnnouncement.message}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
            }
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-tombol/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <div>
            <p className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-tombol" /> {t("createPost.selectRoles")}
            </p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    newAnnouncement.roles.includes(role)
                      ? "btn-gradient text-white shadow-lg shadow-tombol/20"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">
              {t("createPost.image")}
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setNewAnnouncement({
                  ...newAnnouncement,
                  image: e.target.files[0],
                })
              }
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:btn-gradient file:text-white hover:file:opacity-90 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full btn-gradient text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-tombol/20 hover:opacity-90 transition-all duration-300"
          >
            {t("createPost.submit")}
          </button>
        </form>

        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Hexagon className="w-4 h-4 text-tombol" /> {t("createPost.allPosts")}
        </h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann, index) => (
              <div key={index} className="glass-card rounded-xl p-6 card-hover neon-border">
                <h4 className="text-lg font-semibold text-white mb-2">{ann.title}</h4>
                <p className="text-gray-400 mb-3">{ann.content}</p>
                {ann.imageUrl && (
                  <img
                    src={ann.imageUrl}
                    alt={ann.title}
                    className="rounded-lg max-h-60 w-full object-cover mb-3"
                  />
                )}
                <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-tombol/10 to-purple-500/10 text-tombol border border-tombol/20">
                  <Shield className="w-3 h-3" />
                  {ann.rolesAllowed?.join(", ") || "All"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;