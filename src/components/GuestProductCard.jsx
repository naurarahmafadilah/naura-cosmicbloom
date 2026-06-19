import React from "react";
import { FiShoppingBag, FiStar } from "react-icons/fi";

export default function GuestProductCard({ product, onAddToCart, onProductClick }) {
  const { id, name, price, img, category, rating = 4.8 } = product;

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 p-3 flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:border-slate-200/80 font-quicksand relative overflow-hidden">
      
      {/* BADGE KATEGORI */}
      <span className="absolute top-5 left-5 z-10 text-[9px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-3xs text-[#4E5631] px-2.5 py-1 rounded-lg border border-slate-100 shadow-3xs">
        {category || "Koleksi"}
      </span>

      {/* FOTO PRODUK */}
      <div 
        onClick={() => onProductClick && onProductClick(id)}
        className="w-full aspect-[4/5] rounded-xl bg-slate-50 overflow-hidden cursor-pointer relative"
      >
        <img 
          src={img || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=500"} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* INFO DETAIL TERSURAT */}
      <div className="pt-3 space-y-1">
        <div className="flex justify-between items-center">
          <h4 
            onClick={() => onProductClick && onProductClick(id)}
            className="text-xs font-bold text-slate-800 hover:text-[#4E5631] transition-colors cursor-pointer line-clamp-1 flex-1 pr-2"
          >
            {name}
          </h4>
          <div className="flex items-center gap-0.5 text-amber-500 font-mono text-[10px] font-bold">
            <FiStar size={10} fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>
        
        <p className="text-sm font-mono font-bold text-[#4E5631]">
          Rp {parseFloat(price.replace(/[^0-9]/g, "")).toLocaleString("id-ID")}
        </p>
      </div>

      {/* CTA UTAMA: TAMBAH KE KERANJANG */}
      <button 
        onClick={() => onAddToCart && onAddToCart(product)}
        className="w-full mt-3 h-9 rounded-xl text-[10px] font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 border bg-slate-50 text-slate-600 border-slate-200/60 group-hover:bg-[#4E5631] group-hover:text-white group-hover:border-[#4E5631] cursor-pointer"
      >
        <FiShoppingBag size={12} /> Add To Bag
      </button>

    </div>
  );
}