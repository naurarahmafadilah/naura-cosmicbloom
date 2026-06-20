import React, { useState, useEffect, useRef } from "react"; 
import { useNavigate } from "react-router-dom"; 
import { supabase } from "../lib/supabase"; // Pastikan path ke file supabase.js Anda sudah benar

// ==========================================
// SHADCN UI & RECHARTS INTEGRATION
// ==========================================
import { Alert, AlertDescription } from "../components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Progress } from "../components/ui/progress";

import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  Legend
} from "recharts";

// ==========================================
// DESIGN SYSTEM COMPONENTS
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import ProductCard from "../components/ProductCard";
import CustomerActivityList from "../components/CustomerActivityList"; 
import ReviewHighlightCard from "../components/ReviewHighlightCard"; 
import StockAlertCard from "../components/StockAlertCard"; 
import Footer from "../components/Footer";

import { FiShield, FiPlus, FiRefreshCw, FiClock, FiCalendar } from "react-icons/fi";

const crmDataQuarters = {
  Q1: [
    { name: "Jan", "Pelanggan Baru": 120, "Pelanggan Aktif": 400, Pendapatan: 15000000 },
    { name: "Feb", "Pelanggan Baru": 180, "Pelanggan Aktif": 490, Pendapatan: 22000000 },
    { name: "Mar", "Pelanggan Baru": 250, "Pelanggan Aktif": 580, Pendapatan: 29000000 },
  ],
  Q2: [
    { name: "Apr", "Pelanggan Baru": 310, "Pelanggan Aktif": 700, Pendapatan: 35000000 },
    { name: "Mei", "Pelanggan Baru": 430, "Pelanggan Aktif": 850, Pendapatan: 45850000 },
    { name: "Jun", "Pelanggan Baru": 520, "Pelanggan Aktif": 980, Pendapatan: 54000000 },
  ]
};

// Data Dummy untuk Grafik Donut Segmentasi Konsumen
const customerSegmentationData = [
  { name: "Klien Loyal", value: 580, color: "#4E5631" },
  { name: "Respon Baru", value: 430, color: "#A47174" },
  { name: "Dormant", value: 230, color: "#cbd5e1" },
];

