import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const StatCard = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 flex flex-col justify-between min-h-[140px] shadow-sm transform transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] hover:border-secondary-light/30 cursor-pointer group">
      
      {/* BAGIAN ATAS: Judul & Ikon */}
      <div className="flex justify-between items-start">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[1.5px] font-quicksand">
          {title}
        </span>
        {/* Efek Pro: Ikon ikut sedikit berubah warna saat card di-hover */}
        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 text-secondary-light flex items-center justify-center text-sm transition-colors duration-500 group-hover:bg-secondary-light/5 group-hover:border-secondary-light/20">
          {icon || (
            // Fallback icon bawaan jika prop icon kosong
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
        </div>
      </div>
      
      {/* BAGIAN BAWAH: Angka Utama & Badge Persentase */}
      <div className="mt-5 flex justify-between items-end">
        <h3 className="text-2xl font-bold tracking-tight text-primary-dark font-playfair group-hover:text-secondary-light transition-colors duration-500">
          {value}
        </h3>
        
        {/* Badge Dinamis Premium */}
        <span className={`text-[10px] font-bold font-quicksand px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all duration-500 ${
          isPositive 
            ? "bg-emerald-50 text-emerald-600 border border-emerald-100/50 group-hover:bg-emerald-100" 
            : "bg-rose-50 text-rose-600 border border-rose-100/50 group-hover:bg-rose-100"
        }`}>
          {isPositive ? (
            <FaArrowUp size={7} className="animate-pulse" />
          ) : (
            <FaArrowDown size={7} className="animate-pulse" />
          )} 
          {change}
        </span>
      </div>

    </div>
  );
};

export default StatCard;