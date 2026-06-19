import React from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import { Input } from "./ui/input";

export default function CategoryFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory, 
  sortBy, 
  setSortBy 
}) {
  
  const categories = [
    { id: "all", label: "Semua Koleksi" },
    { id: "Dress", label: "Gaun (Dress)" },
    { id: "Casual", label: "Kasual harian" },
    { id: "Formal", label: "Formal & Kerja" }
  ];

  return (
    <div className="w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs flex flex-col gap-4 font-quicksand">
      
      {/* BARIS ATAS: CARI & SORTIR HARGA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* Search Bar */}
        <div className="relative w-full sm:max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <Input 
            type="text" 
            placeholder="Cari pakaian eksklusif..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 rounded-xl h-9 text-xs border-slate-100 bg-slate-50/60 focus-visible:ring-[#4E5631]/20 font-medium"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <FiSliders size={12} className="text-slate-400" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 px-3 text-xs bg-slate-50/60 border border-slate-100 rounded-xl font-medium text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#4E5631]/20 cursor-pointer w-full sm:w-[160px]"
          >
            <option value="default">Rekomendasi Utama</option>
            <option value="low-high">Harga: Rendah ke Tinggi</option>
            <option value="high-low">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>

      {/* BARIS BAWAH: PILIHAN KATEGORI CAPSULE */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none -mx-2 px-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`h-8 px-4 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all border cursor-pointer ${
                isActive 
                  ? "bg-[#4E5631] text-white border-[#4E5631] shadow-3xs" 
                  : "bg-white text-slate-500 border-slate-200/60 hover:border-slate-400"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}