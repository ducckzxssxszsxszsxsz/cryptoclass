import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import imagehome from "../assets/2.png";
import imageabout from "../assets/4.png";
import { FiBarChart2, FiTrendingUp, FiUsers, FiShield, FiZap, FiHexagon } from "react-icons/fi";

const features = [
  { icon: FiBarChart2, title: "XAU/USD Specialist", desc: "Fokus 100% pada analisa Gold vs USD — the king of forex." },
  { icon: FiTrendingUp, title: "Real Analysis", desc: "Entry points, take profit, dan stop loss yang terukur & terbukti." },
  { icon: FiUsers, title: "1-on-1 Mentorship", desc: "Bimbingan langsung dari mentor dengan track record XAU/USD." },
  { icon: FiShield, title: "Wallet Login", desc: "Login via MetaMask. Web3 authentication, no passwords needed." },
  { icon: FiZap, title: "Crypto Payment", desc: "Bayar subscription pakai ETH. Instant & decentralized." },
  { icon: FiHexagon, title: "On-Chain Certificate", desc: "Sertifikat di blockchain. Verifiable & tamper-proof." },
];

const Home = () => {
  const { isConnected, connectWallet } = useWeb3();

  return (
    <section>
      {/* Hero */}
      <div className="min-h-screen flex items-center bg-utama">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left animate-in">
              <div className="flex flex-wrap gap-2 mb-6 justify-center lg:justify-start">
                <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-semibold tracking-wide">
                  XAU/USD ONLY
                </span>
                {isConnected && (
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold tracking-wide">
                    Wallet Connected
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight">
                Forex
                <span className="block gradient-text text-3xl sm:text-4xl lg:text-5xl mt-1">
                  XAU/USD Trader
                </span>
              </h1>
              <p className="mt-4 text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Bootcamp 1 bulan — khusus analisa Gold vs USD. Dari dasar hingga mahir bersama mentor profesional.
              </p>

              <div className="flex flex-wrap gap-3 mt-8 justify-center lg:justify-start">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="inline-flex items-center gap-2 bg-yellow-500 text-utama font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <Link
                    to="/classview"
                    className="inline-flex items-center gap-2 bg-yellow-500 text-utama font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
                  >
                    View Courses
                  </Link>
                )}
                <a
                  href="#features"
                  className="inline-flex items-center gap-2 text-gray-300 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>

              <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                {[
                  { value: "500+", label: "Traders" },
                  { value: "95%", label: "Accuracy" },
                  { value: "XAU/USD", label: "Only Pair" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="text-xl sm:text-2xl font-bold text-white">{s.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end animate-in" style={{ animationDelay: "0.15s" }}>
              <div className="relative">
                <img src={imagehome} alt="" className="w-[320px] lg:w-[420px]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-kempat py-20 lg:py-24" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Features</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              Why This Bootcamp
            </h2>
            <p className="text-gray-400 mt-2">
              Forex trading murni. Web3 sebagai infrastruktur.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="glass-card rounded-xl p-6 card-hover animate-in"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <f.icon className="text-base text-yellow-400" />
                </div>
                <h3 className="text-base font-semibold text-white mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-utama py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 animate-in">
              <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Mentor</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                Welcome to{" "}
                <span className="gradient-text">AXEEYBOOTCAMP</span>
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                Terimakasih sudah berpartisipasi join axeeybootcamp. 
                Semoga adanya program ini bisa membuat kalian lebih semangat dan mengerti. 
                Terimakasih sudah registrasi dan akan bertemu selama 1 bulan kedepan, 
                dan berharap akan mendapat ilmu dari saya.
              </p>
              <a
                href="#project"
                className="inline-flex items-center gap-1.5 mt-6 text-sm text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
              >
                View Portfolio &rarr;
              </a>
            </div>

            <div className="flex-1 flex justify-center animate-in" style={{ animationDelay: "0.15s" }}>
              <img src={imageabout} alt="" className="w-[260px] lg:w-[340px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Portfolio */}
      <div className="bg-kempat py-20 lg:py-24" id="project">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-yellow-400 text-xs font-semibold tracking-widest uppercase">Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">
              XAU/USD Analysis
            </h2>
            <p className="text-gray-400 mt-2">
              "Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, 
              dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan 
              potensi untuk pertumbuhan lebih lanjut dalam jangka pendek."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[1,2,3,4,5,6,7,8].map((_, i) => (
              <div key={i} className="glass-card rounded-xl overflow-hidden card-hover animate-in" style={{ animationDelay: `${i * 0.04}s` }}>
                <div className="h-36 sm:h-40 bg-gradient-to-br from-yellow-500/10 to-kempat flex items-center justify-center">
                  <FiBarChart2 className="text-3xl text-gray-600" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-white">Analisa #{i + 1}</p>
                  <div className="flex gap-1.5 mt-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-yellow-500/10 text-yellow-400">after</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/5 text-gray-500">xauusd</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto mt-8">
            Ini adalah beberapa hasil analisa saya dan entri saya. Spesialis pair XAU/USD only.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-utama py-20 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Master{" "}
            <span className="gradient-text">XAU/USD</span>
          </h2>
          <p className="text-gray-400 mt-3 mb-8">
            Wallet login, crypto payment, on-chain certificate. 
            Mulai perjalanan trading profesional Anda.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {!isConnected ? (
              <button
                onClick={connectWallet}
                className="inline-flex items-center gap-2 bg-yellow-500 text-utama font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Connect Wallet
              </button>
            ) : (
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-yellow-500 text-utama font-semibold px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-200"
              >
                Register Now
              </Link>
            )}
            <Link
              to="/classview"
              className="inline-flex items-center gap-2 text-gray-300 px-6 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition-colors duration-200"
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
