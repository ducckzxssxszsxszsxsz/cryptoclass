import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import imagehome from "../assets/2.png";
import imageabout from "../assets/4.png";
import { FiTrendingUp, FiUsers, FiBarChart2, FiShield, FiZap, FiHexagon } from "react-icons/fi";

const features = [
  { icon: FiBarChart2, title: "XAU/USD Specialist", desc: "Fokus 100% pada analisa Gold vs USD. Bukan pair lain — hanya XAU/USD, the king of forex." },
  { icon: FiTrendingUp, title: "Real Analysis Results", desc: "Hasil analisa nyata dengan entry points, take profit, dan stop loss yang terukur." },
  { icon: FiUsers, title: "1-on-1 Mentorship", desc: "Bimbingan langsung dari Axeey — mentor dengan track record analisa XAU/USD terbukti." },
  { icon: FiShield, title: "Wallet-Based Login", desc: "Login pakai MetaMask. No password needed — Web3 authentication for traders." },
  { icon: FiZap, title: "Crypto Payment", desc: "Bayar subscription pakai ETH atau token. Instant, secure, decentralized." },
  { icon: FiHexagon, title: "On-Chain Certificate", desc: "Sertifikat completion tersimpan di blockchain. Verifiable & tamper-proof." },
];

const Home = () => {
  const { isConnected, connectWallet, shortenAddress, account } = useWeb3();

  return (
    <section>
      {/* ─────────────── HERO ─────────────── */}
      <div className="relative min-h-screen flex items-center bg-utama overflow-hidden">
        <div className="absolute inset-0 hex-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06F8D0]/5 via-transparent to-[#7C3AED]/5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#06F8D0]/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left animate-in">
              {/* Badge: Forex + Web3 */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold">
                  XAU/USD ONLY
                </span>
                {isConnected ? (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#06F8D0] animate-pulse" />
                    Wallet Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA] text-sm">
                    <FiHexagon className="text-xs" />
                    Web3 Powered
                  </span>
                )}
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold text-white leading-none">
                FOREX
                <span className="block gradient-text text-4xl sm:text-5xl lg:text-6xl mt-2">
                  TRADER
                </span>
              </h1>
              <p className="mt-4 text-xl sm:text-2xl text-gray-300 font-semibold">
                XAU/USD Specialist
              </p>
              <p className="mt-4 text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bootcamp intensif 1 bulan — khusus analisa Gold vs USD. 
                Dari dasar sampai mahir, dengan mentor profesional dan infrastruktur Web3.
              </p>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
                  >
                    <FiZap />
                    Connect Wallet — Start Trading
                  </button>
                ) : (
                  <Link
                    to="/classview"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
                  >
                    <FiBarChart2 />
                    View Courses
                  </Link>
                )}
                <a
                  href="#features"
                  className="glass-card inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="flex flex-wrap gap-6 sm:gap-12 mt-12 justify-center lg:justify-start">
                {[
                  { value: "500+", label: "Traders" },
                  { value: "95%", label: "Accuracy" },
                  { value: "XAU/USD", label: "Only Pair" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual: Forex + Web3 */}
            <div className="flex-1 flex justify-center lg:justify-end animate-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/20 to-[#06F8D0]/20 rounded-full blur-3xl" />
                <img
                  src={imagehome}
                  alt="Forex Trader"
                  className="relative w-[400px] lg:w-[500px] animate-float"
                />
                <div className="absolute -bottom-4 -left-4 glass-card rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-mono text-gray-300">XAU/USD • LIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────── FEATURES ─────────────── */}
      <div className="relative bg-kempat py-20 lg:py-28 overflow-hidden" id="features">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-4">
              XAU/USD — THE KING
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why This{" "}
              <span className="gradient-text">Forex Bootcamp</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Bukan bootcamp crypto — ini Forex murni. Web3 sebagai infrastruktur, trading sebagai fokus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative glass-card rounded-2xl p-8 card-hover animate-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-[#06F8D0]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-[#06F8D0]/20 flex items-center justify-center mb-6">
                    <feature.icon className="text-xl text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─────────────── ABOUT ─────────────── */}
      <div className="relative bg-utama py-20 lg:py-28 overflow-hidden">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06F8D0]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 animate-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-6">
                FOREX MENTOR
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Hello, Welcome to{" "}
                <span className="gradient-text">AXEEYBOOTCAMP</span>
              </h2>
              <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                Terimakasih sudah berpartisipasi join axeeybootcamp. 
                Semoga adanya program ini bisa membuat kalian lebih semangat dan mengerti. 
                Terimakasih sudah registrasi dan akan bertemu selama 1 bulan kedepan, 
                dan berharap akan mendapat ilmu dari saya.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href="#project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-yellow-500/20 transition-all duration-300"
                >
                  View Portfolio
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex-1 flex justify-center animate-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={imageabout}
                alt="Forex Mentor"
                className="w-[300px] lg:w-[400px] animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────── PROJECTS / ANALYSIS ─────────────── */}
      <div className="relative bg-kempat py-20 lg:py-28 overflow-hidden" id="project">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-bold mb-4">
              REAL ANALYSIS
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              XAU/USD{" "}
              <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-gray-400 text-lg">
              "Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, 
              dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan 
              potensi untuk pertumbuhan lebih lanjut dalam jangka pendek."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1,2,3,4,5,6,7,8].map((_, index) => (
              <div
                key={index}
                className="group glass-card rounded-2xl overflow-hidden card-hover animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-40 sm:h-48 bg-gradient-to-br from-yellow-500/10 to-[#06F8D0]/10 flex items-center justify-center">
                  <FiBarChart2 className="text-5xl text-yellow-500/20 group-hover:text-yellow-400/40 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-utama/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-yellow-400 text-sm font-bold">XAU/USD Analysis</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2 text-sm">ANALISA #{index + 1}</h3>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400">after</span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-400">xauusd</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg mb-8">
              Ini adalah beberapa hasil analisa saya dan entri saya, masih banyak beberapa lagi. 
              Di sini adalah spesialis pair XAU/USD only. Contoh di atas adalah beberapa analisa 
              news yang kami berhasil analisa dan sesuai pergerakan news.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────── CTA ─────────────── */}
      <div className="relative bg-utama py-20 lg:py-28 overflow-hidden">
        <div className="hex-grid opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm font-medium mb-6">
            <FiZap /> Ready to Trade?
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Master{" "}
            <span className="gradient-text">XAU/USD</span>{" "}
            With Web3 Power
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Forex trading bootcamp — khusus XAU/USD — dengan wallet login, crypto payment, 
            dan sertifikat on-chain. Mulai perjalanan trading profesional Anda sekarang.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="glow-button bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
              >
                Connect Wallet
              </button>
            ) : (
              <Link
                to="/register"
                className="glow-button bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
              >
                Register Now
              </Link>
            )}
            <Link
              to="/classview"
              className="glass-card text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
            >
              View Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
