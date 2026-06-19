import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fungsi Logout Terintegrasi Supabase
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // 1. Bersihkan session di Supabase Cloud
      await supabase.auth.signOut();
      
      // 2. Bersihkan sisa data lokal browser
      localStorage.removeItem("user");
      localStorage.clear();
      
      // 3. DIUBAH: Mengarahkan kembali ke Landing Page (Rute "/") secara bersih
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Gagal melakukan proses keluar sistem:", error);
      alert("Terjadi kesalahan sistem saat mencoba logout.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="w-full h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 m-0 relative z-40">
      
      {/* 👑 SEKTOR KIRI: Navigasi Breadcrumb Premium */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#4E5631]/5 border border-[#4E5631]/10 text-[11px] font-bold text-[#4E5631] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631] animate-pulse"></span>
          Premium Enterprise
        </div>
        <span className="text-xs text-slate-300">/</span>
        <span className="text-xs text-slate-500 font-semibold tracking-tight">Pusat Kendali Utama</span>
      </div>

      {/* 👑 SEKTOR KANAN: Menu Profil Klik Dropdown + Tombol Aksi */}
      <div className="flex items-center gap-5">
        
        {/* Tombol Logout Cepat (Instan di Header) */}
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/70 px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-red-100 disabled:opacity-50"
        >
          {isLoggingOut ? (
            <>
              <svg className="animate-spin h-3.5 w-3.5 text-red-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Keluar...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Keluar Sistem
            </>
          )}
        </button>

        <div className="w-[1px] h-6 bg-slate-200"></div>

        {/* Profil Dropdown Trigger */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#4E5631] transition-colors leading-none">
                Ferdi Admin
              </span>
              <span className="text-[10px] text-slate-400 font-medium mt-1">
                Owner Otoritas Penuh
              </span>
            </div>
            
            {/* Avatar Bulat Mewah */}
            <div className="w-9 h-9 rounded-xl bg-[#4E5631] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[#4E5631]/20 group-hover:scale-105 transition-transform duration-200">
              F
            </div>
          </button>

          {/* 🌟 WINDOW DROPDOWN ELEGAN (Muncul saat Avatar diklik) */}
          {isDropdownOpen && (
            <>
              {/* Overlay untuk menutup saat klik di luar area dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Hak Akses</p>
                  <p className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100 rounded-md px-1.5 py-0.5 mt-1 inline-block">
                    Super Administrator
                  </p>
                </div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); alert("Fitur Pengaturan Profil segera hadir!"); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2 transition-colors"
                >
                  ⚙️ Pengaturan Akun
                </button>

                <button 
                  onClick={() => { setIsDropdownOpen(false); alert("Fitur Log Aktivitas Keamanan terenkripsi."); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2 transition-colors"
                >
                  🔒 Log Keamanan Sesi
                </button>

                <div className="h-[1px] bg-slate-100 my-1"></div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 transition-colors"
                >
                  🚪 Keluar Aplikasi
                </button>
              </div>
            </>
          )}
        </div>

      </div>

    </header>
  );
}