import React, { useState } from "react";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ChevronDown,
  Layers,
  Eye,
  Scissors,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState(null);

  // Data produk asli dari user
  const products = [
    {
      "id": "s1",
      "slug": "elegant-evening-dress",
      "name": "Elegant Evening Dress",
      "oldPrice": "350.000",
      "price": "250.000",
      "discount": "30%",
      "img": "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s2",
      "slug": "casual-autumn-shirt",
      "name": "Casual Autumn Shirt",
      "oldPrice": "250.000",
      "price": "180.000",
      "discount": "28%",
      "img": "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s3",
      "slug": "summer-breeze-dress",
      "name": "Summer Breeze Dress",
      "oldPrice": "400.000",
      "price": "300.000",
      "discount": "25%",
      "img": "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop"
    },
    {
      "id": "s4",
      "slug": "minimalist-silk-outfit",
      "name": "Minimalist Silk Outfit",
      "oldPrice": "320.000",
      "price": "270.000",
      "discount": "15%",
      "img": "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-[#eff0ee] text-[#4e5631] selection:bg-[#ab656b] selection:text-white font-sans antialiased">
      
      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#eff0ee]/90 backdrop-blur-md border-b border-[#4e5631]/10">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          
          <div className="cursor-pointer" onClick={() => handleNavigation("/")}>
            <h1 className="text-base md:text-lg font-serif tracking-[0.25em] font-bold text-[#4e5631]">
              VELOURA BOUTIQUE
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-semibold opacity-80">
            <a href="#masalah" className="hover:text-[#ab656b] transition-colors">Dilema</a>
            <a href="#koleksi" className="hover:text-[#ab656b] transition-colors">Koleksi</a>
            <a href="#proses" className="hover:text-[#ab656b] transition-colors">Kualitas</a>
            <a href="#solusi" className="hover:text-[#ab656b] transition-colors">Keunggulan</a>
            <a href="#faq" className="hover:text-[#ab656b] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => handleNavigation("/login")} 
              className="text-xs uppercase tracking-wider font-bold hover:text-[#ab656b] transition-colors cursor-pointer"
            >
              Masuk
            </button>
            <button 
              onClick={() => handleNavigation("/register")}
              className="bg-[#4e5631] text-white text-xs uppercase tracking-widest px-5 py-2.5 rounded-sm font-bold hover:bg-[#ab656b] transition-all cursor-pointer shadow-sm"
            >
              Daftar Member
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-20 px-6 text-center max-w-4xl mx-auto space-y-8">
        
        <div className="inline-flex items-center gap-2 bg-[#ab656b]/10 border border-[#ab656b]/30 px-4 py-1.5 text-[10px] uppercase tracking-widest font-bold text-[#ab656b]">
          <Sparkles size={12} />
          Koleksi Pakaian Kualitas Premium No. 1
        </div>

        <h2 className="text-4xl md:text-6xl font-serif font-normal text-[#4e5631] leading-tight">
          Solusi Terbaik Untuk Penampilan Anda <br />
          Yang Ingin <span className="italic text-[#ab656b] font-light">Tampil Anggun, Elegan & Berkelas.</span>
        </h2>

        <p className="text-sm md:text-base text-[#4e5631]/80 max-w-2xl mx-auto leading-relaxed font-medium">
          Berhenti memakai pakaian pasaran yang membuat Anda terlihat biasa saja di acara penting. Setiap helai koleksi kami dirancang eksklusif dengan potongan *cutting* premium yang menyamarkan kekurangan tubuh, serta menggunakan bahan ternyaman yang langsung terasa mewah begitu menyentuh kulit Anda.
        </p>

        <div className="pt-4">
          <button 
            onClick={() => handleNavigation("/register")}
            className="bg-[#ab656b] text-white text-xs uppercase tracking-widest px-8 py-4 font-bold rounded-sm hover:bg-[#4e5631] transition-all inline-flex items-center gap-3 shadow-md hover:scale-[1.02] duration-300 cursor-pointer"
          >
            Lihat Koleksi Eksklusif Sekarang
            <ArrowRight size={14} />
          </button>
        </div>

        {/* HERO FEATURED IMAGE (Menggunakan Gambar Pertama dari Data Anda) */}
        <div className="pt-10 max-w-3xl mx-auto">
          <div className="bg-[#4e5631] rounded-sm shadow-xl border border-white/5 relative h-[380px] overflow-hidden group">
            <img 
              src={products[0].img} 
              alt="Veloura Premium Banner" 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4e5631] via-transparent to-transparent opacity-90" />
            
            <div className="absolute bottom-0 left-0 w-full p-8 text-center text-[#eff0ee] space-y-2">
              <ShoppingBag className="mx-auto text-[#ab656b]" size={32} />
              <p className="font-serif text-xl md:text-2xl tracking-wide">Signature Collection Lineup</p>
              <p className="text-[10px] uppercase tracking-widest opacity-70">Limited Edition — Hanya Diproduksi Terbatas per Desain</p>
            </div>
          </div>
        </div>

      </section>

      {/* SECTION AGITASI MASALAH */}
      <section id="masalah" className="py-20 px-6 bg-[#4e5631] text-[#eff0ee]">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-[#ab656b] uppercase tracking-widest text-xs font-bold block">Pernahkah Kamu Mengalami Ini?</span>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight">
            Sudah beli baju mahal-mahal tapi pas dipakai malah kelihatan gemuk, bahannya gatal, dan kembar sama orang lain di acara pesta?
          </h2>
          <div className="w-12 h-0.5 bg-[#ab656b] mx-auto my-4"></div>
          <p className="text-sm opacity-80 max-w-2xl mx-auto leading-relaxed">
            Berdasarkan survei, <strong className="text-white text-base">78,4% wanita</strong> sering merasa tidak percaya diri dengan bentuk tubuhnya saat memakai pakaian jadi (*ready-to-wear*) dari mal karena ukuran yang terlalu kaku dan pola jahit massal yang tidak presisi.
          </p>
        </div>
      </section>

      {/* DYNAMIC CATALOG LOOKBOOK SECTION */}
      <section id="koleksi" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-[#ab656b] uppercase tracking-widest text-xs font-bold block">Curated Edition</span>
            <h2 className="font-serif text-3xl text-[#4e5631]">Koleksi Terbaru Bulan Ini</h2>
            <div className="w-12 h-0.5 bg-[#ab656b] mx-auto mt-2"></div>
          </div>

          {/* Grid Responsif Menampilkan 4 Produk Sesuai Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="border border-[#4e5631]/10 bg-[#eff0ee]/20 p-4 rounded-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow group"
              >
                {/* Image Container dengan Label Diskon */}
                <div className="h-72 w-full overflow-hidden rounded-sm relative bg-[#4e5631]">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 right-3 bg-[#ab656b] text-white font-sans text-[10px] font-bold px-2 py-1 tracking-wider uppercase rounded-xs shadow-sm">
                    Save {product.discount}
                  </span>
                </div>

                {/* Informasi Produk */}
                <div className="space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#ab656b]">Veloura Signature</span>
                  <h4 className="font-serif text-base font-bold text-[#4e5631] line-clamp-1">{product.name}</h4>
                  <p className="text-[11px] text-gray-500">Premium *crafted cut* dengan bahan eksklusif bertekstur nyaman.</p>
                  
                  {/* Harga & Harga Coret */}
                  <div className="flex items-center gap-2 pt-2">
                    <p className="font-serif text-sm font-bold text-[#4e5631]">IDR {product.price}</p>
                    <p className="font-sans text-xs text-gray-400 line-through">IDR {product.oldPrice}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEHIND THE ART SECTION */}
      <section id="proses" className="py-20 px-6 bg-[#4e5631] text-[#eff0ee] border-t border-white/10">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <span className="text-[#ab656b] uppercase tracking-widest text-xs font-bold block">Artisanal Craftsmanship</span>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Dibuat Satu Per Satu, Bukan Hasil Mesin Massal.</h2>
            <p className="text-sm opacity-80 leading-relaxed">
              Di Veloura Boutique, kami menolak metode potong kain bertumpuk ala konveksi massal yang merusak simetri pola baju. Setiap helai pakaian Anda ditangani khusus oleh satu penjahit dari awal hingga akhir.
            </p>
          </div>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <Layers className="text-[#ab656b] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-serif font-bold text-base text-white">Double-Stitch Premium</h4>
                <p className="text-xs opacity-70 mt-1">Metode jahit jarum ganda luar-dalam untuk memastikan serat kain terkunci rapi, tidak gampang berwujud benang lepas, dan awet bertahun-tahun.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <Eye className="text-[#ab656b] shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-serif font-bold text-base text-white">QC Butik Sangat Ketat</h4>
                <p className="text-xs opacity-70 mt-1">Kami memeriksa presisi ritsleting, kekuatan kancing, dan simetri kejatuhan kain sebanyak 3 fase sebelum baju dibungkus ke kotak kemasan.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PRODUK BUTIK */}
      <section id="solusi" className="py-20 px-6 bg-white border-b border-[#4e5631]/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 space-y-2">
            <span className="text-[#ab656b] uppercase tracking-widest text-xs font-bold block">Mengapa Belanja Di Veloura Boutique</span>
            <h2 className="font-serif text-3xl text-[#4e5631]">3 Alasan Mengapa Koleksi Kami Terasa Istimewa</h2>
            <div className="w-12 h-0.5 bg-[#ab656b] mx-auto mt-2"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#eff0ee]/30 border border-[#4e5631]/10 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#4e5631] text-white flex items-center justify-center font-serif font-bold mb-4">1</div>
              <h3 className="font-serif text-lg mb-2 text-[#4e5631] font-bold">Cutting Slimming Effect</h3>
              <p className="text-xs text-[#4e5631]/80 leading-relaxed">
                Pola jahitan khusus yang dirancang oleh desainer berpengalaman untuk memberikan ilusi tubuh lebih jenjang, ramping, dan proporsional seketika.
              </p>
            </div>
            <div className="p-6 bg-[#eff0ee]/30 border border-[#4e5631]/10 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#4e5631] text-white flex items-center justify-center font-serif font-bold mb-4">2</div>
              <h3 className="font-serif text-lg mb-2 text-[#4e5631] font-bold">Premium Fabric Selection</h3>
              <p className="text-xs text-[#4e5631]/80 leading-relaxed">
                Kami hanya menggunakan kain kelas dunia seperti sutra murni, katun organik, dan brokat premium yang super adem, jatuh dengan indah, dan tidak menerawang.
              </p>
            </div>
            <div className="p-6 bg-[#eff0ee]/30 border border-[#4e5631]/10 rounded-sm">
              <div className="w-10 h-10 rounded-full bg-[#4e5631] text-white flex items-center justify-center font-serif font-bold mb-4">3</div>
              <h3 className="font-serif text-lg mb-2 text-[#4e5631] font-bold">No Mass-Production</h3>
              <p className="text-xs text-[#4e5631]/80 leading-relaxed">
                Setiap desain hanya diproduksi dalam jumlah yang sangat terbatas. Menjamin eksklusivitas Anda agar tidak perlu khawatir berpapasan dengan motif pakaian yang sama.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL EDITORIAL */}
      <section id="testimoni" className="py-20 px-6 text-center bg-[#eff0ee]/50">
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-[#ab656b] uppercase tracking-widest text-xs font-bold block">Apa Kata Mereka</p>
          <h2 className="font-serif text-2xl text-[#4e5631]">Mereka Yang Telah Membuktikan & Mempercayakan Penampilannya pada Kami</h2>
          
          <span className="text-4xl text-[#ab656b] font-serif block">“</span>
          <h3 className="font-serif text-lg md:text-xl text-[#4e5631] italic font-light leading-relaxed">
            "Awalnya iseng beli satu baju untuk acara kondangan, pas dipakai langsung jadi pusat perhatian karena kain brokatnya mewah banget dan jatuhnya pas di badan. Sekarang kalau mau ada acara semi-formal pasti langsung lari ke Veloura!"
          </h3>
          
          <div className="pt-2">
            <h4 className="font-bold text-sm tracking-widest uppercase">Donna Nelson</h4>
            <p className="text-[11px] text-[#ab656b] font-bold uppercase tracking-wider mt-0.5">Pelanggan Setia Veloura Boutique</p>
          </div>
        </div>
      </section>

      {/* ACCORDION FAQ SECTION */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto">
          
          <h2 className="font-serif text-2xl text-center text-[#4e5631] mb-12">Hal yang Sering Ditanyakan (FAQ)</h2>

          <div className="space-y-4">
            {[
              { q: "Apakah ada garansi kalau ukuran baju tidak muat atau kekecilan?", a: "Tentu saja. Kami memberikan garansi tukar ukuran atau opsi perbaikan (*alteration*) gratis dalam waktu 3 hari setelah pakaian sampai, demi memastikan baju melekat sempurna di tubuh Anda." },
              { q: "Bagaimana cara perawatan kain premium dari butik ini?", a: "Setiap paket pengiriman kami lengkapi dengan kartu panduan instruksi cuci (*care card*) khusus untuk menjaga serat kain dan keaslian warna agar tetap awet bertahun-tahun." },
              { q: "Apakah melayani pengiriman luar kota dan packing kado?", a: "Kami melayani pengiriman ke seluruh Indonesia dengan standar kotak kemasan (*exclusive box*) yang tebal, wangi, dan sangat mewah, siap dijadikan hadiah berkesan." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-[#4e5631]/10 pb-4">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left font-serif text-base text-[#4e5631] py-2 hover:text-[#ab656b] transition-colors cursor-pointer"
                >
                  <span className="font-medium text-sm md:text-base">{faq.q}</span>
                  <ChevronDown size={16} className={`transform transition-transform ${openFaq === idx ? "rotate-180 text-[#ab656b]" : "text-gray-400"}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? "max-h-40 pt-2" : "max-h-0"}`}>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-14">
            <button 
              onClick={() => handleNavigation("/register")}
              className="bg-[#ab656b] text-white text-xs uppercase tracking-widest px-12 py-4 font-bold rounded-sm hover:bg-[#4e5631] transition-all shadow-md hover:scale-[1.02] duration-300 cursor-pointer"
            >
              Beli Sekarang Juga
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER & TRUST BADGES */}
      <footer className="bg-[#4e5631] text-[#eff0ee] pt-12 pb-12 px-6 text-center space-y-8">
        
        <div className="flex flex-wrap justify-center gap-8 text-white/50 border-b border-white/10 pb-8 max-w-2xl mx-auto text-xs">
          <div className="flex items-center gap-2">
            <Scissors size={16} className="text-[#ab656b]" />
            <span>Garansi Alterasi / Tukar Ukuran</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-[#ab656b]" />
            <span>Desain Orisinil Tanpa Plagiasi</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#ab656b]" />
            <span>Pengiriman Aman Berkotak Premium</span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-serif tracking-widest text-base">VELOURA BOUTIQUE</h3>
          <p className="opacity-40 text-[10px] tracking-wider uppercase">
            © 2026 Veloura Boutique Luxury House. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}