const defaultProductsMock = [
  { id: 1024, name: "Elegant Dress", price: "250.000", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" },
  { id: 1025, name: "Casual Outfit", price: "180.000", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop" },
  { id: 1026, name: "Summer Style", price: "300.000", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop" },
  { id: 1027, name: "Modern Look", price: "270.000", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop" }
];

const Dashboard = ({ products: propsProducts }) => {
  const navigate = useNavigate(); 
  const [localProducts, setLocalProducts] = useState(defaultProductsMock);
  const activeProducts = propsProducts && propsProducts.length > 0 ? propsProducts : localProducts;
  
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const productSectionRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const userData = JSON.parse(localStorage.getItem("user"));
        setCurrentUser(userData);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    };
    const interval = setInterval(handleStorageChange, 1000); 
    return () => clearInterval(interval);
  }, []);

  const [selectedQuarter, setSelectedQuarter] = useState("Q2");
  const [activeMetricFilter, setActiveMetricFilter] = useState("Pendapatan");
  const [syncProgress, setSyncProgress] = useState(85);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [isBlastDialogOpen, setIsBlastDialogOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("loyal");
  const [blastTemplate, setBlastTemplate] = useState("Halo Kak! Terima kasih atas loyalitasnya di Veloura. Dapatkan diskon eksklusif 20% hari ini.");
  const [formData, setFormData] = useState({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });

  const handleSyncCRM = () => {
    setIsSyncing(true);
    setSyncProgress(20);
    const interval = setInterval(() => {
      setSyncProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          return 100;
        }
        return prev + 20;
      });
    }, 250);
  };

  const handleOpenCreateMode = () => {
    setIsEditMode(false);
    setFormData({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEditMode = (product, index) => {
    setIsEditMode(true);
    setSelectedProductIndex(index);
    setFormData({ 
      namaProduk: product.name, 
      hargaProduk: product.price.replace(/[^0-9]/g, ""), 
      kategoriProduk: "", 
      gambarProduk: product.img 
    });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.namaProduk || !formData.hargaProduk) return;
    const formattedPrice = parseInt(formData.hargaProduk).toLocaleString("id-ID");
    const fallbackImg = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400";

    if (isEditMode && selectedProductIndex !== null) {
      const updated = [...localProducts];
      updated[selectedProductIndex] = { 
        ...updated[selectedProductIndex], 
        name: formData.namaProduk, 
        price: formattedPrice, 
        img: formData.gambarProduk || fallbackImg 
      };
      setLocalProducts(updated);
    } else {
      const newProd = { id: Date.now(), name: formData.namaProduk, price: formattedPrice, img: formData.gambarProduk || fallbackImg };
      setLocalProducts([newProd, ...localProducts]);

      setTimeout(() => {
        productSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
    setIsDialogOpen(false);
  };

  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });

  const formattedTime = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  });

  if (!currentUser) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-slate-50 font-quicksand p-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center max-w-sm space-y-4">
          <p className="text-sm font-semibold text-slate-600">Sesi Anda telah berakhir atau belum terautentikasi.</p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-[#4E5631] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
          >
            Masuk Ke Akun
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent max-w-7xl mx-auto space-y-8 font-quicksand">
        
        {/* ALWAYS VISIBLE SYSTEM ALERT */}
        <Alert className="border-none rounded-2xl py-3 px-5 bg-amber-50/70 text-amber-900 flex items-center gap-3 shadow-3xs">
          <FiShield size={14} className="text-amber-700 shrink-0" />
          <AlertDescription className="text-xs font-medium tracking-wide">
            Sistem Keamanan: Fitur mutasi repositori produk, pipeline pembaruan CRM, dan otomatisasi penyiaran promo berjalan normal di bawah otoritas sesi penuh ({currentUser.role || "Administrator"}).
          </AlertDescription>
        </Alert>

        {/* SECTION 1: HEADER & STATUS BAR WITH DATE-TIME METRICS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-slate-500 font-mono text-[11px] font-semibold tracking-wide">
              <div className="flex items-center gap-1.5 bg-slate-50 Hitung px-3 py-1 rounded-xl border border-slate-200/40">
                <FiCalendar size={12} className="text-[#A47174]" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200/40">
                <FiClock size={12} className="text-[#4E5631]" />
                <span className="tabular-nums">{formattedTime} WIB</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
                Selamat Datang, {currentUser.name || "User"}
              </h1>
            </div>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide pt-1.5 max-w-2xl">
              Panel kendali retensi pelanggan, kurasi inventaris premium, monitoring aktivitas retensi belanja, dan metrik otomasi ekosistem Veloura.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <button 
                onClick={handleOpenCreateMode}
                className="h-9 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-sm bg-[#4E5631] text-white hover:bg-[#3d4426] cursor-pointer"
              >
                <FiPlus size={13} /> Registrasi Item
              </button>
              
              <DialogContent className="sm:max-w-[360px] rounded-2xl bg-white p-6 border border-slate-100 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold font-playfair text-[#4E5631]">
                    {isEditMode ? "Ubah Detail Produk" : "Registrasi Koleksi Baru"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nama Item</label>
                    <Input name="namaProduk" value={formData.namaProduk} onChange={(e) => setFormData({...formData, namaProduk: e.target.value})} required className="rounded-xl h-9 text-xs border-slate-200" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Harga Retail (Rp)</label>
                    <Input name="hargaProduk" type="number" value={formData.hargaProduk} onChange={(e) => setFormData({...formData, hargaProduk: e.target.value})} required className="rounded-xl h-9 text-xs border-slate-200" />
                  </div>
                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                    <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 h-9 bg-slate-50 text-slate-500 text-xs font-semibold rounded-xl">Batal</button>
                    <button type="submit" className="px-4 h-9 bg-[#4E5631] text-white rounded-xl text-xs font-semibold">Simpan</button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* SECTION 2: METRICS HIGHLIGHT ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { id: "Pendapatan", title: "Revenue Volume", val: "Rp 45.850.000", badge: "+12.4%" },
            { id: "Pelanggan Aktif", title: "Active Engaged", val: "1,240 Pax", badge: "+4.8%" },
            { id: "Pelanggan Baru", title: "New Acquired", val: "+430 User", badge: "+18.2%" },
            { id: "Retention", title: "Retention Rate", val: "97.9%", badge: "Optimal" }
          ].map((item) => {
            const isSelected = activeMetricFilter === item.id;
            return (
              <div 
                key={item.id}
                onClick={() => item.id === "Retention" ? null : setActiveMetricFilter(item.id)}
                className={`bg-white p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected ? "border-[#4E5631] shadow-sm ring-1 ring-[#4E5631]/20" : "border-slate-100 hover:border-slate-300"
                }`}
              >
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-bold bg-slate-50 text-slate-600">{item.badge}</span>
                </div>
                <h3 className="text-xl font-mono font-bold text-slate-900 mt-4">{item.val}</h3>
              </div>
            );
          })}
        </div>

        {/* SECTION 3: MASTER DATA VISUALIZATION GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ANALYTICS TREND CARD (2 COLS WIDTH) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-50">
              <div className="space-y-0.5">
                <h3 className="text-sm font-bold text-slate-800 tracking-wide">Trajektori Pasar Makro</h3>
                <p className="text-[11px] text-slate-400 font-medium">Metrik Distribusi: <span className="text-[#A47174] font-bold font-mono uppercase">{activeMetricFilter}</span></p>
              </div>
              <div className="flex gap-1 bg-slate-50 p-1 rounded-xl">
                {["Q1", "Q2"].map((q) => (
                  <button 
                    key={q} 
                    onClick={() => setSelectedQuarter(q)} 
                    className={`h-7 px-3 text-[10px] font-bold rounded-lg transition-all ${selectedQuarter === q ? "bg-[#4E5631] text-white" : "text-slate-400 hover:text-slate-600"}`}
                  >
                    Kuartal {q === "Q1" ? "I" : "II"}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="h-[220px] w-full text-[10px] font-mono font-medium pt-2">
              <ResponsiveContainer width="100%" height="100%">
                {activeMetricFilter === "Pendapatan" ? (
                  <BarChart data={crmDataQuarters[selectedQuarter]} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} formatter={(val) => `Rp ${val / 1000000}M`} />
                    <Tooltip formatter={(val) => `Rp ${val.toLocaleString("id-ID")}`} contentStyle={{fontFamily: 'Quicksand', borderRadius: '12px', fontSize: '11px', border: '1px solid #f1f5f9'}} />
                    <Bar dataKey="Pendapatan" fill="#4E5631" radius={[4, 4, 0, 0]} barSize={24} />
                  </BarChart>
                ) : (
                  <AreaChart data={crmDataQuarters[selectedQuarter]} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4E5631" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4E5631" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f8fafc" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                    <Tooltip contentStyle={{fontFamily: 'Quicksand', borderRadius: '12px', fontSize: '11px', border: '1px solid #f1f5f9'}} />
                    <Area type="monotone" dataKey={activeMetricFilter} stroke="#4E5631" strokeWidth={2} fill="url(#chartGlow)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* DONUT CHART: SEGMENTASI KONSUMEN (1 COL WIDTH) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between space-y-4">
            <div className="border-b border-slate-50 pb-2">
              <h3 className="text-sm font-bold text-slate-800 tracking-wide">Segmentasi Konsumen</h3>
              <p className="text-[11px] text-slate-400 font-medium">Distribusi Berdasarkan Loyalitas</p>
            </div>
            
            <div className="h-[160px] w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegmentationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {customerSegmentationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{fontFamily: 'Quicksand', borderRadius: '12px', fontSize: '11px', border: '1px solid #f1f5f9'}} />
                </PieChart>
              </ResponsiveContainer>
              {/* Text indicator di tengah lingkaran donut */}
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total</span>
                <span className="text-base font-mono font-bold text-slate-800">1,240</span>
              </div>
            </div>

            {/* Custom Legend Keterangan Warna */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-50 text-[10px] font-medium text-slate-600">
              {customerSegmentationData.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.color }}></span>
                    <span className="truncate max-w-[65px] text-slate-500">{item.name}</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 mt-0.5">{item.value} Pax</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: INTERACTIVE BROADCAST PIPELINE */}
        <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-slate-200/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1 max-w-2xl">
            <span className="text-[9px] font-bold text-[#A47174] uppercase tracking-widest">Otomatisasi Kampanye</span>
            <h3 className="text-sm font-bold font-playfair text-slate-800 tracking-wide">Target Distribusi Omnichannel & Siaran Massa</h3>
            <p className="text-slate-500 text-xs font-medium leading-relaxed">
              Modul pengiriman katalog eksklusif, voucer apresiasi loyalitas, dan pemberitahuan rilis privat secara serentak ke berbagai klaster pelanggan Veloura.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-3 shrink-0 sm:w-auto w-full">
            <Dialog open={isBlastDialogOpen} onOpenChange={setIsBlastDialogOpen}>
              <button 
                onClick={() => setIsBlastDialogOpen(true)}
                className="h-9 px-5 rounded-xl text-xs font-semibold tracking-wide border transition-all bg-white text-slate-700 border-slate-200 hover:border-slate-300 cursor-pointer shadow-3xs"
              >
                Simulasi Siaran Promo
              </button>
              
              <DialogContent className="sm:max-w-[380px] rounded-2xl bg-white p-6 border border-slate-100 font-quicksand">
                <DialogHeader>
                  <DialogTitle className="text-base font-bold text-[#4E5631] font-playfair">Konfigurasi Target Massa</DialogTitle>
                </DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); setIsBlastDialogOpen(false); }} className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Klaster Konsumen</label>
                    <Select value={selectedSegment} onValueChange={setSelectedSegment}>
                      <SelectTrigger className="rounded-xl h-9 text-xs border-slate-200"><SelectValue /></SelectTrigger>
                      <SelectContent className="bg-white border-slate-200 rounded-xl">
                        <SelectItem value="loyal" className="text-xs">Klaster Pelanggan Loyal</SelectItem>
                        <SelectItem value="new" className="text-xs">Klaster Registrasi Baru</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Konten Pesan</label>
                    <textarea value={blastTemplate} onChange={(e) => setBlastTemplate(e.target.value)} className="w-full text-xs p-3 border border-slate-200 rounded-xl h-20 focus:outline-none" />
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <button type="button" onClick={() => setIsBlastDialogOpen(false)} className="px-4 h-9 bg-slate-100 text-slate-500 text-xs font-semibold rounded-xl">Batal</button>
                    <button type="submit" className="px-4 h-9 bg-[#4E5631] text-white rounded-xl text-xs font-semibold">Tembakkan Konten</button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <button 
              onClick={() => alert("Mengatur Segmen...")}
              className="h-9 px-5 rounded-xl text-xs font-semibold text-white tracking-wide transition-all bg-[#4E5631] hover:bg-[#3d4426] cursor-pointer text-center"
            >
              Kelola Segmentasi
            </button>
          </div>
        </div>

        {/* SECTION 5: INVENTORY & AUXILIARY METRICS FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PRODUCT COLLECTION FEED (2 COLS WIDTH) */}
          <div ref={productSectionRef} className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 space-y-4 scroll-mt-6 transition-all duration-500">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Kurasi Item Terpopuler</h3>
              <button 
                onClick={() => setLocalProducts([...localProducts].reverse())} 
                className="text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg hover:bg-slate-100 transition-all"
              >
                Inversi Urutan
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProducts.map((product, index) => (
                <div key={product.id || index} className="bg-white p-3 rounded-xl border border-slate-100 shadow-3xs hover:border-slate-200 transition-colors">
                  <ProductCard id={product.id} name={product.name} price={product.price} imgSrc={product.img} onEdit={() => handleOpenEditMode(product, index)} />
                </div>
              ))}
            </div>
          </div>

          {/* SYSTEM PIPELINE & ALERTS (1 COL WIDTH) */}
          <div className="space-y-6">
            
            {/* REALTIME LOG */}
            <div className="bg-white p-4 rounded-2xl border border-slate-100">
              <CustomerActivityList />
            </div>

            {/* INTEGRITY PIPELINE */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span className="tracking-wide">Integritas Basis Data</span>
                <button 
                  disabled={isSyncing} 
                  onClick={handleSyncCRM} 
                  className={`text-[#4E5631] flex items-center gap-1.5 text-[11px] font-bold hover:opacity-80 transition-opacity ${isSyncing ? "animate-spin" : ""}`}
                >
                  <FiRefreshCw size={11} /> {isSyncing ? "Sync..." : "Refresh"}
                </button>
              </div>
              <Progress value={syncProgress} className="h-1 bg-slate-100" />
              <div className="flex justify-between items-center text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">
                <span>Core Engine System</span>
                <span>{syncProgress}% Sync</span>
              </div>
            </div>

            {/* AUXILIARY REVIEWS & ALERTS */}
            <div className="space-y-4">
              <StockAlertCard />
              <ReviewHighlightCard reviewer="Alexandra V." review="Blouse sutra sangat mewah dan jahitan rapi!" />
            </div>
          </div>

        </div>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;