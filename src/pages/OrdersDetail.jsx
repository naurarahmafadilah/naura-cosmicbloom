import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  FaArrowLeft, FaBox, FaMapMarkerAlt, FaCreditCard, 
  FaTruck, FaRegCalendarAlt, FaUser, FaBarcode, 
  FaEdit, FaCheckCircle, FaRoute, FaHashtag, FaSave, FaTimes,
  FaClock, FaSpinner, FaCheck, FaCopy, FaStickyNote, FaPrint, FaTrash
} from "react-icons/fa";

// ==========================================
// INTEGRASI KOMPONEN SHADCN UI
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

import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";
import ordersData from "../data/Orders.json";

const OrderDetail = () => {
  const { id } = useParams();
  
  // State manajemen data pesanan
  const [currentOrder, setCurrentOrder] = useState(null);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState("");
  const [copied, setCopied] = useState(false);

  // State Fitur Catatan Internal Admin (Keren & Fungsional)
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  // State kontrol dialog manifest logistik
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const [openResiModal, setOpenResiModal] = useState(false);

  useEffect(() => {
    const foundOrder = ordersData.find((o) => o.id === id);
    if (foundOrder) {
      setCurrentOrder(foundOrder);
      setAddressInput(foundOrder.address || "");
      // Mock data catatan internal awal
      setNotes([
        { id: 1, text: "Klien meminta bungkus tambahan kain organza.", time: "10:30 WIB" }
      ]);
    }
  }, [id]);

  if (!currentOrder) {
    return (
      <DashboardContainer>
        <div className="py-24 text-center font-quicksand max-w-sm mx-auto px-4">
          <div className="w-12 h-12 bg-[#FAF9F5] border border-[#8C6239]/20 text-[#8C6239] rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
            <FaTimes size={16} />
          </div>
          <h2 className="font-playfair text-xl font-bold text-slate-900 tracking-tight">Manifest Tidak Ditemukan</h2>
          <p className="text-xs text-slate-400 mt-1.5">ID Transaksi tidak terdaftar di sistem Veloura Atelier.</p>
          <Link to="/orders" className="mt-6 inline-flex items-center gap-1.5 bg-[#4E5631] text-white px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider hover:bg-[#3d4426] transition-all shadow-sm">
            <FaArrowLeft size={10} /> Kembali ke Pesanan
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Handler Salin Alamat Pintar
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`Penerima: ${currentOrder.customer}\nAlamat: ${currentOrder.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Handler Tambah Catatan Internal
  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const timeNow = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB";
    setNotes([...notes, { id: Date.now(), text: newNote, time: timeNow }]);
    setNewNote("");
  };

  // Handler Hapus Catatan
  const handleDeleteNote = (noteId) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  // Handler Cetak / Print Mode Instan
  const handlePrintInvoice = () => {
    window.print();
  };

  const handleStatusChange = (newStatus) => {
    setCurrentOrder((prev) => ({ ...prev, status: newStatus }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    setCurrentOrder((prev) => ({ ...prev, address: addressInput }));
    setIsEditingAddress(false);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case "Completed": 
        return (
          <Badge className="bg-[#FAF9F5] text-[#4E5631] border-[#4E5631]/20 rounded-lg text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 border shadow-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#4E5631] rounded-full"></span> Selesai
          </Badge>
        );
      case "Pending": 
        return (
          <Badge className="bg-[#FAF9F5] text-[#8C6239] border-[#8C6239]/20 rounded-lg text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 border shadow-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-[#8C6239] rounded-full animate-pulse"></span> Menunggu
          </Badge>
        );
      case "Cancelled": 
        return (
          <Badge className="bg-slate-50 text-slate-400 border-slate-200 rounded-lg text-[10px] font-bold tracking-wider uppercase px-2.5 py-0.5 border shadow-none flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span> Batal
          </Badge>
        );
      default: 
        return <Badge className="bg-slate-50 text-slate-600 border-slate-200 rounded-lg text-[10px] font-bold uppercase px-2.5 py-0.5 border shadow-none">{status}</Badge>;
    }
  };

  return (
    <DashboardContainer>
      {/* STYLE CSS KHUSUS UNTUK METODE PRINT (Menyembunyikan sidebar/footer saat cetak nota belanja) */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .printable-area, .printable-area * { visibility: visible; }
          .printable-area { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="animate-fade-in pb-8 text-slate-800 relative pt-2 px-4 max-w-6xl mx-auto">
        
        {/* ==========================================
            PERBAIKAN PENGGUNAAN KOMPONEN PAGE HEADER
           ========================================== */}
        <div className="no-print">
          <PageHeader
            title="Manajemen Manifest Order"
            breadcrumbs={["Dashboard", "Pesanan", currentOrder.id]}
          />
        </div>

        <div className="max-w-7xl mx-auto mt-2 printable-area">
          
          {/* BAR AKSI ATAS - NO PRINT */}
          <div className="flex items-center justify-between font-quicksand mb-4 no-print">
            <Link to="/orders" className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#8C6239] hover:text-[#4E5631] transition-colors group">
              <FaArrowLeft className="text-[10px] transform group-hover:-translate-x-0.5 transition-transform" /> Log Transaksi
            </Link>

            <div className="flex items-center gap-2">
              {/* FITUR PRINT */}
              <button 
                onClick={handlePrintInvoice}
                className="h-7 px-2.5 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-600 hover:text-slate-900 shadow-sm flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                title="Cetak Label Nota"
              >
                <FaPrint size={11} className="text-slate-400" /> Cetak Nota
              </button>

              {/* DROPDOWN EDIT STATUS */}
              <div className="flex items-center gap-2 bg-white border border-slate-100 rounded-xl px-2.5 py-1.5 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status:</span>
                <Select value={currentOrder.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[120px] h-7 bg-[#FAF9F5]/50 border border-slate-200 text-[11px] font-bold text-slate-700 rounded-lg focus:ring-0">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-slate-100 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
                    <SelectItem value="Pending" className="text-xs font-semibold text-[#8C6239] focus:bg-[#FAF9F5] rounded-lg cursor-pointer py-1.5">Pending</SelectItem>
                    <SelectItem value="Completed" className="text-xs font-semibold text-[#4E5631] focus:bg-[#FAF9F5] rounded-lg cursor-pointer py-1.5">Completed</SelectItem>
                    <SelectItem value="Cancelled" className="text-xs font-semibold text-slate-400 focus:bg-slate-50 rounded-lg cursor-pointer py-1.5">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* WORKSPACE UTAMA */}
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            
            {/* Top Bar Master Node */}
            <div className="bg-[#FAF9F5]/60 p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[9px] font-bold text-[#8C6239] uppercase tracking-wider bg-white border border-[#8C6239]/10 px-2 py-0.5 rounded-md">
                  Arsip Dokumen Finansial
                </span>
                <h2 className="text-lg font-bold tracking-tight text-slate-900 font-quicksand mt-1.5">{currentOrder.id}</h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-slate-400 font-quicksand">
                  <p className="flex items-center gap-1"><FaRegCalendarAlt /> {currentOrder.date}</p>
                  <p className="flex items-center gap-1"><FaUser /> Klien: <span className="font-semibold text-slate-700">{currentOrder.customer}</span></p>
                </div>
              </div>
              <div>{renderStatusBadge(currentOrder.status)}</div>
            </div>

            {/* PROGRESS TRACKER VISUAL (NO PRINT) */}
            <div className="px-6 py-4 bg-white border-b border-slate-100 font-quicksand no-print">
              <div className="flex items-center justify-between max-w-md mx-auto relative py-1">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[1px] bg-slate-100 z-0"></div>
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#4E5631] z-0 transition-all duration-500 ${currentOrder.status === 'Completed' ? 'w-full' : currentOrder.status === 'Pending' ? 'w-0' : 'w-1/2'}`}></div>
                
                <div className="z-10 flex flex-col items-center">
                  <div className="w-5 h-5 rounded-full bg-[#4E5631] text-white flex items-center justify-center text-[9px] shadow-sm"><FaCheck /></div>
                  <span className="text-[10px] font-bold text-slate-700 mt-1 bg-white px-1">Dibuat</span>
                </div>
                <div className="z-10 flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] shadow-sm border transition-all ${currentOrder.status !== 'Pending' && currentOrder.status !== 'Cancelled' ? 'bg-[#4E5631] border-[#4E5631] text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                    {currentOrder.status !== 'Pending' && currentOrder.status !== 'Cancelled' ? <FaCheck /> : <FaSpinner className="animate-spin" />}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 bg-white px-1">Diproses</span>
                </div>
                <div className="z-10 flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] shadow-sm border transition-all ${currentOrder.status === 'Completed' ? 'bg-[#4E5631] border-[#4E5631] text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                    <span className="w-1.5 h-1.5 bg-current rounded-full" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-1 bg-white px-1">Selesai</span>
                </div>
              </div>
            </div>

            {/* SPLIT LAYOUT */}
            <div className="grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-100">
              
              {/* SISI KIRI: DETAIL PRODUK */}
              <div className="md:col-span-7 p-4 space-y-4">
                <div>
                  <h4 className="font-quicksand font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                    <FaBox /> Muatan Produk
                  </h4>
                  
                  <div className="flex gap-4 p-3 rounded-xl bg-[#FAF9F5]/40 border border-slate-100">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-white no-print">
                      <img src={currentOrder.img} alt={currentOrder.product} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between py-0.5 flex-1 font-quicksand">
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm leading-snug">{currentOrder.product}</h5>
                        <p className="text-[11px] text-slate-400 mt-0.5">Kuantitas: <span className="font-semibold text-slate-600">1 Unit</span></p>
                      </div>
                      <p className="font-bold text-slate-950 text-sm">
                        <span className="text-[11px] font-normal text-[#8C6239] mr-0.5">Rp</span> {currentOrder.price}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-3 font-quicksand space-y-2 text-[11px]">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal Nilai Barang</span>
                    <span className="font-semibold text-slate-700">Rp {currentOrder.price}</span>
                  </div>
                  <div className="flex justify-between text-slate-500 items-center">
                    <span>Subsidi Ongkos Kirim</span>
                    <span className="bg-[#FAF9F5] text-[#8C6239] font-bold text-[9px] tracking-wider px-2 py-0.5 rounded-md border border-[#8C6239]/10 uppercase">Bebas Ongkir</span>
                  </div>
                </div>

                {/* MEMO INTERNAL */}
                <div className="border-t border-slate-100 pt-4 font-quicksand no-print">
                  <h4 className="font-bold text-[10px] uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-2">
                    <FaStickyNote /> Memo Internal Atelier
                  </h4>
                  <form onSubmit={handleAddNote} className="flex gap-1.5 mb-2.5">
                    <input 
                      type="text" 
                      placeholder="Tambahkan catatan koordinasi tim..." 
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="flex-1 text-[11px] px-3 h-8 border border-slate-200 rounded-lg focus:outline-none focus:border-[#8C6239] bg-[#FAF9F5]/30"
                    />
                    <button type="submit" className="bg-[#8C6239] text-white px-3 text-[11px] font-bold rounded-lg hover:bg-[#73512e]">Sematkan</button>
                  </form>
                  
                  {notes.length > 0 ? (
                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                      {notes.map(note => (
                        <div key={note.id} className="flex justify-between items-start bg-slate-50 border border-slate-100 p-2 rounded-lg text-[11px]">
                          <div className="text-slate-600 leading-relaxed pr-2">
                            <span className="text-[9px] text-[#8C6239] font-bold mr-1.5 bg-white border border-[#8C6239]/10 px-1 rounded">{note.time}</span>
                            {note.text}
                          </div>
                          <button onClick={() => handleDeleteNote(note.id)} className="text-slate-300 hover:text-rose-600 transition-colors cursor-pointer p-0.5">
                            <FaTrash size={9} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-slate-400 italic">Belum ada memo internal disematkan pada manifest ini.</p>
                  )}
                </div>
              </div>

              {/* SISI KANAN: DETAIL LOGISTIK */}
              <div className="md:col-span-5 p-4 space-y-3 font-quicksand bg-[#FAF9F5]/20">
                
                {/* Alamat Penerima */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                      <FaMapMarkerAlt /> Alamat Tujuan
                    </h4>
                    <div className="flex gap-1 no-print">
                      <button 
                        onClick={handleCopyAddress}
                        className={`text-[10px] font-bold flex items-center gap-1 px-1.5 py-0.5 rounded-md border transition-all ${copied ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'}`}
                      >
                        <FaCopy size={9} /> {copied ? "Tersalin!" : "Salin Cepat"}
                      </button>
                      {!isEditingAddress && (
                        <button onClick={() => setIsEditingAddress(true)} className="text-[10px] text-[#8C6239] font-bold flex items-center gap-1 bg-[#FAF9F5] px-1.5 py-0.5 rounded-md border border-[#8C6239]/10"><FaEdit size={9} /> Ubah</button>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-slate-600">
                    <p className="font-bold text-slate-900 text-xs mb-0.5">{currentOrder.customer}</p>
                    {isEditingAddress ? (
                      <form onSubmit={handleSaveAddress} className="mt-1.5 space-y-1.5">
                        <textarea
                          value={addressInput}
                          onChange={(e) => setAddressInput(e.target.value)}
                          className="w-full text-[11px] p-2 border border-slate-200 rounded-lg bg-white text-slate-700"
                          rows={2}
                          required
                        />
                        <div className="flex gap-1 justify-end">
                          <button type="button" onClick={() => { setIsEditingAddress(false); setAddressInput(currentOrder.address); }} className="p-1 bg-slate-50 text-slate-400 rounded-md border border-slate-200"><FaTimes size={9} /></button>
                          <button type="submit" className="p-1 bg-[#4E5631] text-white rounded-md"><FaSave size={9} /></button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-[11px] text-slate-500 leading-relaxed">{currentOrder.address}</p>
                    )}
                  </div>
                </div>

                {/* Ekspedisi */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-1.5">
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <FaTruck /> Mitra Ekspedisi
                  </h4>
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <div className="text-[11px] font-bold text-slate-700">{currentOrder.shipping}</div>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <FaBarcode /> <span className="font-mono font-bold text-slate-600 bg-slate-50 px-1 py-0.5 rounded">VLR-{currentOrder.id}</span>
                    </p>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between">
                  <h4 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                    <FaCreditCard /> Gateway
                  </h4>
                  <div className="text-[11px] font-bold text-slate-700 bg-[#FAF9F5] px-2 py-0.5 rounded-md border border-[#8C6239]/10">{currentOrder.payment}</div>
                </div>
              </div>

            </div>

            {/* PANEL AKSI BAWAH */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between gap-4">
              <div className="font-quicksand">
                <span className="text-[11px] text-slate-400 block font-medium">Settlement Akhir Penjualan</span>
                <span className="text-lg sm:text-xl font-bold tracking-tight flex items-baseline">
                  <span className="text-[11px] font-normal text-slate-400 mr-0.5">Rp</span>{currentOrder.price}
                </span>
              </div>
              
              <div className="flex gap-1.5 font-quicksand no-print">
                <Dialog open={openRouteModal} onOpenChange={setOpenRouteModal}>
                  <DialogTrigger asChild>
                    <button className="bg-white text-slate-900 px-3 h-8 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-slate-100 transition-all cursor-pointer">
                      <FaRoute size={10} /> Rute
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white p-5 rounded-2xl border border-slate-100 max-w-xs z-[99999]">
                    <DialogHeader>
                      <DialogTitle className="font-quicksand font-bold text-sm flex items-center gap-1.5 text-slate-900"><FaRoute /> Pengalihan Logistik</DialogTitle>
                      <DialogDescription className="text-[11px] pt-1.5 text-slate-400 leading-relaxed">Pengalihan rute fisik dikunci sementara demi proteksi jalur distribusi utama Veloura Atelier.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end pt-2">
                      <button onClick={() => setOpenRouteModal(false)} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-lg text-[11px] font-bold">Mengerti</button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog open={openResiModal} onOpenChange={setOpenResiModal}>
                  <DialogTrigger asChild>
                    <button className="bg-[#4E5631] text-white px-3 h-8 rounded-lg text-[11px] font-bold flex items-center gap-1 hover:bg-[#3d4426] transition-all cursor-pointer">
                      <FaCheckCircle size={10} /> Validasi Resi
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white p-5 rounded-2xl border border-slate-100 max-w-xs z-[99999]">
                    <DialogHeader>
                      <DialogTitle className="font-quicksand font-bold text-sm flex items-center gap-1.5 text-slate-900"><FaHashtag className="text-[#8C6239]" /> Audit Resi</DialogTitle>
                      <DialogDescription className="text-[11px] pt-1.5 text-slate-400 leading-relaxed">Token pelacakan <strong className="font-mono text-slate-700">VLR-{currentOrder.id}</strong> sinkron dengan kurir {currentOrder.shipping}.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-end pt-2">
                      <button onClick={() => setOpenResiModal(false)} className="px-3 py-1.5 bg-[#4E5631] text-white rounded-lg text-[11px] font-bold">Selesai Audit</button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL - NO PRINT */}
        <div className="mt-8 no-print">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default OrderDetail;