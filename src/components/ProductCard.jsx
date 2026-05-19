import React from "react";
import Button from "./Button";

const ProductCard = ({ id, name, price, imgSrc }) => {
  return (
    /* Efek Pro: transisi durasi 500ms, elevasi shadow-sm ke shadow-2xl, translasi Y, dan soft ring */
    <div className="group border border-slate-100 rounded-3xl p-3 bg-white flex flex-col justify-between transform transition-all duration-500 ease-out shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)] hover:border-secondary-light/20 hover:ring-4 hover:ring-secondary-light/5 cursor-pointer">
      <div>
        {/* Bingkai Foto Katalog */}
        <div className="relative overflow-hidden rounded-2xl bg-slate-50 aspect-square mb-3 border border-slate-100">
          <img 
            src={imgSrc} 
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            alt={name} 
          />
          {/* Label Arsip SKU */}
          <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-mono px-2 py-0.5 rounded-md tracking-wider">
            SKU-{id}
          </div>
        </div>

        {/* Informasi Detail Busana */}
        <div className="px-1">
          <h4 className="text-sm font-bold text-slate-800 truncate font-playfair group-hover:text-secondary-light transition-colors duration-300">{name}</h4>
          <div className="flex items-center gap-1 mt-0.5 font-quicksand">
            <span className="text-[10px] text-slate-400 font-bold">Rp</span>
            <p className="text-slate-700 font-bold text-xs tracking-wide">{price}</p>
          </div>
        </div>
      </div>

      {/* Panel Tombol Manajemen Admin */}
      <div className="px-1 mt-4 pt-3 border-t border-slate-50 flex gap-2 font-quicksand">
        <button className="flex-1 border border-slate-200 bg-white text-slate-600 py-1.5 rounded-xl text-[11px] font-bold hover:border-slate-300 hover:text-slate-800 transition-all duration-300">
          Edit Data
        </button>
        <Button variant="accent">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;