import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { supabase } from "../lib/supabase";

export default function GuestNavbar({ onCartClick, cartCount = 0 }) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Ambil data user dari localStorage jika sudah login
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.role === "user") {
      setCurrentUser(userData);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    await supabase.auth.signOut();
    setCurrentUser(null);
    navigate("/", { replace: true });
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/40 px-4 sm:px-8 h-16 flex items-center justify-between shadow-3xs font-quicksand">
      {/* BRAND LOGO */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <span className="font-playfair text-xl font-bold tracking-widest text-[#4E5631]">VELOURA</span>
        <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-50 px-2 py-0.5 rounded-md text-[#A47174] border border-slate-200/40">
          Atelier
        </span>
      </div>

      {/* UTILITIES & PROFILE */}
      <div className="flex items-center gap-4">
        {/* Wishlist */}
        <button className="text-slate-400 hover:text-[#A47174] p-1.5 rounded-full transition-colors relative cursor-pointer">
          <FiHeart size={18} />
        </button>

        {/* Keranjang Belanja */}
        <button 
          onClick={onCartClick}
          className="text-slate-400 hover:text-[#4E5631] p-1.5 rounded-full transition-colors relative cursor-pointer"
        >
          <FiShoppingBag size={18} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#A47174] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
        
        <div className="h-4 w-[1px] bg-slate-200"></div>

        {/* Kondisional Render Akun */}
        {currentUser ? (
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-right hidden sm:flex">
              <span className="text-xs font-bold text-slate-800 leading-none">{currentUser.name}</span>
              <span className="text-[9px] text-[#A47174] font-medium tracking-wide mt-1 uppercase">Premium Member</span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#4E5631]/10 text-[#4E5631] flex items-center justify-center text-xs font-bold border border-[#4E5631]/20">
              {currentUser.name?.charAt(0).toUpperCase() || <FiUser />}
            </div>
            <button 
              onClick={handleLogout}
              className="p-1.5 text-red-400 hover:text-red-600 rounded-lg bg-red-50 hover:bg-red-100 transition-colors cursor-pointer"
              title="Keluar Akun"
            >
              <FiLogOut size={14} />
            </button>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/login")}
            className="h-9 px-4 rounded-xl text-xs font-bold tracking-wide transition-all flex items-center gap-2 bg-[#4E5631] text-white hover:bg-[#3d4426] shadow-3xs uppercase cursor-pointer"
          >
            <FiLogIn size={13} /> Masuk
          </button>
        )}
      </div>
    </nav>
  );
}