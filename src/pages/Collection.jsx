import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI
// ==========================================
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";

// IMPORT IKON UNTUK NOTIFIKASI
import { FiCheckCircle, FiInfo, FiAlertCircle } from "react-icons/fi";

// ==========================================
// 2. LAYOUT & COMPONENTS EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

// FILE JSON YANG DIPISAHKAN
import initialCollections from "../data/collectionsData.json"; 

const Collection = () => {
  const navigate = useNavigate();
  
  // State Utama Data Koleksi
  const [collections, setCollections] = useState(initialCollections);
  
  // State Management Form & Dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    tag: "Everyday",
    img: ""
  });

  // State Management untuk Floating Alert Web
  const [alerts, setAlerts] = useState([]);

  // Fungsi memicu munculnya alert kustom
  const triggerAlert = (message, type = "success") => {
    const id = Date.now();
    setAlerts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, 3500);
  };

  // Fungsi membuka form untuk "Tambah Koleksi Baru"
  const handleOpenCreateModal = () => {
    setIsEditMode(false);
    setEditIndex(null);
    setFormData({ name: "", desc: "", tag: "Everyday", img: "" });
    setIsDialogOpen(true);
  };

  // Fungsi membuka form untuk "Edit Konten" (Data otomatis terisi)
  const handleOpenEditModal = (item, index) => {
    setIsEditMode(true);
    setEditIndex(index);
    setFormData({
      name: item.name,
      desc: item.desc,
      tag: item.tag || "Everyday",
      img: item.img
    });
    setIsDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler Submit Tunggal (Bisa membedakan Save Baru vs Update Edit)
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.desc) return;

    const fallbackImg = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80";
    
    if (isEditMode && editIndex !== null) {
      // PROSES UPDATE DATA (EDIT MODE)
      const updatedCollections = [...collections];
      updatedCollections[editIndex] = {
        ...formData,
        img: formData.img.trim() !== "" ? formData.img : fallbackImg
      };
      setCollections(updatedCollections);
      triggerAlert(`Perubahan pada "${formData.name}" berhasil disimpan!`, "success");
    } else {
      // PROSES TAMBAH DATA BARU
      const newCollection = {
        ...formData,
        img: formData.img.trim() !== "" ? formData.img : fallbackImg
      };
      setCollections([...collections, newCollection]);
      triggerAlert(`Koleksi "${newCollection.name}" sukses diterbitkan!`, "success");
    }

    setIsDialogOpen(false); 
  };

  const handleDeleteCollection = (index, name) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus koleksi "${name}"?`)) {
      const updated = collections.filter((_, i) => i !== index);
      setCollections(updated);
      triggerAlert(`Koleksi "${name}" telah dihapus dari sistem.`, "error");
    }
  };

  // Handler interaktif pelengkap lainnya
  const handleLayoutConfig = () => triggerAlert("Membuka konfigurasi tata letak...", "info");
  const handleChangeHeroImage = () => triggerAlert("Media library berhasil dimuat.", "info");
  const handleViewEmailDatabase = () => triggerAlert("Database pelanggan CRM berhasil disinkronkan.", "success");

  const generateSlug = (name) => name.toLowerCase().replace(/ /g, "-");

  return (
    <DashboardContainer>
      {/* FLOATING TOAST ALERT */}
      <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-2xl shadow-xl border flex items-start gap-3 animate-slide-in pointer-events-auto backdrop-blur-md transition-all ${
              alert.type === "success" 
                ? "bg-emerald-50/95 border-emerald-500/20 text-emerald-900" 
                : alert.type === "error"
                ? "bg-rose-50/95 border-rose-500/20 text-rose-900"
                : "bg-amber-50/95 border-amber-500/20 text-amber-950"
            }`}
          >
            {alert.type === "success" && <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
            {alert.type === "error" && <FiAlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
            {alert.type === "info" && <FiInfo className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
            <div className="text-xs font-medium font-quicksand leading-relaxed">{alert.message}</div>
          </div>
        ))}
      </div>

      <div className="space-y-12 animate-fade-in pb-10 text-primary-dark relative z-10">
        
        {/* TOP CONTROL BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6 relative z-20">
          <div>
            <PageHeader
              title="Our Collection"
              breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Collection" }]}
            />
          </div>
          
          <div className="flex items-center gap-3 font-quicksand relative z-30">
            <button 
              onClick={handleLayoutConfig}
              className="px-5 py-2.5 bg-white border border-border-subtle rounded-full text-xs font-bold text-secondary-dark/80 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 cursor-pointer"
            >
              Pengaturan Layout
            </button>

            {/* INTEGRASI DIALOG SHADCN MULTIFUNGSI (TAMBAH & EDIT) */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <button 
                onClick={handleOpenCreateModal}
                className="px-5 py-2.5 bg-primary-dark text-white rounded-full text-xs font-bold tracking-wider hover:bg-hover-green shadow-veloura transition-all duration-300 cursor-pointer"
              >
                + Rilis Koleksi Baru
              </button>
              
              <DialogContent className="sm:max-w-[520px] rounded-3xl bg-white p-6 border border-border-subtle shadow-xl !z-[99999]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-playfair text-primary-dark">
                    {isEditMode ? "Ubah Data Koleksi" : "Arsip Master Koleksi"}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-400 font-quicksand">
                    {isEditMode 
                      ? "Modifikasi data kampanye visual ritel busana yang sudah terdaftar di database."
                      : "Daftarkan konsep tema atau pagelaran busana terbaru ke dalam database interface internal."}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-5 pt-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Nama Tema Koleksi</label>
                    <Input 
                      name="name" 
                      placeholder="Contoh: Midnight Silk" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Deskripsi Kampanye / Tema</label>
                    <Input 
                      name="desc" 
                      placeholder="Contoh: Gabungan potongan minimalis..." 
                      value={formData.desc} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Tag Klasifikasi Sesi</label>
                    <Select 
                      value={formData.tag}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, tag: value }))}
                    >
                      <SelectTrigger className="w-full rounded-xl border-border-subtle focus:ring-primary-light bg-white text-sm text-left">
                        <SelectValue placeholder="Pilih Tag Sesi" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-xl shadow-lg border-border-subtle !z-[100000]">
                        <SelectItem value="Everyday">Everyday (Casual)</SelectItem>
                        <SelectItem value="Evening">Evening (Formal)</SelectItem>
                        <SelectItem value="Vacation">Vacation (Resort)</SelectItem>
                        <SelectItem value="Limited">Limited Edition</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Aset Gambar Utama (URL)</label>
                    <Input 
                      name="img" 
                      placeholder="https://images.unsplash.com/photo-..." 
                      value={formData.img} 
                      onChange={handleInputChange} 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-bg-soft">
                    <button 
                      type="button" 
                      onClick={() => setIsDialogOpen(false)} 
                      className="px-5 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle transition-colors cursor-pointer"
                    >
                      Batalkan
                    </button>
                    <button 
                      type="submit" 
                      className="px-5 py-2 bg-secondary-light text-white rounded-xl text-xs font-bold hover:bg-hover-rose shadow-sm transition-colors cursor-pointer"
                    >
                      {isEditMode ? "Simpan Perubahan" : "Simpan Ke Katalog"}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* FEATURED HERO BANNER CARD */}
        <section className="relative group overflow-hidden rounded-[35px] bg-white border border-primary-light/10 shadow-veloura transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(78,86,49,0.12)] hover:border-primary-light/30 z-10">
          <div className="grid md:grid-cols-12 items-center">
            <div className="md:col-span-5 h-[400px] overflow-hidden border-r border-border-subtle relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop"
                alt="Autumn Collection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>

            <div className="md:col-span-7 p-12 relative z-20">
              <span className="absolute top-8 right-12 font-accent text-6xl text-bg-soft opacity-40 select-none">Veloura</span>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-mono font-bold bg-bg-soft border border-border-subtle text-primary-dark/60 px-2 py-0.5 rounded">ID: HERO_COL_01</span>
                <p className="text-[10px] tracking-[5px] uppercase font-bold text-secondary-light">New Arrival 2026</p>
              </div>

              <h2 className="text-4xl sm:text-5xl font-playfair text-primary-dark leading-[1.1] mb-4">
                Autumn <span className="italic text-secondary-light">Collection</span>
              </h2>

              <p className="text-primary-dark/70 font-quicksand text-sm leading-relaxed mb-6 max-w-xl">
                Membawa kehangatan warna tanah ke dalam lemari pakaian Anda. Temukan potongan timeless yang mendefinisikan ulang arti elegan musim ini.
              </p>

              <div className="flex items-center gap-3 font-quicksand relative z-30">
                <button 
                  onClick={() => navigate("/collection/autumn-collection")}
                  className="px-8 py-3 bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-hover-green hover:shadow-md transition-all cursor-pointer"
                >
                  Explore Collection
                </button>
                <button 
                  onClick={handleChangeHeroImage}
                  className="px-4 py-3 border border-border-subtle text-primary-dark/70 rounded-full text-xs font-semibold hover:bg-bg-soft transition-all cursor-pointer"
                >
                  Ganti Gambar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* COLLECTION LIST GRID */}
        <section className="bg-white p-8 rounded-[35px] border border-primary-light/10 shadow-veloura z-10 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-border-subtle pb-4">
            <div>
              <h3 className="text-2xl font-playfair text-primary-dark">Browse by Theme</h3>
              <p className="text-xs text-primary-dark/50 font-quicksand mt-0.5">Kelola kluster tema produk yang tampil di sistem navigasi</p>
            </div>
          </div>

          <div className="space-y-4">
            {collections.map((item, i) => (
              <div 
                key={i} 
                className="group/card flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-bg-soft/30 rounded-2xl border border-transparent hover:bg-white hover:border-primary-light/20 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(78,86,49,0.05)] transition-all duration-500 ease-out relative z-20"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-primary-dark/30 font-bold hidden sm:block">0{i+1}</span>
                  <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-border-subtle flex-shrink-0 shadow-inner">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute bottom-1 left-1 bg-primary-dark/90 text-white text-[8px] px-1.5 py-0.5 rounded font-mono tracking-wider z-10">
                      {item.tag}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-xl font-playfair text-primary-dark group-hover/card:text-secondary-light transition-colors duration-300">
                      {item.name}
                    </h4>
                    <p className="text-xs text-primary-dark/60 font-quicksand mt-1 max-w-md line-clamp-2">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 lg:mt-0 pt-4 lg:pt-0 border-t border-border-subtle lg:border-t-0 justify-end font-quicksand opacity-90 lg:opacity-60 group-hover/card:opacity-100 transition-opacity duration-300 relative z-30">
                  <button 
                    onClick={() => navigate(`/collection/${generateSlug(item.name)}`)}
                    className="px-4 py-2 text-primary-dark border border-border-subtle rounded-xl text-xs font-bold hover:bg-bg-soft transition-all cursor-pointer"
                  >
                    View Details
                  </button>
                  
                  {/* TOMBOL EDIT KONTEN AKTIF: MEMBUKA MODAL SEKALIGUS MELEMPAR DATA */}
                  <button 
                    onClick={() => handleOpenEditModal(item, i)}
                    className="px-4 py-2 bg-white border border-border-subtle text-secondary-dark rounded-xl text-xs font-bold hover:border-secondary-light/40 hover:text-secondary-light hover:shadow-sm transition-all cursor-pointer"
                  >
                    Edit Konten
                  </button>
                  
                  <button 
                    onClick={() => handleDeleteCollection(i, item.name)}
                    className="p-2 text-primary-dark/30 hover:text-red-500 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MARKETING CONTROL BAR */}
        <section className="bg-primary-dark text-white rounded-[35px] p-8 lg:p-12 border border-transparent shadow-veloura flex flex-col lg:flex-row items-center justify-between gap-6 z-10 relative">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-light animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-white/50 font-mono">Modul Integrasi CRM</span>
            </div>
            <h3 className="text-2xl font-playfair mb-1">Be the first to know</h3>
            <p className="text-xs text-white/60 font-quicksand">Modul pengumpulan email newsletter pelanggan.</p>
          </div>

          <div className="flex w-full lg:max-w-md gap-2 relative z-20">
            <input 
              type="email" 
              placeholder="Sistem Sinkronisasi Otomatis" 
              disabled
              className="flex-1 px-5 py-3 rounded-xl bg-white/10 border border-white/5 outline-none text-xs font-quicksand text-white/40 cursor-not-allowed opacity-60"
            />
            <button 
              onClick={handleViewEmailDatabase}
              className="bg-white text-primary-dark px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-bg-soft shadow-sm transition-all flex-shrink-0 cursor-pointer"
            >
              Lihat Database Email
            </button>
          </div>
        </section>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default Collection;