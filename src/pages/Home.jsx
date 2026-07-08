import React from "react";
import { Link } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import { FiHexagon, FiZap, FiShield, FiTrendingUp, FiUsers, FiGlobe } from "react-icons/fi";

const features = [
  { icon: FiTrendingUp, title: "XAU/USD Analysis", desc: "Professional technical & fundamental analysis for gold vs USD pair." },
  { icon: FiUsers, title: "1-on-1 Mentoring", desc: "Direct guidance from experienced forex trading mentors." },
  { icon: FiGlobe, title: "Elite Community", desc: "Join an active trader community sharing insights & signals." },
  { icon: FiShield, title: "Smart Contract Auth", desc: "Blockchain-secured authentication and wallet-based access." },
  { icon: FiZap, title: "Instant Settlement", desc: "Crypto payments with instant on-chain confirmation." },
  { icon: FiHexagon, title: "On-Chain Credentials", desc: "Verified credentials stored on the blockchain." },
];

const Home = () => {
  const { isConnected, connectWallet, shortenAddress, account } = useWeb3();

  return (
    <section>
      {/* Hero - Web3 Cyberpunk */}
      <div className="relative min-h-screen flex items-center bg-utama overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 hex-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06F8D0]/5 via-transparent to-[#7C3AED]/5" />

        {/* Glowing Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#06F8D0]/10 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#06F8D0]/5 to-[#7C3AED]/5 rounded-full blur-[150px]" />

        {/* Floating Hexagons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <FiHexagon
              key={i}
              className="absolute text-[#06F8D0]/10 animate-float"
              style={{
                left: `${15 + i * 20}%`,
                top: `${10 + i * 18}%`,
                fontSize: `${24 + i * 12}px`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.3,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left animate-in">
              {/* Web3 Network Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-[#06F8D0] animate-pulse" />
                {isConnected ? (
                  <>Wallet Active • {shortenAddress(account)}</>
                ) : (
                  <>Decentralized Trading Bootcamp</>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
                Trade Smarter
                <span className="block bg-gradient-to-r from-[#06F8D0] via-[#00E5FF] to-[#7C3AED] bg-clip-text text-transparent mt-2">
                  With Web3 Power
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bootcamp intensif 1 bulan untuk menguasai analisa XAU/USD. 
                Dari dasar hingga mahir — dengan keamanan blockchain & pembayaran crypto.
              </p>

              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                {!isConnected ? (
                  <button
                    onClick={connectWallet}
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300 overflow-hidden"
                  >
                    <FiZap className="group-hover:rotate-12 transition-transform" />
                    Connect Wallet to Start
                  </button>
                ) : (
                  <Link
                    to="/classview"
                    className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300 overflow-hidden"
                  >
                    <FiZap className="group-hover:rotate-12 transition-transform" />
                    Explore Courses
                  </Link>
                )}
                <a
                  href="#features"
                  className="glass-card inline-flex items-center gap-2 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              {/* Web3 Stats */}
              <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-12 max-w-lg mx-auto lg:mx-0">
                {[
                  { value: "500+", label: "Students" },
                  { value: "95%", label: "Success Rate" },
                  { value: "24/7", label: "On-Chain" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Web3 Visual */}
            <div className="flex-1 flex justify-center lg:justify-end animate-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute -inset-8 bg-gradient-to-r from-[#06F8D0]/20 to-[#7C3AED]/20 rounded-full blur-3xl" />
                <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-2xl border border-[#06F8D0]/20 bg-gradient-to-br from-[#06F8D0]/5 to-[#7C3AED]/5 backdrop-blur-xl flex items-center justify-center">
                  <div className="text-center">
                    <FiHexagon className="text-6xl sm:text-8xl text-[#06F8D0]/40 mx-auto mb-4 animate-float" />
                    <p className="text-sm text-gray-500 font-mono">WEB3 PROTOCOL</p>
                    <p className="text-xs text-gray-600 mt-1">Blockchain • DeFi • Crypto</p>
                    {isConnected && (
                      <div className="mt-4 px-4 py-2 rounded-lg bg-[#06F8D0]/10 border border-[#06F8D0]/20 inline-block">
                        <p className="text-xs text-[#06F8D0] font-mono">{shortenAddress(account)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features - Web3 Grid */}
      <div className="relative bg-kempat py-20 lg:py-28 overflow-hidden" id="features">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06F8D0]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA] text-sm font-medium mb-4">
              <FiHexagon /> Web3 Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why{" "}
              <span className="bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">CryptoClass</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Bootcamp program designed to produce professional traders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group relative glass-card rounded-2xl p-8 card-hover animate-in overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#06F8D0]/5 to-[#7C3AED]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06F8D0]/20 to-[#7C3AED]/20 flex items-center justify-center mb-6">
                    <feature.icon className="text-xl text-[#06F8D0]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative bg-utama py-20 lg:py-28 overflow-hidden">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 animate-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 text-[#A78BFA] text-sm font-medium mb-6">
                <FiShield /> About Protocol
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">AXEEYBOOTCAMP</span>
              </h2>
              <p className="mt-6 text-gray-400 leading-relaxed text-lg">
                Terimakasih sudah berpartisipasi join axeeybootcamp. 
                Semoga adanya program ini bisa membuat kalian lebih semangat dan mengerti. 
                Terimakasih sudah registrasi dan akan bertemu selama 1 bulan kedepan, 
                dan berharap akan mendapat ilmu dari saya.
              </p>
              <a
                href="#project"
                className="inline-flex items-center gap-2 mt-8 glow-button bg-gradient-to-r from-[#7C3AED] to-[#06F8D0] text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#7C3AED]/20 transition-all duration-300"
              >
                View Portfolio
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <div className="flex-1 flex justify-center animate-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-2xl border border-[#7C3AED]/20 bg-gradient-to-br from-[#7C3AED]/5 to-[#06F8D0]/5 backdrop-blur-xl flex items-center justify-center">
                <div className="text-center p-8">
                  <FiHexagon className="text-5xl text-[#7C3AED]/40 mx-auto mb-4" />
                  <p className="text-white font-bold text-lg">Blockchain Verified</p>
                  <p className="text-gray-500 text-sm mt-2">Smart Contract Audited</p>
                  <div className="mt-6 flex justify-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs bg-[#06F8D0]/10 text-[#06F8D0]">Secure</span>
                    <span className="px-3 py-1 rounded-full text-xs bg-[#7C3AED]/10 text-[#A78BFA]">Decentralized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="relative bg-kempat py-20 lg:py-28 overflow-hidden" id="project">
        <div className="hex-grid opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06F8D0]/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm font-medium mb-4">
              <FiTrendingUp /> On-Chain Analysis
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trading{" "}
              <span className="bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">Portfolio</span>
            </h2>
            <p className="text-gray-400 text-lg">
              "Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, 
              dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan 
              potensi untuk pertumbuhan lebih lanjut dalam jangka pendek."
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1,2,3,4,5,6,7,8].map((_, index) => {
              const img = React.createElement(
                'img',
                {
                  src: [null, null, null, null, null, null, null, null][index],
                  alt: `Analysis ${index + 1}`,
                  className: "w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110",
                  onError: (e) => { e.target.style.display = 'none'; }
                }
              );
              return (
                <div
                  key={index}
                  className="group glass-card rounded-2xl overflow-hidden card-hover animate-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="relative h-40 sm:h-48 bg-gradient-to-br from-[#06F8D0]/10 to-[#7C3AED]/10 flex items-center justify-center">
                    <FiHexagon className="text-4xl text-[#06F8D0]/20 group-hover:text-[#06F8D0]/40 transition-all duration-500 group-hover:rotate-180" />
                    <div className="absolute inset-0 bg-gradient-to-t from-utama/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-[#06F8D0] text-sm font-semibold">XAU/USD Analysis</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-bold mb-2 text-sm">ANALISA #{index + 1}</h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#06F8D0]/10 text-[#06F8D0]">after</span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/5 text-gray-400">xauusd</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-gray-400 text-lg mb-8">
              Ini adalah beberapa hasil analisa saya dan entri saya, masih banyak beberapa lagi. 
              Di sini adalah spesialis pair XAU/USD only. Contoh di atas adalah beberapa analisa 
              news yang kami berhasil analisa dan sesuai pergerakan news.
            </p>
            <a
              href="#About"
              className="inline-flex items-center gap-2 glow-button bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] text-utama font-bold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-[#06F8D0]/20 transition-all duration-300"
            >
              Tentang Saya
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA - Web3 */}
      <div className="relative bg-utama py-20 lg:py-28 overflow-hidden">
        <div className="hex-grid opacity-10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#06F8D0]/30 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06F8D0]/10 border border-[#06F8D0]/20 text-[#06F8D0] text-sm font-medium mb-6">
            <FiZap /> Join the Future
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your{" "}
            <span className="bg-gradient-to-r from-[#06F8D0] to-[#7C3AED] bg-clip-text text-transparent">Web3 Journey</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan CryptoClass sekarang dan mulailah perjalanan Anda 
            menjadi trader forex profesional dengan teknologi blockchain.
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
