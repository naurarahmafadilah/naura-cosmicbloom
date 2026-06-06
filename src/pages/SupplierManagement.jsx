import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaTruck, FaCheckCircle, FaExclamationTriangle,
  FaCalendarAlt, FaIdCard, FaEye, FaInfoCircle, FaSlidersH, FaPhoneAlt,
  FaEnvelope, FaMapMarkerAlt, FaHandshake
} from "react-icons/fa";

// 1. IMPORT DATA JSON (Data Supplier Hub)
import initialSupplierData from "../data/supplierData.json"; 

// 2. LAYOUT & DATA SOURCE EXISTING (VELOURA STYLE)
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

const SupplierManagement = () => {
  // State kontrol UI & Data
  const [showForm, setShowForm] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [supplierList, setSupplierList] = useState(initialSupplierData);
  const [editingSupplierId, setEditingSupplierId] = useState(null);
  
  // State untuk mengelola data supplier yang sedang dilihat di modal detail
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    supplierName: "",
    tier: "Tier 1 (Utama)",
    leadTime: "7",
    contactPerson: "",
    phone: "",
    email: "",
    address: "",
    lastContractUpdate: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger card
    setFormData({
      id: item.id || "",
      supplierName: item.supplierName || "",
      tier: item.tier || "Tier 1 (Utama)",
      leadTime: item.leadTime !== undefined ? item.leadTime.toString() : "7",
      contactPerson: item.contactPerson || "",
      phone: item.phone || "",
      email: item.email || "",
      address: item.address || "",
      lastContractUpdate: item.lastContractUpdate || new Date().toISOString().split('T')[0]
    });
    setEditingSupplierId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger card
    if (window.confirm("Apakah Anda yakin ingin memutus kemitraan dan menghapus data supplier ini dari sistem Veloura?")) {
      setSupplierList(supplierList.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ id: "", supplierName: "", tier: "Tier 1 (Utama)", leadTime: "7", contactPerson: "", phone: "", email: "", address: "", lastContractUpdate: new Date().toISOString().split('T')[0] });
    setEditingSupplierId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.supplierName || !formData.contactPerson) return;

    const days = parseInt(formData.leadTime, 10) || 7;
    
    // Auto kalkulasi status efisiensi pengiriman berdasarkan lead time
    let computedStatus = "Aktif (Konsisten)";
    if (days > 14) computedStatus = "Perlu Evaluasi";
    else if (days <= 0) computedStatus = "Non-Aktif";

    if (editingSupplierId) {
      setSupplierList(supplierList.map((item) => 
        item.id === editingSupplierId 
          ? {
              ...item,
              supplierName: formData.supplierName,
              tier: formData.tier,
              leadTime: days,
              contactPerson: formData.contactPerson,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              status: computedStatus,
              lastContractUpdate: formData.lastContractUpdate,
            }
          : item
      ));
    } else {
      const newSupplier = {
        id: formData.id || `VND-${Math.floor(1000 + Math.random() * 9000)}`,
        supplierName: formData.supplierName,
        tier: formData.tier,
        leadTime: days,
        contactPerson: formData.contactPerson,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        status: computedStatus,
        lastContractUpdate: formData.lastContractUpdate,
        totalOrdersDelivered: 0 
      };
      setSupplierList([newSupplier, ...supplierList]);
    }
    handleCancel();
  };

  // LOGIK FILTER & PENCARIAN MUTLAK SUPPLIER
  const filteredSuppliers = useMemo(() => {
    return supplierList.filter((item) => {
      const matchTier = activeTierFilter === "all" || item.tier?.toLowerCase().includes(activeTierFilter.toLowerCase());
      const matchStatus = statusFilter === "all" || item.status === statusFilter;
      const matchSearch = 
        item.supplierName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTier && matchStatus && matchSearch;
    });
  }, [supplierList, activeTierFilter, statusFilter, searchTerm]);

  // AKUMULASI METRICS / KPI SUPPLIER HUB
  const metrics = useMemo(() => {
    return {
      totalVendors: supplierList.length,
      activePartners: supplierList.filter(m => m.status === "Aktif (Konsisten)").length,
      underEvaluation: supplierList.filter(m => m.status === "Perlu Evaluasi").length,
      nonActive: supplierList.filter(m => m.status === "Non-Aktif").length
    };
  }, [supplierList]);

  // Generator Style Warna Label Tier Kemitraan
  const getTierStyle = (tier) => {
    if (tier?.includes("Tier 1")) return "text-[#6E4246] bg-[#EAD5D7] border-[#6E4246]/10";
    if (tier?.includes("Tier 2")) return "text-[#524361] bg-[#E6DFEC] border-[#524361]/10";
    return "text-[#3B5242] bg-[#D0E1D4] border-[#3B5242]/10";
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Supplier & Vendor Directory
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Manajemen kemitraan rantai pasok Veloura. Pantau status kontrak penyuplai tekstil, waktu tunggu pengiriman (*lead time*), koordinasi kontak, serta klasterisasi tier vendor garmen.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] shadow-xs transition-all flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Ekspor Berkas Vendor (.xlsx)
            </button>
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form" : "Registrasi Supplier Baru"}
            </button>
          </div>
        </div>

        {/* METRICS HUB / KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaTruck size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Mitra Terdaftar</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.totalVendors} Perusahaan</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaCheckCircle size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kemitraan Konsisten</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.activePartners} Vendor Aktif</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <FaExclamationTriangle size={14} className="animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Perlu Peninjauan (Delay)</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.underEvaluation} Supplier</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
              <FaTimes size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kontrak Berakhir</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.nonActive} Perusahaan</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS & GRID VIEW */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* FORM PENDAFTARAN / EDIT SUPPLIER */}
          {showForm && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs animate-fade-in">
              <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-slate-800">
                    {editingSupplierId ? "Modifikasi Dokumen Kemitraan Vendor" : "Registrasi & Pembukaan Lembar Kerja Supplier"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-quicksand mt-0.5">
                    Harap pastikan alamat surat elektronik dan nomor narahubung aktif guna mencegah kendala retur kargo produksi kain.
                  </p>
                </div>
                <button onClick={handleCancel} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <InputField label="Kode Vendor (ID)" name="id" placeholder="Otomatis (contoh: VND-4311)" value={formData.id} onChange={handleInputChange} disabled={!!editingSupplierId} />
                  <InputField label="Nama Perusahaan / Pabrik" name="supplierName" placeholder="Masukkan nama PT/Pabrik" value={formData.supplierName} onChange={handleInputChange} required />
                  <InputField label="Narahubung (Contact Person)" name="contactPerson" placeholder="Nama PIC lapangan" value={formData.contactPerson} onChange={handleInputChange} required />
                  <InputField label="Waktu Tunggu Pengiriman (Hari)" name="leadTime" type="number" placeholder="7" value={formData.leadTime} onChange={handleInputChange} required />
                  <InputField label="Nomor Telepon Operasional" name="phone" placeholder="Contoh: 0812XXXXXXXX" value={formData.phone} onChange={handleInputChange} required />
                  <InputField label="Alamat Surat Elektronik (Email)" name="email" type="email" placeholder="vendor@email.com" value={formData.email} onChange={handleInputChange} required />
                  <InputField label="Pembaruan Nota Kontrak" name="lastContractUpdate" type="date" value={formData.lastContractUpdate} onChange={handleInputChange} />

                  {/* Native Select Kategori Tier Supplier */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Klasifikasi Kemitraan:</label>
                    <select 
                      name="tier"
                      value={formData.tier} 
                      onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs focus:outline-hidden focus:border-[#4E5631] px-3"
                    >
                      <option value="Tier 1 (Utama)">Tier 1 (Utama / Produsen Kain)</option>
                      <option value="Tier 2 (Konveksi)">Tier 2 (Konveksi Cutting/Sewing)</option>
                      <option value="Tier 3 (Aksesoris)">Tier 3 (Aksesoris/Kancing/Label)</option>
                    </select>
                  </div>
                </div>

                <InputField label="Alamat Kantor Pusat / Pabrik Produksi" name="address" placeholder="Tulis alamat lengkap penyuplai..." value={formData.address} onChange={handleInputChange} required />

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider transition-opacity">
                    <FaSave size={11} /> {editingSupplierId ? "Perbarui Kontrak Mitra" : "Simpan Data Supplier"}
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
                  placeholder="Cari nama pabrik, nomor id, atau PIC lapangan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
                />
              </div>

              {/* Status Efisiensi Filter Dropdown */}
              <div className="relative w-full sm:w-48 flex items-center">
                <FaSlidersH className="absolute left-3 text-slate-300 text-xs pointer-events-none" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 pl-8 pr-3 focus:outline-hidden focus:border-[#4E5631]"
                >
                  <option value="all">Semua Status Mutu</option>
                  <option value="Aktif (Konsisten)">Aktif (Konsisten)</option>
                  <option value="Perlu Evaluasi">Perlu Evaluasi</option>
                  <option value="Non-Aktif">Non-Aktif</option>
                </select>
              </div>
            </div>

            {/* Filter Pill Button Kategori Tier */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-start lg:justify-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <FaFilter size={9} /> Klasifikasi:
              </span>
              {["all", "Tier 1", "Tier 2", "Tier 3"].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTierFilter(tier)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTierFilter === tier
                      ? "bg-[#4E5631] border-[#4E5631] text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {tier === "all" ? "Semua Tier" : tier}
                </button>
              ))}
            </div>
          </div>

          {/* SUPPLIER CARD GRID LAYOUT */}
          {filteredSuppliers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-quicksand">
              {filteredSuppliers.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 relative flex flex-col justify-between group overflow-hidden ${
                    item.status === "Non-Aktif" ? "border-rose-100 bg-rose-50/5 opacity-75" : "border-slate-100"
                  }`}
                >
                  {/* Top Color Accent Bar */}
                  <div className={`h-[4px] w-full ${
                    item.status === "Non-Aktif" ? "bg-rose-400" : 
                    item.status === "Perlu Evaluasi" ? "bg-amber-400" : 
                    "bg-[#4E5631]/30"
                  }`} />
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold bg-[#4E5631]/5 text-[#4E5631] px-2.5 py-0.5 rounded-md border border-[#4E5631]/10">
                        {item.id || "VND-XXXX"}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${getTierStyle(item.tier)}`}>
                          {item.tier}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-sm font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors line-clamp-1">
                        {item.supplierName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-[11px] text-slate-400">PIC: <span className="font-bold text-slate-600">{item.contactPerson}</span></p>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <p className="text-[11px] text-slate-400">Lead Time: <span className="font-mono font-black text-slate-700">{item.leadTime} Hari</span></p>
                      </div>
                    </div>

                    <div className="border-t border-slate-50 my-1" />

                    <div className="grid grid-cols-2 gap-2 bg-gradient-to-b from-slate-50 to-slate-50/20 p-3 rounded-xl border border-slate-100/80 mb-1">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <FaHandshake size={9} /> Status Mitra
                        </span>
                        <span className={`text-[10px] font-bold mt-1 block uppercase ${
                          item.status === "Aktif (Konsisten)" ? "text-emerald-600" :
                          item.status === "Perlu Evaluasi" ? "text-amber-600 animate-pulse" :
                          "text-rose-500"
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <div className="border-l border-slate-200/60 pl-3 flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Hub Kontak</span>
                        <span className="text-[11px] font-medium text-slate-600 mt-0.5 block truncate">
                          {item.phone}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="bg-slate-50/40 border-t border-slate-100 px-5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt size={9} className="text-slate-300" />
                      <span className="text-[10px] font-medium text-slate-400">Kontrak: {item.lastContractUpdate}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* BUTTON LIHAT DETAIL ARSIP */}
                      <button 
                        type="button"
                        onClick={() => setSelectedSupplier(item)}
                        className="p-1.5 bg-white border border-slate-200 text-[#4E5631] rounded-lg text-xs hover:bg-slate-50 hover:border-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Lihat Profil Vendor"
                      >
                        <FaEye size={11} /> <span className="text-[10px] font-semibold">Profil</span>
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => handleEditClick(item, e)}
                        className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Modifikasi Berkas"
                      >
                        <FaEdit size={11} /> <span className="text-[10px] font-semibold">Ubah</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={(e) => handleDeleteClick(item.id, e)}
                        className="p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-xs hover:bg-rose-50 transition-all cursor-pointer"
                        title="Putus Hubungan Mitra"
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
              Tidak ditemukan berkas penyuplai tekstil pada filter pencarian ini.
            </div>
          )}

          {/* LUXURY AMBIENT BANNER */}
          <div className="bg-gradient-to-r from-[#4E5631] to-[#3a4025] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-xs">
            <div className="relative z-10 space-y-2 text-center md:text-left max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-200 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-fit">
                <FaTruck size={9} /> Veloura Supply Chain Management Tiering System
              </div>
              <h2 className="text-xl sm:text-2xl font-playfair tracking-wide leading-tight">
                Standarisasi Mutu Vendor Tekstil <span className="italic text-rose-300">Berkualitas Tinggi</span>
              </h2>
              <p className="font-quicksand text-xs text-white/70 leading-relaxed">
                Setiap vendor dievaluasi secara berkala melalui ketepatan waktu kirim barang (*lead time*). Keterlambatan logistik bahan mentah yang melebihi batas 14 hari kerja secara otomatis mengaktifkan status *Perlu Evaluasi* pada sistem pengadaan pusat.
              </p>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <Footer />
        </div>
      </div>

      {/* 🌟 LUXURY MODAL OVERLAY - DETAIL SUPPLIER PERSISTENCE */}
      {selectedSupplier && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-quicksand transition-all duration-300"
          onClick={() => setSelectedSupplier(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Accent */}
            <div className={`p-6 text-white relative ${
              selectedSupplier.status === "Non-Aktif" ? "from-rose-900 to-rose-950 bg-gradient-to-br" :
              selectedSupplier.status === "Perlu Evaluasi" ? "from-amber-700 to-amber-900 bg-gradient-to-br" :
              "bg-gradient-to-br from-[#4E5631] to-[#2C321B]"
            }`}>
              <button 
                onClick={() => setSelectedSupplier(null)} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
              
              <span className="text-[9px] font-mono font-bold tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md uppercase">
                {selectedSupplier.id || "VND MANUAL"}
              </span>
              <h2 className="text-xl font-bold font-playfair tracking-wide mt-3">{selectedSupplier.supplierName}</h2>
              <p className="text-xs text-white/80 mt-0.5">Klasifikasi Mitra: <span className="font-bold">{selectedSupplier.tier}</span></p>
            </div>

            {/* Detail Body Content */}
            <div className="p-6 space-y-5 text-xs text-slate-600">
              
              {/* Sekilas Informasi Status */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Kelayakan Mutu</span>
                  <span className={`font-bold mt-1 block uppercase text-[9px] ${
                    selectedSupplier.status === "Aktif (Konsisten)" ? "text-emerald-600" :
                    selectedSupplier.status === "Perlu Evaluasi" ? "text-amber-600" : "text-rose-500"
                  }`}>
                    {selectedSupplier.status.split(" ")[0]}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">PIC Utama</span>
                  <span className="font-bold mt-1 block text-slate-700 truncate px-1">
                    {selectedSupplier.contactPerson}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Durasi Kerja</span>
                  <span className="font-mono font-bold mt-1 block text-[#A47174]">
                    {selectedSupplier.leadTime} Hari
                  </span>
                </div>
              </div>

              {/* Rekam Hubungan Telekomunikasi */}
              <div className="border border-slate-100 rounded-2xl p-4 space-y-2.5 bg-slate-50/40">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-100/80 pb-2">
                  <FaIdCard className="text-[#4E5631]" size={12} /> Detail Informasi Korespondensi Kontak
                </h4>
                <div className="space-y-1.5 pt-1 font-medium">
                  <p className="flex items-center gap-2 text-slate-600">
                    <FaPhoneAlt size={10} className="text-slate-400" /> <span className="font-mono">{selectedSupplier.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-slate-600">
                    <FaEnvelope size={10} className="text-slate-400" /> <span className="underline truncate">{selectedSupplier.email}</span>
                  </p>
                  <p className="flex items-start gap-2 text-slate-600 leading-relaxed">
                    <FaMapMarkerAlt size={11} className="text-slate-400 mt-0.5 flex-shrink-0" /> 
                    <span>{selectedSupplier.address || "Alamat belum disinkronisasi dalam map logistik."}</span>
                  </p>
                </div>
              </div>

              {/* Panduan Hukum Operasional */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FaInfoCircle className="text-[#A47174]" size={12} /> Klausul Perjanjian Distribusi Veloura
                </h4>
                <ul className="space-y-1.5 pl-1 text-slate-500 font-medium list-none">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    Pembaruan adendum nota kesepahaman terakhir dicatat pada <span className="font-bold text-slate-700">{selectedSupplier.lastContractUpdate}</span>.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    {selectedSupplier.leadTime > 14 
                      ? "⚠️ Vendor ini terkena penalti pengangguhan order otomatis akibat keterlambatan supply." 
                      : "✓ Performa kecepatan kirim kargo aman untuk mendukung produksi massal harian."}
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer Modal Control */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
              <button 
                type="button" 
                onClick={() => setSelectedSupplier(null)} 
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
              >
                Kembali ke Direktori
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

export default SupplierManagement;