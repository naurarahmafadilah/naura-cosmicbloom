import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

// INTEGRASI KOMPONEN SHADCN UI UNTUK NOTIFIKASI AKTIVASI
import { Alert, AlertDescription } from "../components/ui/alert";
import { FiCheckCircle, FiShield } from "react-icons/fi";

// IMPORT DATA JSON YANG SAMA
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

  // 2. Antisipasi jika data tidak ditemukan agar tidak crash
  if (!currentCollection) {
    return (
      <DashboardContainer>
        <div className="py-20 text-center font-quicksand relative z-10">
          <h3 className="text-xl font-bold text-red-500">Koleksi Tidak Ditemukan</h3>
          <p className="text-sm text-primary-dark/60 mt-2">Arsip tema dengan slug "{slug}" tidak terdaftar di database.</p>
          <button 
            onClick={() => navigate("/collection")}
            className="mt-6 px-5 py-2.5 bg-primary-dark text-white rounded-full text-xs font-bold transition-colors hover:bg-hover-green cursor-pointer inline-block pointer-events-auto"
          >
            Kembali ke Katalog
          </button>
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

  return (
    <DashboardContainer>
      <div className="space-y-8 animate-fade-in pb-10 text-primary-dark relative z-10">
        
        {/* NOTIFIKASI SHADCN UI INTERAKTIF - SAGE GREEN LEMBUT */}
        {showActiveNotification && (
          <Alert className="bg-bg-soft text-primary-dark border border-primary-light/30 rounded-2xl p-4 flex items-center gap-3 shadow-md animate-fade-in relative z-50 pointer-events-auto">
            <FiCheckCircle className="w-5 h-5 text-primary-light shrink-0" />
            <AlertDescription className="text-xs md:text-sm font-quicksand font-medium tracking-wide">
              Sukses! Tema <strong>"{currentCollection.name}"</strong> sekarang telah berhasil diset dan diterbitkan sebagai sorotan utama di halaman depan beranda.
            </AlertDescription>
          </Alert>
        )}

        {/* HEADER & BREADCRUMB DYNAMIC */}
        <PageHeader
          title={currentCollection.name}
          breadcrumb={[
            { label: "Beranda", link: "/" },
            { label: "Collection", link: "/collection" },
            { label: currentCollection.name }
          ]}
        />

        {/* HERO AREA DETAIL */}
        <div className="bg-white rounded-[35px] border border-primary-light/10 shadow-veloura overflow-hidden relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* SISI GAMBAR */}
            <div className="lg:col-span-6 h-[400px] lg:h-[550px] relative overflow-hidden group">
              <img 
                src={currentCollection.img} 
                alt={currentCollection.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 bg-primary-dark/90 text-white text-xs font-mono px-3 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm z-30">
                {currentCollection.tag}
              </span>
            </div>

            {/* SISI DETAIL KONTEN */}
            <div className="lg:col-span-6 p-8 lg:p-16 flex flex-col justify-between bg-bg-soft/10 relative z-30">
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] tracking-[4px] uppercase font-bold text-secondary-light block mb-2 font-quicksand">
                    Veloura Campaign Master
                  </span>
                  <h1 className="text-3xl lg:text-5xl font-playfair font-medium leading-tight">
                    {currentCollection.name}
                  </h1>
                </div>

                <hr className="border-border-subtle" />

                <div>
                  <h4 className="text-xs uppercase tracking-wider font-bold text-primary-dark/40 font-quicksand mb-2">
                    Konsep & Deskripsi Tema
                  </h4>
                  <p className="font-quicksand text-sm lg:text-base leading-relaxed text-primary-dark/80">
                    {currentCollection.desc}
                  </p>
                </div>
              </div>

              {/* ACTION BUTTONS DENGAN EVENT HANDLER AKTIF */}
              <div className="flex items-center gap-3 font-quicksand mt-8 lg:mt-0 relative z-40">
                <button 
                  onClick={handleActivateTheme}
                  className="flex-1 px-6 py-3.5 bg-primary-dark text-white text-center rounded-xl text-xs font-bold tracking-wider hover:bg-hover-green transition-all shadow-sm cursor-pointer uppercase select-none pointer-events-auto"
                >
                  Aktifkan Tema Di Beranda
                </button>
                <button 
                  onClick={() => navigate("/collection")}
                  className="px-6 py-3.5 border border-border-subtle bg-white text-primary-dark rounded-xl text-xs font-bold hover:bg-bg-soft hover:border-primary-dark/20 transition-all shadow-sm cursor-pointer select-none pointer-events-auto"
                >
                  Kembali
                </button>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default CollectionDetail;