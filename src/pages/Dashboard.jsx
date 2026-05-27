import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI
// ==========================================
import { Alert, AlertDescription } from "../components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../components/ui/select";
import { Progress } from "../components/ui/progress";

// ==========================================
// 2. LAYOUT & DATA DISPLAY COMPONENTS EXISTING
// ==========================================
import Button from "../components/Button";
import Badge from "../components/Badge";
import QuickActionPanel from "../components/QuickActionPanel"; 
import DashboardContainer from "../components/DashboardContainer";
import ContentGrid from "../components/ContentGrid";
import StatCard from "../components/StatCard";
import ProductCard from "../components/ProductCard";
import CustomerActivityList from "../components/CustomerActivityList"; 
import ReviewHighlightCard from "../components/ReviewHighlightCard"; 
import StockAlertCard from "../components/StockAlertCard"; 
import Footer from "../components/Footer";

// INTEGRASI IKON
import { FiTrendingUp, FiShoppingBag, FiLayers, FiDollarSign, FiShield } from "react-icons/fi";

const defaultProductsMock = [
  { id: 1024, name: "Elegant Dress", price: "250.000", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" },
  { id: 1025, name: "Casual Outfit", price: "180.000", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop" },
  { id: 1026, name: "Summer Style", price: "300.000", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop" },
  { id: 1027, name: "Modern Look", price: "270.000", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop" }
];

const Dashboard = ({ products: propsProducts, onNewProductAdded }) => {
  const [localProducts, setLocalProducts] = useState(defaultProductsMock);
  const activeProducts = propsProducts && propsProducts.length > 0 ? propsProducts : localProducts;

  // State Kontrol Dialog Form & Data
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const [formData, setFormData] = useState({
    namaProduk: "",
    hargaProduk: "",
    kategoriProduk: "",
    gambarProduk: ""
  });

  const categoriesData = [
    { name: "Tas", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
    { name: "Kaos", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200" },
    { name: "Kacamata", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200" },
    { name: "Sepatu", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
    { name: "Jam", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200" }
  ];

  // ==========================================
  // GLOBAL INTERACTIVE ACTION HANDLERS
  // ==========================================
  const handleDownloadReport = () => {
    alert("📥 Mengunduh Laporan Sesi Admin...\nFormat PDF & CSV berhasil disiapkan di latar belakang.");
  };

  const handleEditCategory = (categoryName) => {
    alert(`✏️ Mode Edit Kategori Aktif: Mengubah konfigurasi etalase untuk "${categoryName}".`);
  };

  const handleShopNowAction = () => {
    alert("🛍️ Mengalihkan tampilan ke Mode Live Preview Toko Online Veloura.");
  };

  const handleBannerConfig = () => {
    alert("🖼️ Membuka editor konten Hero Banner Koleksi Baru 2026.");
  };

  const handleSortProducts = () => {
    alert("🔄 Mengubah urutan produk berdasarkan item terpopuler saat ini.");
  };

  const handleSeeAllCategories = () => {
    alert("📁 Membuka daftar lengkap etalase seluruh kategori produk.");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler membuka form untuk Tambah Data Baru
  const handleOpenCreateMode = () => {
    setIsEditMode(false);
    setSelectedProductIndex(null);
    setFormData({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });
    setIsDialogOpen(true);
  };

  // Handler membuka form untuk Edit Data Terpilih
  const handleOpenEditMode = (product, index) => {
    setIsEditMode(true);
    setSelectedProductIndex(index);
    const rawPrice = product.price.replace(/\./g, "");
    setFormData({
      namaProduk: product.name,
      hargaProduk: rawPrice,
      kategoriProduk: product.kategori || "",
      gambarProduk: product.img
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProduk || !formData.hargaProduk) return;

    const formattedPrice = parseInt(formData.hargaProduk).toLocaleString("id-ID");
    const fallbackImg = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80";

    if (isEditMode && selectedProductIndex !== null) {
      const updatedProducts = [...localProducts];
      updatedProducts[selectedProductIndex] = {
        ...updatedProducts[selectedProductIndex],
        name: formData.namaProduk,
        price: formattedPrice,
        img: formData.gambarProduk.trim() !== "" ? formData.gambarProduk : fallbackImg
      };
      setLocalProducts(updatedProducts);
      alert(`✅ Produk "${formData.namaProduk}" berhasil diperbarui!`);
    } else {
      const newProduct = {
        id: activeProducts.length + 1024,
        name: formData.namaProduk,
        price: formattedPrice,
        img: formData.gambarProduk.trim() !== "" ? formData.gambarProduk : fallbackImg
      };

      if (typeof onNewProductAdded === "function") {
        onNewProductAdded(newProduct);
      } else {
        setLocalProducts((prev) => [newProduct, ...prev]);
      }
      alert(`✅ Produk "${newProduct.name}" berhasil ditambahkan ke katalog terpopuler!`);
    }

    setFormData({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });
    setIsDialogOpen(false); 
  };

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in text-primary-dark relative z-10">

        {/* [KOMPONEN 1]: SHADCN ALERT */}
        <Alert className="bg-bg-soft text-primary-dark border border-primary-light/20 rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <FiShield className="w-5 h-5 text-primary-light shrink-0" />
          <AlertDescription className="text-xs md:text-sm font-quicksand font-medium tracking-wide">
            Seluruh koneksi data dienkripsi dengan standar SSL 256-bit demi keamanan sesi admin.
          </AlertDescription>
        </Alert>

        {/* HEADER UTAMA & [KOMPONEN 2]: SHADCN DIALOG */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border-subtle pb-6 relative z-20">
          <PageHeader title="Dashboard" breadcrumb={[{ label: "Beranda" }]} />
          <div className="flex gap-3 self-start md:self-auto items-center">
            <Button variant="secondary" onClick={handleDownloadReport}>Unduh Laporan</Button>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <button 
                onClick={handleOpenCreateMode}
                className="inline-block bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-hover-green transition-all shadow-sm cursor-pointer select-none"
              >
                + Tambah Data
              </button>
              
              <DialogContent className="sm:max-w-[480px] rounded-3xl bg-white p-6 border border-border-subtle shadow-xl !z-[99999] pointer-events-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold font-playfair text-primary-dark">
                    {isEditMode ? "Ubah Informasi Produk" : "Tambah Koleksi Baru"}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-slate-400 font-quicksand">
                    {isEditMode 
                      ? "Lakukan pembaruan nama produk, penyesuaian nominal harga pasar, atau tautan gambar katalog." 
                      : "Isi formulir di bawah untuk menambahkan produk ke katalog toko online Veloura."}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleFormSubmit} className="space-y-5 pt-4 pointer-events-auto">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Nama Produk</label>
                    <Input 
                      name="namaProduk" 
                      placeholder="Contoh: Luxury Silk Blouse" 
                      value={formData.namaProduk} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm relative z-50 pointer-events-auto"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Harga Produk (Rp)</label>
                    <Input 
                      name="hargaProduk" 
                      type="number" 
                      placeholder="Contoh: 350000" 
                      value={formData.hargaProduk} 
                      onChange={handleInputChange} 
                      required 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm relative z-50 pointer-events-auto"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">Kategori</label>
                    <Select 
                      value={formData.kategoriProduk}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, kategoriProduk: value }))}
                    >
                      <SelectTrigger className="w-full rounded-xl border-border-subtle focus:ring-primary-light bg-white text-sm text-left relative z-50 pointer-events-auto">
                        <SelectValue placeholder="Pilih Kategori Produk" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-xl shadow-lg border-border-subtle !z-[100000] pointer-events-auto">
                        <SelectItem value="tas" className="cursor-pointer focus:bg-bg-soft">Tas Premium</SelectItem>
                        <SelectItem value="kaos" className="cursor-pointer focus:bg-bg-soft">Kaos Eksklusif</SelectItem>
                        <SelectItem value="kacamata" className="cursor-pointer focus:bg-bg-soft">Kacamata Gaya</SelectItem>
                        <SelectItem value="sepatu" className="cursor-pointer focus:bg-bg-soft">Sepatu Kulit</SelectItem>
                        <SelectItem value="jam" className="cursor-pointer focus:bg-bg-soft">Jam Tangan Mewah</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-primary-dark font-quicksand">URL Gambar Produk (Opsional)</label>
                    <Input 
                      name="gambarProduk" 
                      placeholder="https://images.unsplash.com/..." 
                      value={formData.gambarProduk} 
                      onChange={handleInputChange} 
                      className="rounded-xl border-border-subtle focus-visible:ring-primary-light bg-white text-sm relative z-50 pointer-events-auto"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-3 border-t border-bg-soft relative z-50">
                    <Button variant="secondary" type="button" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-primary-dark text-white rounded-xl text-xs font-semibold hover:bg-hover-green transition-colors shadow-sm cursor-pointer pointer-events-auto"
                    >
                      {isEditMode ? "Simpan Perubahan" : "Simpan Produk"}
                    </button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* PANEL STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <StatCard title="Total Penjualan" value="Rp 45.850.000" change="12% Bulan ini" isPositive={true} icon={<FiDollarSign className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Pengunjung Aktif" value="1,240" change="4.3% Hari ini" isPositive={true} icon={<FiTrendingUp className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Kategori Aktif" value="5 Kategori" change="Maksimal Kuota" isPositive={true} icon={<FiLayers className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Total Produk" value={`${activeProducts.length} Item`} change="4 Stok Menipis" isPositive={false} icon={<FiShoppingBag className="w-4 h-4 text-secondary-light" />} />
        </div>

        {/* HERO BANNER SECTION */}
        <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-veloura flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden transform transition-all duration-500 ease-out hover:shadow-[0_30px_60px_-15px_rgba(78,86,49,0.06)] hover:border-primary-light/20 z-10">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-bg-soft rounded-full blur-3xl opacity-60" />
          <div className="absolute top-4 right-4 z-20">
            <Badge type="success">● Live Banner</Badge>
          </div>
          <div className="max-w-xl relative z-10 w-full lg:w-auto">
            <p className="uppercase tracking-[4px] text-[10px] font-bold text-secondary-light mb-4 font-quicksand">New Collection 2026</p>
            <h2 className="text-4xl font-playfair text-primary-dark leading-[1.1] mb-4">Elegance in <span className="italic text-secondary-light">Every Detail</span></h2>
            <p className="text-slate-500 font-quicksand text-sm leading-relaxed max-w-sm">Temukan harmoni antara kenyamanan dan kemewahan dalam koleksi terbaru kami yang dirancang khusus untuk Anda.</p>
            <div className="flex gap-3 mt-6">
              <Button variant="primary" className="shadow-sm" onClick={handleShopNowAction}>Shop Now →</Button>
              <Button variant="secondary" onClick={handleBannerConfig}>Ubah Konten Banner</Button>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-auto flex justify-center">
            <div className="absolute inset-0 border border-secondary-light/20 rounded-2xl translate-x-2 translate-y-2 -z-10 opacity-40" />
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80" alt="Hero Veloura" className="w-full sm:w-[380px] h-[240px] object-cover rounded-2xl shadow-sm border border-border-subtle" />
          </div>
        </div>

        {/* PANEL AKSES ADMIN CEPAT */}
        <QuickActionPanel />

        {/* STRUKTUR KONTEN UTAMA DUA KOLOM */}
        <ContentGrid 
          leftContent={
            <div className="space-y-8 w-full relative z-10">
              <section className="bg-white p-6 rounded-3xl border border-border-subtle shadow-veloura w-full">
                <div className="flex justify-between items-center mb-6 border-b border-bg-soft pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-playfair text-primary-dark">Koleksi Terpopuler</h3>
                    <p className="text-xs text-slate-400 font-quicksand mt-0.5">Monitoring produk dengan performa penjualan tertinggi</p>
                  </div>
                  <Button variant="secondary" onClick={handleSortProducts}>Atur Urutan</Button>
                </div>

                {/* GRID LIST KOLEKSI PRODUK */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {activeProducts.map((product, index) => (
                    <div key={product.id || index} className="bg-white p-5 rounded-3xl border border-border-subtle shadow-sm flex flex-col justify-between">
                      {/* Tampilan Gambar, Judul, dan Tombol di-handle sepenuhnya di dalam ProductCard 
                        Mengalirkan handler klik edit melalui custom props `onEdit`
                      */}
                      <ProductCard 
                        id={product.id} 
                        name={product.name} 
                        price={product.price} 
                        imgSrc={product.img} 
                        onEdit={() => handleOpenEditMode(product, index)}
                      />
                    </div>
                  ))}
                </div>
              </section>

              <div onClick={() => alert("📋 Membuka Riwayat Log Alur Aktivitas Transaksi Pelanggan Secara Real-Time.")} className="cursor-pointer active:opacity-90 transition-opacity">
                <CustomerActivityList />
              </div>
            </div>
          }
          rightContent={
            <div className="space-y-8 w-full relative z-10">
              <section className="bg-white p-6 rounded-3xl border border-border-subtle shadow-veloura w-full">
                <div className="flex justify-between items-center mb-6 border-b border-bg-soft pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-playfair text-primary-dark">Kategori Pilihan</h3>
                    <p className="text-xs text-slate-400 font-quicksand mt-0.5">Etalase kategori beranda</p>
                  </div>
                  <Button variant="secondary" onClick={handleSeeAllCategories}>Lihat Semua</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {categoriesData.map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl text-center group transition-all duration-500 ease-out border border-border-subtle shadow-sm cursor-pointer relative hover:-translate-y-1 hover:shadow-veloura hover:border-primary-light/30">
                      <div className="w-14 h-14 mx-auto rounded-full overflow-hidden mb-3 border border-border-subtle transition-transform duration-500 group-hover:scale-105">
                        <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <p className="text-[11px] font-bold font-quicksand text-primary-dark tracking-wide uppercase">{item.name}</p>
                      
                      <div className="absolute inset-0 bg-primary-dark/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            handleEditCategory(item.name);
                          }}
                          className="bg-white text-primary-dark text-[10px] font-bold px-2.5 py-1 rounded-md hover:bg-bg-soft transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <StockAlertCard />

              <ReviewHighlightCard reviewer="Alexandra V." review="Blouse sutra dari Veloura sangat mewah, jahitan sangat rapi seperti kelas haute couture!" />

              {/* [KOMPONEN 5]: SHADCN PROGRESS BAR */}
              <section className="bg-white p-5 rounded-3xl border border-border-subtle shadow-veloura w-full space-y-4">
                <div className="flex justify-between items-center text-xs font-bold text-primary-dark font-quicksand">
                  <span>Resource Server Status: Optimal</span>
                  <span className="text-primary-light">Speed: 0.32ms</span>
                </div>
                <Progress value={28} className="h-2 bg-bg-main" />
                <p className="text-[10px] text-slate-400">Beban resource server tergolong sangat aman dan stabil.</p>
              </section>
            </div>
          }
        />

        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Dashboard;