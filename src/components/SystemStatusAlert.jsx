import React from "react";
import { FiShield, FiLock } from "react-icons/fi";

const SystemStatusAlert = ({ message }) => {
  return (
    <div className="w-full bg-white border border-primary-light/20 text-primary-dark px-6 py-4 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-veloura transform transition-all duration-700 hover:scale-[1.01] hover:border-primary-light/40">
      
      {/* Sisi Kiri: Pesan Status Keamanan */}
      <div className="flex items-center gap-4 text-center sm:text-left">
        <div className="w-9 h-9 rounded-xl bg-primary-light/10 border border-primary-light/20 flex items-center justify-center text-primary-light shrink-0 shadow-sm animate-pulse">
          <FiShield size={16} />
        </div>
        <div>
          <span className="text-[9px] font-bold tracking-[2px] uppercase text-primary-light font-quicksand block mb-0.5">
            Sistem Enkripsi Veloura
          </span>
          <p className="text-xs font-quicksand font-medium tracking-wide text-primary-dark/80">
            {message}
          </p>
        </div>
      </div>

      {/* Sisi Kanan: Lencana Keamanan (Memakai Lini Warna Dusty Rose) */}
      <div className="flex items-center gap-1.5 bg-secondary-light/10 border border-secondary-light/20 px-3 py-1.5 rounded-xl text-[10px] font-bold text-secondary-light uppercase tracking-widest shrink-0 font-quicksand shadow-inner">
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-light animate-ping inline-block mr-1" />
        <FiLock size={10} className="mr-0.5" /> Secure Sesi 2026
      </div>

    </div>
  );
};

export default SystemStatusAlert;