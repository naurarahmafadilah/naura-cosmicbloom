import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTag, FaRegClock, FaEdit, FaToggleOn, FaToggleOff, FaTimes, FaSave } from "react-icons/fa";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN TABS UI
// ==========================================
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// ==========================================
// 2. LAYOUT & DATA SOURCE EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import saleData from "../data/Sale.json";

const SaleDetail = () => {
  const { slug } = useParams();
  
  // State manajemen kampanye promosi admin
  const [selectedSize, setSelectedSize] = useState("M");
  const [isCampaignActive, setIsCampaignActive] = useState(true);
  
  // State dinamis untuk menampung data produk agar perubahan nominal diskon langsung terlihat di layar
  const [currentProduct, setCurrentProduct] = useState(() => {
    return saleData.find((p) => p.slug === slug || p.id?.toString() === slug) || null;
  });

  // State kendali modal edit rasio & harga diskon
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    price: currentProduct?.price || "",
    oldPrice: currentProduct?.oldPrice || "",
    discount: currentProduct?.discount || ""
  });

  // Jika produk tidak ditemukan (Handling Error Admin)
  if (!currentProduct) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand">
          <h2 className="font-playfair text-3xl text-primary-dark">Arsip Promosi Tidak Ditemukan</h2>
          <p className="text-xs text-primary-dark/40 mt-1">Token diskon atau SKU promosi ini sudah kedaluwarsa atau dihapus.</p>
          <Link to="/sale" className="text-secondary-light mt-6 inline-block underline font-bold text-xs uppercase tracking-wider hover:text-primary-dark transition-colors">
            Kembali ke Panel Kampanye
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Token spesifikasi penunjang audit tekstil Veloura Atelier
  const productSizes = ["S", "M", "L", "XL"];
  const details = {
    bahan: "100% Premium Mulberry Silk Blend. Memiliki jalinan serat alami yang sangat halus, memberikan efek kilau elegan yang subtil, sekaligus adem dan jatuh dengan sempurna saat dikenakan.",
    perawatan: "Disarankan untuk dry clean atau dicuci manual dengan tangan menggunakan air dingin. Setrika dengan suhu rendah (mode sutra) dan hindari penggunaan pemutih pakaian agar serat kain tetap terjaga presisinya.",
    panduan: "Manekin/Model mengenakan ukuran M (Tinggi: 174cm, Lingkar Dada: 82cm). Pilih ukuran reguler untuk siluet klasik, atau satu ukuran di atasnya untuk tampilan yang lebih mengalir dan kontemporer."
  };

  const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=300&q=80";

  // Handler simpan konfigurasi harga baru dari modal
  const handleSaveMetrics = (e) => {
    e.preventDefault();
    setCurrentProduct(prev => ({
      ...prev,
      price: editForm.price,
      oldPrice: editForm.oldPrice,
      discount: editForm.discount
    }));
    setIsModalOpen(false);
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark relative">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Detail Matriks Kampanye"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Promosi & Markdown", link: "/sale" },
            { label: currentProduct.name }
          ]}
        />

        {/* LAYOUT GRID UTAMA PROMOSI */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* SISI KIRI: MEDIA AUDIT & BADGE DISKON */}
          <div className="relative group">
            <div className="rounded-[35px] overflow-hidden aspect-[4/5] bg-white border border-primary-light/10 p-3 shadow-veloura">
              <div className="w-full h-full rounded-[26px] overflow-hidden relative">
                <img 
                  src={currentProduct.img || fallbackImage} 
                  alt={currentProduct.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Tag Badge Potongan Harga */}
            {isCampaignActive ? (
              <div className="absolute top-6 left-6 bg-secondary-light text-white px-4 py-2 rounded-xl font-bold font-mono text-[10px] tracking-widest border border-secondary-light/20 flex items-center gap-2 shadow-md animate-fade-in">
                <FaTag size={9} /> POTONGAN HARGA LIVE (-{currentProduct.discount})
              </div>
            ) : (
              <div className="absolute top-6 left-6 bg-slate-500 text-white px-4 py-2 rounded-xl font-bold font-mono text-[10px] tracking-widest border border-slate-400 flex items-center gap-2 shadow-md animate-fade-in">
                <FaTimes size={9} /> KAMPANYE DIJEDA
              </div>
            )}
          </div>

          {/* SISI KANAN: PANEL AUDIT MARGIN & MANAJEMEN EVENT */}
          <div className="flex flex-col">
            
            {/* Navigasi Kembali */}
            <Link 
              to="/sale" 
              className="inline-flex items-center gap-2 text-secondary-dark/50 text-[10px] font-bold uppercase tracking-[3px] mb-6 hover:text-secondary-light transition-colors"
            >
              <FaArrowLeft className="text-[9px]" /> Kembali ke Manajemen Kampanye
            </Link>

            <div className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-[3px] mb-2 font-quicksand">
               <FaRegClock size={11} /> Siklus Kampanye Aktif
            </div>
            
            <h1 className="text-4xl font-playfair text-primary-dark mb-5 leading-tight">{currentProduct.name}</h1>
            
            {/* BOX KOMPARASI AUDIT HARGA BARU & LAMA */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-primary-light/10 mb-6 shadow-sm font-quicksand">
              <div className="flex flex-col border-r border-border-subtle/60">
                <span className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">MSRP Asli Awal</span>
                <span className="text-xl text-primary-dark/30 line-through mt-0.5">Rp {currentProduct.oldPrice}</span>
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-[10px] text-secondary-light font-bold uppercase tracking-wider">Harga Diskon Efektif</span>
                <span className="text-2xl font-bold text-primary-dark flex items-baseline mt-0.5">
                  <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                  {isCampaignActive ? currentProduct.price : currentProduct.oldPrice}
                </span>
              </div>
            </div>

            {/* MONITORING ALOKASI SIZE PROMOSI */}
            <div className="mb-6 font-quicksand">
              <span className="block text-xs font-bold uppercase tracking-wider text-primary-dark mb-3">
                Gudang Alokasi Ukuran Terpaut
              </span>
              <div className="flex gap-3">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-xs font-mono border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      selectedSize === size
                        ? "border-primary-dark bg-primary-dark text-white shadow-sm"
                        : "border-border-subtle bg-white text-primary-dark hover:border-secondary-light"
                    }`}
                  >
                    <span className="font-bold">{size}</span>
                    <span className={`text-[8px] ${selectedSize === size ? 'text-white/60' : 'text-primary-dark/40'}`}>sale ok</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB DETIL INFORMASI PRODUK MENGGUNAKAN SHADCN TABS */}
            <Tabs defaultValue="bahan" className="w-full mb-6 font-quicksand bg-white border border-border-subtle rounded-2xl overflow-hidden shadow-sm">
              <TabsList className="w-full grid grid-cols-3 bg-bg-main/30 rounded-none h-auto p-0 border-b border-border-subtle">
                <TabsTrigger 
                  value="bahan" 
                  className="py-3 text-[10px] font-bold uppercase tracking-wider text-secondary-dark/60 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:border-b-2 data-[state=active]:border-primary-dark transition-all"
                >
                  Struktur Material
                </TabsTrigger>
                <TabsTrigger 
                  value="perawatan" 
                  className="py-3 text-[10px] font-bold uppercase tracking-wider text-secondary-dark/60 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:border-b-2 data-[state=active]:border-primary-dark transition-all"
                >
                  SOP Perawatan
                </TabsTrigger>
                <TabsTrigger 
                  value="panduan" 
                  className="py-3 text-[10px] font-bold uppercase tracking-wider text-secondary-dark/60 rounded-none data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:border-b-2 data-[state=active]:border-primary-dark transition-all"
                >
                  Dimensi Manekin
                </TabsTrigger>
              </TabsList>
              
              <div className="p-5 text-xs text-primary-dark/70 leading-relaxed min-h-[100px] bg-white">
                <TabsContent value="bahan" className="m-0 focus-visible:outline-none">
                  <p>{details.bahan}</p>
                </TabsContent>
                <TabsContent value="perawatan" className="m-0 focus-visible:outline-none">
                  <p>{details.perawatan}</p>
                </TabsContent>
                <TabsContent value="panduan" className="m-0 focus-visible:outline-none">
                  <p>{details.panduan}</p>
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="h-[1px] bg-border-subtle/50 w-full mb-6"></div>

            {/* REGULASI EVENT HUKUM DISKON */}
            <div className="space-y-3 mb-6 font-quicksand">
              <div className="flex items-center gap-3 text-xs text-primary-dark/70">
                <FaCheckCircle className="text-secondary-light text-sm flex-shrink-0" /> 
                <span>Kalkulasi Otomatis: Harga promo langsung memotong nilai transaksi akhir pada invoice pembeli.</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-primary-dark/70">
                <FaCheckCircle className="text-secondary-light text-sm flex-shrink-0" /> 
                <span>Segel Jaminan Mutu: Produk lolos QC dari pusat distribusi utama Veloura Atelier Warehouse.</span>
              </div>
            </div>

            {/* ACTION PANEL MANAGEMENT SYSTEM */}
            <div className="flex flex-col sm:flex-row gap-3 font-quicksand">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-[3] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 bg-primary-dark text-white hover:bg-hover-green shadow-md cursor-pointer transition-all duration-300"
              >
                <FaEdit className="text-xs" /> Atur Ulang Rasio & Nominal Diskon (Ukuran {selectedSize})
              </button>
              
              <button 
                onClick={() => setIsCampaignActive(!isCampaignActive)}
                className={`flex-1 py-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isCampaignActive 
                    ? "border-secondary-light/30 bg-secondary-light/5 text-secondary-light" 
                    : "border-slate-300 bg-slate-50 text-slate-500 hover:border-slate-400"
                }`}
              >
                {isCampaignActive ? <FaToggleOn className="text-sm" /> : <FaToggleOff className="text-sm" />}
                {isCampaignActive ? "Diskon Aktif" : "Diskon Dijeda"}
              </button>
            </div>

          </div>
        </div>

        {/* MODAL OVERLAY: ADJUSTMENT NOMINAL DISKON */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-primary-dark/40 backdrop-blur-sm flex items-center justify-center z-[99999] p-4 font-quicksand animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-[30px] shadow-2xl border border-primary-light/15 p-6 animate-scale-in">
              <div className="flex items-center justify-between border-b border-border-subtle pb-4 mb-4">
                <div>
                  <h3 className="font-playfair text-lg font-bold text-primary-dark">Matriks Ukuran {selectedSize}</h3>
                  <p className="text-[11px] text-primary-dark/50">Sesuaikan margin markdown promosi item.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-2 text-primary-dark/40 hover:text-primary-dark rounded-full hover:bg-bg-soft transition-colors cursor-pointer"
                >
                  <FaTimes size={14} />
                </button>
              </div>

              <form onSubmit={handleSaveMetrics} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-primary-dark/70 mb-1.5">MSRP Asli (Awal)</label>
                  <input 
                    type="text" 
                    value={editForm.oldPrice}
                    onChange={(e) => setEditForm({...editForm, oldPrice: e.target.value})}
                    className="w-full px-4 py-2.5 bg-bg-soft border border-border-subtle rounded-xl text-xs font-semibold text-primary-dark outline-none focus:border-secondary-light transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-primary-dark/70 mb-1.5">Harga Diskon Baru</label>
                  <input 
                    type="text" 
                    value={editForm.price}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="w-full px-4 py-2.5 bg-bg-soft border border-border-subtle rounded-xl text-xs font-semibold text-primary-dark outline-none focus:border-secondary-light transition-all" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase text-primary-dark/70 mb-1.5">Persentase Label (Contoh: 30%)</label>
                  <input 
                    type="text" 
                    value={editForm.discount}
                    onChange={(e) => setEditForm({...editForm, discount: e.target.value})}
                    className="w-full px-4 py-2.5 bg-bg-soft border border-border-subtle rounded-xl text-xs font-semibold text-primary-dark outline-none focus:border-secondary-light transition-all" 
                    required
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 border border-border-subtle rounded-xl text-xs font-bold text-primary-dark/70 hover:bg-bg-soft transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-2.5 bg-primary-dark text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-hover-green shadow-sm transition-colors cursor-pointer"
                  >
                    <FaSave /> Terapkan Nilai
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* FOOTER GLOBAL */}
        <div className="mt-16">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default SaleDetail;