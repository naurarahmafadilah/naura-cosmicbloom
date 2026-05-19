import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaDatabase, FaBoxOpen, FaBullhorn } from "react-icons/fa";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

// Import data master tren wishlist pelanggan
import wishlistData from "../data/Wishlist.json";

const WishlistDetail = () => {
  const { slug } = useParams();
  const product = wishlistData.find((p) => p.slug === slug || p.id?.toString() === slug);

  if (!product) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand">
          <h2 className="font-playfair text-3xl text-primary-dark">Log Data Tidak Ditemukan</h2>
          <p className="text-xs text-primary-dark/40 mt-1">ID atau Slug produk tidak terdaftar dalam database tren.</p>
          <Link to="/wishlist" className="text-secondary-light mt-6 inline-block underline text-xs font-bold uppercase tracking-wider">
            Kembali ke Log Wishlist
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Detail Analisis Wishlist"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Log Wishlist", link: "/wishlist" },
            { label: product.name }
          ]}
        />

        {/* LAYOUT GRID UTAMA */}
        <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* SEKSI GAMBAR DENGAN KARTU GLASSMORPHISM */}
          <div className="relative group">
            <div className="rounded-[40px] overflow-hidden shadow-veloura aspect-[4/5] bg-white border border-primary-light/10 p-3">
              <div className="w-full h-full rounded-[30px] overflow-hidden relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Indikator Kluster Data Singkat */}
            <div className="absolute -bottom-4 -right-4 bg-white/80 backdrop-blur-md border border-border-subtle px-5 py-3 rounded-2xl shadow-xl flex flex-col font-mono text-[10px] text-primary-dark/60">
              <span>SKU ID: <strong className="text-primary-dark">#{product.id || "N/A"}</strong></span>
              <span>SLUG: <strong className="text-secondary-light">{product.slug}</strong></span>
            </div>
          </div>

          {/* SEKSI INFO & MANAJEMEN */}
          <div className="flex flex-col pt-2">
            
            {/* Tombol Navigasi Kembali */}
            <Link to="/wishlist" className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-[3px] mb-8 hover:tracking-[4px] transition-all duration-300">
              <FaArrowLeft size={10} /> Kembali ke Log Wishlist
            </Link>

            {/* Status Log Internal */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="bg-bg-soft border border-border-subtle px-4 py-1.5 rounded-full flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-bold font-mono text-primary-dark/60 uppercase tracking-wider">
                  Arsip Masuk: {product.date || "Baru Saja"}
                </p>
              </div>
              <div className="bg-secondary-light/10 border border-secondary-light/20 px-4 py-1.5 rounded-full">
                <p className="text-[10px] font-bold font-mono text-secondary-light uppercase tracking-wider">
                  Popularitas: Permintaan Tinggi
                </p>
              </div>
            </div>

            {/* Nama Produk & Harga */}
            <h1 className="text-4xl lg:text-5xl font-playfair text-primary-dark mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-2 mb-6 font-quicksand">
              <span className="text-[11px] font-bold text-primary-dark/40 uppercase tracking-wider">Patokan MSRP</span>
              <span className="text-2xl font-bold text-primary-dark">
                <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                {product.price}
              </span>
            </div>

            <div className="h-[1px] bg-border-subtle/60 w-full mb-6"></div>

            {/* Deskripsi/Catatan Katalog */}
            <p className="text-primary-dark/70 leading-relaxed mb-6 font-quicksand text-sm italic border-l-2 border-secondary-light/30 pl-4">
              "{product.desc || 'Wujudkan tampilan impian Anda dengan koleksi eksklusif dari Veloura yang dirancang khusus untuk kenyamanan dan kemewahan Anda.'}"
            </p>
            
            {/* PANEL ANALITIK & ATURAN OTOMATISASI */}
            <div className="bg-white border border-primary-light/10 p-6 rounded-3xl shadow-sm space-y-4 mb-8 font-quicksand">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark/40 flex items-center gap-1.5 border-b border-bg-soft pb-2">
                <FaDatabase size={10} /> Aturan Restock & Otomatisasi Admin
              </h4>
              <div className="flex items-center gap-3 text-xs text-primary-dark/80">
                <FaCheckCircle className="text-secondary-light flex-shrink-0" /> 
                <span>Koneksi Otomatis: Sinkronisasi katalog ukuran <strong className="text-primary-dark">S, M, L, XL</strong>.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-primary-dark/80">
                <FaCheckCircle className="text-secondary-light flex-shrink-0" /> 
                <span>Prioritas Distribusi: Alokasikan stok rantai pasok ke gudang regional dengan peminat tertinggi.</span>
              </div>
            </div>

            {/* AKSI KONTROL OPERASIONAL ADMIN */}
            <div className="flex flex-col gap-3 font-quicksand">
              <button className="w-full bg-primary-dark text-white py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 hover:bg-hover-green shadow-veloura transition-all duration-300 cursor-pointer">
                <FaBullhorn size={12} /> Kirim Diskon Eksklusif via Email Pengguna
              </button>
              
              <button className="w-full py-4 rounded-2xl border border-border-subtle bg-white text-primary-dark/70 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 hover:border-secondary-light hover:text-secondary-light transition-all duration-300 cursor-pointer shadow-sm">
                <FaBoxOpen size={13} /> Sesuaikan Manajemen Kuota Alokasi Stok
              </button>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="mt-20">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default WishlistDetail;