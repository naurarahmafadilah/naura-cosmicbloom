import React, { useState, useEffect } from "react";
import { 
  FiCalendar, FiMapPin, FiArrowRight, FiTag, 
  FiHeart, FiGift, FiAward, FiShoppingBag, 
  FiX, FiCheckCircle, FiEye 
} from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember";
import FooterMember from "../layouts/FooterMember";

const MemberDashboard = () => {
  // State untuk menyimpan data user yang sedang login
  const [currentUser, setCurrentUser] = useState(null);

  // State Metrik & Interaksi
  const [wishlistCount, setWishlistCount] = useState(2);
  const [cartCount, setCartCount] = useState(0);
  const [memberPoints, setMemberPoints] = useState(2450);
  const [totalTransactions] = useState(12);
  
  // State Modal Quick View & Toast
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  // Mengambil data user dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Gagal membaca sesi user:", error);
      }
    }
  }, []);

  const [saleProducts] = useState([
    { id: "s1", name: "Amour Silk Evening Gown", oldPrice: "7.500.000", price: "5.250.000", discount: "30%", description: "Gaun malam sutra premium dengan potongan elegan yang mengikuti siluet tubuh secara anggun. Cocok untuk gala dinner dan acara formal VIP.", material: "100% Mulberry Silk", fit: "Slim Fit - Custom Tailored", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=600" },
    { id: "s2", name: "Elysian Linen Blazer", oldPrice: "4.200.000", price: "3.200.000", discount: "24%", description: "Blazer kasual-formal berstruktur tegas yang dibuat dari rami linen pilihan. Memberikan sirkulasi udara maksimal dengan estetika quiet luxury yang kuat.", material: "Organic Heritage Linen", fit: "Relaxed Structured", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=600" },
    { id: "s3", name: "Sienna Satin Slip Dress", oldPrice: "5.100.000", price: "4.200.000", discount: "17%", description: "Slip dress minimalis bernuansa warm-earth yang memantulkan kilau lembut satin premium saat terkena cahaya. Sangat luwes untuk gaya day-to-night.", material: "Ultra-soft Liquid Satin", fit: "Fluid Slip Fit", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=600" },
    { id: "s4", name: "Monarch Velvet Accent", oldPrice: "4.500.000", price: "3.800.000", discount: "15%", description: "Outerwear dengan tekstur beludru kelas tinggi yang menambahkan impresi megah seketika pada busana basic Anda. Jahitan tepi eksklusif buatan tangan.", material: "Royal Velvet Brocade", fit: "Structured Silhouette", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=600" }
  ]);

  // Fungsi Tambah Ke Keranjang
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
    setMemberPoints(prev => prev + 150); 
    
    setToastMessage(`Sukses memasukkan "${product.name}" ke keranjang Atelier Anda.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  // Fungsi Tambah Ke Wishlist
  const handleToggleWishlist = (product, e) => {
    e.stopPropagation();
    setWishlistCount(prev => prev + 1);
    setToastMessage(`Koleksi "${product.name}" disimpan ke galeri inspirasi Anda.`);
    setTimeout(() => setToastMessage(""), 4000);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] relative flex flex-col">
      {/* Toast Notification Premium */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2c3218] border border-white/10 text-white px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in max-w-sm backdrop-blur-md">
          <FiCheckCircle className="text-[#f7d6d6] text-xl shrink-0" />
          <p className="text-xs font-quicksand font-medium leading-relaxed">{toastMessage}</p>
        </div>
      )}

      {/* Header Premium Utama */}
      <HeaderMember cartCount={cartCount} wishlistCount={wishlistCount} /> 
      
      {/* Konten Utama Dashboard */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 py-10 space-y-10 font-quicksand text-[#2c3218] w-full">
        
        {/* LUXURY BANNER ARCHETYPE */}
        <section className="w-full bg-gradient-to-br from-[#2c3218] via-[#3a3f24] to-[#1e2210] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="space-y-5 max-w-2xl z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-[#fcfbf9] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
              ✨ Haute Couture Private Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal font-playfair tracking-wide leading-tight">
              Selamat Datang Kembali, <br />
              {/* Nama berubah dinamis sesuai data user login */}
              <span className="text-[#f7d6d6] font-light italic block mt-1">
                {currentUser?.name || "VIP Member"}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light max-w-xl leading-relaxed">
              Akses kurasi eksklusif busana musim ini, kelola detail cetak pola fitting personal garmen Anda, dan nikmati layanan prioritas asisten mode utama kami.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-full lg:w-80 relative overflow-hidden shadow-2xl z-10">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#c97d7d]"></div>
            <span className="text-[10px] text-[#f7d6d6] uppercase tracking-widest font-bold block">Agenda Fitting Terdekat</span>
            <h3 className="text-lg font-normal mt-1 text-white font-playfair">Veloura Private Trunk Show</h3>
            <div className="mt-4 space-y-3 text-xs text-stone-300 font-light">
              <div className="flex items-center gap-2"><FiMapPin className="text-[#c97d7d]" size={13}/> VIP Suite Room - Main Atelier</div>
              <div className="flex items-center gap-2"><FiCalendar className="text-[#c97d7d]" size={13}/> Kamis, 25 Juni 2026</div>
            </div>
          </div>
        </section>

        {/* METRICS & LOYALTY GRID */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] shadow-xs flex items-center justify-between hover:border-stone-400 transition duration-300">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Maison Tier Status</span>
              <p className="text-xl font-normal font-playfair text-[#2c3218] mt-1">Gold Insignia</p>
              <span className="text-[11px] text-[#c97d7d] font-semibold mt-1 inline-block">Top 5% Elite Client</span>
            </div>
            <div className="w-12 h-12 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#e6e4dd] text-xl text-[#c97d7d]"><FiAward /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] shadow-xs flex flex-col justify-between hover:border-stone-400 transition duration-300 min-h-[110px]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Veloura Privé Points</span>
                <p className="text-2xl font-bold font-playfair text-[#2c3218] mt-0.5">{memberPoints.toLocaleString()} <span className="text-xs font-quicksand font-normal text-stone-500">Pts</span></p>
              </div>
              <div className="w-12 h-12 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#e6e4dd] text-xl text-[#c97d7d]"><FiGift /></div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                <span>Progress ke Diamond</span>
                <span>81%</span>
              </div>
              <div className="w-full bg-[#faf9f5] h-1.5 rounded-full border border-[#e6e4dd] overflow-hidden">
                <div className="bg-[#3a3f24] h-full rounded-full transition-all duration-500" style={{ width: "81%" }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] shadow-xs flex items-center justify-between hover:border-stone-400 transition duration-300">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Atelier Basket</span>
              <p className="text-2xl font-bold font-playfair text-[#2c3218] mt-0.5">{cartCount} <span className="text-xs font-quicksand font-normal text-stone-500">Item</span></p>
              <span className="text-[11px] text-[#3a3f24] font-medium inline-block mt-1">Siap Menuju Checkout</span>
            </div>
            <div className="w-12 h-12 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#e6e4dd] text-xl text-[#3a3f24]"><FiShoppingBag /></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#e6e4dd] shadow-xs flex items-center justify-between hover:border-stone-400 transition duration-300">
            <div>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">Wishlist Terpanau</span>
              <p className="text-2xl font-bold font-playfair text-[#2c3218] mt-0.5">{wishlistCount} <span className="text-xs font-quicksand font-normal text-stone-500">Koleksi</span></p>
              <span className="text-[11px] text-stone-400 mt-1 inline-block">Galeri Terkurasi</span>
            </div>
            <div className="w-12 h-12 bg-[#faf9f5] rounded-xl flex items-center justify-center border border-[#e6e4dd] text-xl text-[#c97d7d]"><FiHeart /></div>
          </div>
        </section>

        {/* LOOKBOOK INTERAKTIF */}
        <section className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e6e4dd] space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e6e4dd] pb-6 gap-4">
            <div>
              <h3 className="text-xl font-normal text-[#2c3218] uppercase tracking-wide font-playfair">Veloura Lookbook Selection</h3>
              <p className="text-xs text-stone-400 mt-1">Katalog penawaran premium terkurasi terbatas hanya untuk pemegang hak akses utama.</p>
            </div>
            <span className="bg-[#f7d6d6]/40 text-[#a35c5c] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-[#e6e4dd]">
              <FiTag size={12}/> Exclusive Member Pricing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {saleProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-[#e6e4dd] overflow-hidden hover:shadow-xl hover:border-stone-400 transition-all duration-500 flex flex-col justify-between">
                
                <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 bg-[#c97d7d] text-white text-[10px] font-bold px-3 py-1 rounded-md tracking-wider shadow-md">{product.discount} OFF</span>
                  
                  <button 
                    onClick={(e) => handleToggleWishlist(product, e)}
                    className="absolute top-4 right-4 p-2.5 bg-white/80 backdrop-blur-md text-stone-600 hover:text-rose-500 rounded-full shadow-md transition z-10"
                  >
                    <FiHeart size={14} />
                  </button>

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-sm text-[#2c3218] text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <FiEye size={14} /> Lihat Detail
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow bg-white">
                  <div>
                    <h4 className="text-sm font-medium text-[#2c3218] font-playfair tracking-wide group-hover:text-[#c97d7d] transition-colors cursor-pointer" onClick={() => setSelectedProduct(product)}>{product.name}</h4>
                    <p className="text-[10px] text-stone-400 tracking-wider mt-1 uppercase font-bold">Limited Atelier Run</p>
                  </div>
                  
                  <div className="flex items-baseline justify-between pt-4 mt-5 border-t border-stone-100">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-stone-400 line-through">Rp {product.oldPrice}</span>
                      <span className="text-base font-bold text-[#2c3218]">Rp {product.price}</span>
                    </div>
                    <button 
                      onClick={(e) => handleAddToCart(product, e)}
                      className="p-3 bg-[#faf9f5] text-[#2c3218] hover:bg-[#3a3f24] hover:text-white rounded-xl transition-all duration-300 border border-[#e6e4dd] flex items-center justify-center"
                    >
                      <FiShoppingBag size={14} />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer Utama */}
      <FooterMember />

      {/* QUICK VIEW DETAILS MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300">
          <div className="bg-[#faf9f5] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl border border-[#e6e4dd] flex flex-col md:flex-row relative animate-scale-up">
            
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-stone-700 shadow-md transition"
            >
              <FiX size={18} />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[450px] bg-stone-200">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between font-quicksand text-[#2c3218]">
              <div className="space-y-4">
                <div>
                  <span className="bg-[#c97d7d]/10 text-[#c97d7d] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">{selectedProduct.discount} ATELIER PRIVILEGE</span>
                  <h3 className="text-2xl font-normal font-playfair text-[#2c3218] mt-2 leading-tight">{selectedProduct.name}</h3>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-xl font-bold text-[#2c3218]">Rp {selectedProduct.price}</span>
                  <span className="text-xs text-stone-400 line-through">Rp {selectedProduct.oldPrice}</span>
                </div>

                <p className="text-xs text-stone-600 font-light leading-relaxed">{selectedProduct.description}</p>

                <div className="pt-2 space-y-1.5 text-xs text-stone-500 border-t border-stone-200/60">
                  <p><strong className="text-stone-700 font-medium">Material:</strong> {selectedProduct.material}</p>
                  <p><strong className="text-stone-700 font-medium">Fitting Blueprint:</strong> {selectedProduct.fit}</p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button 
                  onClick={(e) => { handleAddToCart(selectedProduct, e); setSelectedProduct(null); }}
                  className="flex-1 bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  <FiShoppingBag size={14} />
                  <span>Masukkan Keranjang</span>
                </button>
                <button 
                  onClick={(e) => { handleToggleWishlist(selectedProduct, e); setSelectedProduct(null); }}
                  className="p-3.5 bg-white border border-[#e6e4dd] text-stone-600 hover:text-rose-500 hover:border-stone-400 rounded-xl transition shadow-xs"
                >
                  <FiHeart size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDashboard;