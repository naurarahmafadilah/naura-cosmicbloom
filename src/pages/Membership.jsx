import React, { useState, useMemo } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaIdCard, FaGem, FaCheckCircle, 
  FaCalendarAlt, FaGift, FaExchangeAlt, FaHistory,
  FaEye, FaShoppingBag, FaCoins, FaCrown // Menggunakan FaCrown yang lebih standar di react-icons/fa
} from "react-icons/fa";

// 1. IMPORT DATA JSON
import initialMembersData from "../data/customers.json"; 

// 2. LAYOUT & DATA SOURCE EXISTING (VELOURA STYLE)
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

const Membership = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState(initialMembersData);
  const [editingMemberId, setEditingMemberId] = useState(null);
  
  // State untuk mengelola data member yang sedang dilihat di modal detail
  const [selectedMember, setSelectedMember] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    tier: "Regular",
    points: "0",
    joinDate: new Date().toISOString().split('T')[0],
    status: "Aktif",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = (member, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger
    setFormData({
      id: member.id || "",
      name: member.name || "",
      email: member.email || "",
      tier: member.tier || "Regular",
      points: member.points || "0",
      joinDate: member.joinDate || new Date().toISOString().split('T')[0],
      status: member.status || "Aktif"
    });
    setEditingMemberId(member.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id, e) => {
    e.stopPropagation(); // Mencegah bentrokan event trigger
    if (window.confirm("Apakah Anda yakin ingin menonaktifkan status membership pelanggan ini?")) {
      setMembers(members.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ id: "", name: "", email: "", tier: "Regular", points: "0", joinDate: new Date().toISOString().split('T')[0], status: "Aktif" });
    setEditingMemberId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingMemberId) {
      setMembers(members.map((item) => 
        item.id === editingMemberId 
          ? {
              ...item,
              name: formData.name,
              email: formData.email,
              tier: formData.tier,
              points: parseInt(formData.points) || 0,
              joinDate: formData.joinDate,
              status: formData.status,
            }
          : item
      ));
    } else {
      const newMember = {
        id: formData.id || `VLR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        email: formData.email,
        tier: formData.tier,
        points: parseInt(formData.points) || 0,
        joinDate: formData.joinDate,
        status: formData.status,
        totalOrders: 0,
        totalSpent: 0
      };
      setMembers([newMember, ...members]);
    }
    handleCancel();
  };

  const filteredMembers = useMemo(() => {
    return members.filter((item) => {
      const matchTier = activeTierFilter === "all" || item.tier?.toLowerCase() === activeTierFilter.toLowerCase();
      const matchSearch = 
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email?.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTier && matchSearch;
    });
  }, [members, activeTierFilter, searchTerm]);

  const metrics = useMemo(() => {
    return {
      total: members.length,
      vvip: members.filter(m => m.tier === "VVIP").length,
      totalPoints: members.reduce((acc, curr) => acc + (parseInt(curr.points) || 0), 0),
      active: members.filter(m => m.status === "Aktif").length
    };
  }, [members]);

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Membership Tier & Rewards
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Kelola program loyalitas keanggotaan eksklusif Veloura, akumulasi poin belanja, serta hak istimewa layanan konsumen VVIP.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] shadow-xs transition-all flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Unduh Laporan (.xlsx)
            </button>
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form" : "Tambah Kartu Member"}
            </button>
          </div>
        </div>

        {/* METRICS HUB / KPI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100">
              <FaIdCard size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Ter-Registrasi</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.total} Anggota</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
              <FaGem size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gelar Elite VVIP</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.vvip} Privilege</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-[#A47174] rounded-xl border border-rose-100">
              <FaGift size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Poin Beredar Pasar</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.totalPoints.toLocaleString()} PTS</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
              <FaCheckCircle size={15} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Rasio Keaktifan Kartu</p>
              <h3 className="text-base font-bold text-slate-800">{metrics.active} Aktif</h3>
            </div>
          </div>
        </div>

        {/* CONTROLS & GRID VIEW */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* FORM PENDAFTARAN / EDIT MEMBERSHIP */}
          {showForm && (
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs animate-fade-in">
              <div className="border-b border-slate-100 pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-slate-800">
                    {editingMemberId ? "Modifikasi Privilege Keanggotaan" : "Penerbitan ID Virtual Member Baru"}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-quicksand mt-0.5">
                    Modifikasi tier loyalitas pelanggan untuk integrasi sistem diskon otomatis di point-of-sales.
                  </p>
                </div>
                <button onClick={handleCancel} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                  <InputField label="Nomor Kartu Member (ID)" name="id" placeholder="Otomatis (contoh: VLR-2024)" value={formData.id} onChange={handleInputChange} disabled={!!editingMemberId} />
                  <InputField label="Nama Lengkap Pemegang Kartu" name="name" placeholder="Masukkan nama" value={formData.name} onChange={handleInputChange} required />
                  <InputField label="Email Korespondensi" name="email" type="email" placeholder="contoh@veloura.com" value={formData.email} onChange={handleInputChange} required />
                  <InputField label="Jumlah Alokasi Poin" name="points" type="number" placeholder="0" value={formData.points} onChange={handleInputChange} />
                  
                  <InputField label="Tanggal Registrasi Keanggotaan" name="joinDate" type="date" value={formData.joinDate} onChange={handleInputChange} />

                  {/* Native Select Elegant untuk Tier */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Tier Kelas Kartu:</label>
                    <select 
                      name="tier"
                      value={formData.tier} 
                      onChange={(e) => handleInputChange(e)}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs focus:outline-hidden focus:border-[#4E5631] px-3"
                    >
                      <option value="Regular">Regular Membership</option>
                      <option value="VVIP">★ Elite VVIP Lounge Privilege</option>
                    </select>
                  </div>

                  {/* Native Select Elegant untuk Status */}
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500">Status Validitas:</label>
                    <select 
                      name="status"
                      value={formData.status} 
                      onChange={(e) => handleInputChange(e)}
                      className="w-full h-9 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 shadow-xs focus:outline-hidden focus:border-[#4E5631] px-3"
                    >
                      <option value="Aktif">✓ Kartu Aktif</option>
                      <option value="Expired">✕ Kadaluarsa / Beku</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors">Batal</button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-semibold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider transition-opacity">
                    <FaSave size={11} /> {editingMemberId ? "Perbarui Status Kartu" : "Terbitkan Kartu"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* BAR PENCARIAN & FILTER TIER */}
          <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-quicksand">
            <div className="relative w-full sm:w-80 md:w-96 flex items-center">
              <FaSearch className="absolute left-3.5 text-slate-300 text-xs" />
              <input
                type="text"
                placeholder="Cari nama pemegang kartu atau No ID Member..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-slate-50/50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden focus:border-[#4E5631]/50 focus:bg-white transition-all placeholder-slate-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-start sm:justify-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 mr-1">
                <FaFilter size={9} /> Tampilkan Tier:
              </span>
              {["all", "Regular", "VVIP"].map((tr) => (
                <button
                  key={tr}
                  onClick={() => setActiveTierFilter(tr)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    activeTierFilter === tr
                      ? "bg-[#4E5631] border-[#4E5631] text-white shadow-xs"
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                  }`}
                >
                  {tr === "all" ? "Semua Kartu" : tr}
                </button>
              ))}
            </div>
          </div>

          {/* CARD GRID LAYOUT */}
          {filteredMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 font-quicksand">
              {filteredMembers.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 shadow-xs hover:shadow-md hover:-translate-y-0.5 relative flex flex-col justify-between group overflow-hidden ${
                    item.status === "Expired" ? "border-rose-100 bg-rose-50/5 opacity-75" : "border-slate-100"
                  }`}
                >
                  <div className={`h-[4px] w-full ${item.tier === "VVIP" ? "bg-gradient-to-r from-amber-300 via-[#A47174] to-amber-400" : "bg-[#4E5631]/30"}`} />
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold bg-[#4E5631]/5 text-[#4E5631] px-2.5 py-0.5 rounded-md border border-[#4E5631]/10">
                        {item.id || "VLR-MEMBER"}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          item.tier === "VVIP" 
                            ? "text-amber-800 bg-amber-50 border-amber-200" 
                            : "text-slate-500 bg-slate-50 border-slate-200"
                        }`}>
                          {item.tier === "VVIP" ? "★ VVIP ELITE" : "REGULAR"}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-base font-bold font-playfair text-slate-800 group-hover:text-[#4E5631] transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.email}</p>
                    </div>

                    <div className="border-t border-slate-50 my-1" />

                    <div className="grid grid-cols-2 gap-2 bg-gradient-to-b from-slate-50 to-slate-50/20 p-3 rounded-xl border border-slate-100/80 mb-1">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1">
                          <FaHistory size={9} /> Sejak
                        </span>
                        <span className="text-[11px] font-semibold text-slate-600 mt-0.5 block flex items-center gap-1">
                          <FaCalendarAlt size={10} className="text-slate-300" /> {item.joinDate || "2024-01-12"}
                        </span>
                      </div>
                      <div className="border-l border-slate-200/60 pl-3 flex flex-col justify-center">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Poin Akumulasi</span>
                        <span className="text-sm font-mono font-bold text-[#A47174] mt-0.5 block">
                          {(item.points || 0).toLocaleString()} <span className="text-[9px] font-sans font-bold text-slate-400">PTS</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="bg-slate-50/40 border-t border-slate-100 px-5 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${item.status === "Expired" ? "bg-rose-400" : "bg-emerald-500"}`} />
                      <span className="text-[11px] font-medium text-slate-500">{item.status || "Aktif"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {/* BUTTON LIHAT DETAIL */}
                      <button 
                        type="button"
                        onClick={() => setSelectedMember(item)}
                        className="p-1.5 bg-white border border-slate-200 text-[#4E5631] rounded-lg text-xs hover:bg-slate-50 hover:border-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Lihat Detail Profil"
                      >
                        <FaEye size={11} /> <span className="text-[10px] font-semibold">Detail</span>
                      </button>

                      <button 
                        type="button"
                        onClick={(e) => handleEditClick(item, e)}
                        className="p-1.5 bg-white border border-slate-200 text-slate-500 rounded-lg text-xs hover:border-[#4E5631] hover:text-[#4E5631] transition-all cursor-pointer flex items-center gap-1"
                        title="Edit Keanggotaan"
                      >
                        <FaEdit size={11} /> <span className="text-[10px] font-semibold">Ubah</span>
                      </button>
                      
                      <button 
                        type="button"
                        onClick={(e) => handleDeleteClick(item.id, e)}
                        className="p-1.5 bg-white border border-rose-100 text-rose-500 rounded-lg text-xs hover:bg-rose-50 transition-all cursor-pointer"
                        title="Bekukan Kartu"
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
              Tidak ditemukan data kartu membership aktif pada sistem filter ini.
            </div>
          )}

          {/* LUXURY AMBIENT BANNER */}
          <div className="bg-gradient-to-r from-[#4E5631] to-[#3a4025] rounded-2xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/5 shadow-xs">
            <div className="relative z-10 space-y-2 text-center md:text-left max-w-2xl">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-200 text-[9px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-fit">
                <FaGem size={9} /> Veloura Luxury Club Privilege Rules
              </div>
              <h2 className="text-xl sm:text-2xl font-playfair tracking-wide leading-tight">
                Gunakan Poin Loyalitas Untuk <span className="italic text-rose-300">Retensi Pasar</span>
              </h2>
              <p className="font-quicksand text-xs text-white/70 leading-relaxed">
                Setiap pergantian tier atau penambahan poin akan langsung terhubung ke aplikasi profil kasir depan dan berhak atas potongan harga otomatis 10% bagi seluruh pemegang lencana VVIP.
              </p>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
          </div>

          <Footer />
        </div>
      </div>

      {/* 🌟 LUXURY MODAL OVERLAY - DETAIL MEMBERSHIP */}
      {selectedMember && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs font-quicksand transition-all duration-300"
          onClick={() => setSelectedMember(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-xl border border-slate-100 transform transition-all scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal Accent */}
            <div className={`p-6 text-white relative ${selectedMember.tier === "VVIP" ? "bg-gradient-to-br from-[#4E5631] to-[#2C321B]" : "bg-gradient-to-br from-[#8C8464] to-[#5C5740]"}`}>
              <button 
                onClick={() => setSelectedMember(null)} 
                className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 p-2 rounded-full cursor-pointer transition-colors"
              >
                <FaTimes size={12} />
              </button>
              
              <span className="text-[9px] font-mono font-bold tracking-widest bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-md uppercase">
                {selectedMember.id || "ID VIRTUAL"}
              </span>
              <h2 className="text-xl font-bold font-playfair tracking-wide mt-3">{selectedMember.name}</h2>
              <p className="text-xs text-white/80 mt-0.5">{selectedMember.email}</p>
            </div>

            {/* Detail Body Content */}
            <div className="p-6 space-y-5 text-xs text-slate-600">
              
              {/* Sekilas Informasi Status */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Loyalty Tier</span>
                  <span className={`font-bold mt-1 block ${selectedMember.tier === "VVIP" ? "text-amber-600" : "text-slate-700"}`}>
                    {selectedMember.tier === "VVIP" ? "★ VVIP Elite" : "Regular"}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Status Kartu</span>
                  <span className={`font-bold mt-1 block ${selectedMember.status === "Expired" ? "text-rose-500" : "text-emerald-600"}`}>
                    {selectedMember.status || "Aktif"}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Saldo Poin</span>
                  <span className="font-mono font-bold mt-1 block text-[#A47174]">
                    {(selectedMember.points || 0).toLocaleString()} PTS
                  </span>
                </div>
              </div>

              {/* Akumulasi Finansial Tracker */}
              <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/40">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5 border-b border-slate-100/80 pb-2">
                  <FaShoppingBag className="text-[#4E5631]" size={12} /> Historis Belanja & Lifetime Value
                </h4>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Kunjungan Order</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{selectedMember.totalOrders || 0} Invoice</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-semibold uppercase">Total Akumulasi Transaksi</p>
                    <p className="text-sm font-mono font-bold text-[#4E5631] mt-0.5">{formatRupiah(selectedMember.totalSpent || 0)}</p>
                  </div>
                </div>
              </div>

              {/* Keuntungan Hak Akses Tier */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-700 flex items-center gap-1.5">
                  <FaCrown className="text-amber-500" size={12} /> Hak Istimewa Aktif (Privileges)
                </h4>
                <ul className="space-y-1.5 pl-1 text-slate-500 font-medium list-none">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    {selectedMember.tier === "VVIP" ? "Potongan harga langsung 10% setiap koleksi New Arrival" : "Akumulasi 1 poin setiap kelipatan belanja Rp 100.000"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    {selectedMember.tier === "VVIP" ? "Akses prioritas ruang tunggu lounge butik fisik & Pre-order khusus" : "Penukaran poin reguler pada event sale tahunan"}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4E5631]" />
                    Terdaftar resmi sejak tanggal {selectedMember.joinDate || "2024-01-12"}
                  </li>
                </ul>
              </div>

            </div>

            {/* Footer Modal Control */}
            <div className="bg-slate-50 border-t border-slate-100 p-4 flex justify-end">
              <button 
                type="button"
                onClick={() => setSelectedMember(null)} 
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

export default Membership;