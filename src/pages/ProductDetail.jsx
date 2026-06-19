import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiShoppingBag, FiHeart, FiArrowLeft, FiCheck } from "react-icons/fi";
import GuestNavbar from "../components/GuestNavbar";
import ReviewSection from "../components/ReviewSection";

// Simulasi detail produk (Nanti disinkronkan dengan data dari Supabase)
const mockProductDetail = {
  id: 1024,
  name: "Elegant Atelier Dress",
  price: "250.000",
  category: "Dress",
  img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop",
  description: "Dibuat dari bahan sutra organza premium pilihan yang memberikan efek jatuh (flowy) yang sangat anggun saat dikenakan. Menampilkan potongan siluet minimalis modern dengan detail jahitan tersembunyi berstandar butik tinggi. Sangat cocok digunakan untuk acara formal malam hari maupun jamuan makan malam eksklusif.",
  fabricDetails: ["100% Premium Mulberry Silk blend", "Karakteristik bahan sejuk, lembut di kulit, dan tidak menerawang", "Instruksi perawatan: Dry clean recommended atau cuci tangan perlahan"],
  sizes: ["S", "M", "L", "XL"]
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(mockProductDetail);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isWishlist, setIsWishlist] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Ambil data keranjang saat ini untuk badge navbar
  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(existingCart.reduce((acc, curr) => acc + curr.quantity, 0));
  }, []);

  const handleAddToBag = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Periksa apakah item dengan ukuran yang sama sudah ada di keranjang
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === product.id && item.selectedSize === selectedSize
    );

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push({
        ...product,
        selectedSize,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setCartCount(existingCart.reduce((acc, curr) => acc + curr.quantity, 0));
    alert(`"${product.name}" (Size: ${selectedSize}) berhasil ditambahkan ke tas belanja!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-quicksand text-slate-800 pb-16">
      <GuestNavbar cartCount={cartCount} onCartClick={() => navigate("/")} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-10">
        
        {/* BUTTON KEMBALI */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-[#4E5631] transition-colors uppercase cursor-pointer"
        >
          <FiArrowLeft size={14} /> Kembali ke Koleksi
        </button>

        {/* SECTION UTAMA: 2 KOLOM */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* KOLOM KIRI: VISUAL FOTO BESAR */}
          <div className="w-full aspect-[4/5] bg-white rounded-3xl overflow-hidden shadow-3xs border border-slate-100">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* KOLOM KANAN: SPESIFIKASI & BELI */}
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-3xs">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#A47174] tracking-widest uppercase bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg inline-block">
                Koleksi {product.category}
              </span>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wide text-slate-900">
                {product.name}
              </h1>
              <p className="text-xl font-mono font-bold text-[#4E5631]">
                Rp {parseFloat(product.price.replace(/[^0-9]/g, "")).toLocaleString("id-ID")}
              </p>
            </div>

            <hr className="border-slate-100" />

            {/* Deskripsi Produk */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Deskripsi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Karakteristik Kain */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Spesifikasi Material</h3>
              <ul className="space-y-1">
                {product.fabricDetails.map((detail, idx) => (
                  <li key={idx} className="text-xs text-slate-600 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#A47174] shrink-0"></span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pilihan Ukuran (Size Selector) */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Pilih Ukuran</h3>
                <span className="text-[11px] text-[#A47174] font-semibold underline cursor-pointer">Panduan Ukuran</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-10 text-xs font-bold rounded-xl transition-all border cursor-pointer ${
                        isSelected 
                          ? "bg-[#4E5631] text-white border-[#4E5631] shadow-sm" 
                          : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 pt-4">
              <button 
                onClick={handleAddToBag}
                className="flex-1 h-11 bg-[#4E5631] text-white hover:bg-[#3d4426] transition-colors rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <FiShoppingBag size={14} /> Masukkan ke Tas
              </button>
              
              <button 
                onClick={() => setIsWishlist(!isWishlist)}
                className={`w-11 h-11 border rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                  isWishlist 
                    ? "bg-red-50 text-red-500 border-red-200 shadow-3xs" 
                    : "bg-white text-slate-400 border-slate-200 hover:text-slate-600"
                }`}
              >
                <FiHeart size={16} fill={isWishlist ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

        </div>

        {/* SECTION SECTION: TAB REVIEW */}
        <div className="pt-8">
          <ReviewSection />
        </div>

      </main>
    </div>
  );
}