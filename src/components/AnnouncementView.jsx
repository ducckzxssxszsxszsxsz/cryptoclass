import React, { useEffect, useState } from "react";
import customAPI from "../api";

const AnnouncementView = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await customAPI.get("/post/caripost");
      setAnnouncements(response.data);
    } catch (error) {
      setError("Gagal mengambil pengumuman.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold text-white">Community</h2>
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-tombol/10 text-tombol">
            Posts
          </span>
        </div>

        {error && (
          <div className="glass-card rounded-xl p-4 mb-6 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {announcements.length > 0 ? (
            announcements.map((ann, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 card-hover animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{ann.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{ann.content}</p>
                    {ann.imageUrl && (
                      <img
                        src={ann.imageUrl}
                        alt={ann.title}
                        className="rounded-xl w-full max-h-96 object-cover mb-4"
                      />
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-white/5 text-gray-400">
                        {Array.isArray(ann.rolesAllowed)
                          ? ann.rolesAllowed.join(", ")
                          : "All"}
                      </span>
                      <span className="text-gray-500">
                        {new Date(ann.createdAt).toLocaleDateString("id-ID", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">Belum ada postingan.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementView;
