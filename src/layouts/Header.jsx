import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useState, useEffect } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // State untuk menyimpan data user yang sedang login
  const [userProfile, setUserProfile] = useState({
    name: "Memuat...",
    role: "User",
    email: ""
  });

  // Ambil data user yang sedang login secara dinamis
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Ambil session user dari auth Supabase
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        
        if (authError || !user) return;

        // 2. Ambil data tambahan (seperti name dan role) dari user_metadata 
        // atau jika Anda menyimpannya di tabel publik 'users'
        const metadata = user.user_metadata;
        
        if (metadata && metadata.name) {
          // Jika data ada di metadata auth (seperti yang dibuat di form Register Anda)
          setUserProfile({
            name: metadata.name,
            role: metadata.role || "user",
            email: user.email
          });
        } else {
          // Alternatif: Jika metadata kosong, ambil dari tabel publik 'users'
          const { data: dbUser, error: dbError } = await supabase
            .from("users")
            .select("name, role")
            .eq("id", user.id)
            .single();

          if (!dbError && dbUser) {
            setUserProfile({
              name: dbUser.name,
              role: dbUser.role,
              email: user.email
            });
          } else {
            // Fallback jika tidak ditemukan nama kustom
            setUserProfile({
              name: user.email.split("@")[0],
              role: "user",
              email: user.email
            });
          }
        }
      } catch (err) {
        console.error("Gagal memuat data profil:", err);
      }
    };

    fetchUserData();

    // Dengarkan juga jika ada perubahan status auth secara real-time
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setUserProfile({ name: "Guest", role: "user", email: "" });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fungsi membuat inisial huruf besar untuk Avatar (Contoh: "Ferdi Admin" -> "F")
  const getInitial = (name) => {
    if (!name || name === "Memuat...") return "V";
    return name.charAt(0).toUpperCase();
  };

  // Format tampilan label Tipe Keanggotaan/Role agar terlihat mewah
  const renderRoleBadge = (role) => {
    const cleanRole = role?.toLowerCase();
    if (cleanRole === "admin") return "Super Administrator";
    if (cleanRole === "member") return "VIP Member";
    return "Client / Guest";
  };

  // Fungsi Logout Terintegrasi Supabase
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // 1. Bersihkan session di Supabase Cloud
      await supabase.auth.signOut();
      
      // 2. Bersihkan sisa data lokal browser
      localStorage.clear();
      
      // 3. Mengarahkan kembali ke Landing Page (Rute "/") secara bersih
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
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3a3f24]/5 border border-[#3a3f24]/10 text-[11px] font-bold text-[#3a3f24] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3a3f24] animate-pulse"></span>
          Veloura
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
          className="text-xs font-bold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100/70 px-3.5 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 border border-red-100 disabled:opacity-50 cursor-pointer"
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
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="flex flex-col text-right">
              {/* Nama dinamis dari data user login */}
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#3a3f24] transition-colors leading-none">
                {userProfile.name}
              </span>
              {/* Email atau deskripsi role singkat */}
              <span className="text-[10px] text-slate-400 font-medium mt-1 max-w-[120px] truncate">
                {userProfile.email || "Hak Akses Terbuka"}
              </span>
            </div>
            
            {/* Avatar Bulat Mewah Dinamis */}
            <div className="w-9 h-9 rounded-xl bg-[#3a3f24] text-white flex items-center justify-center text-sm font-bold shadow-md shadow-[#3a3f24]/20 group-hover:scale-105 transition-transform duration-200">
              {getInitial(userProfile.name)}
            </div>
          </button>

          {/* 🌟 WINDOW DROPDOWN ELEGAN (Muncul saat Avatar diklik) */}
          {isDropdownOpen && (
            <>
              {/* Overlay untuk menutup saat klik di luar area dropdown */}
              <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
              
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-50 mb-1">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Hak Akses Otoritas</p>
                  
                  {/* Badge role dinamis dari user */}
                  <p className={`text-[10px] font-bold rounded-md px-1.5 py-0.5 mt-1 inline-block border ${
                    userProfile.role === 'admin' 
                      ? 'text-amber-700 bg-amber-50 border-amber-100' 
                      : userProfile.role === 'member'
                      ? 'text-purple-700 bg-purple-50 border-purple-100'
                      : 'text-stone-700 bg-stone-50 border-stone-100'
                  }`}>
                    {renderRoleBadge(userProfile.role)}
                  </p>
                </div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); alert("Menuju halaman pengaturan profil..."); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  ⚙️ Pengaturan Akun
                </button>

                <button 
                  onClick={() => { setIsDropdownOpen(false); alert("Log Keamanan Sesi Terbuka."); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  🔒 Log Keamanan Sesi
                </button>

                <div className="h-[1px] bg-slate-100 my-1"></div>

                <button 
                  onClick={() => { setIsDropdownOpen(false); handleLogout(); }}
                  className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 font-bold flex items-center gap-2 transition-colors cursor-pointer"
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