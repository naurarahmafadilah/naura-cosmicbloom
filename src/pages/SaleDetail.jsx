import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaTag, FaRegClock, FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

// Import data master promosi seasonal
import saleData from "../data/Sale.json";

const SaleDetail = () => {
  const { slug } = useParams();
  
  // State manajemen kampanye promosi admin
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeTab, setActiveTab] = useState("bahan"); 
  const [isCampaignActive, setIsCampaignActive] = useState(true);

  // Mencari produk berdasarkan slug dari URL
  const product = saleData.find((p) => p.slug === slug || p.id?.toString() === slug);

  // Jika produk tidak ditemukan (Handling Error Admin)
  if (!product) {
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

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Detail Matriks Kampanye"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Promosi & Markdown", link: "/sale" },
            { label: product.name }
          ]}
        />

        {/* LAYOUT GRID UTAMA PROMOSI */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* SISI KIRI: MEDIA AUDIT & BADGE DISKON */}
          <div className="relative group">
            <div className="rounded-[35px] overflow-hidden aspect-[4/5] bg-bg-main border border-primary-light/10 p-3 shadow-veloura bg-white">
              <div className="w-full h-full rounded-[26px] overflow-hidden relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Tag Badge Potongan Harga */}
            <div className="absolute top-6 left-6 bg-secondary-light text-white px-4 py-2 rounded-xl font-bold font-mono text-[10px] tracking-widest border border-secondary-light/20 flex items-center gap-2 shadow-md">
              <FaTag size={9} /> POTONGAN HARGA LIVE (-{product.discount})
            </div>
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
            
            <h1 className="text-4xl font-playfair text-primary-dark mb-5 leading-tight">{product.name}</h1>
            
            {/* BOX KOMPARASI AUDIT HARGA BARU & LAMA */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-primary-light/10 mb-6 shadow-sm font-quicksand">
              <div className="flex flex-col border-r border-border-subtle/60">
                <span className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">MSRP Asli Awal</span>
                <span className="text-xl text-primary-dark/30 line-through mt-0.5">Rp {product.oldPrice}</span>
              </div>
              <div className="flex flex-col pl-2">
                <span className="text-[10px] text-secondary-light font-bold uppercase tracking-wider">Harga Diskon Efektif</span>
                <span className="text-2xl font-bold text-primary-dark flex items-baseline mt-0.5">
                  <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                  {product.price}
                </span>
              </div>
            </div>

            {/* MONITORING ALOKASI SIZE PROMOSI */}
            <div className="mb-6 font-quicksand">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">Gudang Alokasi Ukuran Terpaut</span>
                <button 
                  onClick={() => setActiveTab("panduan")}
                  className="text-[10px] text-secondary-light underline uppercase tracking-wider font-bold"
                >
                  Lihat Parameter Siluet
                </button>
              </div>
              <div className="flex gap-3">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-xs font-mono border transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                      selectedSize === size
                        ? "border-primary-dark bg-primary-dark text-white"
                        : "border-border-subtle bg-white text-primary-dark hover:border-secondary-light"
                    }`}
                  >
                    <span className="font-bold">{size}</span>
                    <span className={`text-[8px] ${selectedSize === size ? 'text-white/60' : 'text-primary-dark/40'}`}>sale ok</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB DETIL INFORMASI PRODUK UNTUK CO-CHECK QUALITY CONTROL */}
            <div className="mb-6 border border-border-subtle rounded-2xl overflow-hidden font-quicksand bg-white shadow-sm">
              <div className="flex border-b border-border-subtle bg-bg-main/30 text-[10px] font-bold uppercase tracking-wider">
                <button 
                  onClick={() => setActiveTab("bahan")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "bahan" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  Struktur Material
                </button>
                <button 
                  onClick={() => setActiveTab("perawatan")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "perawatan" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  SOP Perawatan
                </button>
                <button 
                  onClick={() => setActiveTab("panduan")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "panduan" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  Dimensi Manekin
                </button>
              </div>
              <div className="p-5 text-xs text-primary-dark/70 leading-relaxed min-h-[90px]">
                {activeTab === "bahan" && <p>{details.bahan}</p>}
                {activeTab === "perawatan" && <p>{details.perawatan}</p>}
                {activeTab === "panduan" && <p>{details.panduan}</p>}
              </div>
            </div>
            
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
                className="flex-[3] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 bg-primary-dark text-white hover:bg-hover-green shadow-md cursor-pointer transition-all duration-300"
              >
                <FaEdit className="text-xs" /> Atur Ulang Rasio & Nominal Diskon (Ukuran {selectedSize})
              </button>
              
              <button 
                onClick={() => setIsCampaignActive(!isCampaignActive)}
                className={`flex-1 py-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isCampaignActive 
                    ? "border-secondary-light/30 bg-secondary-light/5 text-secondary-light" 
                    : "border-border-subtle bg-white text-primary-dark/60 hover:border-primary-dark"
                }`}
              >
                {isCampaignActive ? <FaToggleOn className="text-sm" /> : <FaToggleOff className="text-sm" />}
                {isCampaignActive ? "Diskon Aktif" : "Diskon Dijeda"}
              </button>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="mt-16">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default SaleDetail;