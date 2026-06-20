import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FiUser, 
  FiHeadphones, 
  FiCompass, 
  FiActivity, 
  FiShoppingCart, 
  FiCheckSquare, 
  FiLogOut 
} from "react-icons/fi";

const HeaderMember = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("veloura_cart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        const totalQty = items.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(totalQty);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [location]);

  const handleLogout = () => {
    const konfirmasi = window.confirm("Apakah Anda yakin ingin keluar dari sesi VIP Member?");
    if (konfirmasi) {
      navigate("/login"); 
    }
  };

  return (
    <>
      <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-[#e6e4dd] px-6 sm:px-10 py-4 grid grid-cols-1 xl:grid-cols-3 items-center gap-4 shadow-xs">
        
        {/* SISI KIRI: Brand Logo */}
        <div className="cursor-pointer group justify-self-center xl:justify-self-start" onClick={() => navigate("/")}>
          <h1 className="text-2xl font-bold tracking-widest font-playfair uppercase text-[#2c3218]">
            Veloura<span className="text-[#c97d7d] font-accent text-3xl transition-transform group-hover:scale-125 inline-block">.</span>
          </h1>
        </div>

        {/* SISI TENGAH: Navigation Links */}
        <div className="justify-self-center w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          <nav className="flex items-center justify-center gap-1 bg-[#fcfbf9] p-1.5 rounded-2xl border border-[#e6e4dd] font-quicksand text-xs font-bold w-max mx-auto">
            
            {/* Dashboard Member */}
            <button 
              onClick={() => navigate("/member")}
              className={`px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap ${isActive("/member") ? "bg-[#3a3f24] text-white shadow-md" : "text-stone-500 hover:text-[#3a3f24]"}`}
            >
              <FiCompass size={14} />
              <span>Dashboard</span>
            </button>
            
            {/* Lacak Pesanan */}
            <button 
              onClick={() => navigate("/lacak-pesanan")}
              className={`px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap ${isActive("/lacak-pesanan") ? "bg-[#3a3f24] text-white shadow-md" : "text-stone-500 hover:text-[#3a3f24]"}`}
            >
              <FiActivity size={14} />
              <span>Lacak Pesanan</span>
              <span className="bg-[#c97d7d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">1</span>
            </button>

            {/* Profil & Ukuran Fitting */}
            <button 
              onClick={() => navigate("/profil-member")}
              className={`px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap ${isActive("/profil-member") ? "bg-[#3a3f24] text-white shadow-md" : "text-stone-500 hover:text-[#3a3f24]"}`}
            >
              <FiUser size={14} />
              <span>Profil</span>
            </button>

            {/* Keranjang Belanja */}
            <button 
              onClick={() => navigate("/keranjang")}
              className={`px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap ${isActive("/keranjang") ? "bg-[#3a3f24] text-white shadow-md" : "text-stone-500 hover:text-[#3a3f24]"}`}
            >
              <FiShoppingCart size={14} />
              <span>Keranjang</span>
              {cartCount > 0 && (
                <span className="bg-[#3a3f24] border border-white/20 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Checkout */}
            <button 
              onClick={() => navigate("/checkout")}
              className={`px-4 py-2.5 rounded-xl transition duration-300 flex items-center gap-2 whitespace-nowrap ${isActive("/checkout") ? "bg-[#3a3f24] text-white shadow-md" : "text-stone-500 hover:text-[#3a3f24]"}`}
            >
              <FiCheckSquare size={14} />
              <span>Checkout</span>
            </button>
          </nav>
        </div>

        {/* SISI KANAN: Right Actions & Logout */}
        <div className="flex items-center justify-center xl:justify-end gap-3 justify-self-center xl:justify-self-end w-full sm:w-auto">
          {/* Status Tag */}
          <div className="flex items-center gap-2 bg-[#3a3f24] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs border border-white/10 whitespace-nowrap">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="tracking-wide">VIP Client</span>
          </div>

          {/* Tombol Keluar */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 border border-[#e6e4dd] text-stone-600 text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-2xs whitespace-nowrap"
          >
            <FiLogOut size={13} />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </header>

      {/* FLOATING ACTION BUTTON (Diarahkan ke Contact Us Halaman) */}
      <div className="fixed bottom-6 right-6 z-50 group">
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#2c3218] text-[#faf9f5] font-quicksand text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 border border-white/10">
          Concierge Service
        </span>
        
        <button 
          onClick={() => navigate("/contact-us")} // Navigasi langsung ke rute Contact Us Anda
          className="w-14 h-14 rounded-full bg-[#3a3f24] text-[#f7d6d6] flex items-center justify-center shadow-xl border border-white/10 hover:bg-[#2c3218] hover:text-white transition-all duration-300 hover:scale-110 relative"
        >
          <span className="absolute inset-0 rounded-full bg-[#3a3f24] opacity-40 animate-ping -z-10 group-hover:bg-[#c97d7d]"></span>
          <FiHeadphones size={22} />
        </button>
      </div>
    </>
  );
};

export default HeaderMember;