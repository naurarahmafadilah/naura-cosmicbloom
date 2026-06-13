import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaBullhorn, FaPercentage, FaUsers, 
  FaWallet, FaChartLine, FaEye, FaCheckCircle
} from "react-icons/fa";

// LAYOUT & COMPONENT INTEGRATION
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

// 🌟 INTEGRASI DATA BARU (Pastikan file JSON kamu valid)
import initialCampaigns from "../data/campaignData.json";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(number);
};

const CampaignPromo = () => {
  // 1. STATE MANAGEMENT
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [editingCampaignId, setEditingCampaignId] = useState(null);

  const initialFormState = {
    name: "",
    type: "Diskon Persentase",
    value: "",
    startDate: "",
    endDate: "",
    budget: "",
    target: "Semua Member",
    status: "Aktif"
  };
  const [formData, setFormData] = useState(initialFormState);

  // 🌟 REFERENCE MANAGEMENT (useRef)
  const formRef = useRef(null);
  const searchInputRef = useRef(null);

  // Shortcut keyboard Ctrl+F / Cmd+F untuk auto-focus input pencarian
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 2. METRICS CALCULATION (useMemo untuk efisiensi performa)
  const metrics = useMemo(() => {
    return campaigns.reduce(
      (acc, curr) => {
        acc.total += 1;
        if (curr.status === "Aktif") acc.active += 1;
        acc.totalBudget += Number(curr.budget) || 0;
        acc.totalReach += Number(curr.reach) || 0;
        return acc;
      },
      { total: 0, active: 0, totalBudget: 0, totalReach: 0 }
    );
  }, [campaigns]);

  // 3. SEARCH & FILTER LOGIC
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [campaigns, searchTerm, statusFilter]);

  // 4. HANDLER FUNCTIONS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setEditingCampaignId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editingCampaignId) {
      // Logika Update / Edit Data
      setCampaigns((prev) =>
        prev.map((item) =>
          item.id === editingCampaignId
            ? { 
                ...item, 
                ...formData, 
                budget: Number(formData.budget) 
              }
            : item
        )
      );
    } else {
      // Logika Create / Tambah Data Baru
      const newCampaign = {
        id: `CMP-${Date.now().toString().slice(-4)}`, // ID Unik Acak
        ...formData,
        budget: Number(formData.budget),
        spent: 0, // Inisialisasi awal pengeluaran
        reach: Math.floor(Math.random() * 5000) + 500 // Dummy generator jangkauan awal
      };
      setCampaigns((prev) => [newCampaign, ...prev]);
    }

    handleCancel();
  };

  const handleCreateClick = () => {
    if (showForm && !editingCampaignId) {
      handleCancel();
    } else {
      setShowForm(true);
      setEditingCampaignId(null);
      setFormData(initialFormState);
      // Scroll halus ke arah form setelah rendering selesai
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditingCampaignId(item.id);
    setFormData({
      name: item.name,
      type: item.type,
      value: item.value,
      startDate: item.startDate || "",
      endDate: item.endDate || "",
      budget: item.budget || "",
      target: item.target || "Semua Member",
      status: item.status || "Aktif"
    });
    setShowForm(true);
    
    // Scroll halus ke arah form target edit
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Apakah Anda yakin ingin menghapus campaign ini?")) {
      setCampaigns((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const exportToCSV = () => {
    const headers = ["ID,Nama,Mekanisme,Value,Budget,Spent,Target,Status,Mulai,Selesai\n"];
    const rows = campaigns.map(c => 
      `"${c.id}","${c.name}","${c.type}","${c.value}",${c.budget},${c.spent || 0},"${c.target}","${c.status}","${c.startDate}","${c.endDate}"`
    );
    const blob = new Blob([headers + rows.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "campaign_report.csv");
    link.click();
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Marketing Campaign & Promo
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Rancang penawaran musiman, buat kode voucher diskon eksklusif, serta awasi penyerapan modal budget pemasaran Veloura Luxury.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button 
              onClick={exportToCSV}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FaDownload size={11} /> Ekspor Data (.csv)
            </button>
            <button 
              onClick={handleCreateClick}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm && !editingCampaignId ? <FaTimes /> : <FaPlus />} {showForm && !editingCampaignId ? "Tutup Form" : "Buat Campaign Baru"}
            </button>
          </div>
        </div>

        {/* METRICS CAMPAIGN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaBullhorn size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Program</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.total} Campaign</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaCheckCircle size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Sedang Berjalan</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.active} Live Promos</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-[#A47174] rounded-xl border border-rose-100">
              <FaWallet size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Alokasi Anggaran</p>
              <h3 className="text-base font-bold text-slate-800">{formatRupiah(metrics.totalBudget)}</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <FaUsers size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Estimasi Dampak Jangkauan</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.totalReach.toLocaleString()} Akun</h3>
            </div>
          </div>
        </div>

        {/* CONTAINER UTAMA */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* FORM INPUT CAMPAIGN */}
          {showForm && (
            <div ref={formRef} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs scroll-mt-6">
              <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-slate-800">
                    {editingCampaignId ? "Konfigurasi Ulang Aturan Promo" : "Formulasi Rencana Pemasaran Baru"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-quicksand mt-0.5">
                    Tentukan parameter reward diskon yang tervalidasi otomatis pada sistem penjualan kasir.
                  </p>
                </div>
                <button type="button" onClick={handleCancel} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                  <InputField label="Nama Campaign / Event Promo" name="name" placeholder="Contoh: End of Season Luxury Clearance" value={formData.name} onChange={handleInputChange} required />
                  
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Mekanisme Promo:</label>
                    <select 
                      name="type" value={formData.type} onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4E5631] px-3"
                    >
                      <option value="Diskon Persentase">Diskon Persentase (%)</option>
                      <option value="Voucher Nominal">Voucher Potongan Nominal (IDR)</option>
                      <option value="Bundling Produk">Paket Bundling Eksklusif</option>
                    </select>
                  </div>

                  <InputField label="Value Benefit (Contoh: 15% atau 250000)" name="value" placeholder="Nilai keuntungan" value={formData.value} onChange={handleInputChange} required />
                  <InputField label="Tanggal Mulai Tayang" name="startDate" type="date" value={formData.startDate} onChange={handleInputChange} />
                  <InputField label="Tanggal Berakhir Kontrak" name="endDate" type="date" value={formData.endDate} onChange={handleInputChange} />
                  <InputField label="Alokasi Budget Rupiah" name="budget" type="number" placeholder="Contoh: 10000000" value={formData.budget} onChange={handleInputChange} required />

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Target Audiens Grup:</label>
                    <select 
                      name="target" value={formData.target} onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4E5631] px-3"
                    >
                      <option value="Semua Member">Semua Golongan Member</option>
                      <option value="Elite VVIP">Khusus Kelas Elite VVIP</option>
                      <option value="Regular Member">Hanya Pengguna Regular</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Status Awal Promo:</label>
                    <select 
                      name="status" value={formData.status} onChange={handleInputChange}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#4E5631] px-3"
                    >
                      <option value="Aktif">Live (Aktif Bertugas)</option>
                      <option value="Draft">Draft (Arsip / Tunda)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider transition-opacity">
                    <FaSave size={11} /> {editingCampaignId ? "Simpan Perubahan" : "Rilis Promo"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BAR PENCARIAN & FILTER CAMPAIGN */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-quicksand">
            <div className="relative w-full sm:w-80 md:w-96 flex items-center">
              <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Cari nama promo (Tekan Ctrl+F)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <FaFilter size={9} /> Saring Status:
              </span>
              {["all", "Aktif", "Draft"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    statusFilter === st
                      ? "bg-[#4E5631] border-[#4E5631] text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {st === "all" ? "Semua" : st}
                </button>
              ))}
            </div>
          </div>

          {/* LIST CAMPAIGN GRID CARD */}
          {filteredCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-quicksand">
              {filteredCampaigns.map((item) => {
                const itemBudget = Number(item.budget) || 0;
                const itemSpent = Number(item.spent) || 0;
                const percentSpent = itemBudget > 0 ? Math.min(Math.round((itemSpent / itemBudget) * 100), 100) : 0;
                
                return (
                  <div 
                    key={item.id} 
                    className="bg-white rounded-2xl border border-slate-100 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 relative flex flex-col justify-between group overflow-hidden"
                  >
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold bg-[#4E5631]/5 text-[#4E5631] px-2.5 py-0.5 rounded-md border border-[#4E5631]/10">
                          {item.id}
                        </span>
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          item.status === "Aktif" ? "text-emerald-700 bg-emerald-50 border-emerald-200" : "text-amber-600 bg-amber-50 border-amber-200"
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-base font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors line-clamp-1">
                          {item.name}
                        </h3>
                        <p className="text-[11px] text-[#A47174] font-semibold mt-0.5 flex items-center gap-1">
                          <FaPercentage size={10} /> {item.type} ({item.value})
                        </p>
                      </div>

                      {/* BUDGET TRACKING SLIDER BAR */}
                      <div className="space-y-1 mb-4 bg-slate-50 p-3 rounded-xl border border-slate-100/60">
                        <div className="flex justify-between text-[10px] font-medium text-slate-500">
                          <span>Budget Terpakai</span>
                          <span className="font-bold">{percentSpent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#A47174] to-[#4E5631] transition-all duration-500" 
                            style={{ width: `${percentSpent}%` }} 
                          />
                        </div>
                        <div className="flex justify-between text-[9px] text-slate-400 font-mono pt-0.5">
                          <span>{formatRupiah(itemSpent)}</span>
                          <span>Max: {formatRupiah(itemBudget)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-1">
                          <CalendarCheckIcon className="text-slate-300" />
                          <span className="truncate">Selesai: {item.endDate || "-"}</span>
                        </div>
                        <div className="text-right text-slate-400 truncate">
                          Target: <span className="font-bold text-slate-600">{item.target}</span>
                        </div>
                      </div>
                    </div>

                    {/* BOT BAR ACTIONS */}
                    <div className="bg-slate-50/40 border-t border-slate-100 px-5 py-2.5 flex items-center justify-end gap-1.5">
                      <button 
                        type="button"
                        onClick={() => setSelectedCampaign(item)}
                        className="p-1.5 bg-white border border-slate-200 text-[#4E5631] rounded-lg text-xs hover:bg-slate-50 hover:border-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <FaEye size={11} /> <span className="text-[10px] font-semibold">Performa</span>
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => handleEditClick(item, e)}
                        className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <FaEdit size={11} /> <span className="text-[10px] font-semibold">Ubah</span>
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => handleDeleteClick(item.id, e)}
                        className="p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-xs hover:bg-rose-50 transition-all cursor-pointer"
                      >
                        <FaTrashAlt size={11} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 font-quicksand text-xs italic shadow-xs">
              Tidak ditemukan rekam data program promo dalam kriteria filter ini.
            </div>
          )}

          <Footer />
        </div>
      </div>

      {/* 🌟 LUXURY MODAL OVERLAY - DETAIL ANALISA PERFORMANCE PROMO */}
      {selectedCampaign && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-quicksand transition-all duration-300"
          onClick={() => setSelectedCampaign(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-br from-[#4E5631] to-[#2C321B] text-white relative">
              <button 
                type="button"
                onClick={() => setSelectedCampaign(null)} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
              <span className="text-[9px] font-mono font-bold tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md uppercase">
                {selectedCampaign.id} ANALYTICS
              </span>
              <h2 className="text-xl font-bold font-playfair tracking-wide mt-3">{selectedCampaign.name}</h2>
              <p className="text-xs text-white/80 mt-0.5">Mekanisme: {selectedCampaign.type}</p>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4 text-xs text-slate-600">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Target Sasaran</span>
                  <span className="font-bold text-slate-800 text-xs mt-1 block">{selectedCampaign.target}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Nilai Reward</span>
                  <span className="font-bold text-[#A47174] text-xs mt-1 block">{selectedCampaign.value}</span>
                </div>
              </div>

              {/* Data Analitik Efisiensi */}
              <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/40 space-y-3">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FaChartLine className="text-[#4E5631]" size={12} /> Hasil Konversi Kampanye
                </h4>
                
                <div className="space-y-2 pt-1">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Jangkauan Pembeli</span>
                    <span className="font-bold text-slate-800">{(selectedCampaign.reach || 0).toLocaleString()} Pengguna Kasir</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Sisa Saldo Anggaran</span>
                    <span className="font-mono font-bold text-emerald-600">
                      {formatRupiah((Number(selectedCampaign.budget) || 0) - (Number(selectedCampaign.spent) || 0))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Masa Aktif Penawaran</span>
                    <span className="font-medium text-slate-700">
                      {selectedCampaign.startDate || "-"} s/d {selectedCampaign.endDate || "-"}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-slate-400 italic text-center pt-2">
                *Data konversi di atas diperbarui secara real-time berdasarkan klaim invoice POS toko.
              </p>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
              <button 
                type="button"
                onClick={() => setSelectedCampaign(null)} 
                className="px-5 py-2 bg-[#4E5631] text-white font-semibold text-xs rounded-xl hover:opacity-90 cursor-pointer"
              >
                Tutup Analisa
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardContainer>
  );
};

const CalendarCheckIcon = ({ className }) => (
  <svg className={`w-3 h-3 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
  </svg>
);

export default CampaignPromo;