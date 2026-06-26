import React from "react";
import { Link } from "react-router-dom";
import { 
  FiHome, FiFeather, FiPhone, FiLogIn, FiArrowRight, FiActivity,
  FiAlertCircle, FiCheck, FiUsers, FiAward, FiTrendingUp, FiSliders,
  FiClock, FiTrendingDown, FiShield
} from "react-icons/fi";

export default function CRMLandingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBFB] text-slate-800 font-poppins selection:bg-crm-pink/50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[700px] bg-gradient-to-b from-[#fdf2f5] to-transparent -z-10" />
      <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-crm-pink/15 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-[35%] left-[-15%] w-[450px] h-[450px] bg-crm-pink/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute top-[60%] right-[-10%] w-[500px] h-[500px] bg-[#F5E6EC]/20 rounded-full blur-[120px] -z-10" />

      {/* ==========================================================
          AREA TOP
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
            <a href="#benefits" className="hover:text-slate-800 transition-colors">Benefits</a>
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
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 md:pt-20">
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
          AREA MIDDLE
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
          {/* Background shapes */}
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

      {/* 8. SECONDARY CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
        <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] shadow-xl shadow-slate-100/40 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-800">Siap Mengembangkan Butik Anda?</h3>
            <p className="text-xs text-slate-400 font-light">Mulai uji coba gratis 14 hari penuh fitur premium. Tanpa perlu kartu kredit.</p>
          </div>
          <Link to="/register" className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 whitespace-nowrap">
            Daftar Sekarang <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* ==========================================================
          AREA BOTTOM
         ========================================================== */}

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-medium">
          <p>© 2026 Veloura Boutique CRM. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
