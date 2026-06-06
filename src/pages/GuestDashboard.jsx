import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContainer from "../components/DashboardContainer";
import ContentGrid from "../components/ContentGrid";
import StatCard from "../components/StatCard";
import ProductCard from "../components/ProductCard";
import CustomerActivityList from "../components/CustomerActivityList"; 
import ReviewHighlightCard from "../components/ReviewHighlightCard"; 
import StockAlertCard from "../components/StockAlertCard"; 
import Footer from "../components/Footer";
import QuickActionPanel from "../components/QuickActionPanel"; 

import { Alert, AlertDescription } from "../components/ui/alert";
import { Progress } from "../components/ui/progress";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from "recharts";

import { 
  FiDollarSign, 
  FiShield, 
  FiUsers, 
  FiUserCheck, 
  FiPieChart,
  FiLock,
  FiArrowRight
} from "react-icons/fi";

// Mock data internal untuk visualisasi Guest
const guestChartData = {
  Q2: [
    { name: "Apr", "Pelanggan Baru": 310, "Pelanggan Aktif": 700, Pendapatan: 35000000 },
    { name: "Mei", "Pelanggan Baru": 430, "Pelanggan Aktif": 850, Pendapatan: 45850000 },
    { name: "Jun", "Pelanggan Baru": 520, "Pelanggan Aktif": 980, Pendapatan: 54000000 },
  ]
};

