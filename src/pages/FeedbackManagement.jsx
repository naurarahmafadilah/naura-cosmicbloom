import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave, FaDownload, 
  FaUserEdit, FaTrashAlt, FaRegCommentDots, FaUserTie, 
  FaSpinner, FaCheckCircle, FaHeart, FaMeh, FaFrown, FaCalendarAlt,
  FaInfoCircle, FaInbox
} from "react-icons/fa";

// LAYOUT & COMPONENT INTEGRATION
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

// INTEGRASI DATA (100 Data Feedback & Komplain)
import initialFeedback from "../data/feedbackData.json";

const FeedbackManagement = () => {
  // 1. STATE MANAGEMENT
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingFeedbackId, setEditingFeedbackId] = useState(null);
  
  // State Baru untuk Modal Detail
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const initialFormState = {
    customerName: "",
    tier: "Regular Member",
    category: "Kualitas Produk",
    sentiment: "Positif",
    comment: "",
    status: "Investigasi",
    date: "2026-06-06"
  };
  const [formData, setFormData] = useState(initialFormState);

  // 2. METRICS & ANALYSIS (useMemo)
  const stats = useMemo(() => {
    return feedbackList.reduce(
      (acc, curr) => {
        acc.total += 1;
        if (curr.sentiment === "Positif") acc.positif += 1;
        if (curr.sentiment === "Netral") acc.netral += 1;
        if (curr.sentiment === "Negatif") acc.negatif += 1;
        if (curr.status === "Selesai") acc.selesai += 1;
        if (curr.tier === "Elite VVIP") acc.vvip += 1;
        return acc;
      },
      { total: 0, positif: 0, netral: 0, negatif: 0, selesai: 0, vvip: 0 }
    );
  }, [feedbackList]);

  const pctPositif = stats.total > 0 ? Math.round((stats.positif / stats.total) * 100) : 0;
  const pctNetral = stats.total > 0 ? Math.round((stats.netral / stats.total) * 100) : 0;
  const pctNegatif = stats.total > 0 ? Math.round((stats.negatif / stats.total) * 100) : 0;

  // 3. SEARCH & FILTER LOGIC
  const filteredFeedback = useMemo(() => {
    return feedbackList.filter((item) => {
      const matchesSearch = 
        item.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const matchesSentiment = sentimentFilter === "all" || item.sentiment === sentimentFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesCategory && matchesSentiment && matchesStatus;
    });
  }, [feedbackList, searchTerm, categoryFilter, sentimentFilter, statusFilter]);

  // 4. UTILITY: Generator Avatar Inisial (Profile ABC) dengan Warna Eksklusif
  const getAvatarDetails = (name) => {
    const splitName = name.split(" ");
    const initials = splitName.length > 1 
      ? (splitName[0][0] + splitName[1][0]).toUpperCase()
      : splitName[0].substring(0, 2).toUpperCase();
    
    // Palet warna pastel luxury berdasarkan huruf pertama nama pembeli
    const colors = [
      "bg-[#E2D4C9] text-[#5C4D43]", // Warm Sand
      "bg-[#D0E1D4] text-[#3B5242]", // Sage Velvet
      "bg-[#EAD5D7] text-[#6E4246]", // Rose Dust
      "bg-[#DBE3EC] text-[#3D5266]", // Slate Silk
      "bg-[#E6DFEC] text-[#524361]", // Lavender Satin
    ];
    const charCodeSum = name.charCodeAt(0) || 0;
    const colorClass = colors[charCodeSum % colors.length];

    return { initials, colorClass };
  };

  // 5. HANDLER FUNCTIONS (CRUD & Modal)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData(initialFormState);
    setEditingFeedbackId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingFeedbackId) {
      setFeedbackList((prev) =>
        prev.map((item) => (item.id === editingFeedbackId ? { ...item, ...formData } : item))
      );
    } else {
      const newFeedback = {
        id: `FB-${Date.now().toString().slice(-3)}`,
        ...formData
      };
      setFeedbackList((prev) => [newFeedback, ...prev]);
    }
    handleCancel();
  };

  const handleEditClick = (item, e) => {
    e.stopPropagation();
    setEditingFeedbackId(item.id);
    setFormData({
      customerName: item.customerName,
      tier: item.tier,
      category: item.category,
      sentiment: item.sentiment,
      comment: item.comment,
      status: item.status,
      date: item.date
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Apakah Anda yakin ingin menghapus log feedback ini?")) {
      setFeedbackList((prev) => prev.filter((item) => item.id !== id));
      if (selectedFeedback?.id === id) setSelectedFeedback(null);
    }
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
                Customer Experience Log
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
              Tinjau direktori kepuasan ekosistem Veloura Luxury. Klik pada kartu data apa saja untuk membedah berkas detail laporan lengkap kustomer.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form" : "Input Manual Feedback"}
            </button>
          </div>
        </div>

        {/* METRICS ROW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaRegCommentDots size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Masukan</p>
              <h3 className="text-base font-bold text-slate-800">{stats.total} Tiket</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-[#A47174] rounded-xl border border-rose-100">
              <FaUserTie size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kontribusi VVIP</p>
              <h3 className="text-base font-bold text-slate-800">{stats.vvip} Konstituen</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <FaSpinner className="animate-spin" size={14} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tingkat Kepuasan</p>
              <h3 className="text-base font-bold text-slate-800">{pctPositif}% Puas</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaCheckCircle size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kasus Selesai</p>
              <h3 className="text-base font-bold text-slate-800">{stats.selesai} Solved</h3>
            </div>
          </div>
        </div>

        {/* CONTAINER UTAMA */}
        <div className="space-y-6">
          
          {/* FORM INPUT COMPLAINT / FEEDBACK */}
          {showForm && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs animate-fadeIn">
              <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-slate-800">
                    {editingFeedbackId ? "Modifikasi Log Kasus CRM" : "Registrasi Keluhan & Feedback Baru"}
                  </h3>
                </div>
                <button type="button" onClick={handleCancel} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                  <InputField label="Nama Pelanggan" name="customerName" placeholder="Contoh: Amanda Putri" value={formData.customerName} onChange={handleInputChange} required />
                  
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Tier Keanggotaan:</label>
                    <select name="tier" value={formData.tier} onChange={handleInputChange} className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 font-semibold text-slate-800 focus:outline-none">
                      <option value="Regular Member">Regular Member</option>
                      <option value="Elite VVIP">Elite VVIP (Prioritas)</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Kategori Divisi:</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 font-semibold text-slate-800 focus:outline-none">
                      <option value="Kualitas Produk">Kualitas Produk</option>
                      <option value="Pelayanan Toko">Pelayanan Toko</option>
                      <option value="Sistem POS/Aplikasi">Sistem POS/Aplikasi</option>
                      <option value="Pengiriman">Pengiriman</option>
                      <option value="Program Loyalitas">Program Loyalitas</option>
                    </select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Sentimen Awal:</label>
                    <select name="sentiment" value={formData.sentiment} onChange={handleInputChange} className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 font-semibold text-slate-800 focus:outline-none">
                      <option value="Positif">😊 Positif</option>
                      <option value="Netral">😐 Netral</option>
                      <option value="Negatif">😡 Negatif</option>
                    </select>
                  </div>

                  <InputField label="Tanggal Laporan" name="date" type="date" value={formData.date} onChange={handleInputChange} required />

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Status Tindak Lanjut:</label>
                    <select name="status" value={formData.status} onChange={handleInputChange} className="w-full h-9 bg-white border border-slate-200 rounded-xl px-3 font-semibold text-slate-800 focus:outline-none">
                      <option value="Investigasi">Investigasi</option>
                      <option value="Dalam Proses">Dalam Proses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500">Narasi Masukan / Komplain:</label>
                  <textarea 
                    name="comment" value={formData.comment} onChange={handleInputChange} rows="3" required placeholder="Tulis rincian keluhan pembeli secara objektif..."
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#4E5631]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-semibold hover:bg-slate-100">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl font-semibold hover:opacity-90 flex items-center gap-1.5 uppercase tracking-wider">
                    <FaSave size={11} /> Simpan Log
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BAR PENCARIAN & MULTI-FILTER */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 font-quicksand">
            <div className="relative flex items-center">
              <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
              <input
                type="text"
                placeholder="Cari nama, keluhan, ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
              />
            </div>

            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 px-2.5 focus:outline-none">
              <option value="all">Semua Kategori Divisi</option>
              <option value="Kualitas Produk">Kualitas Produk</option>
              <option value="Pelayanan Toko">Pelayanan Toko</option>
              <option value="Sistem POS/Aplikasi">Sistem POS/Aplikasi</option>
              <option value="Pengiriman">Pengiriman</option>
              <option value="Program Loyalitas">Program Loyalitas</option>
            </select>

            <select value={sentimentFilter} onChange={(e) => setSentimentFilter(e.target.value)} className="h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 px-2.5 focus:outline-none">
              <option value="all">Semua Jenis Sentimen</option>
              <option value="Positif">😊 Positif</option>
              <option value="Netral">😐 Netral</option>
              <option value="Negatif">😡 Negatif</option>
            </select>

            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 px-2.5 focus:outline-none">
              <option value="all">Semua Status CRM</option>
              <option value="Investigasi">Investigasi</option>
              <option value="Dalam Proses">Dalam Proses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>

          {/* GRID CARD LAYOUT WITH PROFILE ABC */}
          {filteredFeedback.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 font-quicksand">
              {filteredFeedback.map((item) => {
                const { initials, colorClass } = getAvatarDetails(item.customerName);
                const statusPercent = item.status === "Selesai" ? 100 : item.status === "Dalam Proses" ? 50 : 15;
                const progressColor = item.status === "Selesai" ? "bg-emerald-500" : item.status === "Dalam Proses" ? "bg-amber-400" : "bg-rose-500";

                return (
                  <div 
                    key={item.id} 
                    onClick={() => setSelectedFeedback(item)}
                    className="bg-white rounded-2xl border border-slate-100 transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between group overflow-hidden cursor-pointer"
                  >
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      
                      {/* TOP CARD: PROFILE ABC INITIALS */}
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          {/* Bulatan Profile ABC */}
                          <div className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center tracking-wider shadow-inner font-playfair ${colorClass}`}>
                            {initials}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors truncate max-w-[140px]">
                              {item.customerName}
                            </h3>
                            <span className="text-[9px] font-extrabold text-[#A47174] uppercase tracking-wide">
                              {item.category}
                            </span>
                          </div>
                        </div>

                        {/* Sentiment Emoji Badge */}
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                            {item.id}
                          </span>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wider ${
                            item.tier === "Elite VVIP" ? "bg-rose-50 text-[#A47174]" : "bg-slate-100 text-slate-500"
                          }`}>
                            {item.tier.split(" ")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Comment Content Snippet */}
                      <div className="bg-slate-50/50 border border-slate-100/60 p-3 rounded-xl mb-4 h-[58px] flex items-center">
                        <p className="text-[11px] text-slate-500 leading-relaxed italic line-clamp-2 w-full">
                          "{item.comment}"
                        </p>
                      </div>

                      {/* Resolution Progress Bar */}
                      <div className="space-y-1 mb-1">
                        <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                          <span>Progress Kasus</span>
                          <span className={
                            item.status === "Selesai" ? "text-emerald-600" : item.status === "Dalam Proses" ? "text-amber-600" : "text-rose-600"
                          }>{item.status}</span>
                        </div>
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${progressColor} transition-all duration-500`} style={{ width: `${statusPercent}%` }} />
                        </div>
                      </div>

                    </div>

                    {/* ACTION FOOTER BUTTONS */}
                    <div className="bg-slate-50/40 border-t border-slate-100 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt size={9} className="text-slate-300" />
                        <span>{item.date}</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                        <button 
                          type="button" onClick={(e) => handleEditClick(item, e)}
                          className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer"
                          title="Ubah Status"
                        >
                          <FaUserEdit size={11} />
                        </button>
                        <button 
                          type="button" onClick={(e) => handleDeleteClick(item.id, e)}
                          className="p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg hover:bg-rose-50 transition-all cursor-pointer"
                          title="Hapus"
                        >
                          <FaTrashAlt size={11} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-slate-100 rounded-2xl text-slate-400 text-xs italic shadow-xs">
              Tidak ditemukan log rekam feedback dalam kriteria filter ini.
            </div>
          )}

          {/* 🌟 MODAL DETAIL INTERAKTIF */}
          {selectedFeedback && (
            <div 
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fadeIn"
              onClick={() => setSelectedFeedback(null)}
            >
              <div 
                className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 font-quicksand text-xs animate-slideUp"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Top Bar Banner */}
                <div className="p-5 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FaInbox className="text-[#4E5631]" size={14} />
                    <span className="font-mono font-bold text-slate-400">Rincian Berkas #{selectedFeedback.id}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedFeedback(null)}
                    className="w-6 h-6 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center shadow-xs cursor-pointer text-[10px]"
                  >
                    ✕
                  </button>
                </div>

                {/* Modal Core Body Content */}
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl font-bold text-sm flex items-center justify-center font-playfair ${getAvatarDetails(selectedFeedback.customerName).colorClass}`}>
                      {getAvatarDetails(selectedFeedback.customerName).initials}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold font-playfair text-slate-800">{selectedFeedback.customerName}</h2>
                      <div className="flex gap-2 mt-1 items-center">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide ${
                          selectedFeedback.tier === "Elite VVIP" ? "bg-rose-50 text-[#A47174]" : "bg-slate-100 text-slate-500"
                        }`}>
                          {selectedFeedback.tier}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[10px] text-slate-400 font-semibold">Masuk: {selectedFeedback.date}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Metadata Kategori & Emosi */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100/40">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Kategori Klaster</p>
                      <p className="font-bold text-slate-700 mt-0.5">{selectedFeedback.category}</p>
                    </div>
                    <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100/40 flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Deteksi Sentimen</p>
                        <p className="font-bold text-slate-700 mt-0.5">{selectedFeedback.sentiment}</p>
                      </div>
                      <div className="text-lg">
                        {selectedFeedback.sentiment === "Positif" ? "😊" : selectedFeedback.sentiment === "Netral" ? "😐" : "😡"}
                      </div>
                    </div>
                  </div>

                  {/* Keluhan Utuh */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Pernyataan/Narasi Pembeli:</p>
                    <div className="p-4 bg-[#4E5631]/5 border border-[#4E5631]/10 rounded-xl text-slate-600 leading-relaxed font-medium italic text-[11px]">
                      "{selectedFeedback.comment}"
                    </div>
                  </div>

                  {/* Status Resolusi Akhir */}
                  <div className="p-3 border border-slate-100 rounded-xl flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-2">
                      <FaInfoCircle size={12} className={selectedFeedback.status === "Selesai" ? "text-emerald-500" : "text-amber-500"} />
                      <span className="font-bold text-slate-500">Status Penyelesaian:</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wide ${
                      selectedFeedback.status === "Selesai" 
                        ? "bg-emerald-100 text-emerald-800" 
                        : selectedFeedback.status === "Dalam Proses"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-rose-100 text-rose-800"
                    }`}>
                      {selectedFeedback.status}
                    </span>
                  </div>
                </div>

                {/* Modal Footer Bottom Button */}
                <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setSelectedFeedback(null)}
                    className="px-5 py-2 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 transition-colors cursor-pointer tracking-wide uppercase text-[10px]"
                  >
                    Tutup Berkas
                  </button>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default FeedbackManagement;