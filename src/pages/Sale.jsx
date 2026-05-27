import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaTag, FaEdit, FaPlus, FaTimes, FaSave } from "react-icons/fa";

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
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import InputField from "../components/InputField"; // Pastikan path ini sesuai dengan struktur proyek Anda
import saleData from "../data/Sale.json";

const Sale = () => {
    // State manajemen data promosi dinamis
    const [promotions, setPromotions] = useState(saleData || []);
    const [selectedDiscount, setSelectedDiscount] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);

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

    // Handler Perubahan Input Form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handler picu mode edit dari kartu produk
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

    // Batalkan Prosedur Form
    const handleCancel = () => {
        setFormData({ id: "", name: "", slug: "", oldPrice: "", price: "", discount: "", img: "" });
        setEditingId(null);
        setShowForm(false);
    };

    // Handler Submit Form (Tambah Baru / Simpan Perubahan)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.price || !formData.discount) return;

        if (editingId) {
            // MODE UPDATE DATA
            const updatedData = promotions.map((item) => 
                item.id === editingId 
                    ? { 
                        ...item, 
                        name: formData.name,
                        slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
                        oldPrice: formData.oldPrice,
                        price: formData.price,
                        discount: formData.discount,
                        img: formData.img.trim() || fallbackImage
                      }
                    : item
            );
            setPromotions(updatedData);
        } else {
            // MODE TAMBAH BARU
            const newItem = {
                id: formData.id || Math.floor(1000 + Math.random() * 9000).toString(),
                name: formData.name,
                slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
                oldPrice: formData.oldPrice || formData.price,
                price: formData.price,
                discount: formData.discount.includes("%") ? formData.discount : `${formData.discount}%`,
                img: formData.img.trim() || fallbackImage
            };
            setPromotions([newItem, ...promotions]);
        }

        handleCancel();
    };

    // Filter kalkulasi berdasarkan diskon besar / semua potongan harga
    const filteredData = promotions.filter(item => {
        if (selectedDiscount === "high") {
            const numericDiscount = parseInt(item.discount) || 0;
            return numericDiscount >= 30;
        }
        return true;
    });

    return (
        <DashboardContainer>
            <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">

                {/* ADMIN CONTROL TOP BAR DENGAN DROPDOWN FILTER & AKSES FORM */}
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

                    {/* Tombol Kontrol Aksi & Dropdown Filter */}
                    <div className="flex flex-wrap items-center gap-4 font-quicksand">
                        <button
                            onClick={() => (showForm ? handleCancel() : setShowForm(true))}
                            className="px-5 py-2.5 bg-primary-dark text-white rounded-full text-xs font-bold tracking-wider hover:bg-hover-green shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
                        >
                            {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form Kontrol" : "Tambah Item Promo"}
                        </button>

                        <div className="flex items-center gap-3">
                            <label className="text-xs font-bold text-primary-dark/60 whitespace-nowrap">
                                Filter Besaran Diskon:
                            </label>
                            <Select value={selectedDiscount} onValueChange={setSelectedDiscount}>
                                <SelectTrigger className="w-[210px] bg-white border border-slate-300 rounded-full text-xs font-bold !text-slate-900 [&>span]:!text-slate-900 shadow-sm hover:border-slate-500 transition-all">
                                    <SelectValue placeholder="Pilih Potongan Harga" />
                                </SelectTrigger>
                                <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-2xl p-1 font-quicksand z-[9999]">
                                    <SelectItem
                                        value="all"
                                        className="text-xs font-bold !text-slate-800 rounded-xl focus:!bg-slate-100 focus:!text-slate-900 data-[state=checked]:!bg-slate-100 data-[state=checked]:!text-slate-900 cursor-pointer py-2.5"
                                    >
                                        Semua Potongan Harga
                                    </SelectItem>
                                    <SelectItem
                                        value="high"
                                        className="text-xs font-bold !text-emerald-700 rounded-xl focus:!bg-emerald-50 focus:!text-emerald-900 data-[state=checked]:!bg-emerald-50 data-[state=checked]:!text-emerald-900 cursor-pointer py-2.5"
                                    >
                                        Diskon Besar (≥ 30%)
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* FORM INPUT PROMOSI BARU / EDIT PROMOSI */}
                {showForm && (
                    <div className="bg-white p-8 rounded-[30px] border border-primary-light/20 shadow-[0_20px_50px_rgba(78,86,49,0.06)] animate-fade-in">
                        <div className="border-b border-border-subtle pb-4 mb-6">
                            <h3 className="text-lg font-bold font-playfair text-primary-dark">
                                {editingId ? "Ubah Parameter Kampanye Diskon" : "Registrasi Kampanye Diskon Baru"}
                            </h3>
                            <p className="text-xs text-primary-dark/50 font-quicksand">
                                {editingId ? "Ubah nilai MSRP asli, nominal harga promo efektif, dan label diskon produk terdaftar." : "Masukkan item busana baru untuk dimasukkan ke dalam rangkaian event markdown musiman."}
                            </p>
                        </div>
                        
                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
                                <InputField label="Nama Produk" name="name" placeholder="Contoh: Silk Pleated Dress" value={formData.name} onChange={handleInputChange} required />
                                <InputField label="MSRP Awal (Harga Coret)" name="oldPrice" placeholder="Contoh: 599.000" value={formData.oldPrice} onChange={handleInputChange} />
                                <InputField label="Harga Diskon Efektif" name="price" placeholder="Contoh: 299.000" value={formData.price} onChange={handleInputChange} required />
                                <InputField label="Label Diskon (Persen)" name="discount" placeholder="Contoh: 50%" value={formData.discount} onChange={handleInputChange} required />
                                <div className="lg:col-span-2 w-full">
                                    <InputField label="URL Gambar Aset" name="img" placeholder="https://images.unsplash.com/photo-..." value={formData.img} onChange={handleInputChange} />
                                </div>
                                <div className="lg:col-span-2 w-full">
                                    <InputField label="Slug URL / Kode Kunci (Opsional)" name="slug" placeholder="Otomatis digenerate jika kosong" value={formData.slug} onChange={handleInputChange} disabled={!!editingId} />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2 font-quicksand">
                                <button type="button" onClick={handleCancel} className="px-5 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle transition-colors cursor-pointer">
                                    Batalkan Prosedur
                                </button>
                                <button type="submit" className="px-5 py-2 bg-secondary-light text-white rounded-xl text-xs font-bold hover:bg-hover-rose shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer">
                                    <FaSave size={11} /> {editingId ? "Perbarui Item Promo" : "Simpan Ke Etalase Promo"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

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

                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute left-1/3 -bottom-10 w-40 h-40 bg-hover-green/20 rounded-full blur-2xl pointer-events-none" />
                </div>

                {/* GRID SECTION DENGAN AKSES TOMBOL EDIT */}
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
                                        src={item.img || fallbackImage}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = fallbackImage;
                                        }}
                                    />

                                    {/* Label Diskon Atas */}
                                    <div className="absolute top-4 right-4 bg-secondary-light text-white text-[10px] font-bold font-mono px-3 py-1.5 rounded-full z-20 shadow-sm">
                                        -{item.discount}
                                    </div>

                                    {/* Tombol Akses Edit Cepat (Floating Over Photo) */}
                                    <button
                                        onClick={() => handleEditClick(item)}
                                        className="absolute top-4 left-4 bg-white/90 hover:bg-white text-primary-dark p-2.5 rounded-full z-20 shadow-md border border-slate-200/50 transition-colors opacity-0 group-hover:opacity-100 duration-300 cursor-pointer"
                                        title="Ubah Konfigurasi Diskon"
                                    >
                                        <FaEdit size={12} />
                                    </button>

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
                        <div className="col-span-full text-center py-16 bg-white border border-dashed border-border-subtle rounded-[35px] text-primary-dark/40 font-quicksand text-sm italic">
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