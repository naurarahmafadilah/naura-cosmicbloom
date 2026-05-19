import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTag } from "react-icons/fa";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

// IMPORT DATA SOURCE
import saleData from "../data/Sale.json"; 

const Sale = () => {
    // State untuk memfilter berdasarkan form mini / kategori diskon jika dibutuhkan
    const [selectedDiscount, setSelectedDiscount] = useState("all");

    // Memastikan data aman dari error jika saleData kosong
    const filteredData = saleData ? saleData.filter(item => {
        if (selectedDiscount === "high") {
            // Memfilter produk dengan diskon di atas 30% (misal: "35%" atau "50%")
            const numericDiscount = parseInt(item.discount) || 0;
            return numericDiscount >= 30;
        }
        return true;
    }) : [];

    return (
        <DashboardContainer>
            <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">
                
                {/* ADMIN CONTROL TOP BAR DENGAN FORM FILTER DROPDOWN */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
                    <div>
                        <PageHeader
                            title="End of Season Sale"
                            breadcrumb={[
                                { label: "Beranda", link: "/" },
                                { label: "Sale" }
                            ]}
                        />
                    </div>

                    {/* Form Filter Dropdown Sesuai Skema Desain Veloura */}
                    <div className="flex items-center gap-3 font-quicksand">
                        <label className="text-xs font-bold text-primary-dark/60">Filter Besaran Diskon:</label>
                        <select 
                            value={selectedDiscount}
                            onChange={(e) => setSelectedDiscount(e.target.value)}
                            className="px-4 py-2 bg-white border border-border-subtle rounded-full text-xs font-bold text-primary-dark outline-none cursor-pointer hover:border-secondary-light transition-colors"
                        >
                            <option value="all">Semua Potongan Harga</option>
                            <option value="high">Diskon Besar (≥ 30%)</option>
                        </select>
                    </div>
                </div>

                {/* PROMO BANNER LUXURY VELOURA */}
                <div className="bg-primary-dark rounded-[35px] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-veloura border border-primary-light/10">
                    <div className="relative z-10 space-y-2">
                        <div className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest animate-pulse">
                            <FaTag /> Flash Sale Event
                        </div>
                        <h2 className="text-4xl font-playfair leading-tight">
                            Penawaran <span className="italic text-secondary-light">Terbatas</span>
                        </h2>
                        <p className="font-quicksand text-sm text-white/70">
                            Gunakan kode <span className="font-bold border-b border-secondary-light text-white tracking-wide">VELOURA50</span> untuk tambahan diskon.
                        </p>
                    </div>
                    
                    {/* Timer Box Glassmorphism */}
                    <div className="mt-6 md:mt-0 relative z-10 font-quicksand">
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-sm">
                            <p className="text-[10px] uppercase tracking-[3px] text-center text-white/60 mb-1">Berakhir dalam</p>
                            <p className="text-2xl font-bold tracking-widest text-center text-white">24 : 12 : 59</p>
                        </div>
                    </div>
                    
                    {/* Brand Luxury Accent Background Grid */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute left-1/3 -bottom-10 w-40 h-40 bg-hover-green/20 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* GRID SECTION DENGAN RENDERING GAMBAR LANGSUNG (ANTI-BLANK) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div 
                                key={item.id} 
                                className="group relative bg-white p-3 rounded-[40px] border border-primary-light/5 shadow-veloura transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(78,86,49,0.07)] hover:border-secondary-light/30"
                            >
                                {/* Wrapper Utama Foto */}
                                <div className="block relative overflow-hidden rounded-[32px] bg-bg-soft aspect-[3/4] shadow-inner">
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                        onError={(e) => {
                                            // Fallback jika URL gambar rusak/tidak valid
                                            e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";
                                        }}
                                    />
                                    
                                    {/* Label Diskon Atas */}
                                    <div className="absolute top-4 right-4 bg-secondary-light text-white text-[10px] font-bold font-mono px-3 py-1.5 rounded-full z-20 shadow-sm">
                                        -{item.discount}
                                    </div>
                                    
                                    {/* Hover Overlay Smooth System */}
                                    <Link 
                                        to={`/sale/${item.slug || item.id}`}
                                        className="absolute inset-0 bg-primary-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5 backdrop-blur-[2px]"
                                    >
                                        <div className="bg-white text-primary-dark w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out font-quicksand shadow-md">
                                            Lihat Detail
                                        </div>
                                    </Link>
                                </div>

                                {/* Metadata Deskripsi Produk */}
                                <div className="mt-4 pb-2 text-center">
                                    <Link to={`/sale/${item.slug || item.id}`}>
                                        <h3 className="text-base font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300 line-clamp-1 px-1">
                                            {item.name}
                                        </h3>
                                    </Link>
                                    <div className="flex items-center justify-center gap-2 mt-1.5 font-quicksand">
                                        <p className="text-primary-dark/30 text-xs line-through">Rp {item.oldPrice}</p>
                                        <p className="text-primary-dark font-bold text-sm">
                                            <span className="text-[10px] text-secondary-light align-baseline mr-0.5">Rp</span>
                                            {item.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-primary-dark/40 font-quicksand text-sm italic">
                            Tidak ada produk promo terdaftar yang cocok dengan filter diskon ini.
                        </div>
                    )}
                </div>

                {/* GLOBAL INTEGRATED FOOTER */}
                <Footer />
                
            </div>
        </DashboardContainer>
    );
};

export default Sale;