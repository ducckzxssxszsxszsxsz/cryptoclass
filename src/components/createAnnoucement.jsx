import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
      toast.success("Pengumuman berhasil dibuat!");
      setNewAnnouncement({ title: "", message: "", roles: [], image: null });
      fetchAnnouncements();
      navigate("/posting");
    } catch (error) {
      toast.error(
        "Gagal membuat pengumuman: " +
          (error.response?.data?.message || "Terjadi kesalahan!")
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
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white mb-8">Create Post</h2>

        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 mb-12 space-y-6">
          <input
            type="text"
            placeholder="Title"
            value={newAnnouncement.title}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
            }
            required
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors"
          />
          <textarea
            placeholder="Content"
            value={newAnnouncement.message}
            onChange={(e) =>
              setNewAnnouncement({ ...newAnnouncement, message: e.target.value })
            }
            required
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-tombol transition-colors resize-none"
          />
          <div>
            <p className="text-sm font-medium text-gray-400 mb-3">
              Select Roles
            </p>
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    newAnnouncement.roles.includes(role)
                      ? "bg-tombol text-utama"
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
              Image (optional)
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
              className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-tombol file:text-utama hover:file:bg-tombol/90 cursor-pointer"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-tombol text-utama font-bold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
          >
            Create Post
          </button>
        </form>

        <h3 className="text-xl font-bold text-white mb-6">All Posts</h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-4">
            {announcements.map((ann, index) => (
              <div key={index} className="glass-card rounded-xl p-6 card-hover">
                <h4 className="text-lg font-semibold text-white mb-2">{ann.title}</h4>
                <p className="text-gray-400 mb-3">{ann.content}</p>
                {ann.imageUrl && (
                  <img
                    src={ann.imageUrl}
                    alt={ann.title}
                    className="rounded-lg max-h-60 w-full object-cover mb-3"
                  />
                )}
                <span className="text-xs text-gray-500">
                  Roles: {ann.rolesAllowed?.join(", ") || "All"}
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
