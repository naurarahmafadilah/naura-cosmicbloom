import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaTag,
    FaEdit,
    FaPlus,
    FaTimes,
    FaSave,
    FaTrashAlt,
    FaSearch,
    FaChartPie,
    FaPercentage,
    FaPowerOff
} from "react-icons/fa";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN SELECT UI
// ==========================================
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select";

// ==========================================
// 2. LAYOUT & DATA SOURCE EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import saleData from "../data/Sale.json";

const Sale = () => {
    // State manajemen data promosi dinamis
    const [promotions, setPromotions] = useState(saleData || []);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDiscount, setSelectedDiscount] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isEventActive, setIsEventActive] = useState(true); 

    // State untuk mengontrol jam countdown bergerak
    const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 12, seconds: 59 });

    // State untuk form input (Tambah / Edit)
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        slug: "",
        oldPrice: "",
        price: "",
        discount: "",
        img: ""
    });

    const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";

    // EFFECT LOGIC: JAM BERGERAK REAL-TIME
    useEffect(() => {
        if (!isEventActive) return; // Jam berhenti jika event dimatikan admin

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const { hours, minutes, seconds } = prev;
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    clearInterval(timer);
                    return prev;
                }
                if (seconds > 0) return { ...prev, seconds: seconds - 1 };
                if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
                if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isEventActive]);

    // Fitur: Auto-Calculate Diskon saat admin mengisi Harga Coret dan Harga Baru
    useEffect(() => {
        const oldNum = parseInt(formData.oldPrice) || 0;
        const newNum = parseInt(formData.price) || 0;

        if (oldNum > 0 && newNum > 0 && oldNum > newNum && !editingId) {
            const calculated = Math.round(((oldNum - newNum) / oldNum) * 100);
            setFormData(prev => ({ ...prev, discount: `${calculated}%` }));
        }
    }, [formData.oldPrice, formData.price, editingId]);

    const formatTime = (num) => String(num).padStart(2, "0");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditClick = (item) => {
        setFormData({
            id: item.id || "",
            name: item.name || "",
            slug: item.slug || "",
            oldPrice: item.oldPrice || "",
            price: item.price || "",
            discount: item.discount || "",
            img: item.img || ""
        });
        setEditingId(item.id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus item promo ini dari etalase?")) {
            setPromotions(promotions.filter(item => item.id !== id));
        }
    };

    const handleCancel = () => {
        setFormData({ id: "", name: "", slug: "", oldPrice: "", price: "", discount: "", img: "" });
        setEditingId(null);
        setShowForm(false);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.discount) return;

        const cleanPrice = formData.price.toString().replace(/\D/g, "");
        const cleanOldPrice = formData.oldPrice ? formData.oldPrice.toString().replace(/\D/g, "") : cleanPrice;

        if (editingId) {
            const updatedData = promotions.map((item) =>
                item.id === editingId
                    ? {
                        ...item,
                        name: formData.name,
                        slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
                        oldPrice: cleanOldPrice,
                        price: cleanPrice,
                        discount: formData.discount.includes("%") ? formData.discount : `${formData.discount}%`,
                        img: formData.img.trim() || fallbackImage
                    }
                    : item
            );
            setPromotions(updatedData);
        } else {
            const newItem = {
                id: formData.id || Math.floor(1000 + Math.random() * 9000).toString(),
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
                oldPrice: cleanOldPrice,
                price: cleanPrice,
                discount: formData.discount.includes("%") ? formData.discount : `${formData.discount}%`,
                img: formData.img.trim() || fallbackImage
            };
            setPromotions([newItem, ...promotions]);
        }
        handleCancel();
    };

    // FILTER LOGIC COMBINED (Search Query + Dropdown Filter)
    const filteredData = promotions.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

        if (selectedDiscount === "high") {
            const numericDiscount = parseInt(item.discount) || 0;
            return matchesSearch && numericDiscount >= 30;
        }
        return matchesSearch;
    });

    const formatRupiah = (val) => {
        if (!val) return "0";
        const num = parseInt(val.toString().replace(/\D/g, ""), 10);
        return isNaN(num) ? "0" : num.toLocaleString("id-ID");
    };

    // Perhitungan Real-time Analytics untuk Dashboard Admin
    const avgDiscount = promotions.length > 0
        ? Math.round(promotions.reduce((acc, curr) => acc + (parseInt(curr.discount) || 0), 0) / promotions.length)
        : 0;

    return (
        <DashboardContainer>
            <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">

                {/* HEADER CONTROL */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
                            Pusat Kendali Promosi & Penjualan Terkurasi
                        </h1>
                        <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
                        <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
                            Panel sinkronisasi strategi markdowns musiman Veloura. Kelola aktivasi potongan harga, otorisasi kode promosi eksklusif, serta kurasi label harga khusus untuk periode penjualan tertentu.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 font-quicksand">
                        {/* SAKLAR INTERAKTIF EVENT */}
                        <button
                            onClick={() => setIsEventActive(!isEventActive)}
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${isEventActive
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                                }`}
                        >
                            <FaPowerOff className={isEventActive ? "animate-pulse" : ""} />
                            STATUS EVENT: {isEventActive ? "LIVE" : "OFFLINE"}
                        </button>

                        <button
                            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
                            className="px-5 py-2.5 bg-[#4E5631] text-white rounded-xl text-xs font-bold tracking-wider hover:bg-[#4E5631]/90 shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer uppercase"
                        >
                            {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form" : "Tambah Promo"}
                        </button>
                    </div>
                </div>

                {/* PANEL MINI ANALYTICS UNTUK ADMIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-quicksand">
                    <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-slate-50 text-[#4E5631] rounded-lg border border-border-subtle"><FaTag /></div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Total Item Aktif</p>
                            <p className="text-lg font-bold text-slate-800">{promotions.length} Produk</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-slate-50 text-[#A47174] rounded-lg border border-border-subtle"><FaPercentage /></div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Rata-Rata Diskon</p>
                            <p className="text-lg font-bold text-slate-800">{avgDiscount}% Potongan</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-slate-50 text-emerald-700 rounded-lg border border-border-subtle"><FaChartPie /></div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Katalog Diskon Besar</p>
                            <p className="text-lg font-bold text-slate-800">{promotions.filter(i => parseInt(i.discount) >= 30).length} Item (&gt;=30%)</p>
                        </div>
                    </div>
                </div>

                {/* KONTEN UTAMA */}
                <div className="max-w-7xl mx-auto space-y-8">

                    {/* FORM INPUT PARAMETER */}
                    {showForm && (
                        <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm animate-fade-in">
                            <div className="border-b border-bg-soft pb-3 mb-4 flex justify-between items-start">
                                <div>
                                    <h3 className="text-base font-bold font-playfair text-primary-dark">
                                        {editingId ? "Ubah Konfigurasi Kampanye Diskon" : "Registrasi Kampanye Baru"}
                                    </h3>
                                    <p className="text-[11px] text-primary-dark/50 font-quicksand">
                                        💡 *Tips: Masukkan MSRP Awal dan Harga Diskon, maka Sistem akan menghitung persentase label diskon secara otomatis!*
                                    </p>
                                </div>
                                <button onClick={handleCancel} className="text-primary-dark/30 hover:text-primary-dark cursor-pointer"><FaTimes size={14} /></button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                                    <InputField label="Nama Koleksi Produk" name="name" placeholder="Contoh: Silk Pleated Dress" value={formData.name} onChange={handleInputChange} required />
                                    <InputField label="MSRP Awal (Harga Coret)" name="oldPrice" placeholder="Contoh: 500000" value={formData.oldPrice} onChange={handleInputChange} />
                                    <InputField label="Harga Diskon Efektif" name="price" placeholder="Contoh: 350000" value={formData.price} onChange={handleInputChange} required />
                                    <InputField label="Label Diskon (Terhitung Otomatis)" name="discount" placeholder="Contoh: 30%" value={formData.discount} onChange={handleInputChange} required />
                                    <div className="lg:col-span-4 w-full">
                                        <InputField label="Tautan Aset Gambar Utama" name="img" placeholder="Masukkan URL Gambar..." value={formData.img} onChange={handleInputChange} />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 pt-3 border-t border-bg-soft">
                                    <button type="button" onClick={handleCancel} className="px-4 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle">Batal</button>
                                    <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider"><FaSave size={11} /> Simpan Katalog</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* PROMO BANNER DENGAN KONTROL TIMEOUT */}
                    <div className={`${isEventActive ? "bg-primary-dark" : "bg-slate-400"} rounded-xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between transition-colors duration-500 border border-white/10`}>
                        <div className="relative z-10 space-y-1.5 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                                <FaTag /> LIVE MARKETING SYSTEM
                            </div>
                            <h2 className="text-3xl font-playfair tracking-wide">
                                Etalase Kampanye <span className="italic text-secondary-light">Flash Sale</span>
                            </h2>
                            <p className="font-quicksand text-xs text-white/70">
                                Status modul hitung mundur saat ini sedang {isEventActive ? "memancarkan data ke etasale pembeli." : "dihentikan sementara oleh admin."}
                            </p>
                        </div>

                        {/* Timer Box Glassmorphism */}
                        <div className="mt-6 md:mt-0 relative z-10 font-quicksand shrink-0">
                            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 min-w-[200px]">
                                <p className="text-[9px] uppercase tracking-[3px] text-center text-white/60 mb-1.5 font-bold">Sisa Waktu Event</p>
                                <p className="text-xl font-mono font-bold tracking-widest text-center text-white flex justify-center gap-1">
                                    {isEventActive ? (
                                        <>
                                            <span>{formatTime(timeLeft.hours)}</span>:
                                            <span>{formatTime(timeLeft.minutes)}</span>:
                                            <span className="text-secondary-light">{formatTime(timeLeft.seconds)}</span>
                                        </>
                                    ) : (
                                        <span className="text-xs tracking-normal uppercase text-white/40">PAUSED</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* BAR PENCARIAN & FILTER KONSOLIDASI */}
                    <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-quicksand">
                        {/* LIVE SEARCH BAR */}
                        <div className="relative w-full sm:w-96 flex items-center">
                            <FaSearch className="absolute left-3.5 text-primary-dark/30 text-xs pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Cari nama koleksi promo secara instan..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-9 bg-bg-soft border border-border-subtle rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631]/60 transition-colors placeholder-primary-dark/30"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery("")} className="absolute right-3 text-primary-dark/40 hover:text-primary-dark text-[10px]">CLEAR</button>
                            )}
                        </div>

                        {/* SELECT DROPDOWN SHADCN */}
                        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                            <span className="text-[10px] font-bold text-primary-dark/40 uppercase tracking-wider">Filter Besaran:</span>
                            <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                                <SelectTrigger className="w-full sm:w-[180px] h-9 bg-white border border-border-subtle rounded-xl text-xs font-bold text-slate-900 shadow-xs focus:ring-0">
                                    <SelectValue placeholder="Pilih Potongan" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-border-subtle font-quicksand z-[9999]">
                                    <SelectItem value="all" className="text-xs font-semibold py-2">Semua Potongan Harga</SelectItem>
                                    <SelectItem value="high" className="text-xs font-semibold text-emerald-700 py-2">Diskon Besar (≥ 30%)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* GRID SECTIONS KATALOG */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredData.length > 0 ? (
                            filteredData.map((item) => (
                                <div
                                    key={item.id}
                                    className="group relative bg-white p-3 rounded-xl border border-border-subtle shadow-xs transition-all duration-400 hover:-translate-y-1 hover:shadow-sm"
                                >
                                    <div className="block relative overflow-hidden rounded-lg bg-bg-soft aspect-[3/4] shadow-inner">
                                        <img
                                            src={item.img || fallbackImage}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-103"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = fallbackImage;
                                            }}
                                        />

                                        {/* Label Diskon Atas */}
                                        <div className="absolute top-3 right-3 bg-[#A47174] text-white text-[9px] font-bold px-2 py-1 rounded-md z-20 shadow-xs tracking-wider uppercase">
                                            {item.discount.includes("%") ? item.discount : `${item.discount} OFF`}
                                        </div>

                                        {/* CORE FLOATING ACTION BUTTONS */}
                                        <div className="absolute top-3 left-3 flex gap-1.5 z-20 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button
                                                onClick={() => handleEditClick(item)}
                                                className="bg-white hover:bg-slate-50 text-primary-dark p-2 rounded-lg shadow-md border border-border-subtle transition-colors cursor-pointer"
                                                title="Ubah Konfigurasi Diskon"
                                            >
                                                <FaEdit size={11} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(item.id)}
                                                className="bg-white hover:bg-rose-50 text-rose-600 p-2 rounded-lg shadow-md border border-border-subtle transition-colors cursor-pointer"
                                                title="Hapus Dari Etalase"
                                            >
                                                <FaTrashAlt size={11} />
                                            </button>
                                        </div>

                                        <Link
                                            to={`/sale/${item.slug || item.id}`}
                                            className="absolute inset-0 bg-primary-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 backdrop-blur-[1px]"
                                        >
                                            <div className="bg-white text-primary-dark w-full py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-center shadow-sm">
                                                Pratinjau Live
                                            </div>
                                        </Link>
                                    </div>

                                    {/* Metadata Deskripsi Produk */}
                                    <div className="mt-3.5 pb-1 text-center space-y-1">
                                        <Link to={`/sale/${item.slug || item.id}`}>
                                            <h3 className="text-sm font-bold font-playfair text-primary-dark group-hover:text-[#4E5631] transition-colors duration-300 line-clamp-1 px-1 tracking-wide">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center justify-center gap-2 font-quicksand">
                                            {item.oldPrice && (
                                                <p className="text-primary-dark/30 text-[11px] line-through font-medium">
                                                    Rp {formatRupiah(item.oldPrice)}
                                                </p>
                                            )}
                                            <p className="text-[#4E5631] font-extrabold text-xs">
                                                <span className="text-[10px] font-semibold align-baseline mr-0.5 text-primary-dark/60">Rp</span>
                                                {formatRupiah(item.price)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-16 bg-white border border-dashed border-border-subtle rounded-xl text-primary-dark/40 font-quicksand text-xs italic">
                                Tidak ada produk promo terdaftar yang cocok dengan pencarian atau filter diskon Anda.
                            </div>
                        )}
                    </div>

                    {/* GLOBAL INTEGRATED FOOTER */}
                    <Footer />

                </div>
            </div>
        </DashboardContainer>
    );
};

export default Sale;