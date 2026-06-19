import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiTruck, FiCreditCard, FiCheckCircle } from "react-icons/fi";
import { Input } from "../components/ui/input";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", note: "" });
  const [shippingMethod, setShippingMethod] = useState("reguler");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  }, []);

  const subtotal = cartItems.reduce((total, item) => {
    const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
    return total + (cleanPrice * item.quantity);
  }, 0);

  const shippingCost = shippingMethod === "express" ? 45000 : 20000;
  const grandTotal = subtotal + shippingCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Harap lengkapi semua data pengiriman!");
      return;
    }

    setLoading(true);

    // Simulasi Pengiriman Data Transaksi ke Database Supabase / Admin CRM
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem("cart"); // Kosongkan keranjang belanja
      alert("Pesanan Anda berhasil dibuat! Admin Veloura akan segera memprosesnya.");
      navigate("/", { replace: true });
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center font-quicksand p-4 text-center space-y-4">
        <FiShoppingBag size={48} className="text-slate-300" />
        <h2 className="text-sm font-bold text-slate-700">Tidak ada item untuk diselesaikan pesonannya.</h2>
        <button onClick={() => navigate("/")} className="h-9 px-4 bg-[#4E5631] text-white font-bold text-xs rounded-xl uppercase tracking-wider cursor-pointer">
          Kembali Berbelanja
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-quicksand text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* HEADER BRANDING CHECKOUT */}
        <div className="text-center space-y-2">
          <h1 className="font-playfair text-2xl sm:text-3xl font-bold tracking-widest text-[#4E5631]">VELOURA ATELIER</h1>
          <p className="text-[10px] font-bold text-[#A47174] uppercase tracking-widest">Secure Checkout System</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* SEKTOR KIRI: FORM DATA PENGIRIMAN (KOLOM 7) */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <FiTruck size={14} className="text-[#4E5631]" /> Informasi Pengiriman
            </h2>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1 block">Nama Lengkap Penerima</label>
                <Input 
                  type="text" 
                  placeholder="Contoh: Amanda Puspita" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="rounded-xl h-10 border-slate-200 text-xs font-medium bg-slate-50/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1 block">Nomor WhatsApp Aktif</label>
                <Input 
                  type="tel" 
                  placeholder="Contoh: 081234567890" 
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="rounded-xl h-10 border-slate-200 text-xs font-medium bg-slate-50/40"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 mb-1 block">Alamat Rumah Lengkap</label>
                <textarea 
                  placeholder="Nama jalan, nomor rumah, RT/RW, kecamatan, kota, dan kode pos" 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 border border-slate-200 rounded-xl text-xs font-medium bg-slate-50/40 focus:outline-none focus:ring-1 focus:ring-[#4E5631]/20"
                />
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* PILIHAN EKSPEDISI */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-slate-500 block">Metode Pengiriman</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div 
                  onClick={() => setShippingMethod("reguler")}
                  className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                    shippingMethod === "reguler" ? "border-[#4E5631] bg-[#4E5631]/5" : "border-slate-100 bg-slate-50/30"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800">Reguler Delivery</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Estimasi tiba 2-4 Hari kerja</p>
                  </div>
                  <span className="text-xs font-bold text-[#4E5631]">Rp 20.000</span>
                </div>

                <div 
                  onClick={() => setShippingMethod("express")}
                  className={`p-3 rounded-xl border flex justify-between items-center cursor-pointer transition-all ${
                    shippingMethod === "express" ? "border-[#4E5631] bg-[#4E5631]/5" : "border-slate-100 bg-slate-50/30"
                  }`}
                >
                  <div>
                    <p className="text-xs font-bold text-slate-800">Express Kilat</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Estimasi tiba 1-2 Hari kerja</p>
                  </div>
                  <span className="text-xs font-bold text-[#4E5631]">Rp 45.000</span>
                </div>
              </div>
            </div>

            {/* METODE PEMBAYARAN SIMULASI */}
            <div className="space-y-2 pt-1">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <FiCreditCard size={14} className="text-[#4E5631]" /> Metode Pembayaran
              </h2>
              <div className="p-3 bg-[#FAF9F5] border border-slate-200/50 rounded-xl flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-[#4E5631] text-white flex items-center justify-center text-[8px]">
                  <FiCheckCircle size={10} />
                </div>
                <p className="text-xs font-bold text-slate-700">Bank Transfer Manual (BCA/Mandiri)</p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#4E5631] text-white hover:bg-[#3d4426] font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-colors mt-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Sedang Memproses..." : "Konfirmasi & Selesaikan Pesanan"}
            </button>
          </form>

          {/* SEKTOR KANAN: RINGKASAN BELANJA (KOLOM 5) */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-3xs space-y-4 sticky top-24">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Ringkasan Keranjang</h2>
            
            {/* ITEM MAPPING */}
            <div className="max-h-52 overflow-y-auto divide-y divide-slate-50 pr-1 scrollbar-none">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="w-10 h-12 rounded-md bg-slate-100 overflow-hidden shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-slate-800 truncate">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Size: {item.selectedSize} × {item.quantity}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">
                    Rp {(parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.quantity).toLocaleString("id-ID")}
                  </span>
                </div>
              ))}
            </div>

            <hr className="border-slate-100" />

            {/* DETAIL KALKULASI NOTA */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal Barang:</span>
                <span className="font-mono">Rp {subtotal.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Ongkos Kirim Kurir:</span>
                <span className="font-mono">Rp {shippingCost.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Pajak & Biaya Layanan:</span>
                <span className="font-mono">Rp 0 (Free)</span>
              </div>
              
              <hr className="border-slate-100 my-1" />
              
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-1">
                <span>Total Tagihan:</span>
                <span className="font-mono text-[#4E5631]">Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}