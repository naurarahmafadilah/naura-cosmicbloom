import React from "react";
import { FiHeart, FiLock, FiGlobe } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 pt-6 border-t border-slate-100/80 pb-6 text-slate-400 font-quicksand text-xs">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Sisi Kiri: Hak Cipta */}
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <span>© 2026</span>
          <span className="font-playfair font-bold text-primary-dark tracking-wide">Veloura Boutique.</span>
          <span className="text-[11px] text-slate-300">|</span>
          <span className="flex items-center gap-1 text-[11px]">
            Crafted with <FiHeart size={10} className="text-rose-400 fill-rose-400 animate-pulse" /> for Luxury Experience
          </span>
        </div>

        {/* Sisi Kanan: Status Proteksi & Tautan Bantuan */}
        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1 text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-full shadow-inner">
            <FiLock size={10} className="text-emerald-500" />
            <span className="font-medium text-slate-500">Koneksi Enkripsi Aktif</span>
          </div>
          <div className="flex gap-4">
            <a href="#bantuan" className="hover:text-secondary-light transition-colors duration-300 font-medium">Dokumentasi</a>
            <a href="#kebijakan" className="hover:text-secondary-light transition-colors duration-300 font-medium">Pusat Bantuan</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;