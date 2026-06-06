import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  CheckCircle2, 
  Tag, 
  Clock, 
  Edit3, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Save, 
  AlertTriangle,
  Sparkles,
  Info,
  ShieldCheck,
  Zap
} from "lucide-react";

// Import UI Tabs & Layout
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import productsData from "../data/Shop.json";

// ==========================================
// IMPORT PAGE HEADER YANG BARU DIBUAT
// ==========================================
import PageHeader from "../components/PageHeader";

const ShopDetail = () => {
  const { slug } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [isCampaignActive, setIsCampaignActive] = useState(true);
  
  const [currentProduct, setCurrentProduct] = useState(() => {
    return productsData.find((p) => p.slug === slug || p.id?.toString() === slug) || null;
  });

  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 12, seconds: 59 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    price: currentProduct?.price || "",
    oldPrice: currentProduct?.oldPrice || "",
    discount: currentProduct?.discount || ""
  });

  // Sinkronisasi form saat data master berubah atau termuat
  useEffect(() => {
    if (currentProduct) {
      setEditForm({
        price: currentProduct.price || "",
        oldPrice: currentProduct.oldPrice || "",
        discount: currentProduct.discount || ""
      });
    }
  }, [currentProduct]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const { hours, minutes, seconds } = prev;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        if (seconds > 0) return { ...prev, seconds: seconds - 1 };
        else if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 };
        else if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, "0");

  if (!currentProduct) {
    return (
      <DashboardContainer>
        <div className="py-24 text-center animate-fade-in font-quicksand max-w-sm mx-auto px-4">
          <div className="w-12 h-12 bg-[#FAF9F5] border border-[#8C6239]/20 text-[#8C6239] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <AlertTriangle size={20} className="stroke-[1.5]" />
          </div>
          <h2 className="font-playfair text-xl font-bold text-slate-900 tracking-tight">Arsip Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">SKU katalog ini sudah kedaluwarsa atau ditarik dari sistem manajemen Veloura Atelier.</p>
          <Link to="/shop" className="mt-6 inline-flex items-center gap-1.5 bg-[#4E5631] text-white px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[#3d4426] transition-all shadow-sm">
            <ArrowLeft size={10} /> Kembali ke Panel
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  const productSizes = ["S", "M", "L", "XL"];
  const details = {
    bahan: "100% Premium Mulberry Silk Blend. Serat alami halus, efek kilau subtil, adem, dan jatuh dengan sempurna saat dikenakan.",
    perawatan: "Disarankan dry clean atau cuci manual air dingin. Setrika suhu rendah (mode sutra) dan hindari penggunaan pemutih.",
    panduan: "Model mengenakan M (Tinggi: 174cm). Pilih ukuran reguler untuk siluet klasik, atau satu nomor di atasnya untuk tampilan mengalir."
  };

  const fallbackImage = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";

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
      <div className="animate-fade-in pb-8 text-slate-800 relative pt-2 px-4 max-w-6xl mx-auto">
        
        {/* ==========================================
            PENGGUNAAN KOMPONEN PAGE HEADER
           ========================================== */}
        <PageHeader 
          title="Manajemen Manifest Order" 
          breadcrumbs={["Dashboard", "Katalog", currentProduct.id || "VL-2026101"]} 
        />

        {/* TOP NAV & BACK BUTTON */}
        <div className="flex items-center justify-between font-quicksand mb-4 mt-2">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C6239] hover:text-[#4E5631] transition-colors group"
          >
            <ArrowLeft size={12} className="transform group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" /> 
            Kembali ke Panel
          </Link>
          <span className="text-[10px] font-mono font-bold text-[#8C6239] bg-[#FAF9F5] border border-[#8C6239]/10 px-2.5 py-0.5 rounded-lg shadow-sm">
            SKU: {currentProduct.id || "VLR-SHOP"}
          </span>
        </div>

        {/* LAYOUT GRID UTAMA PROMOSI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          
          {/* KOLOM KIRI: BANNER PREVIEW IMAGE */}
          <div className="md:col-span-4 relative group">
            <div className="bg-white border border-[#FAF9F5] p-2 rounded-2xl shadow-sm">
              <div className="w-full aspect-[4/5] rounded-xl overflow-hidden relative bg-[#FAF9F5]">
                <img 
                  src={currentProduct.img || fallbackImage} 
                  alt={currentProduct.name} 
                  className="w-full h-full object-cover" 
                  onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </div>
            
            <div className="absolute top-4 left-4">
              {isCampaignActive ? (
                <span className="bg-[#8C6239] text-white px-2 py-1 rounded-md font-bold font-quicksand text-[9px] tracking-wider border border-white/10 flex items-center gap-1 shadow-md">
                  <Tag size={10} className="stroke-[2.5]" /> LIVE (-{currentProduct.discount || "0%"})
                </span>
              ) : (
                <span className="bg-slate-700 text-white px-2 py-1 rounded-md font-bold font-quicksand text-[9px] tracking-wider border border-white/10 flex items-center gap-1 shadow-md">
                  <X size={10} className="stroke-[2.5]" /> DIJEDA
                </span>
              )}
            </div>
          </div>

          {/* KOLOM KANAN: CONTROL PANEL DETIL */}
          <div className="md:col-span-8 flex flex-col font-quicksand space-y-4">
            
            <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between gap-2 bg-[#FAF9F5] border border-[#8C6239]/10 rounded-xl p-2.5 px-3">
                <div className="flex items-center gap-1.5 text-[#8C6239] text-[10px] font-bold uppercase tracking-widest">
                  <Clock size={12} className="stroke-[2.5]" /> Batas Margin
                </div>
                <div className="flex items-center gap-0.5 font-mono text-[11px] font-bold">
                  <span className="bg-[#4E5631] text-white px-1.5 py-0.5 rounded-md shadow-sm">{formatTime(timeLeft.hours)}j</span>
                  <span className="text-[#8C6239] font-sans px-0.5 animate-pulse">:</span>
                  <span className="bg-[#4E5631] text-white px-1.5 py-0.5 rounded-md shadow-sm">{formatTime(timeLeft.minutes)}m</span>
                  <span className="text-[#8C6239] font-sans px-0.5 animate-pulse">:</span>
                  <span className="bg-[#8C6239] text-white px-1.5 py-0.5 rounded-md shadow-sm">{formatTime(timeLeft.seconds)}d</span>
                </div>
              </div>

              <div>
                <h1 className="text-xl font-playfair font-bold text-slate-900 tracking-tight">
                  {currentProduct.name}
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                  <Sparkles size={10} className="text-[#8C6239] fill-[#8C6239]" /> Konsol Ritel Veloura Atelier
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <div className="flex flex-col justify-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">MSRP Butik</span>
                  <span className="text-xs font-medium text-slate-400 line-through mt-0.5">Rp {currentProduct.oldPrice || currentProduct.price}</span>
                </div>
                <div className="flex flex-col border-l border-slate-100 pl-4">
                  <span className="text-[9px] text-[#8C6239] font-bold uppercase tracking-wider flex items-center gap-1">
                    <Zap size={10} className="fill-[#8C6239] stroke-none" /> Live Promo
                  </span>
                  <span className="text-xl font-bold text-slate-950 flex items-baseline tracking-tight">
                    <span className="text-[11px] font-normal text-[#8C6239] mr-0.5">Rp</span>
                    {isCampaignActive ? currentProduct.price : (currentProduct.oldPrice || currentProduct.price)}
                  </span>
                </div>
              </div>
            </div>

            {/* ALOKASI UKURAN */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-2">
              <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                Alokasi Ukuran
              </span>
              <div className="flex gap-1.5">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-8 h-8 rounded-lg text-[11px] font-mono font-bold border transition-all flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? "border-[#4E5631] bg-[#4E5631] text-white ring-2 ring-[#4E5631]/10"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#8C6239] hover:bg-[#FAF9F5]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* TABS KONDISIONAL COMPACT */}
            <Tabs defaultValue="bahan" className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
              <TabsList className="w-full grid grid-cols-3 bg-[#FAF9F5]/60 rounded-none h-auto p-1 border-b border-slate-100">
                <TabsTrigger value="bahan" className="py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#4E5631] transition-all">Tekstur</TabsTrigger>
                <TabsTrigger value="perawatan" className="py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#4E5631] transition-all">SOP Rawat</TabsTrigger>
                <TabsTrigger value="panduan" className="py-1.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#4E5631] transition-all">Dimensi</TabsTrigger>
              </TabsList>
              <div className="p-3.5 text-[11px] text-slate-500 leading-relaxed min-h-[75px] bg-white">
                <TabsContent value="bahan" className="m-0 focus-visible:outline-none animate-fade-in">
                  <p className="flex items-start gap-1.5"><Info size={12} className="shrink-0 mt-0.5 text-[#8C6239]" /> {details.bahan}</p>
                </TabsContent>
                <TabsContent value="perawatan" className="m-0 focus-visible:outline-none animate-fade-in">
                  <p className="flex items-start gap-1.5"><ShieldCheck size={12} className="shrink-0 mt-0.5 text-[#8C6239]" /> {details.perawatan}</p>
                </TabsContent>
                <TabsContent value="panduan" className="m-0 focus-visible:outline-none animate-fade-in">
                  <p className="flex items-start gap-1.5"><Sparkles size={12} className="shrink-0 mt-0.5 text-[#8C6239]" /> {details.panduan}</p>
                </TabsContent>
              </div>
            </Tabs>

            {/* ACTION PANEL */}
            <div className="flex gap-2 pt-1">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex-1 h-9 bg-[#4E5631] text-white rounded-lg text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-[#3d4426] transition-all cursor-pointer"
              >
                <Edit3 size={12} className="stroke-[2.5]" /> Ubah Konfigurasi ({selectedSize})
              </button>
              <button 
                onClick={() => setIsCampaignActive(!isCampaignActive)}
                className={`px-3 h-9 rounded-lg border text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isCampaignActive ? "border-[#8C6239]/20 bg-white text-[#8C6239] hover:bg-[#FAF9F5]" : "border-slate-200 bg-slate-50 text-slate-400"
                }`}
              >
                {isCampaignActive ? <ToggleRight size={16} className="text-[#4E5631]" /> : <ToggleLeft size={16} />}
                {isCampaignActive ? "Aktif" : "Jeda"}
              </button>
            </div>

          </div>
        </div>

        {/* MODAL CONFIG OVERLAY */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-[99999] p-4 font-quicksand animate-fade-in">
            <div className="bg-white w-full max-w-xs rounded-2xl shadow-xl border border-slate-100 p-4 transform transition-all animate-scale-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
                <div>
                  <div className="flex items-center gap-1 text-[9px] tracking-wider uppercase font-bold text-[#8C6239]">
                    <Sparkles size={10} className="fill-[#8C6239] stroke-none" /> Matriks Ritel
                  </div>
                  <h3 className="font-playfair text-sm font-bold text-slate-900">Ubah Ukuran {selectedSize}</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"><X size={14} /></button>
              </div>

              <form onSubmit={handleSaveMetrics} className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">MSRP Awal</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400">Rp</span>
                    <input type="text" value={editForm.oldPrice} onChange={(e) => setEditForm({...editForm, oldPrice: e.target.value})} className="w-full pl-7 pr-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-[#8C6239] h-8" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Harga Diskon</label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400">Rp</span>
                    <input type="text" value={editForm.price} onChange={(e) => setEditForm({...editForm, price: e.target.value})} className="w-full pl-7 pr-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-[#8C6239] h-8" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider">Potongan Persen</label>
                  <input type="text" value={editForm.discount} onChange={(e) => setEditForm({...editForm, discount: e.target.value})} className="w-full px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:border-[#8C6239] h-8" required />
                </div>
                <div className="flex justify-end gap-1.5 pt-2 border-t border-slate-100 mt-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-3 h-8 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-semibold cursor-pointer">Batal</button>
                  <button type="submit" className="px-3 h-8 bg-[#4E5631] text-white rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-[#3d4426] cursor-pointer"><Save size={11} /> Simpan</button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-8">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default ShopDetail;