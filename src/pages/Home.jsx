import React from "react";
import imagehome from "../assets/2.png";
import imageabout from "../assets/4.png";
import IMG1 from "../assets/IMG1.jpg";
import IMG2 from "../assets/IMG2.jpg";
import IMG3 from "../assets/IMG3.jpg";
import IMG4 from "../assets/IMG4.jpg";
import IMG5 from "../assets/IMG5.jpg";
import IMG6 from "../assets/IMG6.jpg";
import IMG7 from "../assets/IMG7.jpg";
import IMG8 from "../assets/IMG8.jpg";
import { Link } from "react-router-dom";

const features = [
  { title: "Analisa XAU/USD", desc: "Analisis profesional berbasis teknikal dan fundamental untuk pair emas terhadap dolar AS." },
  { title: "Mentoring Langsung", desc: "Bimbingan 1-on-1 dari mentor berpengalaman di industri trading forex." },
  { title: "Komunitas Eksklusif", desc: "Bergabung dengan komunitas trader aktif untuk berbagi insight dan sinyal." },
];

const Home = () => {
  return (
    <section>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center bg-utama overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-tombol/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 text-center lg:text-left animate-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tombol/10 border border-tombol/20 text-tombol text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-tombol animate-pulse" />
                Elite Trading Bootcamp
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                Master Forex Trading
                <span className="block gradient-text mt-2">
                  With Axeey Student
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Bootcamp intensif 1 bulan untuk menguasai analisa XAU/USD. 
                Dari dasar hingga mahir bersama mentor profesional.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">
                <Link
                  to="#About"
                  className="glow-button inline-flex items-center gap-2 bg-tombol text-utama font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
                >
                  Get Started
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <a
                  href="#About"
                  className="glass-card inline-flex items-center gap-2 text-white font-semibold px-8 py-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </a>
              </div>

              <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
                {[
                  { value: "500+", label: "Students" },
                  { value: "95%", label: "Success Rate" },
                  { value: "24/7", label: "Support" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 flex justify-center lg:justify-end animate-in" style={{ animationDelay: "0.2s" }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-tombol/20 to-accent/20 rounded-full blur-3xl" />
                <img
                  src={imagehome}
                  alt="Trading Analytics"
                  className="relative w-[400px] lg:w-[500px] animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-kempat py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Why Choose{" "}
              <span className="gradient-text">CryptoClass</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg">
              Program bootcamp yang dirancang untuk menghasilkan trader profesional
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card rounded-2xl p-8 card-hover animate-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-xl bg-tombol/10 flex items-center justify-center mb-6">
                  <div className="w-6 h-6 rounded-full bg-tombol/30" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="relative bg-utama py-20 lg:py-28 overflow-hidden" id="About">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            <div className="flex-1 animate-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent-light text-sm font-medium mb-6">
                About Us
              </div>
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
              <a
                href="#project"
                className="inline-flex items-center gap-2 mt-8 glow-button bg-accent text-white font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
              >
                Explore Projects
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            <div className="flex-1 flex justify-center animate-in" style={{ animationDelay: "0.2s" }}>
              <img
                src={imageabout}
                alt="About Axeey"
                className="w-[300px] lg:w-[400px] animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="bg-kempat py-20 lg:py-28" id="project">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Trading Analysis{" "}
              <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-gray-400 text-lg">
              "Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, 
              dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan 
              potensi untuk pertumbuhan lebih lanjut dalam jangka pendek."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[IMG1, IMG2, IMG3, IMG4, IMG5, IMG6, IMG7, IMG8].map((img, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl overflow-hidden card-hover animate-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative group">
                  <img
                    src={img}
                    alt={`Analysis ${index + 1}`}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-utama/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-tombol text-sm font-semibold">XAU/USD Analysis</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-white font-bold mb-2">ANALISA SAYA</h3>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-tombol">
                      after
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400">
                      xauusd
                    </span>
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
            <a
              href="#About"
              className="inline-flex items-center gap-2 glow-button bg-tombol text-utama font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
            >
              Tentang Saya
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-utama py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Start Your{" "}
            <span className="gradient-text">Trading Journey</span>?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Bergabung dengan CryptoClass sekarang dan mulailah perjalanan Anda 
            menjadi trader forex profesional.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="glow-button bg-tombol text-utama font-semibold px-8 py-3 rounded-xl hover:shadow-lg hover:shadow-tombol/20 transition-all duration-300"
            >
              Register Now
            </Link>
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
