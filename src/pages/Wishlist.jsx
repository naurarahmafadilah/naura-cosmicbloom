import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEye, FaBullhorn, FaDownload } from "react-icons/fa";

// IMPORT LAYOUT & KOMKOMEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

// Import data master tren wishlist pelanggan
import wishlistData from "../data/Wishlist.json"; 

const Wishlist = () => {
  const [adminItems, setAdminItems] = useState(wishlistData || []);

  // ==========================================
  // GLOBAL INTERACTIVE ACTION HANDLERS
  // ==========================================

  // Handler mengekspor berkas data logs analitik tren
  const handleExportCSV = () => {
    alert("📥 Mempersiapkan Data Tren Wishlist...\nBerkas spreadsheet (.CSV) untuk kluster tren komparatif berhasil diunduh.");
  };

  // Handler otomatisasi pemasaran massal
  const handleMassBlastDiscount = () => {
    if (adminItems.length === 0) {
      alert("⚠️ Gagal memicu otomatisasi: Tidak ada log antrean pelanggan aktif saat ini.");
      return;
    }
    alert(`📢 Otomatisasi Terpicu!\nBerhasil mengirimkan voucher diskon tertarget via Email & WhatsApp Broadcast ke seluruh akun pemilik wishlist.`);
  };

  // Handler promosi personalisasi produk spesifik (Push Ads)
  const handleIndividualPushAds = (productName) => {
    alert(`🚀 Push Notification Terkirim!\nKampanye iklan pengingat stok terbatas untuk produk "${productName}" berhasil disiarkan ke audiens tertarget.`);
  };

  // Handler untuk menghapus arsip data logs dari sisi admin
  const handleDeleteLog = (id, productName) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus arsip data logs wishlist untuk "${productName}"?`);
    if (confirmDelete) {
      setAdminItems(adminItems.filter(item => item.id !== id));
    }
  };

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">
        
        {/* ADMIN CONTROL TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <PageHeader
              title="Customer Wishlist Logs"
              breadcrumb={[
                { label: "Dashboard", link: "/" },
                { label: "Katalog" },
                { label: "Wishlist Logs" }
              ]}
            />
          </div>
          
          {/* Kontrol Utilitas Data Admin */}
          <div className="flex items-center gap-3 font-quicksand">
            <button 
              onClick={handleExportCSV}
              className="px-5 py-2.5 bg-white border border-border-subtle rounded-full text-xs font-bold text-primary-dark/70 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <FaDownload size={10} /> Ekspor Data Tren (.CSV)
            </button>
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-white bg-primary-dark px-4 py-2.5 rounded-full font-mono">
              Total: {adminItems.length} Log Terarsip
            </p>
          </div>
        </div>

        {/* PANEL METRICS UTAMA ADMIN */}
        <div className="bg-white p-8 rounded-[35px] border border-primary-light/10 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-veloura">
          <div className="space-y-1">
            <h4 className="text-xs font-mono text-primary-dark/40 uppercase tracking-widest">Modul Analitik</h4>
            <h2 className="text-3xl font-playfair font-bold text-primary-dark">Gaya Terfavorit</h2>
            <p className="text-xs text-primary-dark/60 font-quicksand">Memantau produk paling diminati user untuk strategi restock massal.</p>
          </div>
          <div className="border-t md:border-t-0 md:border-x border-border-subtle/60 py-4 md:py-0 md:px-8 space-y-1">
            <h4 className="text-xs font-mono text-secondary-light uppercase tracking-widest">Status Sinkronisasi</h4>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-sm font-bold font-quicksand text-primary-dark">Live User Sync Active</p>
            </div>
            <p className="text-[11px] text-primary-dark/40 font-mono">Database Cluster: Veloura-Prod-Cloud</p>
          </div>
          <div className="space-y-1 md:pl-4">
            <h4 className="text-xs font-mono text-primary-dark/40 uppercase tracking-widest">Aksi Otomatisasi</h4>
            <div className="pt-2">
              <button 
                onClick={handleMassBlastDiscount}
                className="px-4 py-2 bg-secondary-light/10 text-secondary-light hover:bg-secondary-light hover:text-white border border-secondary-light/20 rounded-xl text-[11px] font-bold uppercase tracking-wider font-quicksand transition-all duration-300 cursor-pointer"
              >
                Blast Diskon ke Pemilik Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* GRID LAYOUT - ADMIN VIEW WITH GLINT & AUTOMATION CONTROLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {adminItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative flex flex-col h-full bg-white/70 backdrop-blur-md border border-primary-light/10 rounded-[35px] p-4 transition-all duration-500 ease-out hover:-translate-y-2 hover:bg-white hover:border-secondary-light/30 hover:shadow-[0_30px_60px_-15px_rgba(78,86,49,0.12)] overflow-hidden"
            >
              {/* Efek Kilau Cahaya (Glint Overlay) */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out pointer-events-none z-20" />

              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[26px] aspect-[4/5] bg-bg-main border border-border-subtle shadow-inner z-10">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                />

                {/* Tombol Delete Log (Aksi Manajemen Admin) */}
                <button 
                  onClick={() => handleDeleteLog(item.id, item.name)}
                  title="Hapus Log Arsip"
                  className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-md border border-border-subtle rounded-xl flex items-center justify-center text-primary-dark/40 hover:text-red-500 hover:bg-white transition-all z-10 cursor-pointer shadow-sm"
                >
                  <FaTrashAlt size={12} />
                </button>

                {/* Badge ID Sistem */}
                <div className="absolute bottom-4 left-4 bg-primary-dark/95 backdrop-blur-sm px-3 py-1 rounded-xl shadow-sm">
                  <p className="text-[8px] font-mono tracking-wider text-white uppercase">
                    SKU-ID: #{item.id || "00"}
                  </p>
                </div>
              </div>

              {/* Product Metadata Info */}
              <div className="mt-5 flex-1 space-y-2 px-1 z-10">
                <div className="flex items-center justify-between text-[9px] font-mono">
                  <span className="bg-bg-soft text-primary-dark/60 px-2 py-0.5 rounded border border-border-subtle uppercase truncate max-w-[130px]">
                    User: @dev_customer
                  </span>
                  <span className="text-secondary-light font-bold">Saved {item.date || "Just Now"}</span>
                </div>
                
                {/* Judul mengarah ke halaman detail */}
                <Link to={`/wishlist/${item.slug || item.id}`}>
                  <h3 className="text-lg font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300 truncate pt-0.5">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center justify-between font-quicksand pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-primary-dark/30 font-bold uppercase tracking-wider">MSRP</span>
                    <p className="text-sm font-bold text-primary-dark">Rp {item.price}</p>
                  </div>
                  <span className="text-[9px] font-mono text-primary-dark/40 truncate max-w-[90px]">slug: {item.slug}</span>
                </div>
              </div>

              {/* BAR CONTROLS UTAMA ADMIN SISI BAWAH CARD */}
              <div className="grid grid-cols-2 gap-2 mt-5 pt-3 border-t border-border-subtle z-10 font-quicksand">
                {/* Link navigasi pratinjau data internal */}
                <Link 
                  to={`/wishlist/${item.slug || item.id}`}
                  title="Pratinjau Halaman Toko" 
                  className="px-3 py-2.5 border border-border-subtle bg-white text-primary-dark/70 rounded-xl text-[11px] font-bold hover:border-secondary-light/40 hover:text-secondary-light transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center"
                >
                  <FaEye size={11} /> Preview
                </Link>
                
                {/* Tombol Push Ads Tertarget */}
                <button 
                  onClick={() => handleIndividualPushAds(item.name)}
                  title="Kirimkan Promosi Tertarget" 
                  className="px-3 py-2.5 bg-primary-dark text-white rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-hover-green transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <FaBullhorn size={10} /> Push Ads
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* GLOBAL INTEGRATED FOOTER */}
        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Wishlist;