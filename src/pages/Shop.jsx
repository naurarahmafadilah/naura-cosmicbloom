import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

// Import data awal dari Shop.json
import productsData from "../data/Shop.json"; 

const Shop = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State manajemen data produk agar bisa bertambah secara dinamis
  const [products, setProducts] = useState(productsData || []);

  // State untuk form input produk baru
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    category: "casual",
    price: "",
    img: ""
  });

  // Handler perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler submit form tambah produk
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    const newProduct = {
      id: formData.id || Math.floor(1000 + Math.random() * 9000).toString(),
      name: formData.name,
      slug: formData.slug || formData.name.toLowerCase().replace(/ /g, "-"),
      category: formData.category,
      price: formData.price,
      img: formData.img || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80"
    };

    setProducts([newProduct, ...products]);
    // Reset Form & Tutup Form
    setFormData({ id: "", name: "", slug: "", category: "casual", price: "", img: "" });
    setShowForm(false);
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

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">
        
        {/* ADMIN CONTROL TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <PageHeader
              title="Our Collections"
              breadcrumb={[
                { label: "Beranda", link: "/" },
                { label: "Shop" }
              ]}
            />
          </div>
          
          {/* Tombol Operasional Kontrol */}
          <div className="flex items-center gap-3 font-quicksand">
            <button className="px-5 py-2.5 bg-white border border-border-subtle rounded-full text-xs font-bold text-primary-dark/70 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 cursor-pointer">
              Ekspor CSV
            </button>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 bg-primary-dark text-white rounded-full text-xs font-bold tracking-wider hover:bg-hover-green shadow-veloura transition-all duration-300 cursor-pointer"
            >
              {showForm ? "Tutup Form Kontrol" : "+ Tambah Produk Baru"}
            </button>
          </div>
        </div>

        {/* FORM INPUT PRODUK BARU (LUXURY INTERACTIVE PANEL) */}
        {showForm && (
          <div className="bg-white p-8 rounded-[30px] border border-primary-light/20 shadow-[0_20px_50px_rgba(78,86,49,0.06)] animate-fade-in">
            <div className="border-b border-border-subtle pb-4 mb-6">
              <h3 className="text-lg font-bold font-playfair text-primary-dark">Registrasi Produk Toko</h3>
              <p className="text-xs text-primary-dark/50 font-quicksand">Tambahkan item busana atau aksesoris baru langsung ke dalam basis data etalase digital.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InputField label="ID Produk (Opsional)" name="id" placeholder="Contoh: 1024 (Otomatis jika kosong)" value={formData.id} onChange={handleInputChange} />
                <InputField label="Nama Produk" name="name" placeholder="Contoh: Silk Pleated Dress" value={formData.name} onChange={handleInputChange} required />
                <InputField label="Slug URL (Opsional)" name="slug" placeholder="Contoh: silk-pleated-dress" value={formData.slug} onChange={handleInputChange} />
                
                <SelectField 
                  label="Kategori Koleksi" 
                  name="category" 
                  value={formData.category} 
                  onChange={handleInputChange} 
                  options={[
                    { value: "casual", label: "Casual" }, 
                    { value: "dress", label: "Dress" },
                    { value: "summer", label: "Summer" },
                    { value: "modern", label: "Modern" }
                  ]} 
                />
                
                <InputField label="Harga Jual (Rupiah)" name="price" placeholder="Contoh: 349.000" value={formData.price} onChange={handleInputChange} required />
                <InputField label="URL Gambar Aset" name="img" placeholder="https://images.unsplash.com/photo-..." value={formData.img} onChange={handleInputChange} />
              </div>

              <div className="flex justify-end gap-3 pt-2 font-quicksand">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle transition-colors cursor-pointer">
                  Batalkan Prosedur
                </button>
                <button type="submit" className="px-5 py-2 bg-secondary-light text-white rounded-xl text-xs font-bold hover:bg-hover-rose shadow-sm transition-colors cursor-pointer">
                  Simpan Ke Etalase
                </button>
              </div>
            </form>
          </div>
        )}

        {/* CONTROLS: BAR FORM PENCARIAN & FILTER KATEGORI */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-center bg-white p-6 rounded-[35px] border border-primary-light/10 shadow-veloura">
          {/* Form Filter Input Pencarian */}
          <div className="xl:col-span-5 relative font-quicksand">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-dark/30">
              <FaSearch size={14} />
            </span>
            <input
              type="text"
              placeholder="Cari produk berdasarkan nama atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-bg-soft border border-border-subtle rounded-2xl text-xs font-medium text-primary-dark placeholder-primary-dark/30 focus:border-secondary-light focus:bg-white outline-none transition-all duration-300"
            />
          </div>

          {/* Filter Kategori Kontrol */}
          <div className="xl:col-span-7 flex flex-wrap items-center xl:justify-end gap-2">
            <span className="text-xs font-quicksand text-primary-dark/60 font-bold mr-2 flex items-center gap-1.5">
              <FaFilter size={10} /> Filter Kategori:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-primary-dark text-white shadow-sm"
                    : "bg-bg-soft border border-border-subtle text-primary-dark/70 hover:border-secondary-light/40 hover:text-secondary-light hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* HEADER JUDUL */}
        <div className="px-2">
          <h2 className="text-3xl font-playfair text-primary-dark leading-tight">
            Koleksi <span className="italic text-secondary-light">Terbaik</span> Kami
          </h2>
        </div>

        {/* PRODUCT GRID LIST */}
        <div className="bg-white border border-primary-light/10 rounded-[35px] overflow-hidden shadow-veloura">
          
          {/* Table Header Label */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-bg-soft border-b border-border-subtle text-[10px] font-bold tracking-wider text-primary-dark/50 uppercase font-mono">
            <div className="col-span-12 sm:col-span-5">Info Produk & Katalog</div>
            <div className="col-span-4 sm:col-span-2 text-center">Kategori</div>
            <div className="col-span-4 sm:col-span-2 text-right">Harga Jual</div>
            <div className="col-span-4 sm:col-span-3 text-right">Aksi Sistem</div>
          </div>

          {/* Table Rows Container */}
          <div className="divide-y divide-border-subtle/60">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <div 
                  key={item.id} 
                  className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-bg-soft/40 transition-all duration-300 group"
                >
                  {/* Gambar & Nama Produk */}
                  <div className="col-span-12 sm:col-span-5 flex items-center gap-4">
                    <div className="relative w-14 h-18 rounded-xl overflow-hidden bg-bg-soft border border-border-subtle flex-shrink-0 shadow-inner">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-primary-dark/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Link 
                          to={`/shop/${item.slug || item.id}`}
                          className="bg-white p-2 rounded-lg text-primary-dark hover:text-secondary-light shadow-sm transition-colors"
                        >
                          <FaSearch size={10} />
                        </Link>
                      </div>
                    </div>
                    
                    <div className="truncate space-y-0.5">
                      <span className="text-[9px] font-mono font-bold bg-bg-soft border border-border-subtle text-primary-dark/60 px-1.5 py-0.5 rounded">
                        ID-{item.id || "PRD"}
                      </span>
                      <Link to={`/shop/${item.slug || item.id}`} className="block">
                        <h3 className="text-sm font-bold font-playfair text-primary-dark hover:text-secondary-light transition-colors truncate">
                          {item.name}
                        </h3>
                      </Link>
                      <span className="text-[10px] text-primary-dark/40 font-mono block truncate">slug: {item.slug || "none"}</span>
                    </div>
                  </div>

                  {/* Tag Kategori */}
                  <div className="col-span-4 sm:col-span-2 text-center">
                    <span className="text-[9px] font-bold text-secondary-light bg-secondary-light/10 border border-secondary-light/20 px-2.5 py-1 rounded-xl uppercase tracking-wider inline-block">
                      {item.category || "General"}
                    </span>
                  </div>

                  {/* Harga Jual */}
                  <div className="col-span-4 sm:col-span-2 text-right font-quicksand">
                    <p className="text-sm font-bold text-primary-dark">
                      <span className="text-[10px] font-normal text-secondary-light mr-0.5">Rp</span>
                      {item.price}
                    </p>
                  </div>

                  {/* Aksi Operasional Admin */}
                  <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-2 font-quicksand">
                    <button className="px-3 py-1.5 border border-border-subtle bg-white text-primary-dark/70 rounded-xl text-[11px] font-bold hover:border-secondary-light/40 hover:text-secondary-light transition-all shadow-sm cursor-pointer">
                      Edit
                    </button>
                    <Link 
                      to={`/shop/${item.slug || item.id}`}
                      className="px-3 py-1.5 border border-secondary-light text-secondary-light rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-secondary-light hover:text-white transition-all text-center cursor-pointer"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-primary-dark/40 font-quicksand text-sm italic">
                Tidak ada produk terdaftar yang cocok dengan pencarian Anda.
              </div>
            )}
          </div>

          {/* Info Total Item Terfilter */}
          <div className="p-4 bg-bg-soft border-t border-border-subtle text-center">
            <span className="text-[10px] font-mono font-bold text-primary-dark/40 uppercase tracking-widest">
              Menampilkan {filteredProducts.length} Data Produk Terdaftar
            </span>
          </div>
        </div>

        {/* FOOTER LUXURY PROMOSI BANNER */}
        <div className="mt-12 p-8 lg:p-12 bg-primary-dark text-white rounded-[35px] flex flex-col md:flex-row items-center justify-between gap-6 shadow-veloura border border-primary-light/10">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-light animate-pulse" />
              <p className="text-[10px] font-mono uppercase text-white/50 tracking-wider">Layanan Konsultasi Storefront</p>
            </div>
            <h4 className="font-playfair text-xl text-white">Butuh Bantuan Memilih?</h4>
            <p className="text-white/60 text-xs font-quicksand mt-0.5">Tim stylist kami siap membantu mencarikan outfit terbaik untuk Anda.</p>
          </div>
          <Link to="/contact" className="bg-white text-primary-dark font-quicksand px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-bg-soft transition-all flex-shrink-0 shadow-sm">
            Hubungi Stylist
          </Link>
        </div>

        {/* GLOBAL INTEGRATED FOOTER */}
        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Shop;