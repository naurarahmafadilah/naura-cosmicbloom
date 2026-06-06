import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaCalendarAlt, FaPrint, FaEye, FaFilter, 
  FaRegFilePdf, FaArrowUp, FaClock, FaHistory,
  FaWallet, FaShoppingBag, FaLongArrowAltRight, FaTimes,
  FaBarcode, FaUserShield, FaCheckCircle, FaTimesCircle, FaChevronRight
} from "react-icons/fa";

// Asumsi data JSON di atas disimpan pada file ini
import initialSalesData from "../data/cashierHistoryData.json"; 
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

// Fungsi pembantu mengubah format date "2026-06-01" menjadi tekstual elegan
const formatElegantDate = (dateStr) => {
  if (!dateStr) return "-";
  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]} ${months[parseInt(parts[1]) - 1]} ${parts[0]}`;
};

const CashierHistory = () => {
  const [salesList] = useState(initialSalesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // 1. LOGIKA FILTER & PENCARIAN
  const filteredSales = useMemo(() => {
    return salesList.filter((trx) => {
      const matchPayment = paymentFilter === "all" || 
        trx.paymentMethod?.toLowerCase().includes(paymentFilter.toLowerCase());
      const matchStatus = statusFilter === "all" || 
        trx.status?.toLowerCase() === statusFilter.toLowerCase();
      const matchSearch = 
        trx.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trx.itemsPurchased?.some(item => item.productName?.toLowerCase().includes(searchTerm.toLowerCase()));
        
      return matchPayment && matchStatus && matchSearch;
    });
  }, [salesList, paymentFilter, statusFilter, searchTerm]);

  // 2. RINGKASAN METRIK UTAMA (KPI HUB)
  const metrics = useMemo(() => {
    const completedTransactions = salesList.filter(t => t.status === "Selesai");
    return {
      totalRevenue: completedTransactions.reduce((sum, t) => sum + (t.totalAmount || 0), 0),
      transactionCount: salesList.length,
      canceledCount: salesList.filter(t => t.status === "Dibatalkan").length
    };
  }, [salesList]);

  const calculateTotalItems = (items) => {
    if (!items) return 0;
    return items.reduce((total, item) => total + (item.qty || 0), 0);
  };

  const getTierStyle = (tier) => {
    if (tier?.toLowerCase().includes("vip")) {
      return "bg-gradient-to-r from-[#A47174] to-[#c29295] text-white border border-[#A47174]/20 shadow-xs";
    }
    return "bg-slate-100 text-slate-600 border border-slate-200";
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER PANEL CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Transaction <span className="italic font-light text-slate-400">Ledger History</span>
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Eksplorasi data invoice, audit finansial kasir, dan peninjauan ulang status berkas riwayat pos pembelanjaan butik eksklusif Veloura.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button 
              onClick={() => alert("Fitur Export PDF sedang disiapkan oleh sistem.")}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FaRegFilePdf /> Export Ledger (.pdf)
            </button>
          </div>
        </div>

        {/* SUMMARY KPI METRICS BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaArrowUp size={14} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gross Revenue (Selesai)</p>
              <h3 className="text-base font-bold text-slate-800">{formatRupiah(metrics.totalRevenue)}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaShoppingBag size={14} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Volume Penjualan</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.transactionCount} Invoice</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <FaTimesCircle size={14} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Invoice Void / Dibatalkan</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.canceledCount} Transaksi</h3>
            </div>
          </div>
        </div>

        {/* INPUT PENCARIAN & FILTER SELEKSI */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 font-quicksand mb-6">
          <div className="relative w-full md:flex-1 flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
            <input
              type="text"
              placeholder="Cari berdasarkan ID, nomor invoice, nama pelanggan, atau nama kain premium..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-start md:justify-end">
            <div className="relative flex items-center min-w-[150px]">
              <FaWallet className="absolute left-3 text-slate-400 text-xs pointer-events-none" />
              <select 
                value={paymentFilter}
                onChange={(e) => setPaymentFilter(e.target.value)}
                className="w-full h-9 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 pl-8 pr-6 focus:outline-hidden focus:border-[#4E5631] appearance-none cursor-pointer"
              >
                <option value="all">Semua Metode</option>
                <option value="Transfer">Bank Transfer</option>
                <option value="EDC">EDC Mandiri</option>
                <option value="QRIS">QRIS POS</option>
                <option value="Tunai">Tunai / Cash</option>
                <option value="Credit">Credit Card</option>
              </select>
              <div className="absolute right-3 pointer-events-none text-[8px] text-slate-400">▼</div>
            </div>

            <div className="relative flex items-center min-w-[140px]">
              <FaFilter className="absolute left-3 text-slate-400 text-xs pointer-events-none" />
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-9 bg-white border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600 pl-8 pr-6 focus:outline-hidden focus:border-[#4E5631] appearance-none cursor-pointer"
              >
                <option value="all">Semua Status</option>
                <option value="selesai">Selesai</option>
                <option value="dibatalkan">Dibatalkan</option>
              </select>
              <div className="absolute right-3 pointer-events-none text-[8px] text-slate-400">▼</div>
            </div>
          </div>
        </div>

        {/* LIST ROW HISTORY TRANSAKSI */}
        {filteredSales.length > 0 ? (
          <div className="space-y-4 font-quicksand">
            {filteredSales.map((trx) => (
              <div 
                key={trx.id} 
                className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden group ${
                  trx.status === "Dibatalkan" ? "border-rose-100 bg-rose-50/5" : "border-slate-100"
                }`}
              >
                {/* Batang Aksen Sisi Kiri */}
                <div className={`absolute left-0 top-0 bottom-0 w-[4px] ${trx.status === "Selesai" ? "bg-[#4E5631]" : "bg-[#A47174]"}`} />

                {/* DETAIL 1: CHRONO-BADGE JAM & TANGGAL */}
                <div className="flex flex-row lg:flex-col justify-between lg:justify-center gap-3 border-b lg:border-none border-slate-50 pb-3 lg:pb-0 shrink-0 min-w-[155px]">
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-[#4E5631]/5 text-[#4E5631] px-2 py-0.5 rounded-md border border-[#4E5631]/10 tracking-wider">
                      {trx.id}
                    </span>
                    
                    {/* Wadah Waktu Presisi Eksklusif */}
                    <div className="mt-2.5 flex items-center gap-2">
                      <div className="bg-slate-800 text-white px-2 py-1 rounded-lg flex flex-col items-center justify-center text-center shadow-xs">
                        <span className="text-[7px] font-bold uppercase tracking-wider text-slate-400 leading-none">Time</span>
                        <span className="text-[11px] font-mono font-bold mt-0.5 leading-none">{trx.transactionTime}</span>
                      </div>
                      <div>
                        <span className="text-[8px] uppercase font-bold text-slate-400 tracking-wider block">Tanggal Nota</span>
                        <span className="text-xs font-semibold text-slate-700 block whitespace-nowrap">
                          {formatElegantDate(trx.transactionDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`lg:hidden text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border h-fit self-end ${
                    trx.status === "Selesai" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"
                  }`}>
                    {trx.status}
                  </span>
                </div>

                {/* DETAIL 2: IDENTITAS KONSUMEN & INVOICE STRUK */}
                <div className="min-w-[210px] space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 block tracking-tight uppercase">
                    {trx.invoiceNumber}
                  </span>
                  <h3 className="text-sm font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors truncate">
                    {trx.customerName}
                  </h3>
                  <div className={`text-[9px] font-bold px-2 py-0.5 rounded-md inline-block tracking-wider uppercase ${getTierStyle(trx.customerType)}`}>
                    {trx.customerType}
                  </div>
                </div>

                {/* DETAIL 3: MANIFEST PRODUK */}
                <div className="flex-1 min-w-[240px] bg-gradient-to-b from-slate-50 to-slate-50/20 p-3 rounded-xl border border-slate-100/80">
                  <div className="flex justify-between items-center border-b border-slate-200/40 pb-1.5 mb-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Item Manifest</span>
                    <span className="text-[10px] font-bold text-[#4E5631]">
                      {calculateTotalItems(trx.itemsPurchased)} Item (Qty)
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    {trx.itemsPurchased?.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex justify-between gap-4">
                        <span className="truncate text-slate-500">• {item.productName} <span className="text-[10px] text-slate-400">({item.size})</span></span>
                        <span className="font-mono text-slate-400 shrink-0">x{item.qty}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* DETAIL 4: AKUMULASI NETT AMOUNT */}
                <div className="flex lg:flex-col justify-between items-center lg:items-end min-w-[140px] border-t lg:border-none border-slate-50 pt-3 lg:pt-0">
                  <span className="lg:hidden text-[9px] uppercase font-bold text-slate-400 tracking-wider">Total Belanja</span>
                  <div className="lg:text-right">
                    <p className="text-sm font-mono font-bold text-slate-800">{formatRupiah(trx.totalAmount)}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5 flex items-center lg:justify-end gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-300 rounded-full inline-block" /> {trx.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* DETAIL 5: BUTTON CTAS */}
                <div className="hidden lg:flex flex-col items-end justify-center min-w-[110px] gap-2">
                  <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                    trx.status === "Selesai" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-rose-700 bg-rose-50 border-rose-200"
                  }`}>
                    {trx.status}
                  </span>
                  <button 
                    onClick={() => setSelectedReceipt(trx)}
                    className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-[10px] font-bold hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer flex items-center gap-1 shadow-xs"
                  >
                    <FaEye size={10} className="text-[#A47174]" /> Rincian <FaChevronRight className="group-hover:translate-x-0.5 transition-transform text-[8px]" />
                  </button>
                </div>

                {/* Area Trigger Klik untuk Pengguna Mobile */}
                <div className="absolute inset-0 lg:hidden cursor-pointer" onClick={() => setSelectedReceipt(trx)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 font-quicksand text-xs italic shadow-xs">
            Tidak ditemukan manifes rekaman transaksi pada kata kunci atau filter ini.
          </div>
        )}

        <Footer />
      </div>

      {/* ================= 🌟 MODAL DETAIL TRANSASKI / DOUBLE MATRIX STRUK 🌟 ================= */}
      {selectedReceipt && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-quicksand transition-all duration-300"
          onClick={() => setSelectedReceipt(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-100 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Premium */}
            <div className={`p-6 text-white relative ${selectedReceipt.status === "Selesai" ? "bg-gradient-to-br from-[#4E5631] to-[#2C321B]" : "bg-gradient-to-br from-[#A47174] to-[#6E4246]"}`}>
              <button 
                onClick={() => setSelectedReceipt(null)} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
              
              <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md uppercase w-fit">
                <FaBarcode size={10} /> Official Invoice Manifesto
              </div>
              <h2 className="text-2xl font-bold font-playfair tracking-wide mt-4">Detail Nota Finansial</h2>
              <p className="text-xs text-white/80 mt-1 font-mono tracking-wider">{selectedReceipt.invoiceNumber}</p>
            </div>

            {/* Modal Body - Grid Matrix Waktu & Finansial */}
            <div className="p-6 space-y-5 text-xs text-slate-600">
              
              {/* TAMPILAN MATRIKS AUDIT WAKTU & SISTEM (KEREN & AKURAT) */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 grid grid-cols-2 gap-y-4 gap-x-2 relative overflow-hidden">
                <div className="absolute right-2 top-2 opacity-[0.03] text-slate-900 pointer-events-none">
                  <FaHistory size={80} />
                </div>
                
                <div className="border-r border-slate-200/60 pr-2">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <FaCalendarAlt size={9} className="text-[#A47174]" /> Tanggal Transaksi
                  </span>
                  <span className="font-bold text-slate-800 mt-1 block text-[11px]">
                    {formatElegantDate(selectedReceipt.transactionDate)}
                  </span>
                </div>

                <div className="pl-3">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <FaClock size={9} className="text-[#4E5631]" /> Waktu (Jam Presisi)
                  </span>
                  <span className="font-mono font-extrabold text-[#4E5631] mt-0.5 block text-sm tracking-wider">
                    {selectedReceipt.transactionTime} <span className="text-[9px] font-sans font-medium text-slate-400">WIB</span>
                  </span>
                </div>

                <div className="border-r border-slate-200/60 pr-2 pt-2 border-t">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                    <FaUserShield size={9} className="text-[#A47174]" /> Kasir Pemroses
                  </span>
                  <span className="font-semibold text-slate-700 mt-1 block text-[11px]">
                    {selectedReceipt.cashierName}
                  </span>
                </div>

                <div className="pl-3 pt-2 border-t">
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Status Validasi</span>
                  <span className={`font-bold mt-1 text-[10px] flex items-center gap-1 ${
                    selectedReceipt.status === "Selesai" ? "text-emerald-600" : "text-rose-600"
                  }`}>
                    {selectedReceipt.status === "Selesai" ? <FaCheckCircle size={10} /> : <FaTimesCircle size={10} />}
                    {selectedReceipt.status}
                  </span>
                </div>
              </div>

              {/* DETAIL KONSUMEN */}
              <div className="flex justify-between items-center bg-gradient-to-r from-slate-50 to-white px-4 py-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block">Nama Pemesan</span>
                  <span className="font-bold text-slate-800 mt-0.5 block text-[11px]">{selectedReceipt.customerName}</span>
                </div>
                <span className="font-sans font-bold text-white bg-slate-800 px-2.5 py-0.5 rounded-md text-[9px] tracking-wider uppercase">
                  {selectedReceipt.customerType}
                </span>
              </div>

              {/* RINCIAN PRODUK YANG DIBELI */}
              <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/40">
                <h4 className="font-bold text-slate-700 border-b border-slate-100 pb-2 flex justify-between uppercase tracking-wider text-[9px]">
                  <span>Komoditas Kain / Sandang</span>
                  <span>Qty & Subtotal</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedReceipt.itemsPurchased?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px]">
                      <div>
                        <p className="font-bold text-slate-800">{item.productName}</p>
                        <p className="text-[10px] text-slate-400">Ukuran: {item.size} • {formatRupiah(item.pricePerUnit)}</p>
                      </div>
                      <span className="font-mono font-bold text-slate-700 text-right">
                        x{item.qty} <p className="text-[9px] text-slate-400 font-sans font-normal mt-0.5">{formatRupiah(item.pricePerUnit * item.qty)}</p>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AKUMULASI DETAIL FINANSIAL */}
              <div className="space-y-2 pt-1 font-sans text-[11px]">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal Belanja</span>
                  <span className="font-mono font-semibold">{formatRupiah(selectedReceipt.subTotal)}</span>
                </div>
                <div className="flex justify-between text-rose-500">
                  <span>Potongan Diskon</span>
                  <span className="font-mono font-semibold">-{formatRupiah(selectedReceipt.discountAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Pajak (PPN)</span>
                  <span className="font-mono font-semibold">+{formatRupiah(selectedReceipt.taxAmount)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Metode Pembayaran</span>
                  <span className="font-semibold text-slate-700">{selectedReceipt.paymentMethod}</span>
                </div>
                <div className="h-[1px] bg-slate-100 my-2" />
                <div className="flex justify-between text-sm font-bold text-slate-800">
                  <span className="font-playfair tracking-wide text-xs">TOTAL NETT BILL</span>
                  <span className="font-mono text-[#4E5631] text-base">{formatRupiah(selectedReceipt.totalAmount)}</span>
                </div>
              </div>

            </div>

            {/* Modal Action Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end gap-2">
              <button 
                type="button"
                onClick={() => setSelectedReceipt(null)} 
                className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-300 transition-colors cursor-pointer"
              >
                Tutup Nota
              </button>
              <button 
                type="button"
                onClick={() => alert(` Thermal printer mencetak nomor invoice: ${selectedReceipt.invoiceNumber}`)} 
                className="px-5 py-2 bg-[#4E5631] text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5 uppercase tracking-wider"
              >
                <FaPrint size={10} /> Cetak Ulang Struk
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default CashierHistory;