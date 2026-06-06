import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  FaFilter, FaSearch, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaUserCheck, FaAward, FaShoppingBag, 
  FaEnvelope, FaUsers, FaUserSlash, FaBoxOpen, FaCoins
} from "react-icons/fa";

// 1. IMPORT DATA JSON YANG SUDAH DIPISAHKAN
// (Sesuaikan path/jalur filenya jika folder Anda berbeda)
import initialCustomersData from "../data/customers.json";

// 2. INTEGRASI KOMPONEN SHADCN SELECT UI
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

// 3. LAYOUT & DATA SOURCE EXISTING (VELOURA STYLE)
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

// Fungsi pembantu format uang Rupiah karena JSON menggunakan tipe data number murni
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

const CustomerCRM = () => {
  const [showForm, setShowForm] = useState(false);
  const [activeTierFilter, setActiveTierFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState(initialCustomersData);
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    tier: "Regular",
    status: "Aktif",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTierChange = (value) => {
    setFormData((prev) => ({ ...prev, tier: value }));
  };

  const handleStatusChange = (value) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleEditClick = (customer) => {
    setFormData({
      id: customer.id || "",
      name: customer.name || "",
      email: customer.email || "",
      tier: customer.tier || "Regular",
      status: customer.status || "Aktif"
    });
    setEditingCustomerId(customer.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteClick = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus profil pelanggan ini secara permanen dari basis data CRM?")) {
      setCustomers(customers.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({ id: "", name: "", email: "", tier: "Regular", status: "Aktif" });
    setEditingCustomerId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    if (editingCustomerId) {
      setCustomers(customers.map((item) => 
        item.id === editingCustomerId 
          ? {
              ...item,
              name: formData.name,
              email: formData.email,
              tier: formData.tier,
              status: formData.status,
            }
          : item
      ));
    } else {
      const newCustomer = {
        id: formData.id || `CRM-${Math.floor(100 + Math.random() * 900)}`,
        name: formData.name,
        email: formData.email,
        totalOrders: 0,
        totalSpent: 0,
        tier: formData.tier,
        status: formData.status,
      };
      setCustomers([newCustomer, ...customers]);
    }
    handleCancel();
  };

  const filteredCustomers = customers.filter((item) => {
    const matchTier = 
      activeTierFilter === "all" || 
      item.tier?.toLowerCase() === activeTierFilter.toLowerCase();
    
    const matchSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchTier && matchSearch;
  });

  const tierFilters = ["all", "Regular", "VVIP"];

  const totalUsers = customers.length;
  const vvipUsers = customers.filter(c => c.tier === "VVIP").length;
  const activeUsers = customers.filter(c => c.status === "Aktif").length;

  return (
     <DashboardContainer>
      <div className="animate-fade-in pb-10 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Customer Relationship Management
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-quicksand font-medium tracking-wide mt-3 max-w-2xl">
              Pusat kendali segmentasi profil pelanggan, kurasi tiering loyalitas reward, dan monitoring aktivitas retensi belanja.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 font-quicksand">
            <button className="px-5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-primary-dark/70 hover:text-secondary-light hover:border-secondary-light shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Ekspor Data Pelanggan (.xlsx)
            </button>
            <button 
              onClick={() => (showForm ? handleCancel() : setShowForm(true))}
              className="px-5 py-2.5 bg-[#4E5631] text-white rounded-xl text-xs font-bold tracking-wider hover:bg-[#4E5631]/90 shadow-sm transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes /> : <FaPlus />} {showForm ? "Tutup Form Profil" : "Registrasi Profil Baru"}
            </button>
          </div>
        </div>

        {/* METRICS HUB / KPI COUNTER */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 font-quicksand">
          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-[#4E5631] rounded-lg border border-border-subtle">
              <FaUsers size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Total Anggota CRM</p>
              <h3 className="text-lg font-bold text-slate-800">{totalUsers} Profil</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-amber-600 rounded-lg border border-border-subtle">
              <FaAward size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Nasabah VVIP Tier</p>
              <h3 className="text-lg font-bold text-slate-800">{vvipUsers} Akun</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-emerald-600 rounded-lg border border-border-subtle">
              <FaUserCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Status Akun Aktif</p>
              <h3 className="text-lg font-bold text-slate-800">{activeUsers} Member</h3>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-secondary-light rounded-lg border border-border-subtle">
              <FaShoppingBag size={16} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-primary-dark/40 tracking-wider">Rasio Retensi</p>
              <h3 className="text-lg font-bold text-slate-800">84.2% LTV</h3>
            </div>
          </div>
        </div>

        {/* KONTEN UTAMA */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* FORM INPUT PELANGGAN BARU / EDIT */}
          {showForm && (
            <div className="bg-white p-6 rounded-xl border border-border-subtle shadow-sm animate-fade-in">
              <div className="border-b border-bg-soft pb-3 mb-4 flex justify-between items-start">
                <div>
                  <h3 className="text-base font-bold font-playfair text-primary-dark">
                    {editingCustomerId ? "Ubah Konfigurasi & Segmentasi Pelanggan" : "Registrasi Profil Profil Konsumen Baru"}
                  </h3>
                  <p className="text-[11px] text-primary-dark/50 font-quicksand">
                    Masukkan data primer pelanggan untuk keperluan program loyalty reward marketing dan data tracking internal.
                  </p>
                </div>
                <button onClick={handleCancel} className="text-primary-dark/30 hover:text-primary-dark cursor-pointer"><FaTimes size={14} /></button>
              </div>
              
              <form onSubmit={handleFormSubmit} className="space-y-4 font-quicksand text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
                  <InputField 
                    label="ID Unik CRM (Auto-Generated)" 
                    name="id" 
                    placeholder={editingCustomerId ? "ID Terkunci" : "Contoh: CRM-886 (Kosongkan untuk acak)"} 
                    value={formData.id} 
                    onChange={handleInputChange} 
                    disabled={!!editingCustomerId}
                  />
                  <InputField label="Nama Lengkap Sesuai KTP" name="name" placeholder="Contoh: Sarah Olivia" value={formData.name} onChange={handleInputChange} required />
                  <InputField label="Alamat Surat Elektronik (Email)" name="email" type="email" placeholder="Contoh: sarah@veloura.com" value={formData.email} onChange={handleInputChange} required />
                  
                  {/* DROPDOWN LOYALTY TIER */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[11px] font-bold text-primary-dark/60">Tiering Klasifikasi:</label>
                    <Select value={formData.tier} onValueChange={handleTierChange}>
                      <SelectTrigger className="w-full h-9 bg-white border border-border-subtle rounded-xl text-xs font-bold text-slate-900 shadow-xs focus:ring-0">
                        <SelectValue placeholder="Pilih Tier" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-border-subtle font-quicksand z-[9999]">
                        <SelectItem value="Regular" className="text-xs font-semibold text-slate-700 py-2">REGULAR MEMBER</SelectItem>
                        <SelectItem value="VVIP" className="text-xs font-semibold text-amber-700 py-2">★ ELITE VVIP KLIEN</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* DROPDOWN STATUS AKUN */}
                  <div className="flex flex-col space-y-2">
                    <label className="text-[11px] font-bold text-primary-dark/60">Status Aksesibilitas:</label>
                    <Select value={formData.status} onValueChange={handleStatusChange}>
                      <SelectTrigger className="w-full h-9 bg-white border border-border-subtle rounded-xl text-xs font-bold text-slate-900 shadow-xs focus:ring-0">
                        <SelectValue placeholder="Pilih Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-border-subtle font-quicksand z-[9999]">
                        <SelectItem value="Aktif" className="text-xs font-semibold text-emerald-700 py-2">✓ OLEH AKSES / AKTIF</SelectItem>
                        <SelectItem value="Suspended" className="text-xs font-semibold text-rose-700 py-2">✕ BLACKLIST / SUSPENDED</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-bg-soft">
                  <button type="button" onClick={handleCancel} className="px-4 py-2 bg-bg-soft text-primary-dark/80 rounded-xl text-xs font-bold hover:bg-border-subtle">
                    Batalkan Operasi
                  </button>
                  <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl text-xs font-bold hover:opacity-90 shadow-xs flex items-center gap-1.5 uppercase tracking-wider">
                    <FaSave size={11} /> {editingCustomerId ? "Terapkan Perubahan" : "Simpan Profil CRM"}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* CONTROLS: BAR FILTER DAN PENCARIAN */}
          <div className="bg-white p-4 rounded-xl border border-border-subtle shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4 font-quicksand">
            <div className="relative w-full lg:w-96 flex items-center">
              <FaSearch className="absolute left-3.5 text-primary-dark/30 text-xs pointer-events-none" />
              <input
                type="text"
                placeholder="Cari Pelanggan (Nama, Kode CRM, Alamat Email)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-9 bg-bg-soft border border-border-subtle rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-none focus:border-[#4E5631]/60 transition-colors placeholder-primary-dark/30"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-bold text-primary-dark/40 uppercase tracking-wider flex items-center gap-1">
                <FaFilter size={9} /> Tier Segmentasi:
              </span>
              {tierFilters.map((tr) => (
                <button
                  key={tr}
                  onClick={() => setActiveTierFilter(tr)}
                  className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                    activeTierFilter === tr
                      ? "bg-[#4E5631] text-white shadow-sm"
                      : "bg-bg-soft border border-border-subtle text-primary-dark/70 hover:border-secondary-light/40 hover:text-secondary-light hover:bg-white"
                  }`}
                >
                  {tr === "all" ? "SEMUA TIER" : tr}
                </button>
              ))}
            </div>
          </div>

          {/* ======================================================== */}
          {/* PERUBAHAN UTAMA: TAMPILAN GRID CARD PREMIUM & MODERN */}
          {/* ======================================================== */}
          {filteredCustomers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-quicksand">
              {filteredCustomers.map((item) => (
                <div 
                  key={item.id} 
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 relative flex flex-col justify-between group ${
                    item.status === "Suspended" ? "border-rose-100 opacity-85" : "border-border-subtle"
                  }`}
                >
                  {/* Top Header Card Accent */}
                  <div className={`h-1.5 w-full ${item.tier === "VVIP" ? "bg-amber-400" : "bg-slate-300"}`} />
                  
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    {/* Bar Baris Atas Card */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200">
                        {item.id}
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {/* Badge Tier */}
                        <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${
                          item.tier === "VVIP" 
                            ? "text-amber-800 bg-amber-50 border-amber-200 shadow-3xs" 
                            : "text-slate-600 bg-slate-50 border-slate-200"
                        }`}>
                          {item.tier === "VVIP" ? "★ VVIP Klien" : "Regular"}
                        </span>
                        
                        {/* Badge Status */}
                        <span className={`p-1 rounded-lg border ${
                          item.status === "Suspended" 
                            ? "text-rose-600 bg-rose-50 border-rose-200" 
                            : "text-emerald-600 bg-emerald-50 border-emerald-200"
                        }`} title={item.status}>
                          {item.status === "Suspended" ? <FaUserSlash size={10} /> : <FaUserCheck size={10} />}
                        </span>
                      </div>
                    </div>

                    {/* Informasi Profil Utama */}
                    <div className="mb-4">
                      <h3 className="text-base font-bold font-playfair text-primary-dark group-hover:text-[#4E5631] transition-colors duration-300 line-clamp-1">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-primary-dark/50 text-xs mt-1">
                        <FaEnvelope size={10} className="text-primary-dark/30" />
                        <span className="truncate block font-medium">{item.email}</span>
                      </div>
                    </div>

                    {/* Pembatas / Divider */}
                    <div className="border-t border-dashed border-slate-100 my-3" />

                    {/* Data Statistik Belanja Klien (LTV) */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50/60 p-3 rounded-xl border border-slate-100/80 mb-4">
                      <div>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block flex items-center gap-1">
                          <FaBoxOpen size={10} /> Belanja
                        </span>
                        <span className="text-xs font-bold text-slate-700 mt-0.5 block">
                          {item.totalOrders} Kali
                        </span>
                      </div>
                      <div className="border-l border-slate-200/60 pl-3">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block flex items-center gap-1">
                          <FaCoins size={9} /> Total LTV
                        </span>
                        <span className="text-xs font-mono font-bold text-[#4E5631] mt-0.5 block">
                          {formatRupiah(item.totalSpent)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Konsol Otorisasi Tombol Aksi di Bagian Bawah Card */}
                  <div className="bg-slate-50/80 border-t border-slate-100 px-5 py-3 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleEditClick(item)}
                      className="px-3 py-1.5 border border-slate-200 bg-white text-slate-600 rounded-lg text-xs font-semibold hover:border-secondary-light hover:text-secondary-light hover:shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <FaEdit size={11} /> Ubah
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(item.id)}
                      className="px-3 py-1.5 border border-transparent bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold hover:bg-rose-600 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                    >
                      <FaTrashAlt size={11} /> Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-border-subtle rounded-2xl text-primary-dark/40 font-quicksand text-xs italic shadow-xs">
              Tidak ditemukan rekam data pelanggan yang sesuai dengan kriteria pencarian Anda.
            </div>
          )}

          {/* BANNER LAYON FOOTER AMBIENT */}
          <div className="bg-primary-dark rounded-xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between border border-white/10">
            <div className="relative z-10 space-y-1.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest bg-white/5 px-2.5 py-1 rounded-md border border-white/10 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-light animate-pulse" /> CUSTOMER RETENTION STANDARD
              </div>
              <h2 className="text-2xl sm:text-3xl font-playfair tracking-wide leading-tight">
                Pelihara Hubungan Eksklusif <span className="italic text-secondary-light">Klien</span>
              </h2>
              <p className="font-quicksand text-xs text-white/70">
                Segmentasi loyalitas tier membantu otomasi distribusi diskon promosi berkala serta mengunci database perilaku pasar pada aplikasi *front-end store*.
              </p>
            </div>

            <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 -bottom-10 w-40 h-40 bg-hover-green/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          <Footer />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default CustomerCRM;