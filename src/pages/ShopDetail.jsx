import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCheckCircle, FaLayerGroup, FaEdit, FaDatabase, FaHdd } from "react-icons/fa";

// IMPORT INTEGRASI KOMPONEN SHADCN UI FORMS & DIALOG
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Button from "../components/Button"; // Menggunakan komponen Button internal jika dibutuhkan
import Footer from "../components/Footer";

// Import data katalog internal toko
import productsData from "../data/Shop.json";

const ShopDetail = () => {
  const { slug } = useParams();
  
  // State manajemen admin back-office
  const [selectedSize, setSelectedSize] = useState("S");
  const [activeTab, setActiveTab] = useState("deskripsi");
  const [isLive, setIsLive] = useState(true);

  // State Kontrol Dialog Form Edit Data Master
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    namaProduk: "",
    hargaProduk: "",
    kategoriProduk: "",
    gambarProduk: ""
  });

  // Mencari produk berdasarkan slug dari URL
  const product = productsData.find((p) => p.slug === slug || p.id?.toString() === slug);

  // Efek untuk mengisi data awal form begitu produk berhasil dimuat
  useEffect(() => {
    if (product) {
      // Bersihkan titik format nominal jika harga bawaan berupa string berformat rupiah
      const rawPrice = product.price ? product.price.toString().replace(/\./g, "") : "";
      setFormData({
        namaProduk: product.name || "",
        hargaProduk: rawPrice,
        kategoriProduk: product.category?.toLowerCase() || "",
        gambarProduk: product.img || ""
      });
    }
  }, [product]);

  // Jika produk tidak ditemukan (Handling Error Admin)
  if (!product) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand">
          <h2 className="font-playfair text-3xl text-primary-dark">Produk Katalog Tidak Ditemukan</h2>
          <p className="text-xs text-primary-dark/40 mt-1">SKU ID atau Slug produk tidak terdaftar di database master.</p>
          <Link to="/shop" className="text-secondary-light mt-6 inline-block underline font-bold text-xs uppercase tracking-wider hover:text-primary-dark transition-colors">
            Kembali ke Manajemen Produk
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Data spesifikasi teks penunjang audit tekstil Veloura Atelier
  const productSizes = ["S", "M", "L", "XL"];
  const specifications = {
    material: "Diperoleh langsung dari serat katun organik berdensitas tinggi yang dipadukan dengan premium linen mesh. Memberikan struktur siluet yang tegas, sirkulasi udara maksimal, serta ketahanan tekstur jangka panjang.",
    perawatan: "Dicuci dengan metode hand-wash menggunakan detergen cair lembut. Hindari memeras terlalu kuat. Setrika dari bagian dalam dengan temperatur medium-low untuk merawat keaslian serat alami.",
    fit: "Ukuran dirancang dengan pendekatan semi-structured (regular-fit Eropa). Silakan pilih ukuran kurasi reguler Anda atau gunakan satu ukuran di atasnya untuk impresi relaxed-tailoring."
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProduk || !formData.hargaProduk) return;

    // Logic simulasi penyimpanan pembaruan logistik ke data master
    alert(`✅ Data Master SKU-${product.id} ("${formData.namaProduk}") berhasil diperbarui secara lokal!`);
    setIsDialogOpen(false);
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Data Master Produk"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Katalog Toko", link: "/shop" },
            { label: product.name }
          ]}
        />

        {/* LAYOUT GRID UTAMA */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* BAGIAN KIRI: INFRASTRUKTUR MEDIA & PREVIEW */}
          <div className="relative group">
            <div className="rounded-[35px] overflow-hidden aspect-[4/5] bg-bg-main border border-primary-light/10 p-3 shadow-veloura bg-white">
              <div className="w-full h-full rounded-[26px] overflow-hidden relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/50 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Kategori Kluster Badge */}
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md text-primary-dark px-4 py-2 rounded-xl font-bold text-[9px] tracking-widest border border-border-subtle flex items-center gap-2 uppercase font-quicksand shadow-sm">
              <FaLayerGroup size={10} className="text-secondary-light" /> {product.category}
            </div>

            {/* Indikator Status Live Sinkronisasi */}
            <div className="absolute bottom-6 right-6 bg-primary-dark/95 backdrop-blur-md text-white px-4 py-2 rounded-xl text-[9px] tracking-wider font-mono flex items-center gap-2 border border-white/10 shadow-md">
              <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-amber-400'}`} />
              {isLive ? "STATUS: AKTIF DI TOKO LIVE" : "STATUS: DIARSIPKAN / DRAFT"}
            </div>
          </div>

          {/* BAGIAN KANAN: PANEL KONTROL KATALOG & METADATA */}
          <div className="flex flex-col">
            
            {/* Tombol Navigasi Kembali */}
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 text-secondary-dark/50 text-[10px] font-bold uppercase tracking-[3px] mb-6 hover:text-secondary-light transition-colors"
            >
              <FaArrowLeft className="text-[9px]" /> Kembali ke Katalog Utama
            </Link>

            <span className="text-secondary-light text-[10px] font-bold uppercase tracking-[4px] mb-1 font-quicksand">Node Database Veloura</span>
            <h1 className="text-4xl font-playfair text-primary-dark mb-5 leading-tight">{product.name}</h1>
            
            {/* Box Tag Harga Master Data */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-primary-light/10 mb-6 shadow-sm font-quicksand">
              <div className="flex flex-col border-r border-border-subtle/60">
                <span className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Harga MSRP Dasar</span>
                <span className="text-2xl font-bold text-primary-dark mt-0.5 flex items-baseline">
                  <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                  {product.price}
                </span>
              </div>
              <div className="flex flex-col pl-2 justify-center">
                <span className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Referensi Core SKU</span>
                <span className="text-sm font-mono font-bold text-secondary-light mt-1">SKU-{product.id || "00"}-{product.slug?.substring(0, 5).toUpperCase()}</span>
              </div>
            </div>

            {/* GRID MANAJEMEN MONITOR STOK UKURAN */}
            <div className="mb-6 font-quicksand">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-dark">Pantau Alokasi Stok Ukuran</span>
                <button 
                  onClick={() => setActiveTab("fit")}
                  className="text-[10px] text-secondary-light underline uppercase tracking-wider font-bold"
                >
                  Lihat Parameter Dimensi
                </button>
              </div>
              <div className="flex gap-3">
                {productSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-xl text-xs font-mono border transition-all flex flex-col items-center justify-center gap-0.5 relative cursor-pointer ${
                      selectedSize === size
                        ? "border-primary-dark bg-primary-dark text-white"
                        : "border-border-subtle bg-white text-primary-dark hover:border-secondary-light"
                    }`}
                  >
                    <span className="font-bold">{size}</span>
                    <span className={`text-[8px] ${selectedSize === size ? 'text-white/60' : 'text-primary-dark/40'}`}>stok: 12</span>
                  </button>
                ))}
              </div>
            </div>

            {/* TAB EDITOR PREVIEW METADATA */}
            <div className="mb-6 border border-border-subtle rounded-2xl overflow-hidden font-quicksand bg-white shadow-sm">
              <div className="flex border-b border-border-subtle bg-bg-main/30 text-[10px] font-bold uppercase tracking-wider">
                <button 
                  onClick={() => setActiveTab("deskripsi")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "deskripsi" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  Deskripsi Live
                </button>
                <button 
                  onClick={() => setActiveTab("material")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "material" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  Komposisi Bahan
                </button>
                <button 
                  onClick={() => setActiveTab("perawatan")}
                  className={`flex-1 py-3 text-center transition-all ${activeTab === "perawatan" ? "bg-white text-primary-dark border-b-2 border-primary-dark" : "text-secondary-dark/50"}`}
                >
                  SOP Perawatan
                </button>
              </div>
              
              <div className="p-5 text-xs text-primary-dark/70 leading-relaxed min-h-[110px]">
                {activeTab === "deskripsi" && (
                  <div className="space-y-2">
                    <p className="italic font-playfair text-sm text-primary-dark/90">
                      "Interpretasi modern atas elegansi struktural yang timeless."
                    </p>
                    <p>{product.description || "Siluet esensial yang dirancang mengalir, memadukan kenyamanan fungsional harian dengan garis potong premium khas Veloura Atelier."}</p>
                  </div>
                )}
                {activeTab === "material" && <p>{specifications.material}</p>}
                {activeTab === "perawatan" && <p>{specifications.perawatan}</p>}
                {activeTab === "fit" && <p>{specifications.fit}</p>}
              </div>
            </div>

            {/* Fitur Terpasang List */}
            {product.features && product.features.length > 0 && (
              <div className="grid grid-cols-1 gap-2.5 mb-6 font-quicksand border-t border-border-subtle/50 pt-4">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-primary-dark/70">
                    <FaCheckCircle className="text-secondary-light shrink-0 text-sm" /> {feature}
                  </div>
                ))}
              </div>
            )}

            {/* ACTION PANEL MANAGEMENT SYSTEM */}
            <div className="flex flex-col sm:flex-row gap-3 font-quicksand">
              
              {/* TOMBOL EDIT UTAMA: MENYALAKAN STATE DIALOG FORM */}
              <button 
                onClick={() => setIsDialogOpen(true)}
                className="flex-[3] py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2.5 bg-primary-dark text-white hover:bg-hover-green shadow-md cursor-pointer transition-all duration-300"
              >
                <FaEdit className="text-xs" /> Edit Data Master & Logistik (Ukuran {selectedSize})
              </button>
              
              <button 
                onClick={() => setIsLive(!isLive)}
                className={`flex-1 py-4 rounded-xl border text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  isLive 
                    ? "border-secondary-light/30 bg-secondary-light/5 text-secondary-light" 
                    : "border-border-subtle bg-white text-primary-dark/60 hover:border-primary-dark"
                }`}
              >
                <FaHdd /> {isLive ? "Arsipkan / Set Draft" : "Terbitkan ke Toko"}
              </button>
            </div>

            <p className="mt-5 text-[9px] font-mono tracking-wider text-primary-dark/30 text-center sm:text-left flex items-center gap-1.5 justify-center sm:justify-start">
              <FaDatabase size={8} /> Kluster server: master-katalog-asia-prod-02
            </p>
          </div>
        </div>

        {/* ==========================================
            INTEGRASI MODAL SHADCN DIALOG UNTUK EDIT FORM
           ========================================== */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[480px] rounded-3xl bg-white p-6 border border-border-subtle shadow-xl !z-[99999]">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold font-playfair text-primary-dark">
                Ubah Informasi Produk Master
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-400 font-quicksand">
                Lakukan modifikasi data logistik tekstil, nominal harga MSRP, atau tautan gambar untuk SKU referensi ini.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleFormSubmit} className="space-y-5 pt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-dark font-quicksand">Nama Produk</label>
                <Input 
                  name="namaProduk" 
                  value={formData.namaProduk} 
                  onChange={handleInputChange} 
                  required 
                  className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-dark font-quicksand">Harga Produk (Rp)</label>
                <Input 
                  name="hargaProduk" 
                  type="number" 
                  value={formData.hargaProduk} 
                  onChange={handleInputChange} 
                  required 
                  className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-dark font-quicksand">Kategori</label>
                <Select 
                  value={formData.kategoriProduk}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, kategoriProduk: value }))}
                >
                  <SelectTrigger className="w-full rounded-xl border-border-subtle bg-white text-sm text-left">
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="bg-white rounded-xl shadow-lg border-border-subtle !z-[100000]">
                    <SelectItem value="tas" className="cursor-pointer focus:bg-bg-soft">Tas Premium</SelectItem>
                    <SelectItem value="kaos" className="cursor-pointer focus:bg-bg-soft">Kaos Eksklusif</SelectItem>
                    <SelectItem value="kacamata" className="cursor-pointer focus:bg-bg-soft">Kacamata Gaya</SelectItem>
                    <SelectItem value="sepatu" className="cursor-pointer focus:bg-bg-soft">Sepatu Kulit</SelectItem>
                    <SelectItem value="jam" className="cursor-pointer focus:bg-bg-soft">Jam Tangan Mewah</SelectItem>
                    <SelectItem value="dress" className="cursor-pointer focus:bg-bg-soft">Gaun / Dress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-primary-dark font-quicksand">URL Gambar Katalog</label>
                <Input 
                  name="gambarProduk" 
                  value={formData.gambarProduk} 
                  onChange={handleInputChange} 
                  className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-bg-soft">
                <button 
                  type="button" 
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200 transition-colors"
                >
                  Batal
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-dark text-white rounded-xl text-xs font-semibold hover:bg-hover-green transition-colors shadow-sm"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* FOOTER GLOBAL */}
        <div className="mt-16">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default ShopDetail;