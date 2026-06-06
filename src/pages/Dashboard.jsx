import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

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
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
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

import { FiShield, FiLock, FiPlus, FiRefreshCw, FiClock, FiCalendar } from "react-icons/fi";

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
  
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
  const isGuest = currentUser?.role === "guest";

  // State baru untuk penanganan Tanggal dan Jam Real-time
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (isGuest) navigate("/admin/guestdashboard");
  }, [isGuest, navigate]);

  // Effect untuk memperbarui Jam setiap detik (Interval 1000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => setCurrentUser(JSON.parse(localStorage.getItem("user")));
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
    if (isGuest) return;
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
    if (isGuest) return;
    setIsEditMode(false);
    setFormData({ namaProduk: "", hargaProduk: "", kategoriProduk: "", gambarProduk: "" });
    setIsDialogOpen(true);
  };

  const handleOpenEditMode = (product, index) => {
    if (isGuest) return;
    setIsEditMode(true);
    setSelectedProductIndex(index);
    setFormData({ namaProduk: product.name, hargaProduk: product.price.replace(/\./g, ""), kategoriProduk: "", gambarProduk: product.img });
    setIsDialogOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isGuest || !formData.namaProduk || !formData.hargaProduk) return;
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
    }
    setIsDialogOpen(false);
  };

  // Formatter String untuk Hari, Tanggal, Bulan, Tahun (Lokal Indonesia)
  const formattedDate = currentTime.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Formatter String untuk Jam Menit Detik
  const formattedTime = currentTime.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent max-w-7xl mx-auto space-y-8">
        
        {/* ALWAYS VISIBLE SYSTEM ALERT */}
        <Alert className="border-none rounded-2xl py-3 px-5 bg-amber-50/70 text-amber-900 flex items-center gap-3 shadow-3xs">
          <FiShield size={14} className="text-amber-700 shrink-0" />
          <AlertDescription className="text-xs font-medium font-quicksand tracking-wide">
            Sistem Keamanan: Fitur mutasi repositori produk, pipeline pembaruan CRM, dan otomatisasi penyiaran promo dibatasi berdasarkan level hak akses aktif Anda.
          </AlertDescription>
        </Alert>

        {/* SECTION 1: HEADER & STATUS BAR WITH DATE-TIME METRICS */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200/60 pb-6">
          <div className="space-y-1.5 flex-1">
            
            {/* REAL-TIME LIVE CLOCK BADGE */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-2 text-slate-500 font-mono text-[11px] font-semibold tracking-wide">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200/40">
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
                Executive Suite Dashboard
              </h1>
              {isGuest && (
                <span className="bg-amber-50 text-amber-700 border border-amber-100 text-[10px] px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                  Guest View Only
                </span>
              )}
            </div>
            
            {/* AKSEN GARIS ESTETIK VELOURA */}
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide pt-1.5 max-w-2xl">
              Panel kendali retensi pelanggan, kurasi inventaris premium, monitoring aktivitas retensi belanja, dan metrik otomasi ekosistem Veloura.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <button 
              onClick={() => isGuest ? null : alert("📥 Report diunduh.")}
              disabled={isGuest}
              className={`h-9 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all flex items-center gap-2 ${
                isGuest ? "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed" : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 cursor-pointer shadow-3xs"
              }`}
            >
              {isGuest && <FiLock size={12} />} Ekspor Laporan
            </button>
            
            <Dialog open={isDialogOpen} onOpenChange={isGuest ? () => {} : setIsDialogOpen}>
              <button 
                onClick={handleOpenCreateMode}
                disabled={isGuest}
                className={`h-9 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all flex items-center gap-2 shadow-sm ${
                  isGuest ? "bg-slate-100 text-slate-300 cursor-not-allowed" : "bg-[#4E5631] text-white hover:bg-[#3d4426] cursor-pointer"
                }`}
              >
                {isGuest ? <FiLock size={12} /> : <FiPlus size={13} />} Registrasi Item
              </button>
              
              {!isGuest && (
                <DialogContent className="sm:max-w-[360px] rounded-2xl bg-white p-6 border border-slate-100 shadow-2xl font-quicksand">
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
              )}
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
          
          {/* ANALYTICS CARD (2 COLS WIDTH) */}
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

          {/* CRM AUTOMATION (1 COL WIDTH) */}
          <div className="bg-[#FAF9F5] p-6 rounded-2xl border border-slate-200/40 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[9px] font-bold text-[#A47174] uppercase tracking-widest">Otomatisasi Kampanye</span>
              <h3 className="text-sm font-bold font-playfair text-slate-800 tracking-wide">Target Distribusi Omnichannel</h3>
              <p className="text-slate-400 text-xs font-medium leading-relaxed">
                Modul pengiriman katalog eksklusif, voucer apresiasi loyalitas, dan pemberitahuan rilis privat secara serentak.
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <Dialog open={isBlastDialogOpen} onOpenChange={isGuest ? () => {} : setIsBlastDialogOpen}>
                <button 
                  onClick={() => isGuest ? null : setIsBlastDialogOpen(true)}
                  className={`w-full h-9 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                    isGuest ? "bg-slate-100 text-slate-300 border-transparent cursor-not-allowed" : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 cursor-pointer shadow-3xs"
                  }`}
                >
                  {isGuest ? "Sistem Siaran Terkunci" : "Simulasi Siaran Promo"}
                </button>
                
                {!isGuest && (
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
                )}
              </Dialog>

              <button 
                onClick={() => isGuest ? null : alert("Mengatur Segmen...")}
                disabled={isGuest}
                className={`w-full h-9 rounded-xl text-xs font-semibold text-white tracking-wide transition-all ${
                  isGuest ? "bg-slate-200 text-slate-400 cursor-not-allowed" : "bg-[#4E5631] hover:bg-[#3d4426] cursor-pointer"
                }`}
              >
                Kelola Segmentasi
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 4: INVENTORY & AUXILIARY METRICS FEED */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* PRODUCT COLLECTION FEED (2 COLS WIDTH) */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 space-y-4">
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
              {isGuest && (
                <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center p-4">
                  <FiLock className="w-4 h-4 text-slate-300 mb-1" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vault Protected</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span className="tracking-wide">Integritas Basis Data</span>
                <button 
                  disabled={isSyncing || isGuest} 
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