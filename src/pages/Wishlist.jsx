import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaTrashAlt, FaShoppingBag, FaSearch, FaSlidersH, 
  FaHeart, FaFolderOpen, FaArrowCircleRight, FaEye
} from "react-icons/fa";

import wishlistProductsData from "../data/wishlistProductsData.json";
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState(wishlistProductsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const handleRemoveItem = (id, e) => {
    if (e) e.stopPropagation(); 
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus item ini dari wishlist?");
    if (confirmDelete) {
      setWishlistItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation(); 
    alert(`"${product.name}" (Ukuran: M) berhasil dipindahkan ke keranjang belanja Veloura.`);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = wishlistItems.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "alpha") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [wishlistItems, searchTerm, selectedCategory, sortBy]);

  const categories = ["all", "dress", "casual", "summer", "modern"];

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER SECTION */}
        <div className="border-b border-slate-200/60 pb-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              My Boutique <span className="italic font-light text-slate-400">Wishlist</span>
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-xl">
              Daftar koleksi busana premium impian Anda. Amankan item favorit Anda sebelum kehabisan stok eksklusif musim ini.
            </p>
          </div>

          <div className="bg-white border border-slate-200/60 px-4 py-2 rounded-xl flex items-center gap-2.5 shadow-xs font-quicksand">
            <div className="w-7 h-7 rounded-lg bg-[#A47174]/10 flex items-center justify-center text-[#A47174]">
              <FaHeart size={12} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">Total Saved</p>
              <p className="text-sm font-mono font-bold text-slate-800 mt-0.5 leading-none">{wishlistItems.length} Items</p>
            </div>
          </div>
        </div>

        {/* CONTROL BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 font-quicksand mb-6">
          <div className="relative w-full lg:flex-1 flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
            <input
              type="text"
              placeholder="Cari gaun, outer, setelan casual, atau siluet impian Anda..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
            />
          </div>

          <div className="relative flex items-center w-full lg:w-auto min-w-[180px]">
            <FaSlidersH className="absolute left-3 text-slate-400 text-xs pointer-events-none" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full h-9 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 pl-8 pr-6 focus:outline-hidden focus:border-[#4E5631] appearance-none cursor-pointer"
            >
              <option value="default">Urutkan Ragam</option>
              <option value="price-low">Harga: Terendah - Tertinggi</option>
              <option value="price-high">Harga: Tertinggi - Terendah</option>
              <option value="alpha">Abjad: A - Z</option>
            </select>
            <div className="absolute right-3 pointer-events-none text-[8px] text-slate-400">▼</div>
          </div>
        </div>

        {/* TAB FILTER */}
        <div className="flex flex-wrap gap-2 mb-8 font-quicksand">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                selectedCategory === cat
                  ? "bg-[#4E5631] text-white border-[#4E5631] shadow-xs"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"
              }`}
            >
              {cat === "all" ? "Semua Koleksi" : cat}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 font-quicksand">
            {filteredAndSortedProducts.map((product) => (
              <div 
                key={product.id}
                onClick={() => navigate(`/wishlist/${product.id}`)}
                className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group relative cursor-pointer"
              >
                <div className="relative aspect-4/5 overflow-hidden bg-slate-100">
                  <img 
                    src={product.img} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-md text-[#4E5631] border border-white/40 px-2.5 py-0.5 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-xs">
                    {product.category}
                  </span>
                  <button
                    onClick={(e) => handleRemoveItem(product.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 text-rose-500 shadow-xs hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer z-10"
                  >
                    <FaTrashAlt size={11} />
                  </button>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-xs rounded-xl text-[10px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <FaEye size={12} className="text-[#A47174]" /> View Details
                    </span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-base font-bold text-slate-800 tracking-wide line-clamp-1 group-hover:text-[#4E5631] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-[#A47174] mt-1">
                      {formatRupiah(product.price)}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-2.5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-slate-50 pt-3">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="w-full h-9 bg-[#4E5631] text-white text-xs font-bold rounded-xl hover:bg-[#4E5631]/95 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FaShoppingBag size={11} /> Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-slate-100 rounded-3xl font-quicksand shadow-xs max-w-md mx-auto px-6">
            <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto border border-slate-100 mb-4">
              <FaFolderOpen size={24} />
            </div>
            <h3 className="font-playfair text-lg font-bold text-slate-700">Wishlist Kosong</h3>
            <p className="text-xs text-slate-400 font-medium mt-1.5 leading-relaxed">
              Kamu belum menyimpan barang apa pun.
            </p>
            <button 
              onClick={() => navigate("/")}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold tracking-wider hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Jelajahi Produk <FaArrowCircleRight size={11} />
            </button>
          </div>
        )}

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default Wishlist;