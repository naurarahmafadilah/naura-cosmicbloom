import { FaSearch, FaBell, FaUserShield, FaChartBar, FaSignOutAlt, FaCog, FaUserSecret } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  // State User real-time
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // Sinkronisasi lintas komponen dan lintas tab
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localUserUpdate", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localUserUpdate", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("localUserUpdate"));
    navigate("/login");
  };

  // 1. AKTIFKAN MODE GUEST + MASUK KE DASHBOARD GUEST
  const handleActivateGuest = () => {
    const guestData = { username: "Guest User", role: "guest" };
    localStorage.setItem("user", JSON.stringify(guestData));
    setUser(guestData);
    setProfileOpen(false);
    
    // Kirim sinyal update ke komponen lain
    window.dispatchEvent(new Event("localUserUpdate")); 
    
    // Berpindah rute ke dashboard guest
    navigate("/admin/dashboardguest"); 
  };

  // 2. KEMBALIKAN KE MODE ADMIN + MASUK KE DASHBOARD UTAMA
  const handleActivateAdmin = () => {
    const adminData = { username: "Admin Utama", role: "admin" };
    localStorage.setItem("user", JSON.stringify(adminData));
    setUser(adminData);
    setProfileOpen(false);
    
    // Kirim sinyal update ke komponen lain
    window.dispatchEvent(new Event("localUserUpdate")); 
    
    // Berpindah rute ke dashboard admin sekarang
    navigate("/admin/dashboard"); 
  };

  // Tutup dropdown jika klik di luar area profil
  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 py-3.5 transition-all select-none">

        {/* BRANDING LOGO */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(user?.role === "guest" ? "/admin/dashboardguest" : "/admin/dashboard")}>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold font-playfair text-primary-dark tracking-wide leading-none">
              Veloura<span className="text-secondary-light">.</span>
            </h1>
            <span className="text-[9px] font-quicksand font-bold uppercase tracking-widest text-primary-dark/40 mt-1.5">
              Boutique Admin
            </span>
          </div>
        </div>

        {/* INPUT PENCARIAN */}
        <div 
          onClick={() => setOpen(true)}
          className="hidden md:flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100/80 transition-colors px-3.5 py-1.5 rounded-xl w-60 border border-slate-100 cursor-pointer text-primary-dark/40"
        >
          <FaSearch className="text-[10px]" />
          <span className="text-xs font-quicksand font-medium tracking-wide">Cari data atau invoice...</span>
        </div>

        {/* NOTIFIKASI & PROFILE */}
        <div className="flex items-center gap-4 text-primary-dark/70">
          
          <button onClick={() => setOpen(true)} className="md:hidden p-2 rounded-xl hover:bg-slate-50 text-primary-dark transition-all">
            <FaSearch className="text-xs" />
          </button>

          <div onClick={() => alert("Membuka panel notifikasi.")} className="relative p-2 rounded-xl hover:bg-slate-50 text-primary-dark transition-all cursor-pointer group">
            <FaBell className="text-xs group-hover:scale-105 transition-transform" />
            <span className="absolute top-1 right-1 bg-secondary-light text-white text-[8px] font-bold w-3.5 h-3.5 flex items-center justify-center rounded-full font-quicksand">2</span>
          </div>

          <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>

          {/* DROPDOWN TRIGGER */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <div onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-playfair shadow-xs transition-colors ${
                user?.role === "guest" ? "bg-amber-600 text-white" : "bg-primary-dark text-white"
              }`}>
                {user?.username ? user.username.charAt(0).toUpperCase() : "A"}
              </div>
              
              <div className="hidden sm:flex flex-col text-left pr-1">
                <span className="text-[9px] font-quicksand font-bold text-primary-dark/40 uppercase tracking-wider leading-none mb-1">Hallo, Selamat Datang</span>
                <span className="text-xs font-quicksand font-bold text-primary-dark leading-none truncate max-w-[110px]">
                  {user?.username || "Admin Utama"} ✨
                </span>
              </div>
            </div>

            {/* DROPDOWN ITEMS */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl overflow-hidden animate-fade-in font-quicksand">
                <div className="px-4 py-3 bg-slate-50 text-[10px] font-bold text-primary-dark/50 border-b border-slate-100 uppercase tracking-wider flex items-center gap-2">
                  <FaUserShield className="text-primary-dark/40 text-xs" />
                  <span>{user?.role === "guest" ? "Otoritas Tamu" : "Otoritas Admin"}</span>
                </div>
                
                <button onClick={() => { setProfileOpen(false); navigate(user?.role === "guest" ? "/admin/dashboardguest" : "/admin/dashboard"); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-primary-dark/80 hover:bg-slate-50 transition-colors text-left">
                  <FaChartBar className="text-primary-dark/30 text-xs" /> Monitor Ringkasan
                </button>

                <button onClick={() => { setProfileOpen(false); navigate("/admin/settings"); }} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-primary-dark/80 hover:bg-slate-50 transition-colors text-left">
                  <FaCog className="text-primary-dark/30 text-xs" /> Pengaturan Sistem
                </button>

                {/* SWAP NAVIGATION GUEST <=> ADMIN */}
                {user?.role !== "guest" ? (
                  <button onClick={handleActivateGuest} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-[#8C6239] hover:bg-[#FAF9F5] transition-colors text-left border-t border-dashed border-slate-100">
                    <FaUserSecret className="text-[#8C6239]/70 text-xs" /> Masuk Sebagai Guest
                  </button>
                ) : (
                  <button onClick={handleActivateAdmin} className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50/50 hover:bg-emerald-50 transition-colors text-left border-t border-dashed border-emerald-200">
                    <FaUserShield className="text-emerald-600 text-xs" /> Kembali Jadi Admin
                  </button>
                )}

                <div className="border-t border-slate-100 my-1"></div>

                <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left">
                  <FaSignOutAlt className="text-red-400 text-xs" /> Keluar Sesi
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MODAL SEARCH */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/10 backdrop-blur-xs p-4" onClick={() => setOpen(false)}>
          <div className="bg-white w-full max-w-sm p-5 rounded-2xl shadow-xl border border-slate-100 font-quicksand" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xs font-bold font-playfair text-primary-dark mb-3 tracking-tight flex items-center gap-2 uppercase">
              <FaSearch className="text-[10px] text-secondary-light" /> Pencarian Sistem Internal
            </h2>
            <input type="text" autoFocus placeholder="Cari SKU, nama customer, atau nomor invoice..." className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-transparent focus:border-primary-dark focus:bg-white outline-none text-xs font-semibold transition-all shadow-inner" />
            <div className="mt-4 flex justify-end gap-1.5 text-[10px] font-bold">
              <button onClick={() => setOpen(false)} className="px-3 py-1.5 bg-slate-50 text-primary-dark rounded-xl">Tutup</button>
              <button onClick={() => { setOpen(false); alert("Mengeksekusi pencarian..."); }} className="px-4 py-1.5 bg-primary-dark text-white rounded-xl shadow-xs">Cari Data</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;