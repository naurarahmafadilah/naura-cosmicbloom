import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FaArrowLeft, FaBox, FaMapMarkerAlt, FaCreditCard, 
  FaTruck, FaRegCalendarAlt, FaUser, FaBarcode, 
  FaEdit, FaCheckCircle, FaRoute, FaHashtag, FaSave, FaTimes 
} from "react-icons/fa";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI
// ==========================================
import { Badge } from "../components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "../components/ui/dialog";
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
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import InputField from "../components/InputField"; // Form input komponen utilitas Anda
import ordersData from "../data/Orders.json";

const OrderDetail = () => {
  const { id } = useParams();
  
  // State manajemen manifest data pesanan dinamis
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");

  // State lokal kontrol dialog manifest logistik
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const [openResiModal, setOpenResiModal] = useState(false);

  // Efek inisialisasi memuat entitas berdasarkan ID parameter URL
  useEffect(() => {
    const foundOrder = ordersData.find((o) => o.id === id);
    if (foundOrder) {
      setCurrentOrder(foundOrder);
      setAddressInput(foundOrder.address || "");
    }
  }, [id]);

  // Jika data transaksi tidak ditemukan (Handling Error Admin)
  if (!currentOrder) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand">
          <h2 className="font-playfair text-3xl text-primary-dark">Manifest Pesanan Tidak Ditemukan</h2>
          <p className="text-xs text-primary-dark/40 mt-1">ID Transaksi tidak terdaftar atau telah diarsipkan oleh sistem.</p>
          <Link to="/orders" className="text-secondary-light font-bold text-xs uppercase tracking-wider underline mt-4 inline-block hover:text-primary-dark transition-colors">
            Kembali ke Daftar Pesanan
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Handler update status pesanan dari dropdown menu kontrol admin
  const handleStatusChange = (newStatus) => {
    setCurrentOrder((prev) => ({ ...prev, status: newStatus }));
  };

  // Handler simpan perubahan data alamat domestik
  const handleSaveAddress = (e) => {
    e.preventDefault();
    setCurrentOrder((prev) => ({ ...prev, address: addressInput }));
    setIsEditingAddress(false);
  };

  // Penyesuai warna badge status audit berbasis Shadcn UI untuk back-office Veloura
  const renderStatusBadge = (status) => {
    switch (status) {
      case "Completed": 
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50 rounded-lg text-[10px] font-bold uppercase tracking-wider px-3 py-1 border shadow-none font-mono">
            Selesai
          </Badge>
        );
      case "Pending": 
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50 rounded-lg text-[10px] font-bold uppercase tracking-wider px-3 py-1 border shadow-none font-mono">
            Menunggu
          </Badge>
        );
      case "Cancelled": 
        return (
          <Badge className="bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-100 rounded-lg text-[10px] font-bold uppercase tracking-wider px-3 py-1 border shadow-none font-mono line-through">
            Dibatalkan
          </Badge>
        );
      default: 
        return (
          <Badge className="bg-bg-soft text-primary-dark/60 border-border-subtle hover:bg-bg-soft rounded-lg text-[10px] font-bold uppercase tracking-wider px-3 py-1 border shadow-none font-mono">
            {status}
          </Badge>
        );
    }
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Manajemen Manifest Order"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Daftar Pesanan", link: "/orders" },
            { label: currentOrder.id }
          ]}
        />

        <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-0">
          
          {/* Top Admin Action Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 font-quicksand">
            <Link 
              to="/orders" 
              className="inline-flex items-center gap-2 text-secondary-dark/50 text-[10px] font-bold uppercase tracking-widest hover:text-secondary-light transition-colors"
            >
              <FaArrowLeft className="text-[9px]" /> Kembali ke Log Transaksi
            </Link>

            {/* QUICK CONTROL STATUS SYSTEM */}
            <div className="flex items-center gap-3 bg-white border border-border-subtle rounded-2xl px-4 py-2 shadow-sm w-full sm:w-auto">
              <span className="text-xs font-bold text-primary-dark/60 whitespace-nowrap">Otoritas Status:</span>
              <Select value={currentOrder.status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-[140px] h-8 bg-bg-main border-none text-xs font-mono font-bold text-slate-900 rounded-lg focus:ring-1 focus:ring-primary-light">
                  <SelectValue placeholder="Ubah Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
                  <SelectItem value="Pending" className="text-xs font-bold text-amber-700 focus:bg-amber-50 rounded-lg cursor-pointer">Pending</SelectItem>
                  <SelectItem value="Completed" className="text-xs font-bold text-emerald-700 focus:bg-emerald-50 rounded-lg cursor-pointer">Completed</SelectItem>
                  <SelectItem value="Cancelled" className="text-xs font-bold text-slate-500 focus:bg-slate-100 rounded-lg cursor-pointer">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* UTAMA: PANEL INVOICE AUDIT SYSTEM */}
          <div className="bg-white rounded-[35px] border border-primary-light/10 overflow-hidden shadow-veloura">
            
            {/* Top Info Bar Master Node */}
            <div className="bg-bg-main/40 p-8 border-b border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-mono font-bold text-primary-dark/40 uppercase tracking-widest bg-bg-main border border-border-subtle px-2 py-0.5 rounded">
                  Arsip Dokumen Finansial
                </span>
                <h2 className="text-2xl font-playfair text-primary-dark mt-1.5">{currentOrder.id}</h2>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-primary-dark/40 font-quicksand mt-1">
                  <p className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-[10px]" /> Waktu Transaksi: {currentOrder.date}</p>
                  <p className="flex items-center gap-1.5"><FaUser className="text-[10px]" /> ID Pembeli: {currentOrder.customer}</p>
                </div>
              </div>
              
              <div>
                {renderStatusBadge(currentOrder.status)}
              </div>
            </div>

            {/* Grid Konten Pemrosesan */}
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle/70">
              
              {/* SISI KIRI: DATA ITEM & BREAKDOWN AUDIT NOMINAL */}
              <div className="lg:col-span-7 p-8 space-y-8">
                <div>
                  <h4 className="font-playfair text-lg text-primary-dark flex items-center gap-2.5 mb-4">
                    <FaBox className="text-secondary-light text-sm" /> Rincian Muatan Produk
                  </h4>
                  
                  {/* Kartu Komponen Produk */}
                  <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-bg-main/20 border border-border-subtle/60">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-border-subtle shrink-0 bg-white">
                      <img 
                        src={currentOrder.img} 
                        alt={currentOrder.product} 
                        className="w-full h-full object-cover" 
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";
                        }}
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h5 className="font-playfair text-lg text-primary-dark leading-snug">{currentOrder.product}</h5>
                        <p className="text-xs font-quicksand text-primary-dark/40 mt-1">Volume Alokasi: 1 Unit</p>
                      </div>
                      <p className="font-quicksand font-bold text-primary-dark text-base mt-2 sm:mt-0">
                        <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span> {currentOrder.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rincian Finansial Rekonsiliasi */}
                <div className="border-t border-border-subtle/60 pt-6 font-quicksand space-y-3 text-xs">
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Subtotal Nilai Barang</span>
                    <span>Rp {currentOrder.price}</span>
                  </div>
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Subsidi Ongkos Kirim ({currentOrder.shipping})</span>
                    <span className="text-secondary-light uppercase font-bold text-[10px] tracking-wider">Toko Bebas Ongkir</span>
                  </div>
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Pajak Konsumsi (PPN) & Biaya Gerbang Tol</span>
                    <span>Rp 0</span>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: INSTRUKSI LOGISTIK & VALIDASI GATEWAY */}
              <div className="lg:col-span-5 p-8 space-y-8 font-quicksand">
                {/* Alamat Penerima dengan fitur Edit Inline */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                      <FaMapMarkerAlt className="text-secondary-light text-xs" /> Alamat Pengiriman Domestik
                    </h4>
                    {!isEditingAddress && (
                      <button 
                        onClick={() => setIsEditingAddress(true)}
                        className="text-[10px] text-secondary-light font-bold flex items-center gap-1 hover:text-primary-dark transition-colors cursor-pointer"
                      >
                        <FaEdit size={10} /> Ubah
                      </button>
                    )}
                  </div>
                  
                  <div className="pl-5 text-sm text-primary-dark/60 leading-relaxed border-l border-border-subtle relative">
                    <p className="font-bold text-primary-dark mb-0.5">{currentOrder.customer}</p>
                    
                    {isEditingAddress ? (
                      <form onSubmit={handleSaveAddress} className="mt-2 space-y-2 animate-fade-in">
                        <textarea
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                          className="w-full text-xs p-2.5 border border-slate-300 rounded-xl focus:outline-none focus:border-primary-dark text-primary-dark font-quicksand bg-bg-main/30"
                          rows={3}
                          required
                        />
                        <div className="flex gap-2 justify-end">
                          <button 
                            type="button" 
                            onClick={() => { setIsEditingAddress(false); setAddressInput(currentOrder.address); }}
                            className="p-1.5 bg-bg-soft text-slate-700 rounded-lg hover:bg-border-subtle transition-colors cursor-pointer"
                          >
                            <FaTimes size={10} />
                          </button>
                          <button 
                            type="submit" 
                            className="p-1.5 bg-secondary-light text-white rounded-lg hover:bg-hover-rose transition-colors cursor-pointer"
                          >
                            <FaSave size={10} />
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-xs">{currentOrder.address}</p>
                    )}
                  </div>
                </div>

                {/* Informasi Kurir & Kode Resi */}
                <div className="space-y-2">
                  <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <FaTruck className="text-secondary-light text-xs" /> Rekomendasi Ekspedisi Mitra
                  </h4>
                  <div className="pl-5 border-l border-border-subtle space-y-2.5">
                    <div>
                      <span className="text-[10px] bg-bg-main border border-border-subtle px-2.5 py-1 rounded-md font-mono font-bold text-primary-dark/60 uppercase tracking-wider">
                        {currentOrder.shipping}
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-dark/40 flex items-center gap-1.5">
                      <FaBarcode /> ID Pelacakan Manifest: <span className="font-mono font-bold text-primary-dark">VLR-{currentOrder.id}</span>
                    </p>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="space-y-2">
                  <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <FaCreditCard className="text-secondary-light text-xs" /> Kluster Settlement Transaksi
                  </h4>
                  <div className="pl-5 text-xs text-primary-dark/70 font-mono tracking-widest uppercase border-l border-border-subtle">
                    {currentOrder.payment}
                  </div>
                </div>
              </div>

            </div>

            {/* PANEL AKSI DAN TOTAL SETTLEMENT ADMIN */}
            <div className="p-8 bg-primary-dark text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/10">
              <div className="font-playfair">
                <span className="text-lg italic text-white/90">Total Nilai Penjualan</span>
                <p className="text-[10px] font-quicksand tracking-wider text-white/40 uppercase mt-0.5">
                  Telah Di-settle otomatis via kanal {currentOrder.payment}
                </p>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right font-quicksand">
                  <span className="text-2xl sm:text-3xl font-bold tracking-wide flex items-baseline">
                    <span className="text-xs sm:text-sm font-normal text-secondary-light mr-1">Rp</span>
                    {currentOrder.price}
                  </span>
                </div>
                
                <div className="flex gap-2 font-quicksand">
                  
                  {/* MODAL DIALOG SHADCN: UBAH RUTE */}
                  <Dialog open={openRouteModal} onOpenChange={setOpenRouteModal}>
                    <DialogTrigger asChild>
                      <button className="bg-white text-primary-dark px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-bg-main transition-all cursor-pointer shadow-md">
                        <FaEdit size={10} /> Ubah Rute
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-3xl border border-border-subtle max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="font-playfair text-lg flex items-center gap-2 text-primary-dark">
                          <FaRoute className="text-secondary-light" /> Pengalihan Rute Kurir
                        </DialogTitle>
                        <DialogDescription className="text-xs font-quicksand pt-2 text-slate-500 leading-relaxed">
                          Anda sedang mencoba merubah manifestasi logs domestik untuk pelanggan <strong>{currentOrder.customer}</strong>. Fitur rute kurir fisik eksternal terkunci otomatis untuk menjaga validitas logistik gateway utama.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end pt-4">
                        <button onClick={() => setOpenRouteModal(false)} className="px-4 py-2 bg-bg-soft rounded-xl text-xs font-bold text-primary-dark/80 hover:bg-border-subtle transition-colors cursor-pointer">
                          Mengerti
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* MODAL DIALOG SHADCN: VALIDASI RESI */}
                  <Dialog open={openResiModal} onOpenChange={setOpenResiModal}>
                    <DialogTrigger asChild>
                      <button className="bg-secondary-light text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-secondary-light/90 transition-all cursor-pointer shadow-md">
                        <FaCheckCircle size={10} /> Validasi Resi
                      </button>
                    </DialogTrigger>
                    <DialogContent className="bg-white p-6 rounded-3xl border border-border-subtle max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="font-playfair text-lg flex items-center gap-2 text-primary-dark">
                          <FaHashtag className="text-secondary-light" /> Status Validasi Resi
                        </DialogTitle>
                        <DialogDescription className="text-xs font-quicksand pt-2 text-slate-500 leading-relaxed">
                          Sistem mendeteksi resi <strong>VLR-{currentOrder.id}</strong> menggunakan metode kirim otomatis via ekspedisi <strong>{currentOrder.shipping}</strong> dengan status audit saat ini: <strong className="text-secondary-light">{currentOrder.status}</strong>.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex justify-end pt-4">
                        <button onClick={() => setOpenResiModal(false)} className="px-4 py-2 bg-primary-dark text-white rounded-xl text-xs font-bold hover:bg-hover-green transition-colors cursor-pointer">
                          Selesai Audit
                        </button>
                      </div>
                    </DialogContent>
                  </Dialog>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="mt-16">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default OrderDetail;