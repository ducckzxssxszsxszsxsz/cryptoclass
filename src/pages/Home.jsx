import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import imagehome from "../assets/2.png";
import imageabout from "../assets/4.png";
import { BarChart3, TrendingUp, Users, Shield, Zap, Hexagon, ArrowUpRight, Globe, Activity, Diamond } from "lucide-react";
import { t } from "../i18n";

const features = [
  { icon: BarChart3, title: t("features.item1Title"), desc: t("features.item1Desc") },
  { icon: TrendingUp, title: t("features.item2Title"), desc: t("features.item2Desc") },
  { icon: Users, title: t("features.item3Title"), desc: t("features.item3Desc") },
  { icon: Shield, title: t("features.item4Title"), desc: t("features.item4Desc") },
  { icon: Zap, title: t("features.item5Title"), desc: t("features.item5Desc") },
  { icon: Diamond, title: t("features.item6Title"), desc: t("features.item6Desc") },
];

const stats = [
  { value: "500+", label: t("hero.statsTraders") },
  { value: "95%", label: t("hero.statsAccuracy") },
  { value: "XAU/USD", label: t("hero.statsPair") },
];

const portfolioItems = [
  { id: 1, label: t("portfolio.label") + " 1", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 2, label: t("portfolio.label") + " 2", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 3, label: t("portfolio.label") + " 3", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 4, label: t("portfolio.label") + " 4", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 5, label: t("portfolio.label") + " 5", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 6, label: t("portfolio.label") + " 6", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 7, label: t("portfolio.label") + " 7", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
  { id: 8, label: t("portfolio.label") + " 8", tag1: t("portfolio.tag1"), tag2: t("portfolio.tag2") },
];

const Home = () => {
  const { isConnected, connectWallet } = useWeb3();

  return (
    <section>
      {/* ─── HERO ─── */}
      <div className="relative min-h-screen flex items-center bg-utama overflow-hidden hex-pattern">
        <div className="dot-grid absolute inset-0" />
        <div className="hero-glow top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2" />
        <div className="hero-glow-yellow bottom-1/3 right-1/3 translate-x-1/2 translate-y-1/2" />
        <div className="grid-bg absolute inset-0 opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left animate-in">
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/10 to-tombol/10 text-yellow-400 text-xs font-medium tracking-wide border border-yellow-500/20">
                  <Hexagon className="w-3 h-3" />
                  {t("hero.badge")}
                </span>
                {isConnected && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-green-500/10 to-tombol/10 text-green-400 text-xs font-medium border border-green-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-glow" />
                    {t("hero.badgeWallet")}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-none tracking-tight">
                {t("hero.title")}
                <span className="block gradient-text text-3xl sm:text-4xl lg:text-5xl mt-2">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <p className="mt-4 text-gray-400 leading-relaxed max-w-md mx-auto lg:mx-0">
                {t("hero.desc")}
              </p>

              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="inline-flex items-center gap-2 btn-gradient-gold text-utama font-semibold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20"
                  >
                    <Zap className="w-4 h-4" />
                    {t("hero.connectWallet")}
                  </button>
                ) : (
                  <Link
                    to="/classview"
                    className="inline-flex items-center gap-2 btn-gradient-gold text-utama font-semibold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20"
                  >
                    {t("hero.viewCourses")}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                )}
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 text-gray-300 px-6 py-3 rounded-xl neon-border hover:bg-white/5 transition-all duration-200"
                >
                  {t("hero.learnMore")}
                </a>
              </div>

              <div className="flex gap-8 sm:gap-12 mt-12 justify-center lg:justify-start">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end animate-in" style={{ animationDelay: "0.15s" }}>
              <div className="relative group">
                <div className="absolute -inset-8 bg-gradient-to-r from-tombol/10 via-purple-500/10 to-yellow-500/10 rounded-full blur-3xl animate-float" />
                <div className="relative w-[320px] lg:w-[420px] neon-border rounded-2xl p-2">
                  <img src={imagehome} alt="" className="w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── FEATURES ─── */}
      <div className="relative bg-kempat py-20 lg:py-24 hex-pattern" id="features">
        <div className="dot-grid-light absolute inset-0 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-tombol text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
              <Hexagon className="w-3 h-3" /> {t("features.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              {t("features.title")}
            </h2>
            <p className="text-gray-400 mt-2">
              {t("features.desc")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-2xl p-7 card-hover animate-in cyber-glow neon-border"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-tombol/15 to-purple-500/10 flex items-center justify-center mb-5">
                  <f.icon className="w-5 h-5 text-tombol" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <div className="relative bg-utama py-20 lg:py-24 hex-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 animate-in">
              <span className="text-tombol text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5">
                <Hexagon className="w-3 h-3" /> {t("about.badge")}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                {t("about.title")}{" "}
                <span className="gradient-text">{t("about.brand")}</span>
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed text-base">
                {t("about.desc1")}
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed text-base">
                {t("about.desc2")}
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed text-base">
                {t("about.desc3")}
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed text-base">
                {t("about.desc4")}
              </p>
              <a
                href="#project"
                className="inline-flex items-center gap-1.5 mt-6 text-sm text-tombol hover:text-tombol/80 transition-colors font-medium"
              >
                {t("about.portfolio")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-1 flex justify-center animate-in" style={{ animationDelay: "0.15s" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-tombol/5 to-purple-500/5 rounded-full blur-2xl" />
                <div className="neon-border-purple rounded-2xl p-2">
                  <img src={imageabout} alt="" className="relative w-[260px] lg:w-[340px] rounded-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── PORTFOLIO ─── */}
      <div className="relative bg-kempat py-20 lg:py-24 hex-pattern" id="project">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-tombol text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-1.5">
              <Activity className="w-3 h-3" /> {t("portfolio.badge")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              {t("portfolio.title")}
            </h2>
            <p className="text-gray-400 mt-2">
              {t("portfolio.desc")}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioItems.map((item, i) => (
              <div key={item.id} className="glass-card rounded-2xl overflow-hidden card-hover animate-in neon-border" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="h-36 sm:h-40 bg-gradient-to-br from-tombol/10 via-purple-500/5 to-kempat flex items-center justify-center relative">
                  <div className="absolute inset-0 grid-bg opacity-20" />
                  <BarChart3 className="w-10 h-10 text-tombol/40" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-semibold text-white">{item.label}</p>
                  <div className="flex gap-1.5 mt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-gradient-to-r from-tombol/10 to-purple-500/10 text-tombol border border-tombol/20">{item.tag1}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-500">{item.tag2}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm max-w-2xl mx-auto mt-8">
            {t("portfolio.footer")}
          </p>
        </div>
      </div>

      {/* ─── CTA ─── */}
      <div className="relative bg-utama py-20 lg:py-24 overflow-hidden">
        <div className="dot-grid absolute inset-0 pointer-events-none" />
        <div className="hero-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-tombol/10 to-purple-500/10 flex items-center justify-center mx-auto mb-4 neon-border">
            <Globe className="w-7 h-7 text-tombol" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            {t("cta.title")}{" "}
            <span className="gradient-text">{t("cta.subtitle")}</span>
          </h2>
          <p className="text-gray-400 mt-3 mb-8">
            {t("cta.desc")}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 btn-gradient-gold text-utama font-semibold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20"
              >
                <Zap className="w-4 h-4" />
                {t("cta.connectWallet")}
              </button>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 btn-gradient-gold text-utama font-semibold px-6 py-3 rounded-xl shadow-lg shadow-yellow-500/20"
              >
                {t("cta.registerNow")}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
            <Link
              to="/classview"
              className="inline-flex items-center gap-2 text-gray-300 px-6 py-3 rounded-xl neon-border hover:bg-white/5 transition-all duration-200"
            >
              {t("cta.viewCourses")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;