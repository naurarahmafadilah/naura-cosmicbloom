import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GuestNavbar from "../components/GuestNavbar";
import { FiPackage, FiAward, FiHeart, FiClock, FiChevronRight, FiMapPin } from "react-icons/fi";

export default function DashboardGuest() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // 1. Ambil data user login
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      // Jika nyasar belum login, tendang ke landing page
      navigate("/");
    } else {
      setUser(userData);
    }

    // 2. Ambil data badge keranjang
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(existingCart.reduce((acc, curr) => acc + curr.quantity, 0));
  }, [navigate]);

  // Simulasi data transaksi & loyalitas customer
  const customerData = {
    loyaltyPoints: 1250,
    membershipTier: "Gold Member",
    activeOrders: [
      { id: "VEL-9081", date: "14 Juni 2026", total: "Rp 520.000", status: "Sedang Dikirim", kurir: "Reguler (J&T)" }
    ],
    pastOrders: [
      { id: "VEL-8721", date: "28 April 2026", total: "Rp 250.000", status: "Selesai" }
    ]
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-quicksand text-slate-800 pb-12">
      {/* GLOBAL NAVBAR */}
      <GuestNavbar cartCount={cartCount} onCartClick={() => navigate("/")} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ==========================================
            WIDGET WELCOME & LOYALTY CARD
           ========================================== */}
        <section className="bg-gradient-to-br from-[#4E5631] to-[#606a3d] rounded-3xl p-6 sm:p-8 text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#FAF9F5]/70">Selamat Datang Kembali</p>
            <h1 className="font-playfair text-2xl sm:text-3xl font-bold tracking-wide">{user.name}</h1>
            <p className="text-xs text-slate-200/90 flex items-center gap-1.5 pt-1">
              <FiMapPin size={12} /> Alamat utama terhubung di akun Anda.
            </p>
          </div>

          {/* Kartu Poin Loyalitas Mewah */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4 w-full sm:w-auto">
            <div className="w-10 h-10 bg-[#FAF9F5] text-[#4E5631] rounded-xl flex items-center justify-center shadow-3xs">
              <FiAward size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-200">{customerData.membershipTier}</p>
              <p className="text-lg font-mono font-bold">{customerData.loyaltyPoints} <span className="text-xs font-quicksand font-medium text-slate-200">Points</span></p>
            </div>
          </div>
        </section>

        {/* ==========================================
            KONTEN UTAMA: GRID 2 KOLOM
           ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SISI KIRI: STATUS PESANAN AKTIF & RIWAYAT (KOLOM 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* 1. Pesanan Berjalan */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FiPackage size={14} className="text-[#4E5631]" /> Lacak Pesanan Aktif
              </h2>

              {customerData.activeOrders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl border border-slate-100 bg-[#FAF9F5]/40 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{order.id}</span>
                      <span className="text-[9px] font-bold bg-[#A47174]/10 text-[#A47174] px-2 py-0.5 rounded-md uppercase tracking-wide">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">Dipesan pada {order.date} via {order.kurir}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-mono font-bold text-[#4E5631]">{order.total}</p>
                    <button className="text-[10px] font-bold text-[#4E5631] underline mt-0.5 block cursor-pointer">
                      Detail Rincian Nota
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* 2. Riwayat Transaksi Selesai */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FiClock size={14} className="text-[#A47174]" /> Riwayat Belanja Lama
              </h2>

              <div className="divide-y divide-slate-50">
                {customerData.pastOrders.map((order) => (
                  <div key={order.id} className="py-3 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-slate-800">{order.id}</p>
                      <p className="text-[10px] text-slate-400">{order.date} • <span className="text-emerald-600 font-semibold">{order.status}</span></p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-slate-600">{order.total}</span>
                      <FiChevronRight size={14} className="text-slate-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* SISI KANAN: MENU PENGATURAN & SHORTCUT (KOLOM 1) */}
          <div className="space-y-6">
            
            {/* Panel Navigasi Akun */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-3xs space-y-1">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-2 pt-1">Pusat Akun</h3>
              
              <button onClick={() => navigate("/")} className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-[#FAF9F5] rounded-xl font-semibold flex items-center gap-2.5 transition-colors cursor-pointer">
                🛍️ Belanja Koleksi Baru
              </button>
              
              <button onClick={() => alert("Fitur edit alamat pengiriman segera hadir!")} className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-[#FAF9F5] rounded-xl font-semibold flex items-center gap-2.5 transition-colors cursor-pointer">
                📍 Buku Alamat Pengiriman
              </button>

              <button onClick={() => alert("Kupon diskon eksklusif Anda masih kosong.")} className="w-full text-left px-3 py-2.5 text-xs text-slate-700 hover:bg-[#FAF9F5] rounded-xl font-semibold flex items-center gap-2.5 transition-colors cursor-pointer">
                🎟️ Voucher & Kupon Saya
              </button>
            </div>

            {/* Banner Hiburan Pendukung */}
            <div className="bg-[#A47174]/5 border border-[#A47174]/10 p-5 rounded-2xl text-center space-y-2">
              <FiHeart size={20} className="mx-auto text-[#A47174]" />
              <h4 className="text-xs font-bold text-slate-800">Butuh Bantuan Butik?</h4>
              <p className="text-[11px] text-slate-500 leading-normal">Layanan personal stylist Veloura tersedia 24/7 untuk membantu ukuran pakaian Anda.</p>
              <button className="text-[10px] font-bold text-[#A47174] tracking-wider uppercase pt-1 block mx-auto cursor-pointer">
                Hubungi Concierge
              </button>
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}