const translations = {
  en: {
    nav: { home: "Home", courses: "Courses", pricing: "Pricing", community: "Community", brand: "ForexClass" },
    header: { login: "Login", register: "Register", exit: "Exit" },
    hero: {
      badge: "XAU/USD ONLY",
      badgeWallet: "Wallet Connected",
      title: "Forex",
      subtitle: "XAU/USD Trader",
      desc: "1-month bootcamp — Gold & USD analysis specialist. From basics to pro with professional mentors.",
      connectWallet: "Connect Wallet",
      viewCourses: "View Courses",
      learnMore: "Learn More",
      statsTraders: "Traders",
      statsAccuracy: "Accuracy",
      statsPair: "Only Pair",
    },
    auth: {
      welcomeBack: "Welcome Back",
      loginContinue: "Connect wallet & login to continue",
      createAccount: "Create Account",
      joinBootcamp: "Join the bootcamp community",
      verifyOtp: "Verify OTP",
      enterOtp: "Enter the code sent to your email",
      connectPrompt: "Connect Wallet",
      connectDesc: "Click below to connect your MetaMask",
      connectDescNoMM: "Install MetaMask to use Web3 features",
      connectDescReg: "Connect your wallet to begin registration",
      connectDescRegNoMM: "MetaMask required for registration",
      connectMM: "Connect MetaMask",
      installMM: "Install MetaMask",
      downloadMM: "Download MetaMask",
      orContinue: "or continue with",
      walletConnected: "Wallet Connected",
      connectedAccount: "Connected Account",
      connecting: "Connecting...",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      referralCode: "Referral Code (optional)",
      kodeOtp: "OTP Code",
      verify: "Verify OTP",
      resend: "Resend OTP",
      loading: "Loading...",
      register: "Register",
      login: "Login",
      alreadyAccount: "Already have an account?",
      noAccount: "Don't have an account?",
      loginLink: "Login",
      registerLink: "Register",
      otpExpired: "Kode OTP telah kadaluarsa. Silakan daftar ulang.",
      otpTimer: "Kode akan kadaluarsa dalam",
      welcomeHeader: "Welcome Back",
      createHeader: "Create Account",
      verifyHeader: "Verify OTP",
    },
    toast: { loginSuccess: "Login successful", registerSuccess: "Registration successful", logoutSuccess: "Logout successful", otpSent: "OTP code sent to email", otpResent: "OTP resent successfully", otpVerifySuccess: "OTP verified successfully", otpError: "Invalid OTP", otpFailed: "OTP verification failed", otpExpired: "OTP code has expired", otpResendFailed: "Failed to resend OTP", serverError: "Server error. Please try again later.", invalidData: "Invalid user data.", error: "An error occurred", deleteFailed: "Failed to delete course", updateStatusFailed: "Failed to update course status" },
    features: { badge: "Features", title: "Why This Bootcamp", desc: "Pure forex trading. Web3 as infrastructure.", item1Title: "XAU/USD Specialist", item1Desc: "100% focus on Gold vs USD analysis — the king of forex.", item2Title: "Real Analysis", item2Desc: "Measurable & proven entry points, take profit, and stop loss.", item3Title: "1-on-1 Mentorship", item3Desc: "Direct guidance from a mentor with XAU/USD track record.", item4Title: "Wallet Login", item4Desc: "Login via MetaMask. Web3 authentication, no passwords needed.", item5Title: "Crypto Payment", item5Desc: "Pay subscription with ETH. Instant & decentralized.", item6Title: "On-Chain Certificate", item6Desc: "Certificate on blockchain. Verifiable & tamper-proof." },
    about: { badge: "Mentor", title: "Welcome to", brand: "AXEEYBOOTCAMP", desc1: "Thank you for joining axeeybootcamp.", desc2: "Hopefully this program will make you more enthusiastic and understanding.", desc3: "Thank you for registering and we will meet for the next 1 month,", desc4: "and hopefully you will gain knowledge from me.", portfolio: "View Portfolio" },
    portfolio: { badge: "Portfolio", title: "XAU/USD Analysis", desc: "\"In XAU/USD market analysis based on professionalism, it can be concluded that the gold price trend against the USD shows potential for further growth in the short term.\"", label: "Analisa #", tag1: "after", tag2: "xauusd", footer: "These are some of my analysis results and entries. XAU/USD only specialist." },
    cta: { title: "Master", subtitle: "Wallet login, crypto payment, on-chain certificate. Start your professional trading journey.", connectWallet: "Connect Wallet", registerNow: "Register Now", viewCourses: "View Courses" },
    community: { title: "Community", desc: "Posts & announcements", newPost: "New Post", noPosts: "No posts yet.", error: "Failed to load announcements.", all: "All" },
    createPost: { title: "Create Post", desc: "Share an announcement", titleLabel: "Title", content: "Content", selectRoles: "Select Roles", image: "Image (optional)", submit: "Create Post", allPosts: "All Posts", success: "Announcement created successfully!", error: "Failed to create announcement: ", errorFallback: "An error occurred!", allRoles: "All" },
    courses: { title: "Choose Your Plan", desc: "Pick a course and payment method", fiat: "Fiat", crypto: "Crypto", ethereum: "Ethereum", usdt: "USDT", subscribe: "Subscribe", loginToSubscribe: "Login to subscribe", fiatPayment: "Fiat Payment", price: "Price: ", payNow: "Pay Now", cryptoCheckout: "Crypto Checkout", courseId: "Course ID: ", payWith: "Pay with ", eth: "ETH", usdtLabel: "USDT", connectWallet: "Connect Wallet", processing: "Processing...", empty: "No courses available yet.", loading: "Loading courses...", error: "Failed to load courses", paymentTokenError: "Failed to generate payment token", invalidPrice: "Invalid price format", paymentSuccess: "Payment successful! You are now subscribed.", transactionFailed: "Transaction failed" },
    pricing: { title: "Create Course", desc: "Add a new subscription plan", titleLabel: "Title", description: "Description", content: "Content", price: "Price", roles: "Roles", student: "Student", king: "King", knight: "Knight", submit: "Create Course", success: "Course created!", error: "Something went wrong!" },
    wallet: { connect: "Connect Wallet", connecting: "Connecting...", copy: "Copy Address", copied: "Copied!", etherscan: "Etherscan", disconnect: "Disconnect", balance: "ETH", profile: "Profile", create: "Create Wallet", import: "Import Wallet", send: "Send", receive: "Receive", history: "History", network: "Network", noWallet: "No Wallet Connected", noWalletDesc: "Create a new wallet or import an existing one", saveSeed: "I've Saved My Seed Phrase", yourAddress: "Your Address", balanceLabel: "Balance", txSent: "Transaction Sent!", txFailed: "Transaction Failed", insufBalance: "Insufficient balance", enterAddress: "Enter recipient address", enterAmount: "Enter amount", max: "MAX", confirm: "Confirm", cancel: "Cancel", done: "Done", viewExplorer: "View on Explorer", privateKey: "Private Key", seedPhrase: "Seed Phrase", generate: "Generate Wallet", importTitle: "Import Wallet", createTitle: "Create Wallet", warning: "Never share your private key or seed phrase with anyone" },
    footer: { desc: "Forex bootcamp — XAU/USD specialist with Web3 infrastructure.", menu: "Menu", home: "Home", courses: "Courses", community: "Community", account: "Account", login: "Login", register: "Register", web3: "Web3", metamask: "MetaMask", cryptoPayments: "Crypto Payments", onChainCert: "On-Chain Cert", copyright: "ForexClass.", tagline: "XAU/USD Specialist" },
    userIcon: { profile: "Profile" },
  },
  id: {
    nav: { home: "Beranda", courses: "Kelas", pricing: "Harga", community: "Komunitas", brand: "ForexClass" },
    header: { login: "Masuk", register: "Daftar", exit: "Keluar" },
    hero: {
      badge: "XAU/USD SAJA",
      badgeWallet: "Wallet Terhubung",
      title: "Forex",
      subtitle: "Trader XAU/USD",
      desc: "Bootcamp 1 bulan — khusus analisa Gold vs USD. Dari dasar hingga mahir bersama mentor profesional.",
      connectWallet: "Hubungkan Wallet",
      viewCourses: "Lihat Kelas",
      learnMore: "Pelajari",
      statsTraders: "Trader",
      statsAccuracy: "Akurasi",
      statsPair: "Pair Spesialis",
    },
    auth: {
      welcomeBack: "Selamat Datang",
      loginContinue: "Hubungkan wallet & masuk untuk melanjutkan",
      createAccount: "Buat Akun",
      joinBootcamp: "Bergabung dengan bootcamp",
      verifyOtp: "Verifikasi OTP",
      enterOtp: "Masukkan kode yang dikirim ke email",
      connectPrompt: "Hubungkan Wallet",
      connectDesc: "Klik di bawah untuk menghubungkan MetaMask",
      connectDescNoMM: "Pasang MetaMask untuk menggunakan fitur Web3",
      connectDescReg: "Hubungkan wallet untuk memulai registrasi",
      connectDescRegNoMM: "MetaMask diperlukan untuk registrasi",
      connectMM: "Hubungkan MetaMask",
      installMM: "Pasang MetaMask",
      downloadMM: "Unduh MetaMask",
      orContinue: "atau lanjutkan dengan",
      walletConnected: "Wallet Terhubung",
      connectedAccount: "Akun Terhubung",
      connecting: "Menghubungkan...",
      fullName: "Nama Lengkap",
      email: "Email",
      password: "Kata Sandi",
      referralCode: "Kode Referral (opsional)",
      kodeOtp: "Kode OTP",
      verify: "Verifikasi OTP",
      resend: "Kirim Ulang OTP",
      loading: "Memuat...",
      register: "Daftar",
      login: "Masuk",
      alreadyAccount: "Sudah punya akun?",
      noAccount: "Belum punya akun?",
      loginLink: "Masuk",
      registerLink: "Daftar",
      otpExpired: "Kode OTP telah kadaluarsa. Silakan daftar ulang.",
      otpTimer: "Kode akan kadaluarsa dalam",
      welcomeHeader: "Selamat Datang",
      createHeader: "Buat Akun",
      verifyHeader: "Verifikasi OTP",
    },
    toast: { loginSuccess: "Login berhasil", registerSuccess: "Registrasi berhasil", logoutSuccess: "Logout berhasil", otpSent: "Kode OTP dikirim ke email", otpResent: "OTP berhasil dikirim!", otpVerifySuccess: "OTP berhasil diverifikasi", otpError: "OTP salah", otpFailed: "Verifikasi OTP gagal", otpExpired: "Waktu untuk memasukkan kode OTP telah habis.", otpResendFailed: "Gagal mengirim OTP", serverError: "Terjadi kesalahan di server. Silakan coba lagi nanti!", invalidData: "Data pengguna tidak valid.", error: "Terjadi kesalahan", errorDelete: "Gagal menghapus kursus", errorUpdate: "Gagal memperbarui status kursus" },
    features: { badge: "Fitur", title: "Mengapa Bootcamp Ini", desc: "Trading forex murni. Web3 sebagai infrastruktur.", item1Title: "Spesialis XAU/USD", item1Desc: "Fokus 100% pada analisa Gold vs USD — the king of forex.", item2Title: "Analisa Real", item2Desc: "Entry points, take profit, dan stop loss yang terukur & terbukti.", item3Title: "Mentorship 1-on-1", item3Desc: "Bimbingan langsung dari mentor dengan track record XAU/USD.", item4Title: "Login Wallet", item4Desc: "Login via MetaMask. Web3 authentication, no passwords needed.", item5Title: "Pembayaran Krypto", item5Desc: "Bayar subscription pakai ETH. Instant & decentralized.", item6Title: "Sertifikat On-Chain", item6Desc: "Sertifikat di blockchain. Verifiable & tamper-proof." },
    about: { badge: "Mentor", title: "Selamat Datang di", brand: "AXEEYBOOTCAMP", desc1: "Terimakasih sudah berpartisipasi join axeeybootcamp.", desc2: "Semoga adanya program ini bisa membuat kalian lebih semangat dan mengerti.", desc3: "Terimakasih sudah registrasi dan akan bertemu selama 1 bulan kedepan,", desc4: "dan berharap akan mendapat ilmu dari saya.", portfolio: "Lihat Portfolio" },
    portfolio: { badge: "Portfolio", title: "Analisa XAU/USD", desc1: "\"Dalam analisis pasar XAU/USD yang berbasis pada profesionalisme, dapat disimpulkan bahwa tren harga emas terhadap dolar AS menunjukkan potensi untuk pertumbuhan lebih lanjut dalam jangka pendek.\"", label: "Analisa #", tag1: "after", tag2: "xauusd", footer: "Ini adalah beberapa hasil analisa saya dan entri saya. Spesialis pair XAU/USD only." },
    cta: { title: "Kuasai", subtitle: "Wallet login, crypto payment, on-chain certificate. Mulai perjalanan trading profesional Anda.", connectWallet: "Hubungkan Wallet", registerNow: "Daftar Sekarang", viewCourses: "Lihat Kelas" },
    community: { title: "Komunitas", desc: "Postingan & pengumuman", newPost: "Posting Baru", noPosts: "Belum ada postingan.", error: "Gagal mengambil pengumuman.", all: "Semua" },
    createPost: { title: "Buat Postingan", desc: "Bagikan pengumuman", titleLabel: "Judul", content: "Konten", selectRoles: "Pilih Peran", image: "Gambar (opsional)", submit: "Buat Postingan", allPosts: "Semua Postingan", success: "Pengumuman berhasil dibuat!", error: "Gagal membuat pengumuman: " },    
    courses: { title: "Pilih Paket", desc: "Pilih kursus dan metode pembayaran", fiat: "Fiat", crypto: "Krypto", ethereum: "Ethereum", usdt: "USDT", subscribe: "Langganan", loginToSubscribe: "Masuk untuk berlangganan", fiatPayment: "Pembayaran Fiat", price: "Harga: ", payNow: "Bayar Sekarang", cryptoCheckout: "Pembayaran Krypto", courseId: "ID Kursus: ", payWith: "Bayar dengan ", eth: "ETH", usdtLabel: "USDT", connectWallet: "Hubungkan Wallet", processing: "Memproses...", empty: "Belum ada kursus tersedia.", loading: "Memuat kursus...", error: "Gagal memuat kursus", paymentTokenError: "Gagal generate token pembayaran", invalidPrice: "Format harga tidak valid", paymentSuccess: "Pembayaran berhasil! Anda sekarang terdaftar.", transactionFailed: "Transaksi gagal" },
    pricing: { title: "Buat Kursus", desc: "Tambah paket langganan baru", titleLabel: "Judul", description: "Deskripsi", content: "Konten", price: "Harga", roles: "Peran", student: "Siswa", king: "Raja", knight: "Ksatria", submit: "Buat Kursus", success: "Kursus berhasil dibuat!", error: "Terjadi kesalahan!" },
    wallet: { connect: "Hubungkan Wallet", connecting: "Menghubungkan...", copy: "Salin Alamat", copied: "Disalin!", etherscan: "Etherscan", disconnect: "Putuskan", balance: "ETH", profile: "Profil", create: "Buat Wallet", import: "Import Wallet", send: "Kirim", receive: "Terima", history: "Riwayat", network: "Jaringan", noWallet: "Belum Ada Wallet", noWalletDesc: "Buat wallet baru atau import wallet yang sudah ada", saveSeed: "Saya Sudah Menyimpan Seed Phrase", yourAddress: "Alamat Anda", balanceLabel: "Saldo", txSent: "Transaksi Terkirim!", txFailed: "Transaksi Gagal", insufBalance: "Saldo tidak mencukupi", enterAddress: "Masukkan alamat penerima", enterAmount: "Masukkan jumlah", max: "MAX", confirm: "Konfirmasi", cancel: "Batal", done: "Selesai", viewExplorer: "Lihat di Explorer", privateKey: "Kunci Privat", seedPhrase: "Seed Phrase", generate: "Buat Wallet", importTitle: "Import Wallet", createTitle: "Buat Wallet Baru", warning: "Jangan pernah membagikan private key atau seed phrase Anda kepada siapapun" },
    footer: { desc: "Bootcamp Forex — Spesialis XAU/USD dengan infrastruktur Web3.", menu: "Menu", home: "Beranda", courses: "Kelas", community: "Komunitas", account: "Akun", login: "Masuk", register: "Daftar", web3: "Web3", metamask: "MetaMask", cryptoPayments: "Pembayaran Krypto", onChainCert: "Sertifikat On-Chain", copyright: "ForexClass.", tagline: "Spesialis XAU/USD" },
    userIcon: { profile: "Profil" },
  },
};

let currentLang = localStorage.getItem("lang") || "en";

export const getLang = () => currentLang;

export const setLang = (lang) => {
  if (translations[lang]) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
  }
};

const deepGet = (obj, path) => {
  const keys = path.split(".");
  let result = obj;
  for (const key of keys) {
    if (result && typeof result === "object") result = result[key];
    else return null;
  }
  return result;
};

export const t = (path) => {
  const lang = translations[currentLang];
  const result = deepGet(lang, path);
  if (result) return result;
  const fallback = deepGet(translations.en, path);
  return fallback || path;
};