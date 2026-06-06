import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  ShoppingBag, 
  Trash2, 
  Heart, 
  Sparkles, 
  Info, 
  ShieldCheck, 
  Star,
  AlertTriangle,
  Layers,
  Sparkle
} from "lucide-react";

// Import UI Tabs & Layout
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

// Menggunakan data produk wishlist yang sama
import wishlistProductsData from "../data/wishlistProductsData.json";
import PageHeader from "../components/PageHeader";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

const WishlistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");
  const [isHovered, setIsHovered] = useState(false);
  
  // Mengambil data produk berdasarkan ID dari parameter URL
  const [product, setProduct] = useState(() => {
    return wishlistProductsData.find((p) => p.id?.toString() === id) || null;
  });

  if (!product) {
    return (
      <DashboardContainer>
        <div className="py-28 text-center animate-fade-in font-quicksand max-w-sm mx-auto px-4">
          <div className="w-14 h-14 bg-[#FAF9F5] border border-rose-200 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
            <AlertTriangle size={24} className="stroke-[1.5] animate-pulse" />
          </div>
          <h2 className="font-playfair text-2xl font-bold text-slate-900 tracking-tight">Koleksi Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">Produk tidak ada dalam daftar wishlist atau telah ditarik dari katalog.</p>
          <Link to="/wishlist" className="mt-8 inline-flex items-center gap-2 bg-[#4E5631] text-white px-5 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider hover:bg-[#3d4426] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
            <ArrowLeft size={12} /> Kembali ke Wishlist
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  const productSizes = ["S", "M", "L", "XL"];
  const details = {
    bahan: "Kombinasi material premium pilihan. Serat kain rapat, memberikan impresi siluet yang anggun, jatuh dengan mewah, serta sangat nyaman untuk rotasi agenda formal maupun kasual.",
    perawatan: "Dicuci dengan instruksi halus menggunakan air bersuhu normal. Hindari paparan sinar matahari terik langsung saat menjemur untuk menjaga ketahanan pigmen warna original.",
    panduan: "Regular fit siluet modern Veloura. Disarankan mengambil ukuran yang biasa Anda kenakan. Konsultasikan dengan admin jika memerlukan detail spek lingkar dada spesifik."
  };

  const handleRemoveFromWishlist = () => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus item mahakarya ini dari daftar wishlist?");
    if (confirmDelete) {
      alert(`"${product.name}" berhasil dihapus.`);
      navigate("/wishlist");
    }
  };

  const handleAddToCart = () => {
    alert(`"${product.name}" (Ukuran: {selectedSize}) berhasil ditambahkan ke tas belanja eksklusif Anda.`);
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 relative pt-2 px-4 max-w-6xl mx-auto">
        
        {/* PAGE HEADER COMPONENT */}
        <PageHeader 
          title="Detail Koleksi Impian" 
          breadcrumbs={["Dashboard", "Wishlist", product.name || "Detail Produk"]} 
        />

        {/* TOP NAV & BACK BUTTON */}
        <div className="flex items-center justify-between font-quicksand mb-6 mt-3">
          <Link 
            to="/wishlist" 
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[#8C6239] hover:text-[#4E5631] transition-all group"
          >
            <ArrowLeft size={12} className="transform group-hover:-translate-x-1 transition-transform stroke-[2.5]" /> 
            Kembali ke galeri
          </Link>
          <span className="text-[10px] font-mono font-bold text-[#8C6239] bg-[#FAF9F5] border border-[#8C6239]/20 px-3 py-1 rounded-full shadow-xs uppercase tracking-wider">
            {product.category}
          </span>
        </div>

        {/* LAYOUT GRID UTAMA WISHLIST */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* KOLOM KIRI: ARTISTIC PREVIEW IMAGE */}
          <div className="lg:col-span-5 relative group">
            <div className="bg-gradient-to-b from-white to-[#FAF9F5] border border-slate-100 p-3 rounded-3xl shadow-md transition-all duration-500 hover:shadow-xl">
              <div 
                className="w-full aspect-[4/5] rounded-2xl overflow-hidden relative bg-[#FAF9F5] cursor-zoom-in"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className={`w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? "scale-108" : "scale-100"}`} 
                />
                {/* Overlay Gradasi Elegan */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
            
            {/* Badge Status Luxury */}
            <div className="absolute top-6 left-6">
              <span className="bg-white/90 backdrop-blur-md text-[#4E5631] px-3 py-1.5 rounded-full font-bold font-quicksand text-[9px] tracking-widest border border-slate-100 flex items-center gap-1.5 shadow-sm">
                <Heart size={10} className="fill-[#4E5631] stroke-none animate-pulse" /> TERESKOR DI WISHLIST
              </span>
            </div>
          </div>

          {/* KOLOM KANAN: CONTROL PANEL DETIL */}
          <div className="lg:col-span-7 flex flex-col font-quicksand space-y-5">
            
            {/* Info Card Utama */}
            <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 shadow-xs space-y-5 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#8C6239]" />
              
              <div className="flex items-center justify-between gap-2 bg-[#FAF9F5] border border-[#8C6239]/10 rounded-xl p-3 px-4">
                <div className="flex items-center gap-1.5 text-[#8C6239] text-[10px] font-bold uppercase tracking-widest">
                  <Star size={12} className="fill-[#8C6239] stroke-none" /> Alokasi Terbatas
                </div>
                <div className="text-[10px] font-bold text-[#4E5631] bg-[#4E5631]/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Tersedia di Butik
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl font-playfair font-bold text-slate-900 tracking-tight leading-tight">
                  {product.name}
                </h1>
                <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                  <Sparkles size={11} className="text-[#8C6239] fill-[#8C6239]" /> Veloura Atelier Haute Couture
                </p>
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[9px] text-[#8C6239] font-bold uppercase tracking-widest flex items-center gap-1">
                    Nilai Eksklusivitas
                  </span>
                  <span className="text-2xl font-bold text-slate-950 tracking-tight mt-0.5">
                    {formatRupiah(product.price)}
                  </span>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-[10px] text-slate-400 block">Kode Seri</span>
                  <span className="text-[11px] font-mono font-bold text-slate-700">VLRE-{id}92X</span>
                </div>
              </div>
            </div>

            {/* SELEKTOR UKURAN */}
            <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="block text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  Pilih Orientasi Ukuran Anda
                </span>
                <span className="text-[10px] font-medium text-[#8C6239] underline cursor-pointer hover:text-[#4E5631]">
                  Panduan Internasional
                </span>
              </div>
              <div className="flex gap-2">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-xl text-[11px] font-mono font-bold border transition-all duration-300 flex items-center justify-center cursor-pointer ${
                      selectedSize === size
                        ? "border-[#4E5631] bg-[#4E5631] text-white ring-4 ring-[#4E5631]/10 transform scale-105"
                        : "border-slate-200 bg-white text-slate-600 hover:border-[#8C6239] hover:bg-[#FAF9F5]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* TABS INFORMASI PREMIUM */}
            <Tabs defaultValue="deskripsi" className="w-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
              <TabsList className="w-full grid grid-cols-3 bg-[#FAF9F5]/80 rounded-none h-auto p-1.5 border-b border-slate-100">
                <TabsTrigger value="deskripsi" className="py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#4E5631] data-[state=active]:shadow-xs transition-all">
                  <Layers size={10} className="inline mr-1" /> Narasi
                </TabsTrigger>
                <TabsTrigger value="perawatan" className="py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#4E5631] data-[state=active]:shadow-xs transition-all">
                  <ShieldCheck size={10} className="inline mr-1" /> Perawatan
                </TabsTrigger>
                <TabsTrigger value="panduan" className="py-2 text-[9px] font-bold uppercase tracking-wider text-slate-400 rounded-xl data-[state=active]:bg-white data-[state=active]:text-[#4E5631] data-[state=active]:shadow-xs transition-all">
                  <Sparkle size={10} className="inline mr-1" /> Siluet Fit
                </TabsTrigger>
              </TabsList>
              <div className="p-4 sm:p-5 text-[11px] text-slate-500 leading-relaxed min-h-[90px] bg-white">
                <TabsContent value="deskripsi" className="m-0 focus-visible:outline-none animate-fade-in space-y-3">
                  <p className="font-medium text-slate-700 italic">"{product.description}"</p>
                  <p className="flex items-start gap-2 border-t border-slate-50 pt-3 mt-1 text-slate-500">
                    <Info size={13} className="shrink-0 mt-0.5 text-[#8C6239]" /> 
                    <span>{details.bahan}</span>
                  </p>
                </TabsContent>
                <TabsContent value="perawatan" className="m-0 focus-visible:outline-none animate-fade-in">
                  <p className="flex items-start gap-2">
                    <ShieldCheck size={13} className="shrink-0 mt-0.5 text-[#8C6239]" /> 
                    <span>{details.perawatan}</span>
                  </p>
                </TabsContent>
                <TabsContent value="panduan" className="m-0 focus-visible:outline-none animate-fade-in">
                  <p className="flex items-start gap-2">
                    <Sparkles size={13} className="shrink-0 mt-0.5 text-[#8C6239]" /> 
                    <span>{details.panduan}</span>
                  </p>
                </TabsContent>
              </div>
            </Tabs>

            {/* ACTION INTERAKTIF (Add to Cart & Remove Wishlist) */}
            <div className="flex gap-3 pt-2">
              <button 
                onClick={handleAddToCart}
                className="flex-1 h-11 bg-[#4E5631] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#3d4426] transition-all cursor-pointer shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag size={13} className="stroke-[2.5]" /> Klaim Menjadi Milik Anda ({selectedSize})
              </button>
              <button 
                onClick={handleRemoveFromWishlist}
                className="px-4 h-11 rounded-xl border border-rose-100 bg-white text-rose-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all flex items-center justify-center cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0 shadow-xs"
                title="Lepaskan dari Wishlist"
              >
                <Trash2 size={16} className="stroke-[1.8]" />
              </button>
            </div>

          </div>
        </div>

        <div className="mt-12">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default WishlistDetail;