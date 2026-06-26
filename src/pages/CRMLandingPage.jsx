import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiFeather, FiPhone, FiLogIn, FiArrowRight, FiActivity } from "react-icons/fi";

export default function CRMLandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-poppins selection:bg-crm-pink/50 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fdf6f8] to-transparent -z-10" />
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-crm-pink/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-crm-pink/10 rounded-full blur-[80px] -z-10" />

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
            <a href="#" className="hover:text-slate-800 transition-colors">Features</a>
            <a href="#" className="hover:text-slate-800 transition-colors">Contact</a>
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
          AREA BOTTOM
         ========================================================== */}

      {/* FOOTER */}
      <footer className="bg-slate-50 border-t border-slate-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-medium">
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
