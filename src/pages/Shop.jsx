import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFilter, FaSearch, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaChevronRight, FaTrashAlt, FaBoxOpen, FaLayerGroup, 
  FaDollarSign, FaEyeSlash, FaCheckCircle, FaExclamationTriangle 
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
// 2. LAYOUT & DATA SOURCE EXISTING (VELOURA STYLE)
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

// Import data awal dari Shop.json
import productsData from "../data/Shop.json";

const Shop = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State manajemen data produk agar bisa bertambah & terhapus secara dinamis
  const [products, setProducts] = useState(productsData || []);

  // State untuk menandai apakah kita sedang mengedit produk
  const [editingProductId, setEditingProductId] = useState(null);

  // State untuk form input produk baru / produk yang sedang diedit
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    category: "casual",
    price: "",
    img: "",
    stock: "Tersedia", // Opsi tambahan Admin
  });

  const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";

  // Handler perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler khusus untuk perubahan Shadcn Select Kategori
  const handleCategoryChange = (value) => {
    setFormData((prev) => ({ ...prev, category: value }));
  };

  // Handler khusus untuk perubahan Shadcn Select Status Stok
  const handleStockChange = (value) => {
    setFormData((prev) => ({ ...prev, stock: value }));
  };

  // Handler saat tombol "Edit" di tabel ditekan
  const handleEditClick = (product) => {
    setFormData({
      id: product.id || "",
      name: product.name || "",
      slug: product.slug || "",
      category: product.category || "casual",
      price: product.price || "",
      img: product.img || "",
      stock: product.stock || "Tersedia"
    });
    setEditingProductId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handler untuk menghapus produk dari daftar
  const handleDeleteClick = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini dari katalog etalase?")) {
      const remainingProducts = products.filter((item) => item.id !== id);
      setProducts(remainingProducts);
    }
  };

  // Handler untuk membatalkan proses edit/tambah produk
  const handleCancel = () => {
    setFormData({ id: "", name: "", slug: "", category: "casual", price: "", img: "", stock: "Tersedia" });
    setEditingProductId(null);
    setShowForm(false);
  };

  // Handler submit form (Tambah Baru / Simpan Perubahan)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    if (editingProductId) {
      // MODE UPDATE DATA
      const updatedProducts = products.map((item) => 
        item.id === editingProductId 
          ? {
              ...item,
              name: formData.name,
              slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
              category: formData.category,
              price: formData.price,
              img: formData.img.trim() || fallbackImage,
              stock: formData.stock
            }
          : item
      );
      setProducts(updatedProducts);
    } else {
      // MODE TAMBAH BARU
      const newProduct = {
        id: formData.id || Math.floor(1000 + Math.random() * 9000).toString(),
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().trim().replace(/\s+/g, "-"),
        category: formData.category,
        price: formData.price,
        img: formData.img.trim() || fallbackImage,
        stock: formData.stock
      };
      setProducts([newProduct, ...products]);
    }
    
    handleCancel();
  };

  // Logika Filter Gabungan: Kategori + Form Pencarian Kata Kunci
  const filteredProducts = products.filter((item) => {
    const matchCategory = 
      activeCategory === "all" || 
      item.category?.toLowerCase() === activeCategory.toLowerCase();
    
    const matchSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toString().includes(searchTerm);

    return matchCategory && matchSearch;
  });

  const categories = ["all", "dress", "casual", "summer", "modern"];

  // DATA ANALISIS ADMIN (METRICS)
  const totalItems = products.length;
  const uniqueCategories = new Set(products.map(p => p.category)).size;
  const outOfStockItems = products.filter(p => p.stock === "Habis").length;

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Sistem Manajemen Katalog & Produk
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
              Panel kendali kurasi koleksi etalase Veloura. Kelola visibilitas SKU, sinkronisasi inventaris kain, pembaruan harga premium, serta peluncuran rilis musiman secara terpusat.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button className="px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-primary-dark/70 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Ekspor Laporan CSV
            </button>
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-5 py-2.5 bg-[#4E5631] text-white rounded-xl text-xs font-bold tracking-wider hover:bg-[#4E5631]/90 shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form Otorisasi" : "Registrasi Item Baru"}
            </button>
          </div>
        </div>

        {/* ==========================================
            METRICS HUB / KPI COUNTER UNTUK ADMIN
            ========================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-[#4E5631] rounded-lg border border-border-subtle">
              <FaBoxOpen size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Total Item Aktif</p>
              <h3 className="text-lg font-bold text-slate-800">{totalItems} Produk</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-secondary-light rounded-lg border border-border-subtle">
              <FaLayerGroup size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Klaster Kategori</p>
              <h3 className="text-lg font-bold text-slate-800">{uniqueCategories} Divisi</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-amber-600 rounded-lg border border-border-subtle">
              <FaExclamationTriangle size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Stok Menipis/Habis</p>
              <h3 className="text-lg font-bold text-slate-800">{outOfStockItems} Sku</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-emerald-600 rounded-lg border border-border-subtle">
              <FaDollarSign size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Mata Uang Basis</p>
              <h3 className="text-lg font-bold text-slate-800">IDR (Rp)</h3>
            </div>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* FORM INPUT PRODUK BARU / EDIT PRODUK */}
          {showForm && (
            <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm animate-fade-in">
              <div className="border-b border-bg-soft pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-primary-dark">
                    {editingProductId ? "Ubah Konfigurasi Data Etalase" : "Registrasi Produk Toko Baru"}
                  </h3>
                  <p className="text-[11px] text-primary-dark/50 font-quicksand">
                    Masukkan data inventaris secara presisi. Kolom bertanda wajib harus dipenuhi demi sinkronisasi sistem pembayaran.
                  </p>
                </div>
                <button onClick={handleCancel} className="text-primary-dark/30 hover:text-primary-dark cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <InputField 
                    label="Kunci ID Inventaris" 
                    name="id" 
                    placeholder={editingProductId ? "ID Terkunci Otomatis" : "Dibuat acak jika kosong"} 
                    value={formData.id} 
                    onChange={handleInputChange} 
                    disabled={!!editingProductId}
                  />
                  <InputField label="Nama Artikel Produk" name="name" placeholder="Contoh: Silk Pleated Dress" value={formData.name} onChange={handleInputChange} required />
                  <InputField label="Nominal Harga Jual (Rp)" name="price" placeholder="Contoh: 349.000" value={formData.price} onChange={handleInputChange} required />
                  
                  {/* DROPDOWN KATEGORI */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[11px] font-bold text-primary-dark/60">Kategori Koleksi:</label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="w-full h-9 bg-white border border-border-subtle rounded-xl text-xs font-bold text-slate-900 shadow-xs focus:ring-0">
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-border-subtle font-quicksand z-[9999]">
                        {categories.filter(c => c !== "all").map((cat) => (
                          <SelectItem key={cat} value={cat} className="text-xs font-semibold py-2 uppercase tracking-wider">
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* TAMBAHAN ADMIN: DROPDOWN MANAJEMEN STATUS STOK */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[11px] font-bold text-primary-dark/60">Status Alokasi Inventaris:</label>
                    <Select value={formData.stock || "Tersedia"} onValueChange={handleStockChange}>
                      <SelectTrigger className="w-full h-9 bg-white border border-border-subtle rounded-xl text-xs font-bold text-slate-900 shadow-xs focus:ring-0">
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-border-subtle font-quicksand z-[9999]">
                        <SelectItem value="Tersedia" className="text-xs font-semibold text-emerald-700 py-2">
                          ✓ UNIT TERSEDIA (READY)
                        </SelectItem>
                        <SelectItem value="Habis" className="text-xs font-semibold text-rose-700 py-2">
                          ✕ HABIS / DIARSIPKAN
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="lg:col-span-3 w-full">
                    <InputField label="Aset URL Media Gambar (Unsplash / Cloudinary)" name="img" placeholder="https://images.unsplash.com/photo-..." value={formData.img} onChange={handleInputChange} />
                  </div>
                  <div className="lg:col-span-4 w-full">
                    <InputField label="Slug URL Alamat Web Custom (Opsional)" name="slug" placeholder="Otomatis digenerate menggunakan format huruf kecil pemisah tanda hubung jika dikosongkan" value={formData.slug} onChange={handleInputChange} disabled={!!editingProductId} />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-bg-soft">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle">
                    Batalkan Operasi
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider">
                    <FaSave size={11} /> {editingProductId ? "Terapkan Perubahan" : "Komit Data"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CONTROLS: BAR FILTER DAN PENCARIAN */}
          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 font-quicksand">
            <div className="relative w-full lg:w-96 flex items-center">
              <FaSearch className="absolute left-3.5 text-primary-dark/30 text-xs pointer-events-none" />
              <input
                type="text"
                placeholder="Pencarian Multi-Kunci (Nama Artikel, ID Unik Sku)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-bg-soft border border-border-subtle rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631]/60 transition-colors placeholder-primary-dark/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-primary-dark/40 uppercase tracking-wider flex items-center gap-1">
                <FaFilter size={9} /> Filter Klaster:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#4E5631] text-white shadow-sm"
                      : "bg-bg-soft border border-border-subtle text-primary-dark/70 hover:border-secondary-light/40 hover:text-secondary-light hover:bg-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* LISTING UTAMA */}
          <div className="bg-white border border-border-subtle rounded-xl overflow-hidden shadow-xs">
            
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-bg-soft border-b border-border-subtle text-[10px] font-bold tracking-wider text-primary-dark/50 uppercase font-mono">
              <div className="col-span-12 md:col-span-5">Deskripsi Utama & Identitas SKU</div>
              <div className="col-span-3 md:col-span-2 text-center">Klaster Divisi</div>
              <div className="col-span-3 md:col-span-1 text-center">Ketersediaan</div>
              <div className="col-span-3 md:col-span-1 text-right">Nilai Jual</div>
              <div className="col-span-3 md:col-span-3 text-right">Konsol Otorisasi</div>
            </div>

            {/* Table Rows Body */}
            <div className="divide-y divide-border-subtle/60">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                  <div 
                    key={item.id} 
                    className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-bg-soft/30 transition-all duration-300 group"
                  >
                    {/* Info Utama */}
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-bg-soft border border-border-subtle flex-shrink-0 shadow-inner aspect-[3/4]">
                        <img
                          src={item.img || fallbackImage}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackImage;
                          }}
                        />
                      </div>
                      
                      <div className="truncate space-y-0.5">
                        <span className="text-[9px] font-mono font-bold bg-bg-soft border border-border-subtle text-primary-dark/60 px-1.5 py-0.5 rounded-md shadow-sm">
                          ID-{item.id || "PRD"}
                        </span>
                        <Link to={`/shop/${item.slug || item.id}`} className="block pt-0.5">
                          <h3 className="text-sm font-bold font-playfair text-primary-dark group-hover:text-[#4E5631] transition-colors duration-300 truncate pr-4">
                            {item.name}
                          </h3>
                        </Link>
                        <span className="text-[10px] text-primary-dark/40 font-mono block truncate">slug: {item.slug || "none"}</span>
                      </div>
                    </div>

                    {/* Tag Kategori */}
                    <div className="col-span-3 md:col-span-2 text-center">
                      <span className="text-[9px] font-bold text-secondary-light bg-secondary-light/10 border border-secondary-light/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block">
                        {item.category || "General"}
                      </span>
                    </div>

                    {/* INDIKATOR STATUS GUDANG STOK */}
                    <div className="col-span-3 md:col-span-1 text-center font-quicksand">
                      {item.stock === "Habis" ? (
                        <span className="text-[9px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          <FaEyeSlash size={9} /> Kosong
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                          <FaCheckCircle size={9} /> Ready
                        </span>
                      )}
                    </div>

                    {/* Harga */}
                    <div className="col-span-3 md:col-span-1 text-right font-quicksand">
                      <p className="text-xs font-bold text-primary-dark">
                        <span className="text-[10px] text-primary-dark/60 align-baseline mr-0.5">Rp</span>
                        {item.price}
                      </p>
                    </div>

                    {/* MANAGEMENT COMMAND BUTTONS */}
                    <div className="col-span-3 md:col-span-3 flex items-center justify-end gap-2 font-quicksand">
                      <button 
                        onClick={() => handleEditClick(item)}
                        className="px-2.5 py-1 border border-border-subtle bg-white text-primary-dark/70 rounded-lg text-[10px] font-bold hover:border-secondary-light/50 hover:text-secondary-light transition-all shadow-xs cursor-pointer flex items-center gap-1"
                      >
                        <FaEdit size={10} /> Ubah
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(item.id)}
                        className="px-2.5 py-1 border border-transparent bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold hover:bg-rose-600 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-1"
                        title="Hapus Permanen Dari Sistem"
                      >
                        <FaTrashAlt size={10} /> Hapus
                      </button>
                      <Link 
                        to={`/shop/${item.slug || item.id}`}
                        className="w-6 h-6 bg-primary-dark/5 hover:bg-primary-dark hover:text-white text-primary-dark rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer"
                      >
                        <FaChevronRight size={8} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-white text-primary-dark/40 font-quicksand text-xs italic">
                  Tidak ada data arsip produk terdaftar yang cocok dengan parameter kriteria ini.
                </div>
              )}
            </div>

            <div className="p-3 bg-bg-soft border-t border-border-subtle text-center">
              <span className="text-[10px] font-mono font-bold text-primary-dark/40 uppercase tracking-widest">
                Menampilkan total {filteredProducts.length} Dari total {totalItems} Data Sistem Terkunci
              </span>
            </div>
          </div>

          {/* BANNER LAYON FOOTER */}
          <div className="bg-primary-dark rounded-xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
            <div className="relative z-10 space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-light animate-pulse" /> SINKRONISASI CLOUD AMAN
              </div>
              <h2 className="text-2xl sm:text-3xl font-playfair tracking-wide leading-tight">
                Pencadangan Berkas <span className="italic text-secondary-light">Otomatis</span>
              </h2>
              <p className="font-quicksand text-xs text-white/70">
                Every modification onto this system is directly broadcasted into consumers frontend matrix infrastructure.
              </p>
            </div>

            {/* Efek Ambient */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 -bottom-10 w-40 h-40 bg-hover-green/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          <Footer />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default Shop;