import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FiHome, FiFeather, FiPhone, FiLogIn, FiArrowRight, FiActivity,
  FiAlertCircle, FiCheck, FiUsers, FiAward, FiTrendingUp, FiSliders,
  FiClock, FiTrendingDown, FiShield, FiChevronDown, FiMail, FiInstagram,
  FiMapPin, FiTwitter, FiStar, FiGrid, FiUserPlus
} from "react-icons/fi";

export default function CRMLandingPage() {
  // State for Accordion FAQ
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqData = [
    {
      q: "Apakah Veloura CRM ini gratis?",
      a: "Kami menyediakan uji coba gratis (Free Trial) selama 14 hari untuk mengakses seluruh fitur premium. Setelah masa uji coba berakhir, Anda dapat memilih paket gratis untuk butik pemula dengan fitur esensial, atau berlangganan paket Pro dengan harga terjangkau."
    },
    {
      q: "Apakah data pelanggan butik saya aman?",
      a: "Sangat aman. Seluruh data pelanggan Anda disimpan menggunakan enkripsi SSL/TLS tingkat tinggi dan infrastruktur cloud yang terproteksi. Data Anda 100% milik butik Anda dan tidak akan pernah dibagikan kepada pihak ketiga."
    },
    {
      q: "Bisa digunakan melalui HP atau tablet?",
      a: "Tentu saja. Veloura CRM dirancang dengan antarmuka yang sangat responsif (Mobile-Responsive). Anda dan tim butik dapat dengan mudah memasukkan data pelanggan, melihat laporan, atau mengelola membership langsung dari smartphone atau tablet di toko."
    },
    {
      q: "Bagaimana cara mendaftar dan mulai menggunakan?",
      a: "Anda cukup klik tombol 'Daftar Gratis', isi formulir pendaftaran singkat dengan nama butik Anda, dan akun Anda akan langsung aktif dalam hitungan detik tanpa perlu memasukkan informasi kartu kredit."
    },
    {
      q: "Bagaimana sistem membership bekerja di Veloura CRM?",
      a: "Sistem kami secara otomatis mendeteksi setiap transaksi pelanggan. Berdasarkan akumulasi pembelanjaan mereka, sistem akan langsung menaikkan tier membership (misalnya dari Silver ke Gold) secara real-time dan memberikan benefit diskon yang sesuai secara otomatis di kasir."
    }
  ];

  const testimonials = [
    {
      name: "Sophia Henderson",
      role: "Pemilik Clarissa Couture",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "Semenjak menggunakan Veloura CRM, kami berhasil meningkatkan retensi pelanggan hingga 40%. Sistem otomatisasi membership-nya membuat pelanggan kami merasa sangat dihargai.",
      rating: 5
    },
    {
      name: "Dimitri Alistair",
      role: "Manajer Operasional Atelier 9",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "Sebelumnya data ukuran gaun pelanggan tercecer di banyak chat WhatsApp. Sekarang semuanya tersimpan rapi di satu tempat. Tim desain kami sangat terbantu dengan database ukuran yang terintegrasi ini.",
      rating: 5
    },
    {
      name: "Nabila Rahmani",
      role: "Founder Bloom Boutique",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      text: "Otomatisasi ucapan ulang tahun dengan voucher hadiah instan telah menjadi generator penjualan terbaik kami. 70% pelanggan yang menerima voucher memutuskan untuk kembali belanja.",
      rating: 5
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Pendaftaran Cepat",
      desc: "Pelanggan baru melakukan pendaftaran keanggotaan via scan QR code di butik Anda atau melalui formulir kasir dalam waktu kurang dari 30 detik."
    },
    {
      step: "02",
      title: "Rekam Riwayat Belanja",
      desc: "Setiap nominal belanja, jenis kain, dan ukuran pakaian terekam secara otomatis di database pusat setiap kali mereka melakukan transaksi."
    },
    {
      step: "03",
      title: "Naik Tier Otomatis",
      desc: "Saat transaksi melewati ambang batas tertentu, sistem langsung menaikkan tier membership mereka (Silver, Gold, Royal) dan mengirimkan notifikasi reward."
    },
    {
      step: "04",
      title: "Promosi Tepat Sasaran",
      desc: "Kirimkan penawaran koleksi busana baru yang relevan dengan ukuran dan model favorit mereka secara otomatis, meningkatkan peluang konversi."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFBFB] text-slate-800 font-poppins selection:bg-crm-pink/50 relative overflow-hidden">
      {/* Background Decorative Blur Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-[#fdf2f5] to-transparent -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-crm-pink/15 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-[30%] left-[-15%] w-[450px] h-[450px] bg-crm-pink/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-[55%] right-[-10%] w-[500px] h-[500px] bg-[#F5E6EC]/25 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[80%] left-[-10%] w-[400px] h-[400px] bg-crm-pink/5 rounded-full blur-[110px] -z-10" />

      {/* ==========================================================
          AREA TOP (Attention)
         ========================================================== */}

      {/* 1. NAVBAR */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/crm" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-crm-pink to-[#EAA1C2] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-crm-pink/20">
              V
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-[0.2em] text-slate-800 uppercase block group-hover:text-crm-pink transition-colors">
                VELOURA<span className="text-crm-gold">.</span>
              </span>
              <span className="text-[7px] tracking-[0.3em] uppercase text-slate-400 font-bold -mt-1 block">Boutique CRM</span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-widest uppercase text-slate-500">
            <a href="#" className="text-slate-800 border-b border-crm-gold pb-1 transition-all">Home</a>
            <a href="#problem" className="hover:text-slate-800 transition-colors">Problems</a>
            <a href="#features" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#workflow" className="hover:text-slate-800 transition-colors">Workflow</a>
            <a href="#testimonials" className="hover:text-slate-800 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-slate-800 transition-colors">FAQ</a>
          </div>

          {/* CTA/Login */}
          <div className="flex items-center gap-4">
            <Link to="/login" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors">
              <FiLogIn className="text-sm" /> Masuk
            </Link>
            <Link to="/register" className="hidden sm:inline-flex bg-gradient-to-r from-crm-pink to-[#EAA1C2] hover:from-[#f6b4d0] hover:to-[#e18eaf] text-white text-[10px] font-bold tracking-[0.2em] uppercase px-5 py-3 rounded-xl shadow-lg shadow-crm-pink/25 hover:shadow-xl hover:shadow-crm-pink/35 hover:-translate-y-0.5 transition-all">
              Mulai Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-crm-pink/10 border border-crm-pink/20 text-xs font-semibold text-[#D3739B] tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-crm-pink animate-pulse" />
              Sistem CRM Butik Premium
            </div>
            
            <h1 className="text-4xl md:text-[3.2rem] font-serif font-normal text-slate-800 leading-[1.1] tracking-tight">
              Kelola Hubungan <br />
              <span className="italic font-light text-crm-pink-dark">Pelanggan</span> dengan <br />
              <span className="font-bold relative inline-block">
                Lebih Mudah
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-crm-pink/30 -z-10" />
              </span>
            </h1>

            <p className="text-sm md:text-base text-slate-500 leading-relaxed max-w-lg font-light">
              Veloura CRM membantu butik mengelola data pelanggan, membership, riwayat transaksi, dan promosi dalam satu dashboard. Dirancang khusus untuk pengalaman ritel fesyen mewah yang personal.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link to="/register" className="bg-gradient-to-r from-crm-pink to-[#EAA1C2] hover:from-[#f6b4d0] hover:to-[#e18eaf] text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg shadow-crm-pink/25 hover:shadow-xl hover:shadow-crm-pink/35 hover:-translate-y-0.5 transition-all flex items-center gap-2">
                Mulai Gratis <FiArrowRight />
              </Link>
              <a href="#demo" className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                Lihat Demo
              </a>
            </div>
          </div>

          {/* Hero Image / Mockup */}
          <div className="lg:col-span-6">
            <div className="relative p-2 bg-white/40 backdrop-blur-md border border-white/80 rounded-3xl shadow-2xl shadow-slate-200/50">
              <div className="bg-slate-900 rounded-2xl overflow-hidden aspect-[16/10] shadow-inner relative group border border-slate-800">
                {/* Simulated Screen Interface */}
                <div className="absolute inset-0 bg-slate-950 p-4 text-xs font-mono text-slate-400 flex flex-col justify-between select-none">
                  {/* Top bar */}
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="text-[10px] bg-slate-900 px-3 py-0.5 rounded text-slate-500">veloura-boutique-crm.com/dashboard</div>
                    <div className="w-8" />
                  </div>

                  {/* Dashboard body */}
                  <div className="flex-1 grid grid-cols-12 gap-3 pt-3 text-[9px]">
                    {/* Sidebar */}
                    <div className="col-span-3 border-r border-slate-900 pr-2 space-y-2 text-left">
                      <div className="h-4 bg-crm-pink/20 rounded-md w-full" />
                      <div className="h-3 bg-slate-900 rounded w-4/5" />
                      <div className="h-3 bg-slate-900 rounded w-3/4" />
                      <div className="h-3 bg-slate-900 rounded w-5/6" />
                    </div>
                    {/* Main Workspace */}
                    <div className="col-span-9 space-y-3 text-left">
                      {/* Grid cards */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                          <p className="text-[8px] text-slate-500">Member Aktif</p>
                          <p className="text-xs font-bold text-white mt-0.5">1,248</p>
                        </div>
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                          <p className="text-[8px] text-slate-500">Pendapatan</p>
                          <p className="text-xs font-bold text-crm-gold mt-0.5">IDR 45.8M</p>
                        </div>
                        <div className="p-2 bg-slate-900 border border-slate-800 rounded">
                          <p className="text-[8px] text-slate-500">CS Response</p>
                          <p className="text-xs font-bold text-emerald-400 mt-0.5">99.2%</p>
                        </div>
                      </div>

                      {/* Visual Graphic Representation */}
                      <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3 h-20 flex flex-col justify-between">
                        <div className="flex justify-between items-center text-[7px] text-slate-500">
                          <span>Analisis Penjualan & Pelanggan Baru</span>
                          <span className="text-crm-pink">Q2 Target</span>
                        </div>
                        <div className="flex items-end gap-1.5 h-10 pt-2">
                          <div className="bg-crm-pink/30 h-1/3 w-full rounded-sm" />
                          <div className="bg-crm-pink/40 h-2/5 w-full rounded-sm" />
                          <div className="bg-crm-pink/50 h-3/5 w-full rounded-sm" />
                          <div className="bg-crm-pink/70 h-4/5 w-full rounded-sm" />
                          <div className="bg-gradient-to-t from-crm-pink to-[#EAA1C2] h-full w-full rounded-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Outer decorative overlay */}
              <div className="absolute -bottom-4 -left-4 bg-white border border-slate-100 p-3 rounded-2xl shadow-xl flex items-center gap-2 max-w-[150px] animate-bounce">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <FiActivity className="text-sm" />
                </div>
                <div className="text-left">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Efisiensi</p>
                  <p className="text-xs font-bold text-slate-800">+45% Naik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================
          AREA MIDDLE (Interest & Desire)
         ========================================================== */}

      {/* 3. PROBLEM SECTION */}
      <section id="problem" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-crm-gold uppercase block">Hambatan Bisnis Butik</span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
            Masih Mengelola Pelanggan Secara <span className="italic font-light text-crm-pink-dark">Manual?</span>
          </h2>
          <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Data Tercecer",
              desc: "Catatan pelanggan terpisah di WhatsApp, kasir, dan kertas buku tamu, rawan hilang dan sulit diakses cepat.",
              icon: <FiAlertCircle className="text-rose-400 text-2xl" />
            },
            {
              title: "Sulit Kenali VIP",
              desc: "Kehilangan kesempatan memanjakan pelanggan premium karena tidak tahu siapa pembeli paling setia Anda.",
              icon: <FiAward className="text-rose-400 text-2xl" />
            },
            {
              title: "Promosi Random",
              desc: "Pesan broadcast WhatsApp tidak terarah yang justru mengganggu pelanggan dan menghasilkan konversi rendah.",
              icon: <FiSliders className="text-rose-400 text-2xl" />
            },
            {
              title: "Analisis Buta",
              desc: "Gagal memprediksi model pakaian favorit dan tren musiman berikutnya karena ketiadaan data visual.",
              icon: <FiTrendingDown className="text-rose-400 text-2xl" />
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 hover:border-crm-pink/30 hover:shadow-xl hover:shadow-slate-100/60 hover:-translate-y-1 transition-all duration-300 text-left space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800">{item.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SOLUTION SECTION */}
      <section className="bg-gradient-to-r from-crm-pink/10 to-[#FDF4F7] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-left">
              <span className="text-xs font-bold tracking-[0.2em] text-[#D3739B] uppercase block">Jawaban Modern & Elegan</span>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-800 leading-tight">
                Transformasi Digital Butik Anda dengan <span className="font-bold">Veloura CRM</span>
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed font-light">
                Veloura mengeliminasi cara-cara konvensional yang membuang waktu. Dengan menyatukan database pelanggan, analitik tren belanja, dan manajemen membership otomatis, Anda memiliki kendali penuh atas loyalitas pelanggan Anda secara profesional.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  "Integrasi satu pintu antara kasir offline dan butik online.",
                  "Klasifikasi tiering membership VIP secara instan & real-time.",
                  "Kirim kupon promo otomatis sesuai preferensi busana pelanggan."
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                      <FiCheck className="text-xs" />
                    </div>
                    <span className="text-xs font-medium text-slate-700 leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 space-y-6 text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-crm-pink/20 rounded-bl-full -z-10" />
                <h4 className="text-sm font-bold tracking-widest uppercase text-crm-gold">Mengapa Memilih Kami?</h4>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-crm-pink/10 flex items-center justify-center text-crm-pink-dark shrink-0">
                      <FiClock className="text-lg" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">Hemat 15+ Jam Seminggu</h5>
                      <p className="text-[11px] text-slate-400 mt-1 font-light">Kurangi pekerjaan admin manual dengan otomasi push notification dan auto-tiering.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-crm-pink/10 flex items-center justify-center text-crm-pink-dark shrink-0">
                      <FiShield className="text-lg" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800">Keamanan Data Terjamin</h5>
                      <p className="text-[11px] text-slate-400 mt-1 font-light">Setiap data pelanggan dienkripsi dengan standar industri tertinggi untuk privasi butik.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURE SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-crm-gold uppercase block">Pilar Fungsional</span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
            Fitur Utama Pendukung <span className="italic font-light text-crm-pink-dark">Pertumbuhan</span> Butik
          </h2>
          <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Customer Management",
              desc: "Simpan riwayat ukuran pakaian, preferensi merek kain, hari ulang tahun, serta catatan personalisasi gaun untuk menyajikan pengalaman belanja bintang lima.",
              icon: <FiUsers className="text-white text-xl" />,
              bg: "from-[#FAD0C4] to-[#FF9A9E]"
            },
            {
              title: "Membership Program",
              desc: "Atur poin belanja, diskon bertingkat untuk Silver, Gold, hingga Royal Club secara otomatis. Kurangi proses pencatatan poin manual.",
              icon: <FiAward className="text-white text-xl" />,
              bg: "from-[#FBC2EB] to-[#A6C1EE]"
            },
            {
              title: "Sales Analytics",
              desc: "Visualisasikan produk paling laku, tren pendapatan bulanan, dan efektivitas promosi melalui diagram interaktif yang mudah dipahami.",
              icon: <FiTrendingUp className="text-white text-xl" />,
              bg: "from-[#84FAB0] to-[#8FD3F4]"
            },
            {
              title: "Promotion Automation",
              desc: "Kirim SMS atau push campaign khusus untuk menyapa pelanggan yang berulang tahun atau pelanggan dormant dengan penawaran gaun terbaru secara terjadwal.",
              icon: <FiSliders className="text-white text-xl" />,
              bg: "from-[#A1C4FD] to-[#C2E9FB]"
            }
          ].map((feat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-100/50 hover:border-crm-pink/20 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row gap-6 text-left">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${feat.bg} flex items-center justify-center shrink-0 shadow-md`}>
                {feat.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800">{feat.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. BENEFIT SECTION */}
      <section id="benefits" className="bg-[#FAF6F7] py-20 border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#D3739B] uppercase block">Mengapa Ini Penting?</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
              Manfaat Nyata untuk <span className="font-bold">Keberlanjutan Bisnis</span>
            </h2>
            <p className="text-xs text-slate-400 font-light">Tiga pilar keunggulan bisnis yang akan Anda rasakan sejak bulan pertama penggunaan.</p>
            <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Menghemat Waktu",
                desc: "Otomatisasi pencatatan data dan pelaporan harian membuat tim butik Anda bisa fokus melayani pelanggan dengan maksimal.",
                num: "01"
              },
              {
                title: "Meningkatkan Loyalitas",
                desc: "Program membership eksklusif yang transparan memotivasi pelanggan untuk kembali belanja demi meningkatkan status tier VIP mereka.",
                num: "02"
              },
              {
                title: "Meningkatkan Penjualan",
                desc: "Promosi bertarget berdasarkan riwayat minat pakaian menghasilkan tingkat keberhasilan transaksi hingga 3x lipat dibanding broadcast biasa.",
                num: "03"
              }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-50 relative overflow-hidden group hover:shadow-lg transition-all duration-300 text-left">
                <span className="absolute right-6 top-4 font-serif text-[4rem] font-bold text-slate-100/70 group-hover:text-crm-pink/20 transition-colors select-none leading-none">
                  {benefit.num}
                </span>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-lg font-bold text-slate-800 group-hover:text-crm-pink-dark transition-colors">{benefit.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-light">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="bg-gradient-to-r from-crm-pink to-[#EAA1C2] rounded-[3rem] p-10 md:p-16 text-white shadow-xl shadow-crm-pink/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-serif font-bold">5,000+</p>
              <p className="text-[10px] tracking-[0.2em] font-semibold uppercase text-white/80">Pelanggan Terkelola</p>
            </div>
            <div className="space-y-2 border-y md:border-y-0 md:border-x border-white/20 py-8 md:py-0">
              <p className="text-4xl md:text-5xl font-serif font-bold">98%</p>
              <p className="text-[10px] tracking-[0.2em] font-semibold uppercase text-white/80">Customer Satisfaction</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl md:text-5xl font-serif font-bold">1,200+</p>
              <p className="text-[10px] tracking-[0.2em] font-semibold uppercase text-white/80">Member Aktif VIP</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. WORKFLOW CRM SECTION (🌟 NEW) */}
      <section id="workflow" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-crm-gold uppercase block">Alur Proses Kerja</span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
            Bagaimana Veloura CRM <span className="italic font-light text-crm-pink-dark">Bekerja?</span>
          </h2>
          <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 relative text-left space-y-4 hover:shadow-lg transition-all duration-300">
              <span className="text-3xl font-serif font-bold text-crm-pink/30 block">{step.step}</span>
              <h3 className="text-base font-bold text-slate-800">{step.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed font-light">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. TESTIMONIAL SECTION (🌟 NEW) */}
      <section id="testimonials" className="bg-[#FAF6F7] py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-[#D3739B] uppercase block">Testimoni Klien</span>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
              Kisah Sukses dari <span className="font-bold">Para Pemilik Butik</span>
            </h2>
            <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col justify-between text-left hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-crm-gold">
                    {[...Array(test.rating)].map((_, i) => (
                      <FiStar key={i} className="fill-current text-xs" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-light italic">
                    "{test.text}"
                  </p>
                </div>
                {/* Author Info */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-50">
                  <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-crm-pink/20" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{test.name}</h4>
                    <p className="text-[10px] text-slate-400 font-light">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ SECTION (🌟 NEW) */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center space-y-4 mb-16">
          <span className="text-xs font-bold tracking-[0.2em] text-crm-gold uppercase block">Pertanyaan Umum</span>
          <h2 className="text-3xl md:text-4xl font-serif text-slate-800">
            Ada Pertanyaan <span className="italic font-light text-crm-pink-dark">Tentang Kami?</span>
          </h2>
          <div className="w-16 h-[2px] bg-crm-pink mx-auto mt-2" />
        </div>

        <div className="space-y-4 text-left">
          {faqData.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition-all duration-300">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between gap-4 font-semibold text-slate-800 hover:text-crm-pink-dark transition-colors text-xs md:text-sm"
                >
                  <span>{faq.q}</span>
                  <FiChevronDown className={`text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-crm-pink-dark" : ""}`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 border-t border-slate-50" : "max-h-0"} overflow-hidden`}>
                  <p className="p-6 text-xs text-slate-500 leading-relaxed font-light bg-[#FCFAF9]">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==========================================================
          AREA BOTTOM (Action)
         ========================================================== */}

      {/* 11. BIG CTA BANNER (🌟 NEW) */}
      <section className="max-w-7xl mx-auto px-6 pb-24 text-center">
        <div className="bg-gradient-to-tr from-[#1E293B] to-[#0F172A] rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-1/2 -right-1/4 w-[400px] h-[400px] bg-crm-pink/10 rounded-full blur-[80px]" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[400px] h-[400px] bg-crm-gold/10 rounded-full blur-[80px]" />

          <div className="max-w-3xl mx-auto space-y-8 relative z-10">
            <span className="text-xs font-bold tracking-[0.2em] text-crm-gold uppercase block">Uji Coba 14 Hari Tanpa Risiko</span>
            <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight">
              Mulai Tingkatkan Loyalitas Pelanggan Bersama <br />
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-crm-pink to-[#EAA1C2]">Veloura CRM</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed font-light">
              Gabung dengan ratusan butik modern lainnya yang telah merombak cara mengelola loyalitas klien premium secara digital.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-gradient-to-r from-crm-pink to-[#EAA1C2] hover:from-[#f6b4d0] hover:to-[#e18eaf] text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg shadow-crm-pink/25 hover:shadow-xl hover:shadow-crm-pink/35 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <FiUserPlus className="text-sm" /> Daftar Gratis Sekarang
              </Link>
              <Link to="/login" className="bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <FiLogIn className="text-sm" /> Masuk Portal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 12. COMPREHENSIVE FOOTER (🌟 NEW) */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 text-left text-xs font-medium">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Logo & Contact details */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/crm" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-crm-pink to-[#EAA1C2] flex items-center justify-center text-white font-bold text-lg shadow-md shadow-crm-pink/20">
                V
              </div>
              <div>
                <span className="font-serif text-lg font-bold tracking-[0.2em] text-white uppercase block">
                  VELOURA<span className="text-crm-gold">.</span>
                </span>
                <span className="text-[7px] tracking-[0.3em] uppercase text-slate-500 font-bold -mt-1 block">Boutique CRM</span>
              </div>
            </Link>
            <p className="text-slate-400 leading-relaxed font-light max-w-sm">
              Sistem CRM butik ritel mode premium tercanggih untuk mendigitalkan manajemen program loyalitas pelanggan VIP Anda.
            </p>
            <div className="space-y-3 pt-2 text-slate-400 font-light">
              <div className="flex items-center gap-3">
                <FiMail className="text-crm-pink-dark text-sm" />
                <span>support@velouracrm.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone className="text-crm-pink-dark text-sm" />
                <span>+62 (21) 5092-2311</span>
              </div>
              <div className="flex items-center gap-3">
                <FiMapPin className="text-crm-pink-dark text-sm" />
                <span>Kawasan Ritel Mode, Blok A9, Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Menu */}
          <div className="md:col-span-3 space-y-4 md:pl-8">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Produk Kami</h4>
            <ul className="space-y-2.5 font-light text-slate-400">
              <li><a href="#features" className="hover:text-crm-pink transition-colors">Customer CRM</a></li>
              <li><a href="#features" className="hover:text-crm-pink transition-colors">Program Membership</a></li>
              <li><a href="#features" className="hover:text-crm-pink transition-colors">Analitik Penjualan</a></li>
              <li><a href="#features" className="hover:text-crm-pink transition-colors">Automasi Promo</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Perusahaan</h4>
            <ul className="space-y-2.5 font-light text-slate-400">
              <li><a href="#" className="hover:text-crm-pink transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-crm-pink transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-crm-pink transition-colors">Mitra Butik</a></li>
              <li><a href="#" className="hover:text-crm-pink transition-colors">Pers</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold tracking-widest uppercase text-white">Temukan Kami</h4>
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-crm-pink hover:text-white flex items-center justify-center transition-all text-slate-300">
                <FiInstagram className="text-sm" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-crm-pink hover:text-white flex items-center justify-center transition-all text-slate-300">
                <FiTwitter className="text-sm" />
              </a>
              <a href="mailto:support@velouracrm.com" className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-crm-pink hover:text-white flex items-center justify-center transition-all text-slate-300">
                <FiMail className="text-sm" />
              </a>
            </div>
            <p className="text-[10px] text-slate-500 font-light leading-relaxed pt-2">
              Berlangganan nawala newsletter bulanan kami untuk tips tren & manajemen butik terbaik.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-slate-800 text-[11px] text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 Veloura Boutique CRM. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-6 font-light">
            <a href="#" className="hover:text-slate-400 transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Syarat Penggunaan</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
