import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  User, 
  FolderOpen, 
  ArrowRightCircle, 
  Eye,
  SlidersHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
  Search,
  TrendingUp,
  PackageCheck,
  PackageX,
  ChevronRight,
  Filter
} from "lucide-react";

// ==========================================
// INTEGRASI KOMPONEN SHADCN UI
// ==========================================
import { Badge } from "../components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// ==========================================
// DATA SOURCE & LAYOUT
// ==========================================
import ordersData from "../data/Orders.json"; 
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(ordersData || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  const handleInlineStatusChange = (orderId, newStatus) => {
    setOrders(prev => prev.map((order) => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Menghitung data analitik untuk statistik card secara dinamis
  const analytics = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter(o => (o.status || "").toLowerCase() === "pending").length;
    const completed = orders.filter(o => (o.status || "").toLowerCase() === "completed").length;
    
    const revenue = orders
      .filter(o => (o.status || "").toLowerCase() === "completed")
      .reduce((sum, o) => {
        if (!o.price) return sum;
        const num = typeof o.price === "number" ? o.price : Number(o.price.toString().replace(/\./g, "").replace(/[^0-9]/g, ""));
        return sum + (isNaN(num) ? 0 : num);
      }, 0);

    return { total, pending, completed, revenue };
  }, [orders]);

  const getStatusBadge = (status) => {
    const currentStatus = status ? status.toLowerCase() : "";
    switch (currentStatus) {
      case "completed": 
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 rounded-full text-[10px] font-semibold tracking-wide px-3 py-1 border shadow-none flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Completed
          </Badge>
        );
      case "pending": 
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50 rounded-full text-[10px] font-semibold tracking-wide px-3 py-1 border shadow-none flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
          </Badge>
        );
      case "cancelled": 
        return (
          <Badge className="bg-rose-50 text-rose-600 border-rose-100 hover:bg-rose-50 rounded-full text-[10px] font-semibold tracking-wide px-3 py-1 border shadow-none flex items-center gap-1.5 w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span> Cancelled
          </Badge>
        );
      default: 
        return (
          <Badge className="bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-50 rounded-full text-[10px] font-semibold tracking-wide px-3 py-1 border shadow-none w-fit">
            {status || "Unknown"}
          </Badge>
        );
    }
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = orders.filter((order) => {
      const productName = order.product || order.name || "";
      const customerName = order.customer || "";
      const orderStatus = order.status || "";
      const orderId = order.id ? order.id.toString() : "";

      const matchesTab = activeTab === "all" || orderStatus.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch = productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            orderId.includes(searchTerm);
      return matchesTab && matchesSearch;
    });

    const parsePrice = (priceVal) => {
      if (!priceVal) return 0;
      if (typeof priceVal === "number") return priceVal;
      return Number(priceVal.toString().replace(/\./g, "").replace(/[^0-9]/g, ""));
    };

    if (sortBy === "price-low") {
      result.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    } else if (sortBy === "alpha") {
      result.sort((a, b) => {
        const nameA = a.product || a.name || "";
        const nameB = b.product || b.name || "";
        return nameA.localeCompare(nameB);
      });
    }

    return result;
  }, [orders, searchTerm, activeTab, sortBy]);

  const statuses = ["all", "pending", "completed", "cancelled"];

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Sistem Manajemen Manifes Pesanan
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
              Panel kendali pelacakan transaksi kargo Veloura. Pantau status invoice masuk, otorisasi riwayat manifes pelanggan, serta kurasi alokasi pengiriman pesanan secara aktual.
            </p>
          </div>
        </div>

        {/* METRIC ANALYTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#4E5631]/20 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Revenue (Selesai)</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp size={16} /></span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 font-mono">Rp {analytics.revenue.toLocaleString("id-ID")}</h4>
              <p className="text-[10px] text-emerald-600 font-medium mt-1">Akumulasi penjualan sukses bersih</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#4E5631]/20 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Manifes Aktif</span>
              <span className="p-2 bg-slate-50 text-slate-600 rounded-xl"><FolderOpen size={16} /></span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 font-mono">{analytics.total} <span className="text-xs text-slate-400 font-normal">Berkas</span></h4>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Total seluruh data transaksi masuk</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#4E5631]/20 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Butuh Proses</span>
              <span className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Clock size={16} /></span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 font-mono">{analytics.pending} <span className="text-xs text-slate-400 font-normal">Pesanan</span></h4>
              <p className="text-[10px] text-amber-600 font-medium mt-1">Menunggu otorisasi status admin</p>
            </div>
          </div>

          <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-xs relative overflow-hidden group hover:border-[#4E5631]/20 transition-all duration-300">
            <div className="flex justify-between items-start">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Berhasil Dikirim</span>
              <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><PackageCheck size={16} /></span>
            </div>
            <div className="mt-4">
              <h4 className="text-xl font-bold text-slate-900 font-mono">{analytics.completed} <span className="text-xs text-slate-400 font-normal">Selesai</span></h4>
              <p className="text-[10px] text-emerald-600 font-medium mt-1">Selesai serah terima logistik</p>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          {/* Tabs Filter (Left Side) */}
          <div className="w-full lg:w-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-[#FAF9F5]/90 p-1 rounded-xl border border-slate-200/40 w-full md:w-auto flex flex-row gap-1 h-auto overflow-x-auto">
                {statuses.map((status) => (
                  <TabsTrigger 
                    key={status}
                    value={status} 
                    className="rounded-lg text-[10px] font-bold px-4 py-2 text-slate-400 data-[state=active]:bg-[#4E5631] data-[state=active]:text-white data-[state=active]:shadow-sm transition-all uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    {status === "all" ? "Semua Manifes" : status}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Search and Sort (Right Side) */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto flex-1 justify-end">
            <div className="relative w-full sm:max-w-xs flex items-center">
              <Search className="absolute left-3.5 text-slate-400" size={13} />
              <input
                type="text"
                placeholder="Cari manifest data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-slate-50/60 border border-slate-200/80 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/60 focus:bg-white transition-all placeholder-slate-400"
              />
            </div>

            <div className="flex items-center gap-1 bg-white rounded-xl px-3 h-9 border border-slate-200 hover:border-[#4E5631]/30 transition-colors w-full sm:w-auto min-w-[150px]">
              <SlidersHorizontal size={11} className="text-slate-400 shrink-0 mr-1" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full bg-transparent border-none text-[11px] font-semibold text-slate-600 p-0 shadow-none focus:ring-0 cursor-pointer flex justify-between items-center">
                  <SelectValue placeholder="Urutkan Ragam" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
                  <SelectItem value="default" className="text-[11px] font-medium text-slate-500 rounded-lg p-1.5 cursor-pointer">Standar Data</SelectItem>
                  <SelectItem value="price-low" className="text-[11px] font-medium text-slate-700 rounded-lg p-1.5 cursor-pointer">Harga: Rendah - Tinggi</SelectItem>
                  <SelectItem value="price-high" className="text-[11px] font-medium text-slate-700 rounded-lg p-1.5 cursor-pointer">Harga: Tinggi - Rendah</SelectItem>
                  <SelectItem value="alpha" className="text-[11px] font-medium text-slate-700 rounded-lg p-1.5 cursor-pointer">Produk: A - Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* MODERN LIST TABLE VIEW */}
        {filteredAndSortedOrders.length > 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    <th className="py-4 px-6">Info Item & Invoice</th>
                    <th className="py-4 px-3">Tanggal</th>
                    <th className="py-4 px-3">Nama Pembeli</th>
                    <th className="py-4 px-3 text-center">Status Transaksi</th>
                    <th className="py-4 px-3 text-right">Nilai Total</th>
                    <th className="py-4 px-6 text-center">Aksi Manifes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAndSortedOrders.map((item) => {
                    const productName = item.product || item.name || "Premium Item";
                    const productImg = item.img || item.image || "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";

                    return (
                      <tr key={item.id} className="group hover:bg-slate-50/40 transition-colors duration-200">
                        {/* Kolom 1: Item Info */}
                        <td className="py-4 px-6 flex items-center gap-4">
                          <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 aspect-[3/4]">
                            <img 
                              src={productImg} 
                              alt={productName}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80"; }}
                            />
                          </div>
                          <div className="truncate max-w-[220px]">
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#4E5631] transition-colors duration-150 truncate">
                              {productName}
                            </h4>
                            <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm mt-1 inline-block">
                              #{item.id}
                            </span>
                          </div>
                        </td>

                        {/* Kolom 2: Tanggal */}
                        <td className="py-4 px-3 text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-1.5 font-mono text-[11px]">
                            <Calendar size={11} className="text-slate-300" />
                            {item.date || "-"}
                          </div>
                        </td>

                        {/* Kolom 3: Pembeli */}
                        <td className="py-4 px-3 text-xs font-semibold text-slate-700">
                          <div className="flex items-center gap-1.5">
                            <User size={12} className="text-[#8C6239]/70 shrink-0" />
                            <span className="truncate max-w-[120px]">{item.customer || "Guest"}</span>
                          </div>
                        </td>

                        {/* Kolom 4: Status */}
                        <td className="py-4 px-3 text-center align-middle">
                          <div className="flex justify-center">
                            {getStatusBadge(item.status)}
                          </div>
                        </td>

                        {/* Kolom 5: Harga */}
                        <td className="py-4 px-3 text-right font-mono text-xs font-bold text-slate-900">
                          <span className="text-[10px] text-[#8C6239] font-normal mr-0.5 font-quicksand">Rp</span>
                          {typeof item.price === "number" ? item.price.toLocaleString("id-ID") : item.price}
                        </td>

                        {/* Kolom 6: Action Trigger Select */}
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
                            <div className="bg-[#FAF9F5] border border-slate-200/60 rounded-xl px-2 h-8 flex items-center w-[120px] shadow-xs hover:border-[#4E5631]/30 transition-colors">
                              <SidebarStatusSelect 
                                currentStatus={item.status || "Pending"} 
                                onStatusChange={(newStatus) => handleInlineStatusChange(item.id, newStatus)} 
                              />
                            </div>
                            
                            <button 
                              onClick={() => navigate(`/orders/${item.id}`)}
                              className="w-7 h-7 bg-slate-50 hover:bg-[#4E5631] text-slate-400 hover:text-white rounded-lg transition-all duration-300 flex items-center justify-center border border-slate-100 shadow-2xs cursor-pointer"
                              title="Lihat Detail Manifest"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Table Footer Meta */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center">
              <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                Menampilkan {filteredAndSortedOrders.length} Berkas Manifes Sesuai Penyaringan
              </p>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto px-6 shadow-2xs">
            <div className="w-12 h-12 bg-[#FAF9F5] rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400 border border-slate-50">
              <PackageX size={20} className="stroke-[1.5]" />
            </div>
            <h3 className="font-playfair text-base font-bold text-slate-800">Manifes Tidak Ditemukan</h3>
            <p className="text-xs text-slate-400 font-medium leading-relaxed mt-2">
              Kriteria pencarian data atau filter tab status yang Anda tentukan tidak menghasilkan kecocokan berkas apa pun.
            </p>
            <button 
              onClick={() => { setSearchTerm(""); setActiveTab("all"); setSortBy("default"); }}
              className="mt-6 inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-[#4E5631] text-white rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}

        <div className="pt-8">
          <Footer />
        </div>
      </div>
    </DashboardContainer>
  );
};

// Sub-komponen dropdown status yang diselaraskan dengan estetika premium table
const SidebarStatusSelect = ({ currentStatus, onStatusChange }) => {
  return (
    <Select value={currentStatus} onValueChange={onStatusChange}>
      <SelectTrigger className="w-full h-full bg-transparent border-none text-[10px] font-mono font-bold text-slate-700 p-0 shadow-none focus:ring-0 cursor-pointer flex justify-between items-center">
        <SelectValue placeholder="Ubah Status" />
      </SelectTrigger>
      <SelectContent className="bg-white border border-slate-100 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
        <SelectItem value="Pending" className="text-[11px] font-semibold text-amber-600 focus:bg-amber-50 focus:text-amber-700 rounded-lg p-2 cursor-pointer transition-colors">Pending</SelectItem>
        <SelectItem value="Completed" className="text-[11px] font-semibold text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 rounded-lg p-2 cursor-pointer transition-colors">Completed</SelectItem>
        <SelectItem value="Cancelled" className="text-[11px] font-semibold text-rose-500 focus:bg-rose-50 focus:text-rose-600 rounded-lg p-2 cursor-pointer transition-colors">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default Orders;