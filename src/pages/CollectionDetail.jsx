import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

// INTEGRASI KOMPONEN SHADCN UI & ICONS COHESIVE PREMIUM
import { Alert, AlertDescription } from "../components/ui/alert";
import { CheckCircle2, ArrowLeft, Layers, Sparkles, AlertTriangle } from "lucide-react";

// IMPORT DATA JSON
import initialCollections from "../data/collectionsData.json";

const CollectionDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // State untuk mengontrol kemunculan banner sukses aktivasi tema
  const [showActiveNotification, setShowActiveNotification] = useState(false);

  // Helper fungsi untuk mencocokkan format slug
  const generateSlug = (name) => name.toLowerCase().replace(/ /g, "-");

  // 1. Cari data berdasarkan slug dari URL
  let currentCollection = initialCollections?.find(
    (item) => generateSlug(item.name) === slug
  );

  // Fallback khusus jika yang diklik adalah banner utama "Autumn Collection"
  if (!currentCollection && slug === "autumn-collection") {
    currentCollection = {
      name: "Autumn Collection",
      tag: "New Arrival 2026",
      desc: "Membawa kehangatan warna tanah ke dalam lemari pakaian Anda. Temukan potongan timeless yang mendefinisikan ulang arti elegan musim ini dengan material wool premium dan palet warna bumi yang hangat.",
      img: "https://images.unsplash.com/photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop"
    };
  }

  // Jika koleksi tidak ditemukan (Handling Error Admin - Sama dengan SaleDetail)
  if (!currentCollection) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand max-w-md mx-auto px-6">
          <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertTriangle size={24} strokeWidth={1.5} />
          </div>
          <h2 className="font-playfair text-2xl font-bold tracking-tight text-slate-900">Arsip Koleksi Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">Arsip tema dengan entitas SKU atau slug "{slug}" tidak terdaftar di dalam kluster basis data sistem.</p>
          <Link to="/collection" className="text-[#8C6239] mt-8 inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider hover:text-[#4E5631] transition-colors">
            <ArrowLeft size={13} /> Kembali ke Manajer Koleksi
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Fungsi penanganan aktivasi tema komponen tanpa menggunakan alert() bawaan window
  const handleActivateTheme = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Otomatis scroll ke atas agar notifikasi terlihat jelas
    setShowActiveNotification(true);
    // Auto-hide notifikasi setelah 4 detik
    setTimeout(() => {
      setShowActiveNotification(false);
    }, 4000);
  };

  const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80";

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-16 text-slate-800 relative pt-4 selection:bg-[#4E5631]/10">
        
        {/* NOTIFIKASI SHADCN UI INTERAKTIF PREMIUM OVERLAY */}
        {showActiveNotification && (
          <div className="max-w-7xl mx-auto mb-6">
            <Alert className="bg-white text-slate-800 border-emerald-200 rounded-2xl p-4 flex items-start gap-3.5 shadow-xl shadow-emerald-100/30 animate-fade-in relative z-50 pointer-events-auto">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
              <AlertDescription className="text-xs font-semibold font-quicksand leading-relaxed flex-1 text-slate-700">
                Sukses sinkronisasi! Konsep ekosistem tema <span className="text-[#8C6239] font-bold">"{currentCollection.name}"</span> saat ini telah berhasil diaktifkan sebagai sorotan etalase utama pada halaman depan.
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* LAYOUT GRID UTAMA - LUXURY STUDIO RATIO 4:8 SPLIT (PERSIS SALEDETAIL) */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start px-4 sm:px-6">
          
          {/* KOLOM KIRI: EDITORIAL MEDIA BANNER (lg:col-span-4) */}
          <div className="lg:col-span-4 relative group">
            <div className="bg-white border border-slate-200/60 p-3.5 rounded-[24px] shadow-sm backdrop-blur-md bg-white/80">
              <div className="w-full aspect-[4/5] rounded-[18px] overflow-hidden relative bg-slate-100 border border-slate-200/40 shadow-inner">
                <img 
                  src={currentCollection.img || fallbackImage} 
                  alt={currentCollection.name} 
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103 filter contrast-[1.02]" 
                  onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/5 to-transparent opacity-90" />
              </div>
            </div>
            
            {/* Tag Badge Status Konten Premium Floater */}
            <div className="absolute top-7 left-7 bg-[#8C6239] text-white px-3.5 py-2 rounded-xl font-bold font-quicksand text-[9px] tracking-widest border border-white/10 flex items-center gap-2 shadow-lg backdrop-blur-md bg-[#8C6239]/95 transition-transform duration-300 group-hover:translate-y-[-2px]">
              <Layers size={10} className="stroke-[2.5]" /> {currentCollection.tag?.toUpperCase()}
            </div>
          </div>

          {/* KOLOM KANAN: WORKSPACE CONTROL PANEL DETIL (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col font-quicksand">
            
            {/* Navigasi Kembali Manual */}
            <Link 
              to="/collection" 
              className="inline-flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-5 hover:text-[#8C6239] transition-all duration-300 group"
            >
              <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" /> Kembali ke Manajer Koleksi
            </Link>

            {/* STATUS NOTIFIKASI INDIKATOR */}
            <div className="inline-flex items-center gap-2 text-[#8C6239] text-[10px] font-bold uppercase tracking-widest mb-2 bg-[#8C6239]/5 px-3 py-1.5 rounded-lg w-max border border-[#8C6239]/10">
               <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Status: Menunggu Aktivasi Beranda Toko
            </div>
            
            <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              {currentCollection.name}
            </h1>
            
            {/* BOX WORKSPACE CONTENT CAMPAIGN MASTER */}
            <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-slate-200/80 mb-6 shadow-sm relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-slate-200/30 font-playfair text-7xl font-bold pointer-events-none select-none">
                C
              </div>
              <div className="flex flex-col space-y-1.5 relative z-10">
                <span className="text-[10px] text-[#8C6239] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#8C6239]" /> Konsep & Deskripsi Kluster
                </span>
                <p className="text-xs lg:text-sm leading-relaxed text-slate-600 font-medium pt-1">
                  {currentCollection.desc}
                </p>
              </div>
            </div>

            {/* REGULASI EVENT HUKUM EDITORIAL */}
            <div className="space-y-3 mb-8 bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
              <div className="flex items-start gap-3 text-xs text-slate-500">
                <CheckCircle2 className="text-[#8C6239] w-4 h-4 shrink-0 mt-0.5 stroke-[2]" /> 
                <span className="font-medium">Sinkronisasi Instan: Menekan tombol aktivasi akan langsung mengubah susunan layout hero section di halaman utama klien.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-500">
                <CheckCircle2 className="text-[#8C6239] w-4 h-4 shrink-0 mt-0.5 stroke-[2]" /> 
                <span className="font-medium">Sertifikasi Media: Resolusi gambar dan kelengkapan taksonomi tema ini telah disesuaikan dengan standar responsive web framework.</span>
              </div>
            </div>

            {/* ACTION PANEL MANAGEMENT SYSTEM */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleActivateTheme}
                className="w-full sm:flex-[2.5] h-11 bg-[#4E5631] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-[#3E4527] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform active:scale-[0.99]"
              >
                Aktifkan Tema Di Beranda Utama
              </button>
              
              <button 
                onClick={() => navigate("/collection")}
                className="w-full sm:flex-1 h-11 rounded-xl border border-slate-200 bg-white text-slate-500 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300 cursor-pointer shadow-sm"
              >
                <ArrowLeft size={13} className="stroke-[2]" /> Kembali
              </button>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="mt-20 border-t border-slate-100 pt-6">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default CollectionDetail;