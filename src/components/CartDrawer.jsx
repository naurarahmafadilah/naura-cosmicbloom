import React from "react";
import { FiX, FiTrash2, FiPlus, FiMinus, FiShoppingBag } from "react-icons/fi";

export default function CartDrawer({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null;

  // Hitung total belanja secara otomatis
  const subtotal = cartItems.reduce((total, item) => {
    const cleanPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10) || 0;
    return total + (cleanPrice * item.quantity);
  }, 0);

  return (
    <div className="fixed inset-0 z-50 font-quicksand">
      {/* OVERLAY BELAKANG (Klik untuk menutup) */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-3xs transition-opacity" onClick={onClose} />

      {/* PANEL DRAWER SLIDE-OVER */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-white shadow-xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* HEADER KERANJANG */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4E5631]">
            <FiShoppingBag size={18} />
            <h3 className="font-playfair font-bold text-base tracking-wide">Keranjang Belanja</h3>
            <span className="text-[10px] font-bold bg-[#4E5631]/10 px-2 py-0.5 rounded-full">
              {cartItems.length} Item
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer">
            <FiX size={18} />
          </button>
        </div>

        {/* DAFTAR BARANG (SCROLLABLE AREA) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-none">
          {cartItems.length === 0 ? (
            <div className="text-center py-20 space-y-2 text-slate-400">
              <FiShoppingBag size={32} className="mx-auto opacity-30" />
              <p className="text-xs font-semibold">Keranjang Anda masih kosong</p>
              <p className="text-[10px]">Silakan pilih koleksi pakaian terbaik kami.</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3 bg-slate-50/60 p-3 rounded-xl border border-slate-100/50">
                {/* Foto Produk */}
                <div className="w-16 h-20 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Informasi Barang */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between gap-1">
                      <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                      <button 
                        onClick={() => onRemoveItem(item.id, item.selectedSize)}
                        className="text-slate-400 hover:text-red-500 cursor-pointer transition-colors"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                    <p className="text-[10px] font-medium text-[#A47174] uppercase tracking-wide mt-0.5">
                      Ukuran: {item.selectedSize || "M"}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-2">
                    {/* Stepper Kuantitas (+ / -) */}
                    <div className="flex items-center border border-slate-200 bg-white rounded-lg h-6 overflow-hidden">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                        className="px-2 text-slate-500 hover:bg-slate-50 text-[10px] cursor-pointer"
                      >
                        <FiMinus size={8} />
                      </button>
                      <span className="px-2 text-xs font-mono font-bold text-slate-700">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                        className="px-2 text-slate-500 hover:bg-slate-50 text-[10px] cursor-pointer"
                      >
                        <FiPlus size={8} />
                      </button>
                    </div>
                    {/* Total Harga Item */}
                    <span className="text-xs font-mono font-bold text-[#4E5631]">
                      Rp {(parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.quantity).toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* BOTTOM SECTION (RINGKASAN & CHECKOUT) */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white space-y-4">
            <div className="flex justify-between items-center text-slate-800">
              <span className="text-xs font-semibold">Total Pembayaran (Subtotal):</span>
              <span className="text-base font-mono font-bold text-[#4E5631]">
                Rp {subtotal.toLocaleString("id-ID")}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 leading-normal">
              *Biaya pengiriman dan pajak akan dihitung di halaman penyelesaian pesanan (checkout).
            </p>
            <button 
              onClick={onCheckout}
              className="w-full h-10 bg-[#4E5631] text-white hover:bg-[#3d4426] font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              Lanjutkan Ke Checkout
            </button>
          </div>
        )}

      </div>
    </div>
  );
}