import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

// IMPORT LAYOUT & KOMPONEN INTERNAL YANG TERSEDIA
import DashboardContainer from "../components/DashboardContainer";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import Footer from "../components/Footer";

const Collection = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    tag: "Everyday",
    img: ""
  });

  const [collections, setCollections] = useState([
    {
      name: "Casual Style",
      desc: "Kenyamanan dalam kesederhanaan modern.",
      img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop",
      tag: "Everyday"
    },
    {
      name: "Elegant Dress",
      desc: "Kilau kemewahan untuk momen berhargamu.",
      img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop",
      tag: "Evening"
    },
    {
      name: "Summer Outfit",
      desc: "Sentuhan ceria untuk hari yang cerah.",
      img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop",
      tag: "Vacation"
    }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.desc) return;

    const newCollection = {
      ...formData,
      img: formData.img || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
    };

    setCollections([...collections, newCollection]);
    setFormData({ name: "", desc: "", tag: "Everyday", img: "" });
    setShowForm(false);
  };

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">
        
        {/* TOP CONTROL BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <PageHeader
              title="Our Collection"
              breadcrumb={[
                { label: "Beranda", link: "/" },
                { label: "Collection" }
              ]}
            />
          </div>
          
          <div className="flex items-center gap-3 font-quicksand">
            <button className="px-5 py-2.5 bg-white border border-border-subtle rounded-full text-xs font-bold text-secondary-dark/80 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 cursor-pointer">
              Pengaturan Layout
            </button>
            <button 
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-2.5 bg-primary-dark text-white rounded-full text-xs font-bold tracking-wider hover:bg-hover-green shadow-veloura transition-all duration-300 cursor-pointer"
            >
              {showForm ? "Tutup Form Kontrol" : "+ Rilis Koleksi Baru"}
            </button>
          </div>
        </div>

        {/* FORM INPUT DATA BARU DENGAN EMULASI GLASSMORPHISM VELOURA */}
        {showForm && (
          <div className="bg-white p-8 rounded-[30px] border border-primary-light/20 shadow-[0_20px_50px_rgba(78,86,49,0.06)] animate-fade-in">
            <div className="border-b border-border-subtle pb-4 mb-6">
              <h3 className="text-lg font-bold font-playfair text-primary-dark">Arsip Master Koleksi</h3>
              <p className="text-xs text-primary-dark/50 font-quicksand">Daftarkan konsep tema atau pagelaran busana terbaru ke dalam database interface internal.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nama Tema Koleksi" name="name" placeholder="Contoh: Midnight Silk" value={formData.name} onChange={handleInputChange} required />
                <InputField label="Deskripsi Kampanye / Tema" name="desc" placeholder="Contoh: Gabungan potongan minimalis..." value={formData.desc} onChange={handleInputChange} required />
                <SelectField 
                  label="Tag Klasifikasi Sesi" 
                  name="tag" 
                  value={formData.tag} 
                  onChange={handleInputChange} 
                  options={[
                    { value: "Everyday", label: "Everyday (Casual)" }, 
                    { value: "Evening", label: "Evening (Formal)" },
                    { value: "Vacation", label: "Vacation (Resort)" },
                    { value: "Limited", label: "Limited Edition" }
                  ]} 
                />
                <InputField label="Aset Gambar Utama (URL)" name="img" placeholder="https://images.unsplash.com/photo-..." value={formData.img} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end gap-3 pt-2 font-quicksand">
                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle transition-colors cursor-pointer">
                  Batalkan Prosedur
                </button>
                <button type="submit" className="px-5 py-2 bg-secondary-light text-white rounded-xl text-xs font-bold hover:bg-hover-rose shadow-sm transition-colors cursor-pointer">
                  Simpan Ke Katalog
                </button>
              </div>
            </form>
          </div>
        )}

        {/* FEATURED HERO BANNER CARD (WITH HOVER GLOW EFFECT) */}
        <section className="relative group overflow-hidden rounded-[35px] bg-white border border-primary-light/10 shadow-veloura transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(78,86,49,0.12)] hover:border-primary-light/30">
          <div className="grid md:grid-cols-12 items-center">
            <div className="md:col-span-5 h-[400px] overflow-hidden border-r border-border-subtle relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop"
                alt="Autumn Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-primary-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="md:col-span-7 p-12 relative">
              <span className="absolute top-8 right-12 font-accent text-6xl text-bg-soft opacity-40 select-none transition-transform duration-700 group-hover:translate-x-2">Veloura</span>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-mono font-bold bg-bg-soft border border-border-subtle text-primary-dark/60 px-2 py-0.5 rounded">ID: HERO_COL_01</span>
                <p className="text-[10px] tracking-[5px] uppercase font-bold text-secondary-light">New Arrival 2026</p>
              </div>

              <h2 className="text-4xl sm:text-5xl font-playfair text-primary-dark leading-[1.1] mb-4">
                Autumn <span className="italic text-secondary-light group-hover:text-hover-rose transition-colors duration-300">Collection</span>
              </h2>

              <p className="text-primary-dark/70 font-quicksand text-sm leading-relaxed mb-6 max-w-xl">
                Membawa kehangatan warna tanah ke dalam lemari pakaian Anda. Temukan potongan timeless yang mendefinisikan ulang arti elegan musim ini.
              </p>

              <div className="flex items-center gap-3 font-quicksand">
                <button className="px-8 py-3 bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-hover-green hover:shadow-md transition-all cursor-pointer">
                  Explore Collection
                </button>
                <button className="px-4 py-3 border border-border-subtle text-primary-dark/70 rounded-full text-xs font-semibold hover:bg-bg-soft transition-all cursor-pointer">
                  Ganti Gambar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTION LIST GRID (WITH SMOOTH 3D LIFT HOVER EFFECT) */}
        <section className="bg-white p-8 rounded-[35px] border border-primary-light/10 shadow-veloura">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-2xl font-playfair text-primary-dark">Browse by Theme</h3>
              <p className="text-xs text-primary-dark/50 font-quicksand mt-0.5">Kelola kluster tema produk yang tampil di sistem navigasi</p>
            </div>
            <div className="h-1 w-12 bg-secondary-light/20 rounded-full hidden sm:block"></div>
          </div>

          {/* List Row dengan Premium Hover */}
          <div className="space-y-4">
            {collections.map((item, i) => (
              <div 
                key={i} 
                className="group/card flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-bg-soft/30 rounded-2xl border border-transparent hover:bg-white hover:border-primary-light/20 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(78,86,49,0.05)] transition-all duration-500 ease-out"
              >
                
                {/* Sisi Kiri: Info Card */}
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-primary-dark/30 font-bold hidden sm:block transition-colors group-hover/card:text-secondary-light">0{i+1}</span>
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-border-subtle flex-shrink-0 shadow-inner">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                    />
                    <span className="absolute bottom-1 left-1 bg-primary-dark/90 text-white text-[8px] px-1.5 py-0.5 rounded font-mono tracking-wider">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-playfair text-primary-dark group-hover/card:text-secondary-light transition-colors duration-300">
                      {item.name}
                    </h4>
                    <p className="text-xs text-primary-dark/60 font-quicksand mt-1 max-w-md">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Sisi Rianan: Tombol Aksi Kontrol */}
                <div className="flex items-center gap-2 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-border-subtle lg:border-t-0 justify-end font-quicksand opacity-90 lg:opacity-60 group-hover/card:opacity-100 transition-opacity duration-300">
                  <button className="px-4 py-2 text-primary-dark border border-border-subtle rounded-xl text-xs font-bold hover:bg-bg-soft transition-all cursor-pointer">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-white border border-border-subtle text-secondary-dark rounded-xl text-xs font-bold hover:border-secondary-light/40 hover:text-secondary-light hover:shadow-sm transition-all cursor-pointer">
                    Edit Konten
                  </button>
                  <button className="p-2 text-primary-dark/30 hover:text-error transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* MARKETING CONTROL BAR / NEWSLETTER INTEGRATION */}
        <section className="bg-primary-dark text-white rounded-[35px] p-8 lg:p-12 border border-transparent shadow-veloura flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-light animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">Modul Integrasi CRM</span>
            </div>
            <h3 className="text-2xl font-playfair mb-1">Be the first to know</h3>
            <p className="text-xs text-white/60 font-quicksand">Modul pengumpulan email newsletter pelanggan dari halaman depan beranda.</p>
          </div>

          <div className="flex w-full lg:max-w-md gap-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              disabled
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/5 outline-none text-xs font-quicksand text-white/40 cursor-not-allowed opacity-60"
            />
            <button className="bg-white text-primary-dark px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-bg-soft shadow-sm transition-all flex-shrink-0 cursor-pointer">
              Lihat Database Email
            </button>
          </div>
        </section>

        {/* GLOBAL INTEGRATED FOOTER */}
        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Collection;