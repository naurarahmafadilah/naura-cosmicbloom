import React, { useState, useEffect } from "react";
import { FiLock, FiCheckCircle, FiStar, FiMapPin, FiCreditCard, FiShoppingBag } from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember";
import FooterMember from "../layouts/FooterMember"; // Import Footer terintegrasi

const CheckoutMember = () => {
  // Membaca item aktif yang akan di-checkout dari local storage
  const [checkoutItems, setCheckoutItems] = useState(() => {
    const savedCart = localStorage.getItem("veloura_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // State untuk rating kepuasan layanan asisten mode (1-5)
  const [satisfactionRating, setSatisfactionRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Kalkulasi Finansial
  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const luxuryTax = subtotal * 0.11;
  const total = subtotal + luxuryTax;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(value);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsOrderPlaced(true);
    // Mengosongkan keranjang di local storage setelah sukses order
    localStorage.removeItem("veloura_cart");
  };

  if (isOrderPlaced) {
    return (
      <div className="w-full min-h-screen bg-[#faf9f5] flex flex-col">
        <HeaderMember cartCount={0} wishlistCount={2} />
        
        {/* Konten Utama Sukses */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#e6e4dd] max-w-md w-full text-center space-y-6 shadow-2xl animate-scale-up">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
              <FiCheckCircle size={28} />
            </div>
            <div className="space-y-2">
              <h3 className="font-playfair text-2xl text-[#2c3218]">Pesanan Diterima Atelier</h3>
              <p className="text-xs text-stone-500 leading-relaxed font-light">
                Faktur garmen eksklusif Anda telah diterbitkan. Tim penjahit utama kami akan segera memulai peninjauan anatomi cetak pola kain Anda.
              </p>
            </div>
            <div className="p-4 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] text-left text-[11px] text-stone-600 space-y-1">
              <p><strong>Tingkat Kepuasan Layanan:</strong> {satisfactionRating} / 5 Bintang</p>
              <p><strong>Status Pembayaran:</strong> Keamanan Diamond Terverifikasi</p>
            </div>
            <button onClick={() => window.location.reload()} className="w-full bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold py-3.5 rounded-xl transition">
              Kembali ke Dashboard Privé
            </button>
          </div>
        </div>

        {/* Footer Tetap Ditampilkan di Halaman Sukses */}
        <FooterMember />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] flex flex-col">
      <HeaderMember cartCount={checkoutItems.reduce((acc, item) => acc + item.quantity, 0)} wishlistCount={2} />

      {/* Konten Utama Form Checkout */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 py-10 font-quicksand w-full">
        <h3 className="text-2xl font-normal text-[#2c3218] uppercase tracking-wide font-playfair mb-8">
          Atelier Secure Checkout
        </h3>

        {checkoutItems.length === 0 ? (
          <div className="bg-white border border-[#e6e4dd] rounded-3xl p-12 text-center">
            <p className="text-sm text-stone-500">Tidak ada item dalam antrean manifes checkout garmen Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* SISI KIRI: DETAIL MANIFES CHECKOUT & EVALUASI */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* DETAIL PRODUK YANG DI-CHECKOUT */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100 pb-3">Manifes Garmen Terpilih</h4>
                <div className="divide-y divide-stone-100">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4 items-center justify-between first:pt-0 last:pb-0">
                      <div className="flex gap-4 items-center">
                        <img src={item.image} alt={item.item} className="w-14 h-18 object-cover rounded-lg bg-stone-100 border border-[#e6e4dd]" />
                        <div>
                          <h5 className="text-sm font-medium font-playfair text-[#2c3218] leading-tight">{item.item}</h5>
                          <p className="text-[11px] text-stone-400 mt-0.5">{item.type} • Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-[#2c3218]">{formatCurrency(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DIREKTORI PENGIRIMAN & GARMENT FITTING BOX */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2"><FiMapPin /> Atrium Destinasi Pengiriman</h4>
                <div className="p-4 bg-[#fcfbf9] rounded-2xl border border-[#e6e4dd] text-xs space-y-1.5">
                  <p className="font-bold text-[#2c3218]">Veloura VIP Client Residence</p>
                  <p className="text-stone-500 font-light">Menteng Residence Blok C/12, Jakarta Pusat, 10310</p>
                  <p className="text-stone-400 text-[11px] pt-1">Opsi Kurir: Private Atelier Courier Line (Complimentary)</p>
                </div>
              </div>

              {/* EVALUASI KEPUASAN LAYANAN KONSULTASI DESAINER */}
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c3218]">Tingkat Kepuasan Layanan Concierge</h4>
                  <p className="text-[11px] text-stone-400 mt-1">Berikan penilaian fiting & asisten mode digital Anda demi standardisasi adibusana tinggi kami.</p>
                </div>

                {/* INTERAKSI BINTANG (STAR RATING SYSTEM) */}
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = hoverRating ? star <= hoverRating : star <= satisfactionRating;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setSatisfactionRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="transition-transform duration-150 active:scale-90 focus:outline-none"
                      >
                        <FiStar 
                          size={24} 
                          className={`transition-colors duration-200 ${
                            isFilled 
                              ? "text-amber-400 fill-amber-400" 
                              : "text-stone-300"
                          }`} 
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-stone-500 ml-2">
                    {satisfactionRating === 5 ? "Sempurna (Excellent)" : 
                     satisfactionRating === 4 ? "Sangat Puas" : 
                     satisfactionRating === 3 ? "Cukup Memuaskan" : "Butuh Peningkatan"}
                  </span>
                </div>
              </div>

            </div>

            {/* SISI KANAN: FINALIZE PAYMENT CARD */}
            <div className="bg-white p-6 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2c3218] border-b border-[#e6e4dd] pb-3">Faktur Garmen Akhir</h4>
              </div>

              <div className="space-y-3 text-xs text-stone-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal Manifes</span>
                  <span className="text-[#2c3218] font-bold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pajak Garmen Sutra (11%)</span>
                  <span className="text-[#2c3218] font-bold">{formatCurrency(luxuryTax)}</span>
                </div>
                <div className="border-t border-dashed border-[#e6e4dd] pt-4 flex justify-between items-baseline">
                  <span className="text-sm font-semibold text-[#2c3218] font-playfair">Total Tagihan</span>
                  <span className="text-xl font-bold text-[#c97d7d] font-quicksand">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Secure Trigger Submission */}
              <form onSubmit={handlePlaceOrder} className="space-y-3 pt-2">
                <button type="submit" className="w-full bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold py-4 px-6 rounded-xl transition shadow-md flex items-center justify-center gap-2 uppercase tracking-wide">
                  <FiCreditCard size={14} /> Bayar & Selesaikan Garmen
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-medium">
                  <FiLock size={12} /> Otentikasi Terenkripsi Veloura Privé
                </div>
              </form>
            </div>

          </div>
        )}
      </div>

      {/* Footer Utama */}
      <FooterMember />
    </div>
  );
};

export default CheckoutMember;