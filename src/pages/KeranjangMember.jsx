import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk fungsionalitas pindah halaman
import { FiTrash2, FiShoppingBag, FiPlus, FiMinus, FiArrowRight, FiLock } from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember";
import FooterMember from "../layouts/FooterMember"; // Import Footer terintegrasi

const KeranjangMember = () => {
  const navigate = useNavigate();

  // Mengambil data keranjang dari localStorage agar tetap tersimpan saat di-refresh
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("veloura_cart");
    return savedCart ? JSON.parse(savedCart) : [
      // Dummy data awal jika keranjang kosong pertama kali dibuka
      {
        id: "PROD-001",
        item: "Amour Silk Evening Gown",
        type: "Custom Tailored Haute Couture",
        price: 7500000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=300&q=80"
      },
      {
        id: "PROD-002",
        item: "Elysian Linen Blazer Blouse",
        type: "Ready-to-Wear Premium",
        price: 3200000,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=300&q=80"
      }
    ];
  });

  // Sinkronisasi otomatis ke localStorage setiap kali ada perubahan item/jumlah di keranjang
  useEffect(() => {
    localStorage.setItem("veloura_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Mengubah kuantitas produk (+ / -)
  const updateQuantity = (id, amount) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  // Menghapus item dari atelier bag
  const removeItem = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Perhitungan Finansial Garmen
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const luxuryTax = subtotal * 0.11; // Pajak barang mewah garmen 11%
  const total = subtotal + luxuryTax;

  // Format Mata Uang IDR Premium
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] flex flex-col">
      {/* 1. HEADER MEMBER DENGAN TRACKING JUMLAH ITEM */}
      <HeaderMember cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} wishlistCount={2} />

      {/* 2. AREA BELANJA ATELIER (FLEX GROW AGAR FOOTER SELALU DI BAWAH) */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 py-10 font-quicksand w-full">
        <h3 className="text-2xl font-normal text-[#2c3218] uppercase tracking-wide font-playfair mb-8">
          Atelier Basket <span className="text-sm font-quicksand text-stone-400 font-normal">({cartItems.length} Desain Terpilih)</span>
        </h3>

        {cartItems.length === 0 ? (
          /* Tampilan Jika Keranjang Kosong */
          <div className="bg-white border border-[#e6e4dd] rounded-3xl p-16 text-center space-y-4">
            <div className="w-16 h-16 bg-[#faf9f5] border border-[#e6e4dd] rounded-2xl flex items-center justify-center mx-auto text-[#2c3218]">
              <FiShoppingBag size={24} />
            </div>
            <h4 className="font-playfair text-lg text-[#2c3218]">Keranjang Atelier Anda Kosong</h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">Silakan jelajahi koleksi busana adibusana kami untuk menambahkan mahakarya garmen ke dalam daftar pesanan Anda.</p>
            <button onClick={() => navigate("/shop")} className="bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold px-6 py-3 rounded-xl transition shadow-xs">
              Lihat Lookbook Koleksi
            </button>
          </div>
        ) : (
          /* Tampilan Layout Utama Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* SISI KIRI: DAFTAR PRODUK (DI-RENDER DARI LOCAL STORAGE) */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-2xl border border-[#e6e4dd] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs hover:border-stone-400 transition duration-300">
                  
                  {/* Foto & Info Produk */}
                  <div className="flex gap-4 items-center">
                    <img 
                      src={item.image} 
                      alt={item.item} 
                      className="w-20 h-24 object-cover rounded-xl bg-stone-100 border border-[#e6e4dd]"
                    />
                    <div>
                      <span className="text-[9px] font-bold text-stone-400 tracking-wider uppercase">{item.id}</span>
                      <h4 className="text-sm font-medium font-playfair text-[#2c3218] mt-0.5 leading-snug">{item.item}</h4>
                      <p className="text-[11px] text-stone-500 font-light mb-2">{item.type}</p>
                      <span className="text-sm font-bold text-[#2c3218] block sm:hidden">{formatCurrency(item.price)}</span>
                    </div>
                  </div>

                  {/* Pengaturan Kuantitas & Aksi Hapus */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t sm:border-none pt-3 sm:pt-0">
                    <span className="text-sm font-bold text-[#2c3218] hidden sm:block min-w-[110px] text-right">
                      {formatCurrency(item.price)}
                    </span>
                    
                    {/* Counter Box */}
                    <div className="flex items-center bg-[#faf9f5] border border-[#e6e4dd] rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white rounded-lg text-stone-600 transition"
                      >
                        <FiMinus size={12} />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#2c3218] min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white rounded-lg text-stone-600 transition"
                      >
                        <FiPlus size={12} />
                      </button>
                    </div>

                    {/* Tombol Hapus */}
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 bg-red-50 text-red-600 hover:bg-red-100 border border-red-100 rounded-xl transition"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* SISI KANAN: RINGKASAN PEMBAYARAN PREMIUM */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#2c3218] border-b border-[#e6e4dd] pb-3">Ringkasan Faktur Garmen</h4>
              </div>

              {/* Rincian Finansial */}
              <div className="space-y-3 text-xs text-stone-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal Pesanan</span>
                  <span className="text-[#2c3218] font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pajak Industri Garmen (11%)</span>
                  <span className="text-[#2c3218] font-bold">{formatCurrency(luxuryTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pengiriman & Proteksi Kain</span>
                  <span className="text-emerald-600 font-bold uppercase tracking-wider text-[10px]">Complimentary (VIP)</span>
                </div>
                <div className="border-t border-dashed border-[#e6e4dd] pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#2c3218] font-playfair">Total Nilai Transaksi</span>
                  <span className="text-xl font-bold text-[#c97d7d] font-quicksand">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Tombol Secure Checkout */}
              <div className="space-y-3 pt-2">
                <button 
                  onClick={() => navigate("/checkout")} 
                  className="w-full bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold py-4 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 tracking-wide uppercase"
                >
                  Lanjutkan ke Pembayaran Secure <FiArrowRight size={14} />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-medium">
                  <FiLock size={12} /> Terenkripsi Keamanan Bank SSL 256-bit
                </div>
              </div>

            </div>

          </div>
        )}
      </div>

      {/* 3. FOOTER UTAMA */}
      <FooterMember />
    </div>
  );
};

export default KeranjangMember;