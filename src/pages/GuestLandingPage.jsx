import React, { useState } from "react";
import { Search, MapPin, Star, ArrowRight, Sparkles, Trophy, Eye } from "lucide-react";

export default function GuestLandingPage() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const previewKoleksi = [
    {
      id: "c1",
      code: "VEL-092",
      name: "Rio Velvet Evening Gown",
      fabric: "Premium Italian Velvet",
      tier: "Royal Exclusive Access",
      img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "c2",
      code: "VEL-114",
      name: "Aura Brocade Silk Blouse",
      fabric: "French Silk Brocade",
      tier: "Prime & Royal Access",
      img: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "c3",
      code: "VEL-043",
      name: "Venice Gala Tulle Gown",
      fabric: "Luxury Tulle Embroidered",
      tier: "Royal Invitation Only",
      img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600&auto=format&fit=crop",
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#eff0ee] text-primary-dark font-sans antialiased selection:bg-secondary-light/30">
      
      {/* 1. LUXURY FIXED NAVIGATION */}
      <nav className="w-full bg-[#eff0ee]/90 backdrop-blur-md sticky top-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center border-b border-border-subtle/40">
        <div className="flex flex-col text-left">
          <span className="font-playfair text-2xl font-bold tracking-[0.3em] leading-none text-primary-dark">VELOURA</span>
          <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-secondary-light mt-1">HAUTE COUTURE ATELIER</span>
        </div>

        <div className="hidden lg:flex items-center gap-12 text-[11px] font-semibold tracking-[0.2em] uppercase text-primary-dark/80">
          <a href="#" className="text-secondary-dark tracking-[0.2em] relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-secondary-light pb-1">The Atelier</a>
          <a href="#" className="hover:text-secondary-light transition-colors">Galeri Bahan</a>
          <a href="#" className="hover:text-secondary-light transition-colors">Privilese Member</a>
          <a href="#" className="hover:text-secondary-light transition-colors">Arsip Desain</a>
        </div>

        <div className="flex items-center gap-6">
          <button type="button" className="text-[11px] font-bold tracking-[0.15em] uppercase hover:text-secondary-light transition-colors">Masuk</button>
          <button type="button" className="bg-primary-dark text-bg-soft text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 rounded-none hover:bg-hover-green transition-all shadow-lg">
            Daftar Member
          </button>
        </div>
      </nav>

      {/* 2. THE EDITORIAL HERO CANVAS (ASIMETRIS & MEWAH) */}
      <header className="w-full min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-border-subtle bg-white relative">
        
        {/* Kolom Kiri: Pernyataan Seni & Kurasi */}
        <div className="lg:col-span-5 p-6 md:p-16 flex flex-col justify-between space-y-12 bg-[#f5eded]/50">
          <div className="space-y-2 text-left">
            <span className="text-[10px] font-bold tracking-[0.3em] text-secondary-light uppercase block">VELOURA GUEST PORTAL</span>
            <div className="w-12 h-[1px] bg-secondary-light/50 my-4" />
          </div>

          <div className="space-y-6 text-left my-auto">
            <h1 className="text-4xl md:text-[3.5rem] font-playfair font-normal text-primary-dark leading-[1.1] tracking-tight">
              Keanggunan <br />
              <span className="italic font-light text-primary-light">Yg Dipersonalisasi.</span>
            </h1>
            <p className="text-xs md:text-sm text-primary-dark/70 leading-relaxed max-w-sm font-light">
              Selamat datang di gerbang utama Veloura. Platform pratinjau kain eksklusif dan siluet gaun malam sebelum Anda melangkah masuk menjadi bagian dari *Private Member Club* kami.
            </p>
          </div>

          {/* Akses Cepat Navigasi Internal */}
          <div className="border-t border-border-subtle pt-6 flex justify-between items-center text-left">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary-dark/40">Status Kunjungan</p>
              <p className="text-xs font-bold tracking-wider text-secondary-dark uppercase mt-0.5">Tamu Non-Klub (Akses Terbatas)</p>
            </div>
            <span className="text-xs font-mono text-primary-light">CR-2026 // EDITION</span>
          </div>
        </div>

        {/* Kolom Tengah: Visual Editorial Utama */}
        <div className="lg:col-span-4 relative min-h-[400px] lg:min-h-0 overflow-hidden bg-primary-dark/5">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" 
            alt="Veloura Haute Couture Visual" 
            className="w-full h-full object-cover object-center grayscale-[15%] contrast-[102%] hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
        </div>

        {/* Kolom Kanan: Panel Pencarian & Eksplorasi Interaktif */}
        <div className="lg:col-span-3 p-6 md:p-10 flex flex-col justify-center bg-white border-l border-border-subtle/50 text-left">
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[9px] font-bold tracking-[0.2em] text-secondary-light uppercase">01 / INSPEKSI LAYANAN</span>
              <h3 className="font-playfair text-xl text-primary-dark tracking-wide">Mulai Penelusuran</h3>
            </div>

            {/* Pencarian dengan Style Input Minimalis Kelas Atas */}
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-primary-dark/60 block">Pilih Estetika</label>
                <select 
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  className="w-full py-3 bg-transparent text-xs text-primary-dark border-b border-primary-dark/20 focus:outline-none focus:border-secondary-light font-medium tracking-wide transition-colors uppercase"
                >
                  <option value="">Semua Kategori</option>
                  <option value="Gaun">Gaun Malam VIP</option>
                  <option value="Kutur">Haute Couture Khusus</option>
                  <option value="Kain">Bahan &amp; Tekstil Sutra</option>
                </select>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] uppercase tracking-widest font-semibold text-primary-dark/60 block">Kata Kunci Siluet</label>
                <div className="flex items-center border-b border-primary-dark/20 focus-within:border-secondary-light transition-colors pb-1">
                  <input 
                    type="text" 
                    placeholder="Cari Silk, Blazer, Velvet..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    className="w-full bg-transparent text-xs text-primary-dark focus:outline-none placeholder-primary-dark/30 tracking-wide"
                  />
                  <Search size={14} className="text-primary-light" />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary-dark text-bg-soft text-xs font-bold uppercase tracking-widest py-4 hover:bg-hover-green transition-all shadow-md">
                Amati Arsip Veloura
              </button>
            </form>

            <div className="bg-bg-main p-4 border border-border-subtle/60 space-y-2 mt-4">
              <div className="flex items-center gap-2 text-secondary-light">
                <Sparkles size={12} />
                <span className="text-[9px] font-bold tracking-widest uppercase">Catatan Kurator</span>
              </div>
              <p className="text-[11px] text-primary-dark/70 leading-relaxed">
                Akses pemesanan kain dan penentuan jadwal fitting jahit eksklusif hanya terbuka penuh bagi pemilik akun terverifikasi.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 3. THE PRIVATE GALLERY PREVIEW (GRID EDITORIAL MAJALAH) */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 py-28 space-y-20">
        
        {/* Header Seksi yang Bersih */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-b border-border-subtle pb-8">
          <div className="lg:col-span-8 space-y-3 text-left">
            <span className="text-xs font-bold tracking-[0.25em] text-secondary-light uppercase block">// THE PREVIEW GALLERY</span>
            <h2 className="text-3xl md:text-[2.5rem] font-playfair tracking-wide text-primary-dark leading-none">
              Pratinjau Karya Adibusana Terbatas
            </h2>
          </div>
          <div className="lg:col-span-4 text-left lg:text-right">
            <p className="text-xs text-primary-dark/50 leading-relaxed max-w-sm lg:ml-auto">
              Tampilan kurasi potongan gaun dan material tekstil impor terbaik dunia yang sedang dikerjakan minggu ini di ruang jahit utama kami.
            </p>
          </div>
        </div>

        {/* Card Eksklusif Bertipe Minimalis Editorial */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {previewKoleksi.map((item) => (
            <div key={item.id} className="group flex flex-col space-y-6 text-left">
              {/* Image Container */}
              <div className="aspect-[2/3] w-full bg-[#f5eded] overflow-hidden relative border border-border-subtle/50">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover filter brightness-[97%] group-hover:scale-102 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 text-[9px] font-mono tracking-widest text-primary-dark uppercase">
                  {item.code}
                </div>
              </div>

              {/* Detail Teks */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-secondary-light text-[9px] font-bold tracking-widest uppercase">
                  <span>{item.tier}</span>
                </div>
                <h3 className="font-playfair text-xl text-primary-dark font-medium group-hover:text-secondary-dark transition-colors duration-300">
                  {item.name}
                </h3>
                
                <div className="flex justify-between items-center text-xs text-primary-dark/60 pt-2 border-t border-border-subtle/30">
                  <span className="font-medium flex items-center gap-1">
                    <MapPin size={11} className="text-secondary-light" /> {item.fabric}
                  </span>
                  <div className="flex items-center gap-0.5 text-secondary-light">
                    {[...Array(5)].map((_, i) => <Star key={i} size={9} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. PRIVATE MEMBERSHIP CALL-TO-ACTION CANVAS */}
      <section className="w-full bg-white border-t border-border-subtle py-28 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Sisi Kiri: Alasan Upgrade */}
          <div className="lg:col-span-5 space-y-8 text-left">
            <div className="space-y-3">
              <span className="text-xs font-bold tracking-[0.25em] text-secondary-light uppercase block">EXCLUSIVE PRIVILEGES</span>
              <h2 className="text-3xl md:text-[2.6rem] font-playfair text-primary-dark leading-tight">
                Buka Seluruh Akses <br />
                Atelier Bersama Kami
              </h2>
            </div>
            
            <p className="text-xs md:text-sm text-primary-dark/70 leading-relaxed font-light">
              Sebagai tamu, pandangan Anda terbatas pada katalog pameran umum. Bergabunglah dengan keanggotaan privat Veloura untuk menikmati hak kustomisasi ukuran digital, konsultasi tatap muka desainer, dan pemesanan slot jahit adibusana utama.
            </p>

            <div className="pt-2">
              <button type="button" className="inline-flex items-center gap-3 bg-primary-dark text-bg-soft text-xs font-bold tracking-widest uppercase px-8 py-4 hover:bg-hover-green transition-all shadow-xl">
                Pelajari Benefit Member <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Sisi Kanan: Kartu Paket yang Mewah */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { level: "Classic", icon: <Eye size={14} />, desc: "Akses dasar galeri bahan baku & pratinjau siluet gaun baru." },
              { level: "Prime", icon: <Trophy size={14} />, desc: "Prioritas slot jahit artisan, arsip desain kustom, & konsultasi dasar." },
              { level: "Royal", icon: <Sparkles size={14} />, desc: "Akses privat kain langka Eropa, desainer utama, & jaminan pas jahit VIP." }
            ].map((tier, idx) => (
              <div key={idx} className="bg-[#f5eded]/40 border border-border-subtle p-6 flex flex-col justify-between h-[220px] hover:bg-white hover:shadow-veloura transition-all duration-300">
                <div className="space-y-3">
                  <div className="w-7 h-7 bg-primary-dark text-bg-soft flex items-center justify-center rounded-none text-xs">
                    {tier.icon}
                  </div>
                  <h4 className="font-playfair text-lg text-primary-dark font-medium tracking-wide">Veloura {tier.level}</h4>
                </div>
                <p className="text-[11px] text-primary-dark/60 leading-relaxed">
                  {tier.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}