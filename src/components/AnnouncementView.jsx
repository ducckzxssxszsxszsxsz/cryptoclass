import React, { useEffect, useState } from "react";
import customAPI from "../api";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Hexagon, MessageSquare, Users, ArrowRight, Shield } from "lucide-react";
import { t, getLang } from "../i18n";

const AnnouncementView = () => {
  const { user } = useAuth();
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
      setError(t("community.error"));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-utama pt-24 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-tombol border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-utama pt-24 pb-12 hex-pattern">
      <div className="dot-grid absolute inset-0 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-tombol/15 to-purple-500/10 flex items-center justify-center neon-border">
              <MessageSquare className="w-5 h-5 text-tombol" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">{t("community.title")}</h2>
              <p className="text-sm text-gray-500 mt-0.5">{t("community.desc")}</p>
            </div>
          </div>
          {user?.role === "admin" && (
            <Link
              to="/createposting"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl btn-gradient text-white text-sm font-semibold shadow-lg shadow-tombol/20"
            >
              {t("community.newPost")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {error && (
          <div className="glass-card rounded-xl p-4 mb-6 neon-border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-6">
          {announcements.length > 0 ? (
            announcements.map((ann, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 card-hover animate-in neon-border"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-tombol/10 to-purple-500/5 flex items-center justify-center">
                        <Hexagon className="w-4 h-4 text-tombol" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{ann.title}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed mb-4">{ann.content}</p>
                    {ann.imageUrl && (
                      <div className="rounded-xl overflow-hidden mb-4 neon-border">
                        <img
                          src={ann.imageUrl}
                          alt={ann.title}
                          className="w-full max-h-96 object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-tombol/10 to-purple-500/10 text-tombol border border-tombol/20">
                        <Shield className="w-3 h-3" />
                        {Array.isArray(ann.rolesAllowed)
                          ? ann.rolesAllowed.join(", ")
                          : t("community.all")}
                      </span>
                      <span className="text-gray-500">
                        {new Date(ann.createdAt).toLocaleDateString(getLang() === "id" ? "id-ID" : "en-US", {
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
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tombol/10 to-purple-500/10 flex items-center justify-center mx-auto mb-4 neon-border">
                <Users className="w-7 h-7 text-tombol" />
              </div>
              <p className="text-gray-500">{t("community.noPosts")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementView;