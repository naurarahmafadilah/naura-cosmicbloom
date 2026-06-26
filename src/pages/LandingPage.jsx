import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Layers,
  Eye,
  Scissors,
  Zap,
  CheckCircle2,
  Menu,
  X,
  Heart,
  Award
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [likedProducts, setLikedProducts] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      "id": "s1",
      "slug": "elegant-evening-dress",
      "name": "Elegant Evening Dress",
      "oldPrice": "350.000",
      "price": "250.000",
      "discount": "30%",
      "description": "Potongan eksklusif dengan kain premium yang memberi kesan anggun dan nyaman saat dipakai.",
      "img": "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s2",
      "slug": "minimalist-casual-outfit",
      "name": "Casual Autumn Shirt",
      "oldPrice": "250.000",
      "price": "180.000",
      "discount": "28%",
      "description": "Model santai namun tetap berkelas, cocok untuk gaya sehari-hari yang elegan.",
      "img": "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s3",
      "slug": "summer-breeze-style",
      "name": "Summer Breeze Dress",
      "oldPrice": "400.000",
      "price": "300.000",
      "discount": "25%",
      "description": "Nuansa ringan dan fresh dengan kualitas jahitan butik yang halus dan rapi.",
      "img": "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop"
    },
    {
      "id": "s4",
      "slug": "modern-silk-look",
      "name": "Minimalist Silk Outfit",
      "oldPrice": "320.000",
      "price": "270.000",
      "discount": "15%",
      "description": "Kombinasi siluet modern dan tekstur satin premium untuk penampilan yang mewah.",
      "img": "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleLike = (id, e) => {
    e.stopPropagation();
    setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] text-[#4e5631] selection:bg-[#ab656b] selection:text-white font-sans antialiased scroll-smooth">

      {/* GLOBAL BACKGROUND ORNAMENT */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#4e5631_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#f7f8f6]/80 backdrop-blur-xl border-b border-[#4e5631]/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

          <div className="cursor-pointer group" onClick={() => handleNavigation("/")}>
            <h1 className="text-lg md:text-xl font-serif tracking-[0.3em] font-bold text-[#4e5631] group-hover:text-[#ab656b] transition-colors duration-300">
              VELOURA<span className="text-[#ab656b] font-light">.</span>
            </h1>
            <p className="text-[8px] tracking-[0.4em] uppercase opacity-60 mt-0.5 -mr-4 font-semibold">Luxury House</p>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-bold opacity-90">
            <a href="#masalah" className="hover:text-[#ab656b] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ab656b] hover:after:w-full after:transition-all transition-colors">Dilema</a>
            <a href="#koleksi" className="hover:text-[#ab656b] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ab656b] hover:after:w-full after:transition-all transition-colors">Koleksi</a>
            <a href="#proses" className="hover:text-[#ab656b] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ab656b] hover:after:w-full after:transition-all transition-colors">Kualitas</a>
            <a href="#solusi" className="hover:text-[#ab656b] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ab656b] hover:after:w-full after:transition-all transition-colors">Keunggulan</a>
            <a href="#faq" className="hover:text-[#ab656b] relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#ab656b] hover:after:w-full after:transition-all transition-colors">FAQ</a>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <button
              onClick={() => handleNavigation("/login")}
              className="text-[11px] uppercase tracking-[0.15em] font-bold hover:text-[#ab656b] transition-colors cursor-pointer"
            >
              Masuk
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="bg-[#4e5631] text-white text-[10px] uppercase tracking-[0.2em] px-6 py-3.5 rounded-none font-bold hover:bg-[#ab656b] hover:shadow-lg transition-all duration-300 cursor-pointer border border-[#4e5631] hover:border-[#ab656b]"
            >
              Daftar Member
            </button>
          </div>

          <button className="lg:hidden p-2 text-[#4e5631]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-24 left-0 w-full bg-[#f7f8f6] border-b border-[#4e5631]/10 px-6 py-8 flex flex-col gap-6 shadow-xl animate-fade-in">
            <a href="#masalah" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-widest font-bold">Dilema</a>
            <a href="#koleksi" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-widest font-bold">Koleksi</a>
            <a href="#proses" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-widest font-bold">Kualitas</a>
            <a href="#solusi" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-widest font-bold">Keunggulan</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-xs uppercase tracking-widest font-bold">FAQ</a>
            <hr className="border-[#4e5631]/10" />
            <div className="flex flex-col gap-4">
              <button onClick={() => handleNavigation("/login")} className="text-xs uppercase tracking-widest font-bold text-center py-2">Masuk</button>
              <button onClick={() => handleNavigation("/register")} className="bg-[#4e5631] text-white text-xs uppercase tracking-widest py-4 font-bold text-center">Daftar Member</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-44 lg:pt-52 pb-24 px-6 overflow-hidden z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-white border border-[#ab656b]/20 px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-[#ab656b] shadow-xs">
              <Sparkles size={11} className="animate-pulse" />
              <span>Koleksi Premium No. 1</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif font-normal text-[#4e5631] leading-[1.15] tracking-tight">
              Solusi Terbaik Untuk <br />Penampilan Anda Yang <br />
              <span className="italic text-[#ab656b] font-light relative">
                Anggun & Berkelas
                <span className="absolute bottom-1 left-0 w-full h-[4px] bg-[#ab656b]/10 -z-10" />
              </span>
            </h2>

            <p className="text-sm md:text-base text-[#4e5631]/70 max-w-xl leading-relaxed font-medium">
              Berhenti memakai pakaian pasaran jahit massal yang kaku. Setiap helai koleksi kami dirancang eksklusif dengan potongan <span className="text-[#4e5631] font-bold">*crafted cutting*</span> yang menyamarkan kekurangan tubuh, langsung terasa mewah begitu menyentuh kulit Anda.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => handleNavigation("/register")}
                className="bg-[#ab656b] text-white text-xs uppercase tracking-[0.2em] px-8 py-4.5 font-bold hover:bg-[#4e5631] transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-[#ab656b]/10 hover:shadow-[#4e5631]/20 hover:-translate-y-0.5"
              >
                Jelajahi Lookbook Eksklusif
                <ArrowRight size={14} />
              </button>
              <a
                href="#koleksi"
                className="border border-[#4e5631]/20 hover:border-[#4e5631] text-[#4e5631] text-xs uppercase tracking-[0.2em] px-8 py-4.5 font-bold transition-all duration-300 text-center"
              >
                Lihat Produk
              </a>
            </div>
          </div>

          {/* ASYMMETRIC IMAGE GRAPHIC */}
          <div className="lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="absolute -inset-4 bg-[#ab656b]/5 rounded-none transform rotate-2 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#4e5631]/5 rounded-none pointer-events-none hidden md:block" />

            <div className="bg-[#4e5631] shadow-2xl relative h-[450px] md:h-[500px] overflow-hidden group">
              <img
                src={products[0].img}
                alt="Veloura Premium Banner"
                className="w-full h-full object-cover opacity-90 scale-102 group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4e5631] via-[#4e5631]/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 w-full p-8 space-y-3">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <ShoppingBag className="text-white" size={18} />
                </div>
                <div>
                  <p className="font-serif text-lg tracking-wide text-white">Signature Lineup</p>
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#eff0ee]/70 font-semibold mt-0.5">Hanya Diproduksi Terbatas per Desain</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION AGITASI MASALAH */}
      <section id="masalah" className="py-24 px-6 bg-[#4e5631] text-[#eff0ee] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <span className="text-[#ab656b] uppercase tracking-[0.25em] text-[11px] font-bold block">Pernahkah Kamu Mengalami Ini?</span>
          <h2 className="font-serif text-3xl md:text-5xl leading-[1.25] font-light max-w-3xl mx-auto">
            Sudah beli baju mahal-mahal tapi pas dipakai malah kelihatan <span className="italic text-[#ab656b]">gemuk, bahannya gatal,</span> dan kembar di pesta?
          </h2>
          <div className="w-16 h-[1px] bg-[#ab656b]/50 mx-auto my-6"></div>
          <p className="text-xs md:text-sm opacity-80 max-w-2xl mx-auto leading-relaxed font-light tracking-wide">
            Berdasarkan survei internal kami, <span className="text-white font-bold border-b border-[#ab656b] pb-0.5">78,4% wanita</span> sering merasa tidak percaya diri dengan bentuk tubuhnya saat memakai pakaian jadi konvensional mal karena pola potong massal yang kaku dan tidak adaptif.
          </p>
        </div>
      </section>

      {/* DYNAMIC CATALOG LOOKBOOK SECTION */}
      <section id="koleksi" className="py-28 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#4e5631]/10 pb-6">
            <div className="space-y-2 text-left">
              <span className="text-[#ab656b] uppercase tracking-[0.25em] text-[11px] font-bold block">Curated Edition</span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#4e5631]">Koleksi Terbaru Bulan Ini</h2>
            </div>
            <p className="text-xs text-[#4e5631]/60 font-medium max-w-xs mt-4 md:mt-0 tracking-wide">
              Desain haute-couture edisi terbatas dengan material pilihan dunia.
            </p>
          </div>

          {/* Grid Lookbook Modern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => openProductDetail(product)}
                className="group relative flex flex-col justify-between space-y-4 bg-[#f7f8f6]/30 p-3 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-[#4e5631]/5 cursor-pointer"
              >
                {/* Image Container */}
                <div className="aspect-[3/4] w-full overflow-hidden relative bg-[#4e5631]">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Badge Diskon Minimalis */}
                  <span className="absolute top-4 left-4 bg-[#ab656b] text-white font-sans text-[9px] font-bold px-3 py-1 tracking-widest uppercase shadow-sm">
                    -{product.discount}
                  </span>

                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(product.id, e)}
                    className="absolute top-4 right-4 w-8 h-8 bg-white/80 backdrop-blur-xs rounded-full flex items-center justify-center text-[#4e5631] hover:text-rose-600 transition-colors duration-300"
                  >
                    <Heart size={14} fill={likedProducts[product.id] ? "#e11d48" : "none"} className={likedProducts[product.id] ? "text-rose-600" : ""} />
                  </button>
                </div>

                {/* Informasi Produk */}
                <div className="space-y-2 px-1 pb-2 text-left">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-[#ab656b] block">Veloura Signature</span>
                      <h4 className="font-serif text-base font-bold text-[#4e5631] mt-0.5 group-hover:text-[#ab656b] transition-colors duration-300 line-clamp-1">{product.name}</h4>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 font-medium leading-relaxed line-clamp-2">Premium *crafted cut* dengan kenyamanan tekstur tanpa menerawang.</p>

                  {/* Harga & Harga Coret */}
                  <div className="flex items-baseline gap-2.5 pt-1 border-t border-[#4e5631]/5 mt-2">
                    <p className="font-serif text-sm font-bold text-[#4e5631]">IDR {product.price}</p>
                    <p className="font-sans text-[11px] text-gray-400 line-through">IDR {product.oldPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEHIND THE ART SECTION */}
      <section id="proses" className="py-24 px-6 bg-[#4e5631] text-[#eff0ee] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-5xl mx-auto grid md:grid-cols-12 gap-12 items-center">

          <div className="md:col-span-5 space-y-4 text-left">
            <span className="text-[#ab656b] uppercase tracking-[0.25em] text-[11px] font-bold block">Artisanal Craftsmanship</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight font-normal">Dibuat Satu Per Satu, Bukan Mesin Massal.</h2>
            <p className="text-xs md:text-sm opacity-70 leading-relaxed font-light">
              Di Veloura Boutique, kami menolak metode potong kain bertumpuk konveksi massal yang merusak keakuratan simetri kain. Setiap pakaian ditangani khusus oleh satu penjahit ahli dari pola awal hingga jahitan terakhir.
            </p>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white/[0.02] border border-white/10 space-y-3 text-left">
              <div className="w-10 h-10 bg-[#ab656b]/10 rounded-full flex items-center justify-center text-[#ab656b]">
                <Layers size={18} />
              </div>
              <h4 className="font-serif font-bold text-base text-white">Double-Stitch Premium</h4>
              <p className="text-xs opacity-60 leading-relaxed font-light">Metode jahit jarum ganda luar-dalam untuk memastikan serat kain terkunci rapi dan awet bertahun-tahun.</p>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/10 space-y-3 text-left">
              <div className="w-10 h-10 bg-[#ab656b]/10 rounded-full flex items-center justify-center text-[#ab656b]">
                <Eye size={18} />
              </div>
              <h4 className="font-serif font-bold text-base text-white">QC Butik 3 Fase</h4>
              <p className="text-xs opacity-60 leading-relaxed font-light">Pemeriksaan presisi ritsleting, kekuatan kancing, dan kejatuhan kain sebelum dikemas dalam boks eksklusif.</p>
            </div>
          </div>

        </div>
      </section>

      {/* VALUE PRODUK BUTIK */}
      <section id="solusi" className="py-28 px-6 bg-[#f7f8f6] relative">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-20 space-y-2">
            <span className="text-[#ab656b] uppercase tracking-[0.25em] text-[11px] font-bold block">Mengapa Memilih Kami</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#4e5631]">3 Standar Kemewahan Veloura</h2>
            <div className="w-12 h-[1px] bg-[#ab656b] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#4e5631]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left space-y-4">
              <span className="font-serif text-3xl font-light text-[#ab656b]/40 block border-b border-gray-100 pb-2">01</span>
              <h3 className="font-serif text-lg text-[#4e5631] font-bold">Cutting Slimming Effect</h3>
              <p className="text-xs text-[#4e5631]/70 leading-relaxed font-medium">
                Pola jahitan optik khusus yang dirancang oleh desainer berpengalaman untuk memberikan ilusi tubuh lebih jenjang, ramping, dan proporsional seketika.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#4e5631]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left space-y-4">
              <span className="font-serif text-3xl font-light text-[#ab656b]/40 block border-b border-gray-100 pb-2">02</span>
              <h3 className="font-serif text-lg text-[#4e5631] font-bold">Premium Fabric</h3>
              <p className="text-xs text-[#4e5631]/70 leading-relaxed font-medium">
                Kami mengurasi kain kelas dunia seperti sutra murni, katun organik, dan brokat premium yang super adem, jatuh dengan indah, dan tidak menerawang.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#4e5631]/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-left space-y-4">
              <span className="font-serif text-3xl font-light text-[#ab656b]/40 block border-b border-gray-100 pb-2">03</span>
              <h3 className="font-serif text-lg text-[#4e5631] font-bold">No Mass-Production</h3>
              <p className="text-xs text-[#4e5631]/70 leading-relaxed font-medium">
                Setiap desain hanya diproduksi dalam kuantitas sangat sedikit. Menjamin eksklusivitas agar tidak perlu khawatir berpapasan dengan motif pakaian serupa.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* TESTIMONIAL EDITORIAL */}
      <section id="testimoni" className="py-28 px-6 text-center bg-white border-y border-[#4e5631]/5 relative">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#f7f8f6]">
            <Award className="text-[#ab656b]" size={20} />
          </div>

          <h3 className="font-serif text-xl md:text-2xl text-[#4e5631] italic font-light leading-relaxed max-w-2xl mx-auto">
            "Awalnya iseng beli satu baju untuk acara kondangan, pas dipakai langsung jadi pusat perhatian karena kain brokatnya mewah banget dan jatuhnya pas di badan. Sekarang kalau mau ada acara semi-formal pasti langsung lari ke Veloura!"
          </h3>

          <div className="space-y-1">
            <h4 className="font-bold text-xs tracking-[0.25em] uppercase text-[#4e5631]">Donna Nelson</h4>
            <p className="text-[10px] text-[#ab656b] font-bold uppercase tracking-widest">Verified Collector</p>
          </div>
        </div>
      </section>

      {/* ACCORDION FAQ SECTION */}
      <section id="faq" className="py-28 px-6 bg-[#f7f8f6]">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16 space-y-2">
            <span className="text-[#ab656b] uppercase tracking-[0.25em] text-[11px] font-bold block">Pertanyaan Umum</span>
            <h2 className="font-serif text-2xl md:text-3xl text-[#4e5631]">Hal yang Sering Ditanyakan</h2>
          </div>

          <div className="space-y-4 bg-white p-6 md:p-8 shadow-sm border border-gray-100">
            {[
              { q: "Apakah ada garansi kalau ukuran baju tidak muat?", a: "Tentu saja. Kami memberikan garansi tukar ukuran atau opsi perbaikan (alteration) gratis dalam waktu 3 hari setelah pakaian sampai, demi memastikan baju melekat sempurna di tubuh Anda." },
              { q: "Bagaimana cara perawatan kain premium dari butik ini?", a: "Every single piece kami lengkapi dengan kartu panduan instruksi cuci (care card) khusus di dalam kemasan untuk menjaga serat kain dan keaslian warna tetap prima." },
              { q: "Apakah melayani pengiriman luar kota dan packing kado?", a: "Kami melayani pengiriman ke seluruh Indonesia menggunakan kemasan kotak eksklusif tebal, wangi, berstandar luxury gift box yang sangat mewah." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-100 pb-4 last:border-none last:pb-0">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-serif text-[#4e5631] py-3 hover:text-[#ab656b] transition-colors cursor-pointer"
                >
                  <span className="font-bold text-sm md:text-base pr-4">{faq.q}</span>
                  <ChevronDown size={16} className={`transform transition-transform shrink-0 duration-300 ${openFaq === idx ? "rotate-180 text-[#ab656b]" : "text-gray-400"}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? "max-h-40 pt-2" : "max-h-0"}`}>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium pl-1">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-16">
            <button
              onClick={() => handleNavigation("/register")}
              className="bg-[#ab656b] text-white text-xs uppercase tracking-[0.2em] px-12 py-4.5 font-bold hover:bg-[#4e5631] transition-all duration-300 shadow-xl shadow-[#ab656b]/10 hover:shadow-[#4e5631]/20 hover:-translate-y-0.5"
            >
              Mulai Bergabung Member
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER & TRUST BADGES */}
      {/* FOOTER & TRUST BADGES */}
      <footer className="bg-[#4e5631] text-[#eff0ee] pt-24 pb-12 px-6 relative overflow-hidden z-10 border-t border-white/5 font-quicksand">
        {/* Subtle Background Pattern for Footer */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.01] bg-[radial-gradient(#white_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="max-w-7xl mx-auto space-y-16 relative z-10">

          {/* 1. LUXURY TRUST BADGES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 bg-white/[0.01] backdrop-blur-xs">
            <div className="flex flex-col items-center text-center p-8 group hover:bg-white/[0.02] transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#ab656b] group-hover:scale-110 transition-transform duration-300">
                <Scissors size={20} strokeWidth={1.5} />
              </div>
              <h5 className="font-serif text-sm tracking-widest uppercase mt-4 text-white">Complimentary Alteration</h5>
              <p className="text-[11px] opacity-50 max-w-xs mt-2 font-light leading-relaxed">Garansi penyesuaian ukuran gratis dalam 3 hari agar siluet pakaian melekat sempurna pada lekuk tubuh Anda.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 group hover:bg-white/[0.02] transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#ab656b] group-hover:scale-110 transition-transform duration-300">
                <Zap size={20} strokeWidth={1.5} />
              </div>
              <h5 className="font-serif text-sm tracking-widest uppercase mt-4 text-white">Anti-Mass Production</h5>
              <p className="text-[11px] opacity-50 max-w-xs mt-2 font-light leading-relaxed">Setiap pola dipotong eksklusif satu per satu demi menjaga keaslian desain tanpa risiko kembaran di ruang publik.</p>
            </div>

            <div className="flex flex-col items-center text-center p-8 group hover:bg-white/[0.02] transition-colors duration-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-[#ab656b] group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 size={20} strokeWidth={1.5} />
              </div>
              <h5 className="font-serif text-sm tracking-widest uppercase mt-4 text-white">Signature Box Packaging</h5>
              <p className="text-[11px] opacity-50 max-w-xs mt-2 font-light leading-relaxed">Proteksi pengiriman premium menggunakan hardbox tebal berlapis kain satin, wangi, lengkap dengan care-card khusus.</p>
            </div>
          </div>

          {/* 2. MEGA FOOTER NAVIGATION & NEWSLETTER */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-4">

            {/* Brand Heritage column */}
            <div className="md:col-span-4 space-y-4 text-left">
              <h3 className="font-serif tracking-[0.35em] text-xl font-bold text-white">
                VELOURA<span className="text-[#ab656b]">.</span>
              </h3>
              <p className="text-xs opacity-60 font-light leading-relaxed max-w-sm">
                Maison de couture yang berdedikasi tinggi untuk menghadirkan kemewahan pakaian wanita modern lewat presisi cutting, kurasi material tekstil terbaik dunia, dan sentuhan detail pengerjaan tangan ahli.
              </p>
            </div>

            {/* Directory Links column */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4 text-left">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ab656b] font-bold">Maison</p>
                <ul className="text-xs space-y-2 opacity-70 font-light">
                  <li><a href="#masalah" className="hover:text-white hover:underline transition-all">The Dilemma</a></li>
                  <li><a href="#koleksi" className="hover:text-white hover:underline transition-all">Collections</a></li>
                  <li><a href="#proses" className="hover:text-white hover:underline transition-all">Craftsmanship</a></li>
                  <li><a href="#solusi" className="hover:text-white hover:underline transition-all">The Value</a></li>
                </ul>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#ab656b] font-bold">Assistance</p>
                <ul className="text-xs space-y-2 opacity-70 font-light">
                  <li><a href="#faq" className="hover:text-white hover:underline transition-all">Client FAQ</a></li>
                  <li><a href="#" className="hover:text-white hover:underline transition-all">Care Guide</a></li>
                  <li><a href="#" className="hover:text-white hover:underline transition-all">Terms of Use</a></li>
                  <li><a href="#" className="hover:text-white hover:underline transition-all">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Premium Newsletter Subscription column */}
            <div className="md:col-span-5 space-y-4 text-left">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#ab656b] font-bold">La Lettre Veloura</p>
              <p className="text-xs opacity-60 font-light leading-relaxed">
                Jadilah kolektor pertama yang menerima pemberitahuan rilis *Lookbook* terbatas, undangan privat *private-viewing*, dan artikel tren mode butik internasional.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-white/20 pb-1 pt-2 focus-within:border-[#ab656b] transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Masukkan alamat email Anda"
                  className="bg-transparent text-xs w-full focus:outline-none placeholder-white/30 text-white font-light font-sans tracking-wide"
                  required
                />
                <button type="submit" className="text-white hover:text-[#ab656b] p-1 transition-colors duration-300" title="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>

          </div>

          {/* 3. BOTTOM LEGAL COPYRIGHT */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[9px] tracking-[0.25em] uppercase font-semibold opacity-40">
            <p>© 2026 VELOURA BOUTIQUE LUXURY HOUSE. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:opacity-100 transition-opacity">PARIS</a>
              <span>•</span>
              <a href="#" className="hover:opacity-100 transition-opacity">MILAN</a>
              <span>•</span>
              <a href="#" className="hover:opacity-100 transition-opacity">JAKARTA</a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}