import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaBoxes, FaCheckCircle, FaExclamationTriangle,
  FaCalendarAlt, FaWarehouse, FaHistory, FaEye, FaTags, FaInfoCircle,
  FaSlidersH
} from "react-icons/fa";

// 1. IMPORT DATA JSON (200 Data Stok Gudang)
import initialStockData from "../data/stockData.json"; 

// 2. LAYOUT & DATA SOURCE EXISTING (VELOURA STYLE)
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

const StockManagement = () => {
  // state kontrol UI & Data
  const [showForm, setShowForm] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stockList, setStockList] = useState(initialStockData);
  const [editingStockId, setEditingStockId] = useState(null);
  
  // State untuk mengelola data stok yang sedang dilihat di modal detail
  const [selectedStock, setSelectedStock] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    productName: "",
    category: "Dress",
    size: "M",
    stockQty: "0",
    minStock: "5",
    warehouseZone: "",
    lastUpdated: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger card
    setFormData({
      id: item.id || "",
      productName: item.productName || "",
      category: item.category || "Dress",
      size: item.size || "M",
      stockQty: item.stockQty?.toString() || "0",
      minStock: item.minStock?.toString() || "5",
      warehouseZone: item.warehouseZone || "",
      lastUpdated: item.lastUpdated || new Date().toISOString().split('T')[0]
    });
    setEditingStockId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger card
    if (window.confirm("Apakah Anda yakin ingin menghapus data inventori produk ini dari sistem kargo?")) {
      setStockList(stockList.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ id: "", productName: "", category: "Dress", size: "M", stockQty: "0", minStock: "5", warehouseZone: "", lastUpdated: new Date().toISOString().split('T')[0] });
    setEditingStockId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.warehouseZone) return;

    const qty = parseInt(formData.stockQty) || 0;
    const min = parseInt(formData.minStock) || 0;
    
    // Auto kalkulasi status berdasarkan kuantitas kargo
    let computedStatus = "In Stock";
    if (qty === 0) computedStatus = "Out of Stock";
    else if (qty <= min) computedStatus = "Low Stock";

    if (editingStockId) {
      setStockList(stockList.map((item) => 
        item.id === editingStockId 
          ? {
              ...item,
              productName: formData.productName,
              category: formData.category,
              size: formData.size,
              stockQty: qty,
              minStock: min,
              warehouseZone: formData.warehouseZone,
              status: computedStatus,
              lastUpdated: formData.lastUpdated,
            }
          : item
      ));
    } else {
      const newStock = {
        id: formData.id || `STK-${Math.floor(1000 + Math.random() * 9000)}`,
        productName: formData.productName,
        category: formData.category,
        size: formData.size,
        stockQty: qty,
        minStock: min,
        warehouseZone: formData.warehouseZone,
        status: computedStatus,
        lastUpdated: formData.lastUpdated,
        totalRestockCount: 0 // Field pelengkap metadata detail kargo
      };
      setStockList([newStock, ...stockList]);
    }
    handleCancel();
  };

  // LOGIK FILTER & PENCARIAN MUTLAK
  const filteredStock = useMemo(() => {
    return stockList.filter((item) => {
      const matchCategory = activeCategoryFilter === "all" || item.category?.toLowerCase() === activeCategoryFilter.toLowerCase();
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      const matchSearch = 
        item.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.warehouseZone?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchStatus && matchSearch;
    });
  }, [stockList, activeCategoryFilter, statusFilter, searchTerm]);

  // AKUMULASI METRICS / KPI HUB
  const metrics = useMemo(() => {
    return {
      totalSku: stockList.length,
      totalQty: stockList.reduce((acc, curr) => acc + (parseInt(curr.stockQty) || 0), 0),
      lowStock: stockList.filter(m => m.status === "Low Stock").length,
      outOfStock: stockList.filter(m => m.status === "Out of Stock").length
    };
  }, [stockList]);

  // Generator Style Warna Label Kategori Produk Veloura
  const getCategoryStyle = (cat) => {
    const tones = {
      Dress: "text-[#6E4246] bg-[#EAD5D7] border-[#6E4246]/10",
      Kebaya: "text-[#524361] bg-[#E6DFEC] border-[#524361]/10",
      Outer: "text-[#3B5242] bg-[#D0E1D4] border-[#3B5242]/10",
      Scarf: "text-[#3D5266] bg-[#DBE3EC] border-[#3D5266]/10",
      Blouse: "text-[#5C4D43] bg-[#E2D4C9] border-[#5C4D43]/10",
    };
    return tones[cat] || "text-slate-500 bg-slate-50 border-slate-200";
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Warehouse & Stock Inventory
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Direktori manajemen logistik kargo Veloura. Pantau kuantitas SKU pakaian, kontrol batas minimum persediaan barang, serta kelola sistem pemetaan zonasi gudang.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] shadow-xs transition-all flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Unduh Manifest Kargo (.xlsx)
            </button>
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form" : "Registrasi Item Baru"}
            </button>
          </div>
        </div>

        {/* METRICS HUB / KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaBoxes size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Variasi SKU</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.totalSku} Komoditas</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaCheckCircle size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Unit Fisik</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.totalQty.toLocaleString()} Pcs</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <FaExclamationTriangle size={14} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kondisi Kritis (Low)</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.lowStock} SKU Alert</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <FaTimes size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Stok Kosong (Out)</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.outOfStock} Model SKU</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS & GRID VIEW */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* FORM PENDAFTARAN / EDIT INVENTORI */}
          {showForm && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs animate-fade-in">
              <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-slate-800">
                    {editingStockId ? "Modifikasi Berkas Manajemen Inventori" : "Penerimaan & Registrasi Stok Kargo Baru"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-quicksand mt-0.5">
                    Pastikan penulisan kode rak gudang sesuai dengan klaster pemetaan agar memudahkan kurir mencari barang.
                  </p>
                </div>
                <button onClick={handleCancel} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <InputField label="Nomor SKU Barang (ID)" name="id" placeholder="Otomatis (contoh: STK-7843)" value={formData.id} onChange={handleInputChange} disabled={!!editingStockId} />
                  <InputField label="Nama Koleksi Produk Pakaian" name="productName" placeholder="Masukkan nama pakaian" value={formData.productName} onChange={handleInputChange} required />
                  <InputField label="Jumlah Kuantitas Aktual" name="stockQty" type="number" placeholder="0" value={formData.stockQty} onChange={handleInputChange} required />
                  <InputField label="Batas Minimum (Alert)" name="minStock" type="number" placeholder="5" value={formData.minStock} onChange={handleInputChange} required />
                  <InputField label="Titik Alokasi Rak Gudang" name="warehouseZone" placeholder="Contoh: Rack A-12" value={formData.warehouseZone} onChange={handleInputChange} required />
                  <InputField label="Tanggal Sinkronisasi Data" name="lastUpdated" type="date" value={formData.lastUpdated} onChange={handleInputChange} />

                  {/* Native Select Elegant untuk Kategori */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Klaster Kategori:</label>
                    <select 
                      name="category"
                      value={formData.category} 
                      onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs focus:outline-hidden focus:border-[#4E5631] px-3"
                    >
                      <option value="Dress">Dress</option>
                      <option value="Kebaya">Kebaya</option>
                      <option value="Outer">Outer</option>
                      <option value="Scarf">Scarf</option>
                      <option value="Blouse">Blouse</option>
                    </select>
                  </div>

                  {/* Native Select Elegant untuk Size */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Ukuran Busana (Size):</label>
                    <select 
                      name="size"
                      value={formData.size} 
                      onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs focus:outline-hidden focus:border-[#4E5631] px-3"
                    >
                      <option value="S">S (Small)</option>
                      <option value="M">M (Medium)</option>
                      <option value="L">L (Large)</option>
                      <option value="XL">XL (Extra Large)</option>
                      <option value="All Size">All Size</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider transition-opacity">
                    <FaSave size={11} /> {editingStockId ? "Perbarui Logistik SKU" : "Simpan Data Kargo"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BAR PENCARIAN & MULTI FILTER TIER */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 font-quicksand">
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-1">
              {/* Search Bar Input */}
              <div className="relative flex-1 max-w-md flex items-center">
                <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
                <input
                  type="text"
                  placeholder="Cari nama koleksi, zona rak, atau No SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
                />
              </div>

              {/* Status Stock Filter Dropdown */}
              <div className="relative w-full sm:w-48 flex items-center">
                <FaSlidersH className="absolute left-3 text-slate-300 text-xs pointer-events-none" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 pl-8 pr-3 focus:outline-hidden focus:border-[#4E5631]"
                >
                  <option value="all">Semua Kondisi Kargo</option>
                  <option value="In Stock">In Stock (Tersedia)</option>
                  <option value="Low Stock">Low Stock (Kritis)</option>
                  <option value="Out of Stock">Out of Stock (Kosong)</option>
                </select>
              </div>
            </div>

            {/* Filter Pill Button Kategori */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <FaFilter size={9} /> Kategori:
              </span>
              {["all", "Dress", "Kebaya", "Outer", "Scarf", "Blouse"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeCategoryFilter === cat
                      ? "bg-[#4E5631] border-[#4E5631] text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {cat === "all" ? "Semua SKU" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* CARD GRID LAYOUT */}
          {filteredStock.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-quicksand">
              {filteredStock.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 relative flex flex-col justify-between group overflow-hidden ${
                    item.status === "Out of Stock" ? "border-rose-100 bg-rose-50/5 opacity-75" : "border-slate-100"
                  }`}
                >
                  {/* Top Color Accent Bar */}
                  <div className={`h-[4px] w-full ${
                    item.status === "Out of Stock" ? "bg-rose-400" : 
                    item.status === "Low Stock" ? "bg-amber-400" : 
                    "bg-[#4E5631]/30"
                  }`} />
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold bg-[#4E5631]/5 text-[#4E5631] px-2.5 py-0.5 rounded-md border border-[#4E5631]/10">
                        {item.id || "SKU-BARANG"}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${getCategoryStyle(item.category)}`}>
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors line-clamp-1">
                        {item.productName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-slate-400">Lokasi: <span className="font-bold text-slate-600 font-mono">{item.warehouseZone}</span></p>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <p className="text-[11px] text-slate-400">Size: <span className="font-black text-slate-700">{item.size}</span></p>
                      </div>
                    </div>

                    <div className="border-t border-slate-50 my-1" />

                    <div className="grid grid-cols-2 gap-2 bg-gradient-to-b from-slate-50 to-slate-50/20 p-3 rounded-xl border border-slate-100/80 mb-1">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <FaWarehouse size={9} /> Status Kargo
                        </span>
                        <span className={`text-[10px] font-bold mt-1 block uppercase ${
                          item.status === "In Stock" ? "text-emerald-600" :
                          item.status === "Low Stock" ? "text-amber-600 animate-pulse" :
                          "text-rose-500"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="border-l border-slate-200/60 pl-3 flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Jumlah Fisik</span>
                        <span className={`text-sm font-mono font-bold mt-0.5 block ${item.stockQty === 0 ? "text-rose-500" : "text-slate-800"}`}>
                          {(item.stockQty || 0).toLocaleString()} <span className="text-[9px] font-sans font-bold text-slate-400">PCS</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="bg-slate-50/40 border-t border-slate-100 px-5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt size={9} className="text-slate-300" />
                      <span className="text-[10px] font-medium text-slate-400">Sync: {item.lastUpdated}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* BUTTON LIHAT DETAIL ARSIP */}
                      <button 
                        type="button"
                        onClick={() => setSelectedStock(item)}
                        className="p-1.5 bg-white border border-slate-200 text-[#4E5631] rounded-lg text-xs hover:bg-slate-50 hover:border-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Lihat Detail Logistik"
                      >
                        <FaEye size={11} /> <span className="text-[10px] font-semibold">Detail</span>
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => handleEditClick(item, e)}
                        className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Edit Data Barang"
                      >
                        <FaEdit size={11} /> <span className="text-[10px] font-semibold">Ubah</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={(e) => handleDeleteClick(item.id, e)}
                        className="p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-xs hover:bg-rose-50 transition-all cursor-pointer"
                        title="Hapus Produk"
                      >
                        <FaTrashAlt size={11} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 font-quicksand text-xs italic shadow-xs">
              Tidak ditemukan data kargo produk pada sistem pencarian ini.
            </div>
          )}

          {/* LUXURY AMBIENT BANNER */}
          <div className="bg-gradient-to-r from-[#4E5631] to-[#3a4025] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-xs">
            <div className="relative z-10 space-y-2 text-center md:text-left max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-200 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-fit">
                <FaWarehouse size={9} /> Veloura Logistics Hub & Auto-Alert
              </div>
              <h2 className="text-xl sm:text-2xl font-playfair tracking-wide leading-tight">
                Integrasi Gudang Pintar Untuk <span className="italic text-rose-300">Kelancaran Suplai</span>
              </h2>
              <p className="font-quicksand text-xs text-white/70 leading-relaxed">
                Ketika kuantitas fisik berada di bawah batas ambang kritis (*Low Stock Alert*), sistem kasir depan otomatis memberikan tanda peringatan bagi divisi pengadaan untuk segera melakukan pemesanan ulang kargo (*Restock Order*).
              </p>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <Footer />
        </div>
      </div>

      {/* 🌟 LUXURY MODAL OVERLAY - DETAIL WAREHOUSE PERSISTENCE */}
      {selectedStock && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-quicksand transition-all duration-300"
          onClick={() => setSelectedStock(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Accent */}
            <div className={`p-6 text-white relative ${
              selectedStock.status === "Out of Stock" ? "from-rose-900 to-rose-950 bg-gradient-to-br" :
              selectedStock.status === "Low Stock" ? "from-amber-700 to-amber-900 bg-gradient-to-br" :
              "bg-gradient-to-br from-[#4E5631] to-[#2C321B]"
            }`}>
              <button 
                onClick={() => setSelectedStock(null)} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
              
              <span className="text-[9px] font-mono font-bold tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md uppercase">
                {selectedStock.id || "SKU MANUAL"}
              </span>
              <h2 className="text-xl font-bold font-playfair tracking-wide mt-3">{selectedStock.productName}</h2>
              <p className="text-xs text-white/80 mt-0.5">Klaster Koleksi: <span className="font-bold">{selectedStock.category}</span></p>
            </div>

            {/* Detail Body Content */}
            <div className="p-6 space-y-5 text-xs text-slate-600">
              
              {/* Sekilas Informasi Status */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Kondisi Kargo</span>
                  <span className={`font-bold mt-1 block uppercase text-[10px] ${
                    selectedStock.status === "In Stock" ? "text-emerald-600" :
                    selectedStock.status === "Low Stock" ? "text-amber-600" : "text-rose-500"
                  }`}>
                    {selectedStock.status}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Alokasi Rak</span>
                  <span className="font-mono font-bold mt-1 block text-slate-700">
                    {selectedStock.warehouseZone}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Total Fisik</span>
                  <span className="font-mono font-bold mt-1 block text-[#A47174]">
                    {(selectedStock.stockQty || 0).toLocaleString()} PCS
                  </span>
                </div>
              </div>

              {/* Akumulasi Logistik Tracker */}
              <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/40">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-100/80 pb-2">
                  <FaBoxes className="text-[#4E5631]" size={12} /> Parameter Batas & Tata Kelola Gudang
                </h4>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Ambang Minimum (*Min Stock*)</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedStock.minStock || 5} Pcs Alert</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Ukuran Resmi Busana</p>
                    <p className="text-sm font-mono font-bold text-[#4E5631] mt-0.5">Size {selectedStock.size}</p>
                  </div>
                </div>
              </div>

              {/* Keuntungan Hak Akses Tier */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FaInfoCircle className="text-[#A47174]" size={12} /> Panduan Operasional Kargo
                </h4>
                <ul className="space-y-1.5 pl-1 text-slate-500 font-medium list-none">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    Pencarian produk wajib dilakukan di zona area <span className="font-bold text-slate-700">{selectedStock.warehouseZone}</span>.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    {selectedStock.stockQty <= selectedStock.minStock 
                      ? "⚠️ Diperlukan instruksi penambahan pasokan (*Restock*) sesegera mungkin." 
                      : "✓ Kuantitas dinilai aman untuk memenuhi kebutuhan distribusi pesanan harian."}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    Sinkronisasi data manifest kargo terakhir dilakukan pada {selectedStock.lastUpdated}.
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer Modal Control */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
              <button 
                type="button"
                onClick={() => setSelectedStock(null)} 
                className="px-5 py-2 bg-[#4E5631] text-white font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer"
              >
                Selesai & Tutup
              </button>
            </div>

          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default StockManagement;