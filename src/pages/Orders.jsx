import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI
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
// 2. LAYOUT & DATA SOURCE EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import ordersData from "../data/Orders.json"; 

const Orders = () => {
  // State lokal manajemen data manifest pesanan dinamis
  const [orders, setOrders] = useState(ordersData || []);
  
  // State lokal untuk menyaring status pesanan yang aktif dipilih admin
  const [activeTab, setActiveTab] = useState("all");

  // Handler untuk memperbarui status pesanan secara instan lewat baris item katalog
  const handleInlineStatusChange = (orderId, newStatus) => {
    const updatedOrders = orders.map((order) => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Pemetaan badge status berbasis sistem klasifikasi warna Veloura yang kontras tinggi
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": 
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-50 rounded-lg text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border shadow-none">
            Completed
          </Badge>
        );
      case "Pending": 
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-50 rounded-lg text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border shadow-none">
            Pending
          </Badge>
        );
      case "Cancelled": 
        return (
          <Badge className="bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100 rounded-lg text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border line-through shadow-none">
            Cancelled
          </Badge>
        );
      default: 
        return (
          <Badge className="bg-bg-soft text-primary-dark/60 border-border-subtle hover:bg-bg-soft rounded-lg text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 border shadow-none">
            {status}
          </Badge>
        );
    }
  };

  // Fungsi penyaringan data berdasarkan tab status aktif
  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <DashboardContainer>
      <div className="space-y-12 animate-fade-in pb-10 text-primary-dark">
        
        {/* ADMIN CONTROL TOP BAR */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
          <div>
            <PageHeader
              title="My Orders"
              breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Pesanan" }]}
            />
          </div>

          {/* Info Kontrol Data Pesanan */}
          <div className="flex items-center gap-3 font-quicksand">
            <p className="text-[10px] font-bold uppercase tracking-[2px] text-primary-dark/60 bg-white border border-border-subtle px-4 py-2.5 rounded-full shadow-sm">
              Total: {orders.length} Invoice Data
            </p>
          </div>
        </div>

        {/* HEADER JUDUL & SHADCN TABS CONTROLLER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 px-2">
          <div className="space-y-2">
            <h2 className="text-4xl font-playfair text-primary-dark leading-tight">
              Riwayat <span className="italic text-secondary-light">Pesanan</span>
            </h2>
            <p className="text-primary-dark/60 font-quicksand text-sm max-w-xl">
              Pantau status pengiriman dan detail pembelian Anda secara real-time melalui sistem manajemen internal.
            </p>
          </div>

          {/* SHADCN INTERACTIVE TABS FILTER */}
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="bg-bg-soft/60 p-1 rounded-xl border border-border-subtle grid grid-cols-4 lg:flex gap-1">
              <TabsTrigger value="all" className="rounded-lg text-xs font-bold font-quicksand px-4 py-2 text-primary-dark/60 data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:shadow-sm">
                All
              </TabsTrigger>
              <TabsTrigger value="pending" className="rounded-lg text-xs font-bold font-quicksand px-4 py-2 text-primary-dark/60 data-[state=active]:bg-white data-[state=active]:text-amber-700 data-[state=active]:shadow-sm">
                Pending
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg text-xs font-bold font-quicksand px-4 py-2 text-primary-dark/60 data-[state=active]:bg-white data-[state=active]:text-emerald-700 data-[state=active]:shadow-sm">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="rounded-lg text-xs font-bold font-quicksand px-4 py-2 text-primary-dark/60 data-[state=active]:bg-white data-[state=active]:text-slate-500 data-[state=active]:shadow-sm">
                Cancelled
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* LIST INVOICE ORDERS */}
        <div className="grid gap-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-[35px] border border-primary-light/10 shadow-veloura hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,86,49,0.06)] hover:border-secondary-light/30 transition-all duration-500 ease-out"
              >
                {/* Thumbnail Image */}
                <div className="relative shrink-0 overflow-hidden rounded-[24px] w-28 h-28 border border-border-subtle bg-bg-soft shadow-inner">
                  <img 
                    src={item.img} 
                    alt={item.product} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-primary-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info Metadata Pesanan */}
                <div className="flex-1 text-center md:text-left space-y-2 w-full">
                  <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center md:justify-start">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-primary-dark/50 bg-bg-soft border border-border-subtle px-2 py-0.5 rounded">
                      {item.id}
                    </span>
                    {/* Render badge dinamis berdasarkan data status */}
                    {getStatusBadge(item.status)}
                  </div>
                  
                  <h3 className="text-xl font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                    {item.product}
                  </h3>
                  
                  <p className="text-xs font-quicksand text-primary-dark/60">
                    {item.date} <span className="text-border-subtle mx-1">|</span> Pelanggan: <span className="font-semibold text-primary-dark">{item.customer}</span>
                  </p>
                </div>

                {/* Inline Action & Price Control */}
                <div className="shrink-0 flex flex-col items-center md:items-end gap-3 font-quicksand w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-dashed border-border-subtle">
                  <p className="text-xl font-bold text-primary-dark transition-transform duration-300 group-hover:scale-[1.02]">
                    <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                    {item.price}
                  </p>
                  
                  <div className="flex items-center gap-4 w-full justify-between md:justify-end">
                    {/* INLINE STATUS SELECT TRIGGER */}
                    <div className="flex items-center gap-1.5 bg-bg-main rounded-xl px-2.5 py-1 border border-border-subtle/40 shadow-inner">
                      <span className="text-[10px] font-bold text-primary-dark/40 uppercase tracking-wider">Aksi:</span>
                      <Select 
                        value={item.status} 
                        onValueChange={(newStatus) => handleInlineStatusChange(item.id, newStatus)}
                      >
                        <SelectTrigger className="w-[105px] h-6 bg-transparent border-none text-[11px] font-mono font-bold text-slate-800 p-0 shadow-none focus:ring-0">
                          <SelectValue placeholder="Ubah Status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
                          <SelectItem value="Pending" className="text-xs font-bold text-amber-700 focus:bg-amber-50 rounded-lg cursor-pointer">Pending</SelectItem>
                          <SelectItem value="Completed" className="text-xs font-bold text-emerald-700 focus:bg-emerald-50 rounded-lg cursor-pointer">Completed</SelectItem>
                          <SelectItem value="Cancelled" className="text-xs font-bold text-slate-500 focus:bg-slate-100 rounded-lg cursor-pointer">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Link 
                      to={`/orders/${item.id}`} 
                      className="text-[10px] font-bold text-secondary-light uppercase tracking-widest border-b-2 border-secondary-light/10 hover:border-secondary-light hover:text-hover-rose transition-all pb-1 cursor-pointer whitespace-nowrap"
                    >
                      Detail Pesanan
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 bg-white border border-dashed border-border-subtle rounded-[35px]">
              <p className="text-sm font-quicksand text-primary-dark/40 font-medium">
                Tidak ada riwayat invoice data untuk status "{activeTab}"
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default Orders;