const guestProductsMock = [
  { id: 1, name: "Elegant Dress (Preview)", price: "250.000", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" },
  { id: 2, name: "Casual Outfit (Preview)", price: "180.000", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop" },
];

const categoriesData = [{ name: "Tas" }, { name: "Kaos" }, { name: "Kacamata" }, { name: "Sepatu" }];

const GuestDashboard = () => {
  const [activeMetric, setActiveMetric] = useState("Pendapatan");
  const navigate = useNavigate();

  // Proteksi Navigasi Otomatis (Jika Admin nyasar ke sini, kembalikan ke /admin/dashboard)
  useEffect(() => {
    const checkUserRole = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user?.role === "admin") {
        navigate("/admin/dashboard");
      }
    };

    checkUserRole();
    window.addEventListener("storage", checkUserRole);
    window.addEventListener("localUserUpdate", checkUserRole);

    return () => {
      window.removeEventListener("storage", checkUserRole);
      window.removeEventListener("localUserUpdate", checkUserRole);
    };
  }, [navigate]);

  const handleRestrictedAction = () => {
    alert("🔒 Akses Dibatasi: Silakan hubungi Administrator atau klik avatar Anda lalu pilih 'Kembali Jadi Admin' untuk menggunakan fitur ini.");
  };

  return (
    <DashboardContainer>
      <div className="w-full space-y-4 text-primary-dark font-quicksand p-1 text-xs select-none">
        
        {/* BANNER NOTIFIKASI GUEST MODE */}
        <Alert className="border rounded-xl py-2 px-3 flex items-center gap-2 shadow-xs bg-amber-50 border-amber-200 text-amber-900">
          <FiShield className="w-3.5 h-3.5 shrink-0 text-amber-600" />
          <AlertDescription className="text-[11px] font-bold tracking-wide leading-none">
            Mode Pratinjau Tamu (Guest) Aktif. Anda hanya memiliki izin baca-saja (*read-only*) untuk analisis data dasar.
          </AlertDescription>
        </Alert>

        {/* HEADER AREA */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border-subtle pb-4 px-0.5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-playfair text-[#4E5631] tracking-wide leading-none">
                Dashboard Overview
              </h2>
              <span className="bg-amber-100 text-amber-800 text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider h-fit">
                Guest View
              </span>
            </div>
            <div className="w-12 h-[3px] bg-[#A47174] rounded-full" />
            <p className="text-primary-dark/60 font-quicksand text-xs font-medium tracking-wide">
              Ringkasan data analitik sistem CRM Veloura
            </p>
          </div>
          
          {/* TOMBOL INDIKATOR LOCK */}
          <div className="flex gap-1.5 items-center">
            <button 
              onClick={handleRestrictedAction}
              className="px-3 py-1.5 rounded-xl text-[11px] font-bold tracking-wide bg-slate-100 text-slate-400 border border-slate-200 flex items-center gap-1.5 cursor-pointer hover:bg-slate-200/50 transition-colors"
            >
              <FiLock className="w-2.5 h-2.5" /> Ekspor Analisis
            </button>
          </div>
        </div>

        {/* STATS CARD GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 items-stretch [&_h3]:text-[10px] [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-wider [&_p]:text-xl [&_p]:md:text-2xl [&_p]:font-bold [&_p]:font-playfair [&_span]:text-[10px]">
          {[
            { id: "Pendapatan", title: "Total Pendapatan", val: "Rp 45.850.000", msg: "Klik untuk filter grafik", icon: <FiDollarSign className="w-3.5 h-3.5 text-secondary-light" /> },
            { id: "Pelanggan Aktif", title: "Pelanggan Aktif", val: "1,240 User", msg: "Klik untuk filter grafik", icon: <FiUsers className="w-3.5 h-3.5 text-secondary-light" /> },
            { id: "Pelanggan Baru", title: "Pelanggan Baru", val: "+430 User", msg: "Klik untuk filter grafik", icon: <FiUserCheck className="w-3.5 h-3.5 text-secondary-light" /> },
            { id: "Retention", title: "Retention Rate", val: "97.9%", msg: "Status: Stabil", icon: <FiPieChart className="w-3.5 h-3.5 text-secondary-light" />, isStatic: true }
          ].map((item) => (
            <div 
              key={item.id}
              onClick={() => !item.isStatic && setActiveMetric(item.id)}
              className={`flex flex-col justify-between transition-all duration-200 transform rounded-2xl bg-white p-0.5 cursor-pointer ${
                activeMetric === item.id ? "ring-2 ring-primary-dark shadow-xs" : "border border-transparent"
              }`}
            >
              <StatCard title={item.title} value={item.val} change={item.msg} isPositive={true} icon={item.icon} />
            </div>
          ))}
        </div>

        {/* CHART VISUALIZATION */}
        <div className="bg-white p-3.5 rounded-2xl border border-border-subtle shadow-xs">
          <div className="mb-3">
            <h3 className="text-sm font-bold font-playfair text-primary-dark tracking-tight">Grafik Tren Pasar (Kuartal 2)</h3>
            <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Menampilkan: <span className="text-secondary-light font-black">{activeMetric}</span></p>
          </div>
          
          <div className="h-[180px] w-full text-[10px] font-semibold">
            <ResponsiveContainer width="100%" height="100%">
              {activeMetric === "Pendapatan" ? (
                <BarChart data={guestChartData.Q2} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="name" stroke="#4e5631" opacity={0.5} fontSize={10} tickLine={false} />
                  <YAxis stroke="#4e5631" opacity={0.5} fontSize={10} tickLine={false} formatter={(val) => `Rp ${val / 1000000}M`} />
                  <Tooltip formatter={(val) => `Rp ${val.toLocaleString("id-ID")}`} contentStyle={{fontFamily: 'Quicksand', borderRadius: '12px', fontSize: '11px'}} />
                  <Bar dataKey="Pendapatan" fill="#4e5631" radius={[4, 4, 0, 0]} barSize={28} />
                </BarChart>
              ) : (
                <AreaChart data={guestChartData.Q2} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorGuestMetric" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4e5631" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4e5631" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                  <XAxis dataKey="name" stroke="#4e5631" opacity={0.5} fontSize={10} tickLine={false} />
                  <YAxis stroke="#4e5631" opacity={0.5} fontSize={10} tickLine={false} />
                  <Tooltip contentStyle={{fontFamily: 'Quicksand', borderRadius: '12px', fontSize: '11px'}} />
                  <Area type="monotone" dataKey={activeMetric} stroke="#4e5631" strokeWidth={1.5} fill="url(#colorGuestMetric)" />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* CALL TO ACTION BANNER */}
        <div className="bg-gradient-to-r from-[#4E5631]/10 to-[#A47174]/10 p-4 rounded-2xl border border-dashed border-[#4E5631]/30 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="bg-[#4E5631] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Fitur Premium</span>
            <h2 className="text-sm font-bold font-playfair text-primary-dark tracking-tight pt-1">Otomatisasi Omnichannel Marketing & Blast Pesan</h2>
            <p className="text-primary-dark/70 text-xs max-w-xl font-medium leading-tight">Mulai kirim broadcast WhatsApp otomatis, kustomisasi kupon diskon loyalitas pelanggan, dan sinkronisasi otomatis pipelines hanya dengan akun level Administrator.</p>
          </div>
          <button 
            onClick={handleRestrictedAction}
            className="shrink-0 bg-primary-dark text-white px-3 py-1.5 rounded-xl text-[10px] font-bold tracking-wide flex items-center gap-1.5 hover:bg-primary-dark/90 cursor-pointer shadow-xs whitespace-nowrap"
          >
            Pelajari Fitur CRM <FiArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* PANEL AKSI CEPAT */}
        <QuickActionPanel />

        {/* 2-COLUMN MAIN CONTENT GRID */}
        <ContentGrid 
          leftContent={
            <div className="space-y-4 w-full">
              {/* LIST PRODUK BACA SAJA */}
              <section className="bg-white p-3.5 rounded-2xl border border-border-subtle shadow-xs w-full">
                <div className="flex justify-between items-center mb-3 border-b border-bg-soft pb-1.5">
                  <h3 className="text-xs font-bold font-playfair text-primary-dark tracking-tight">Koleksi Produk (Preview)</h3>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">Read-Only</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {guestProductsMock.map((product) => (
                    <div key={product.id} className="bg-white p-2.5 rounded-xl border border-border-subtle shadow-xs">
                      <ProductCard id={product.id} name={product.name} price={product.price} imgSrc={product.img} onEdit={handleRestrictedAction} />
                    </div>
                  ))}
                </div>
              </section>
              <CustomerActivityList />
            </div>
          }
          rightContent={
            <div className="space-y-4 w-full">
              {/* ETALASE KATEGORI */}
              <section className="bg-white p-3.5 rounded-2xl border border-border-subtle shadow-xs w-full">
                <div className="mb-3 border-b border-bg-soft pb-1.5">
                  <h3 className="text-xs font-bold font-playfair text-primary-dark tracking-tight">Etalase Kategori</h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {categoriesData.map((item, i) => (
                    <div key={i} className="bg-white p-2 rounded-xl text-center border border-border-subtle flex items-center gap-2 justify-start opacity-70">
                      <div className="w-2.5 h-2.5 rounded-full bg-secondary-light" />
                      <p className="text-[10px] font-bold text-primary-dark/80 tracking-wide uppercase">{item.name}</p>
                    </div>
                  ))}
                </div>
              </section>

              <StockAlertCard />
              <ReviewHighlightCard reviewer="Alexandra V." review="Blouse sutra sangat mewah dan jahitan rapi!" />

              {/* PIPELINE LOCK INDICATOR */}
              <section className="bg-white p-3.5 rounded-2xl border border-border-subtle shadow-xs w-full space-y-2.5 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-xs z-10 flex flex-col items-center justify-center text-center p-2">
                  <FiLock className="w-4 h-4 text-slate-400 mb-1" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Pipeline Sinkronisasi Terkunci</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-bold text-primary-dark opacity-30">
                  <span>Sinkronisasi Pipelines Pelanggan</span>
                  <span>Update Data</span>
                </div>
                <Progress value={40} className="h-1 bg-bg-soft opacity-30" />
                <p className="text-[9px] text-primary-dark/40 font-bold uppercase tracking-wider opacity-30">Data Ter-sinkronisasi: 40%</p>
              </section>
            </div>
          }
        />

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default GuestDashboard;