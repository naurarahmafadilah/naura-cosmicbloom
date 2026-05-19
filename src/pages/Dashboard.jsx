import React, { useState } from "react";
import PageHeader from "../components/PageHeader";

// 1. BASIC COMPONENTS
import Button from "../components/Button";
import Badge from "../components/Badge";
import InputField from "../components/InputField"; 
import SelectField from "../components/SelectField"; 
import SystemStatusAlert from "../components/SystemStatusAlert"; 
import QuickActionPanel from "../components/QuickActionPanel"; 

// 2. LAYOUT COMPONENTS
import DashboardContainer from "../components/DashboardContainer";
import ContentGrid from "../components/ContentGrid";

// 3. DATA DISPLAY COMPONENTS
import StatCard from "../components/StatCard";
import ProductCard from "../components/ProductCard";
import CustomerActivityList from "../components/CustomerActivityList"; 
import ReviewHighlightCard from "../components/ReviewHighlightCard"; 
import StockAlertCard from "../components/StockAlertCard"; 
import ServerPerformanceMini from "../components/ServerPerformanceMini"; 
import Footer from "../components/Footer";

// INTEGRASI IKON KHUSUS TEMA BUTIK VELOURA
import { FiTrendingUp, FiShoppingBag, FiLayers, FiDollarSign } from "react-icons/fi";

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  
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

  const [productsData, setProductsData] = useState([
    { id: 1024, name: "Elegant Dress", price: "250.000", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" },
    { id: 1025, name: "Casual Outfit", price: "180.000", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop" },
    { id: 1026, name: "Summer Style", price: "300.000", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop" },
    { id: 1027, name: "Modern Look", price: "270.000", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProduk || !formData.hargaProduk) return;

    const newProduct = {
      id: productsData.length + 1024,
      name: formData.namaProduk,
      price: parseInt(formData.hargaProduk).toLocaleString("id-ID"),
      img: formData.gambarProduk || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
    };

    setProductsData([newProduct, ...productsData]);
    setFormData({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });
    setShowForm(false);
  };

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in text-slate-800">

        {/* STATUS BAR - Warna Hitam Mewah Asli */}
        <SystemStatusAlert message="Seluruh koneksi data dienkripsi dengan standar SSL 256-bit demi keamanan sesi admin." />

        {/* HEADER UTAMA */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100/60 pb-6">
          <PageHeader title="Dashboard" breadcrumb={[{ label: "Beranda" }]} />
          <div className="flex gap-3 self-start md:self-auto">
            <Button variant="secondary">Unduh Laporan</Button>
            <Button variant="primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? "Tutup Form" : "+ Tambah Data"}
            </Button>
          </div>
        </div>

        {/* FORM INPUT DATA BARU */}
        {showForm && (
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.04)] animate-fade-in">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-lg font-bold font-playfair text-primary-dark">Tambah Koleksi Baru</h3>
              <p className="text-xs text-slate-400 font-quicksand">Isi formulir di bawah untuk menambahkan produk ke katalog toko online.</p>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Nama Produk" name="namaProduk" placeholder="Contoh: Luxury Silk Blouse" value={formData.namaProduk} onChange={handleInputChange} required />
                <InputField label="Harga Produk (Rp)" name="hargaProduk" type="number" placeholder="Contoh: 350000" value={formData.hargaProduk} onChange={handleInputChange} required />
                <SelectField 
                  label="Kategori" 
                  name="kategoriProduk" 
                  value={formData.kategoriProduk} 
                  onChange={handleInputChange} 
                  options={[
                    { value: "tas", label: "Tas" }, 
                    { value: "kaos", label: "Kaos" },
                    { value: "kacamata", label: "Kacamata" },
                    { value: "sepatu", label: "Sepatu" },
                    { value: "jam", label: "Jam" }
                  ]} 
                />
                <InputField label="URL Gambar Produk (Opsional)" name="gambarProduk" placeholder="https://images.unsplash.com/..." value={formData.gambarProduk} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="secondary" onClick={() => setShowForm(false)}>Batal</Button>
                <Button variant="primary" type="submit">Simpan Produk</Button>
              </div>
            </form>
          </div>
        )}

        {/* PANEL STATISTIK */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Total Penjualan" value="Rp 45.850.000" change="12% Bulan ini" isPositive={true} icon={<FiDollarSign className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Pengunjung Aktif" value="1,240" change="4.3% Hari ini" isPositive={true} icon={<FiTrendingUp className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Kategori Aktif" value="5 Kategori" change="Maksimal Kuota" isPositive={true} icon={<FiLayers className="w-4 h-4 text-secondary-light" />} />
          <StatCard title="Total Produk" value={`${productsData.length} Item`} change="4 Stok Menipis" isPositive={false} icon={<FiShoppingBag className="w-4 h-4 text-secondary-light" />} />
        </div>

        {/* HERO BANNER SECTION */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden transform transition-all duration-500 ease-out hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.06)] hover:border-slate-200">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-60" />
          <div className="absolute top-4 right-4 z-20">
            <Badge type="success">● Live Banner</Badge>
          </div>
          <div className="max-w-xl relative z-10 w-full lg:w-auto">
            <p className="uppercase tracking-[4px] text-[10px] font-bold text-secondary-light mb-4 font-quicksand">New Collection 2026</p>
            <h2 className="text-4xl font-playfair text-primary-dark leading-[1.1] mb-4">Elegance in <span className="italic text-secondary-light">Every Detail</span></h2>
            <p className="text-slate-500 font-quicksand text-sm leading-relaxed max-w-sm">Temukan harmoni antara kenyamanan dan kemewahan dalam koleksi terbaru kami yang dirancang khusus untuk Anda.</p>
            <div className="flex gap-3 mt-6">
              <Button variant="primary" className="shadow-sm">Shop Now →</Button>
              <Button variant="secondary">Ubah Konten Banner</Button>
            </div>
          </div>
          <div className="relative z-10 w-full lg:w-auto flex justify-center">
            <div className="absolute inset-0 border border-secondary-light/30 rounded-2xl translate-x-2 translate-y-2 -z-10 opacity-40" />
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80" alt="Hero Veloura" className="w-full sm:w-[380px] h-[240px] object-cover rounded-2xl shadow-sm border border-slate-100" />
          </div>
        </div>

        {/* PANEL AKSES ADMIN CEPAT */}
        <QuickActionPanel />

        {/* STRUKTUR KONTEN UTAMA DUA KOLOM */}
        <ContentGrid 
          leftContent={
            <div className="space-y-8 w-full">
              {/* PRODUK TERPOPULER SECTION */}
              <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100/60 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-playfair text-primary-dark">Koleksi Terpopuler</h3>
                    <p className="text-xs text-slate-400 font-quicksand mt-0.5">Monitoring produk dengan performa penjualan tertinggi</p>
                  </div>
                  <Button variant="secondary">Atur Urutan</Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {productsData.map((product) => (
                    <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} imgSrc={product.img} />
                  ))}
                </div>
              </section>

              {/* LIVE LOG AKTIVITAS TRANSAKSI PELANGGAN */}
              <CustomerActivityList />
            </div>
          }
          rightContent={
            <div className="space-y-8 w-full">
              {/* KATEGORI PILIHAN SECTION */}
              <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm w-full">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100/60 pb-4">
                  <div>
                    <h3 className="text-xl font-bold font-playfair text-primary-dark">Kategori Pilihan</h3>
                    <p className="text-xs text-slate-400 font-quicksand mt-0.5">Etalase kategori beranda</p>
                  </div>
                  <Button variant="secondary">Lihat Semua</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {categoriesData.map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-2xl text-center group transition-all duration-500 ease-out border border-slate-100 shadow-sm cursor-pointer relative hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(15,23,42,0.04)] hover:border-slate-200">
                      <div className="w-14 h-14 mx-auto rounded-full overflow-hidden mb-3 border border-slate-200 transition-transform duration-500 group-hover:scale-105">
                        <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
                      </div>
                      <p className="text-[11px] font-bold font-quicksand text-primary-dark tracking-wide uppercase">{item.name}</p>
                      <div className="absolute inset-0 bg-slate-900/60 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <button className="bg-white text-slate-800 text-[10px] font-bold px-2.5 py-1 rounded-md hover:bg-slate-100 transition-colors">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ALARM PRODUK STOK KRITIS */}
              <StockAlertCard />

              {/* ULASAN TERBARU PELANGGAN VIP */}
              <ReviewHighlightCard reviewer="Alexandra V." review="Blouse sutra dari Veloura sangat mewah, jahitan sangat rapi seperti kelas haute couture!" />

              {/* PERFORMANCE METRIC MINI */}
              <ServerPerformanceMini status="Optimal" speed="0.32ms" />
            </div>
          }
        />

        {/* INKLUSI FOOTER MODEREN */}
        <Footer />

      </div>
    </DashboardContainer>
  );
};

export default Dashboard;