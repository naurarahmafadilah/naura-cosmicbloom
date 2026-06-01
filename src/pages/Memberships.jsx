import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI & ICONS
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
import { Calendar, ShieldCheck, Ticket, Users, CheckCircle2, Clock, XCircle } from "lucide-react";

// ==========================================
// 2. LAYOUT & DATA SOURCE EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import membershipsData from "../data/Memberships.json"; 

const Memberships = () => {
  const [memberships, setMemberships] = useState(membershipsData || []);
  const [activeTab, setActiveTab] = useState("all");

  const handleInlineStatusChange = (membershipId, newStatus) => {
    const updatedMemberships = memberships.map((member) => 
      member.id === membershipId ? { ...member, status: newStatus } : member
    );
    setMemberships(updatedMemberships);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active": 
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200/40 hover:bg-emerald-50 rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 border shadow-none flex items-center gap-1 w-fit">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </Badge>
        );
      case "Pending": 
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-200/40 hover:bg-amber-50 rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 border shadow-none flex items-center gap-1 w-fit">
            <span className="w-1 h-1 rounded-full bg-amber-500" />
            Pending
          </Badge>
        );
      case "Cancelled": 
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-200/40 hover:bg-rose-50 rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 border shadow-none flex items-center gap-1 w-fit">
            <span className="w-1 h-1 rounded-full bg-rose-500" />
            Suspended
          </Badge>
        );
      default: 
        return (
          <Badge className="bg-bg-soft text-primary-dark/60 border-border-subtle hover:bg-bg-soft rounded-full text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 border shadow-none w-fit">
            {status}
          </Badge>
        );
    }
  };

  const filteredMemberships = memberships.filter((member) => {
    if (activeTab === "all") return true;
    return member.status.toLowerCase() === activeTab.toLowerCase();
  });

  // Perhitungan statistik sederhana untuk dashboard atas
  const countByStatus = (status) => memberships.filter(m => m.status.toLowerCase() === status.toLowerCase()).length;

  return (
    <DashboardContainer>
      <div className="space-y-10 animate-fade-in pb-10 text-primary-dark">
        
        {/* TOP BAR & BREADCRUMB */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
          <PageHeader
            title="Boutique Memberships"
            breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Membership" }]}
          />
          <div className="flex items-center gap-3 font-quicksand">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-primary-dark/60 bg-white border border-border-subtle px-5 py-2.5 rounded-full shadow-sm flex items-center gap-2">
              <Users className="w-3.5 h-3.5 text-secondary-light" />
              Total: {memberships.length} Members
            </p>
          </div>
        </div>

        {/* HERO TITLE & TEXT */}
        <div className="space-y-2 px-2">
          <h2 className="text-4xl font-playfair text-primary-dark leading-tight">
            Sistem <span className="italic text-secondary-light">Membership</span>
          </h2>
          <p className="text-primary-dark/60 font-quicksand text-sm max-w-xl">
            Kelola tingkatan pelanggan loyal, distribusi kode referral, serta status keaktifan keanggotaan premium butik Anda.
          </p>
        </div>

        {/* STATS OVERVIEW CARDS (Menambah kesan profesional & informatif) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-2 font-quicksand">
          <div className="bg-white p-5 rounded-[24px] border border-primary-light/10 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-bg-soft rounded-xl text-primary-dark"><Users className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-primary-dark/50 font-medium">Semua Member</p>
              <p className="text-xl font-bold font-playfair">{memberships.length}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[24px] border border-primary-light/10 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-primary-dark/50 font-medium">Aktif</p>
              <p className="text-xl font-bold font-playfair text-emerald-600">{countByStatus("active")}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[24px] border border-primary-light/10 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-primary-dark/50 font-medium">Pending</p>
              <p className="text-xl font-bold font-playfair text-amber-600">{countByStatus("pending")}</p>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[24px] border border-primary-light/10 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><XCircle className="w-5 h-5" /></div>
            <div>
              <p className="text-xs text-primary-dark/50 font-medium">Suspended</p>
              <p className="text-xl font-bold font-playfair text-rose-600">{countByStatus("cancelled")}</p>
            </div>
          </div>
        </div>

        {/* INTERACTIVE CONTROLLER CONTROLS */}
        <div className="flex justify-end px-2">
          <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full lg:w-auto">
            <TabsList className="bg-bg-soft/60 p-1 rounded-xl border border-border-subtle grid grid-cols-4 lg:flex gap-1">
              {["All", "Pending", "Active", "Cancelled"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab.toLowerCase()} 
                  className="rounded-lg text-xs font-bold font-quicksand px-5 py-2 text-primary-dark/60 data-[state=active]:bg-white data-[state=active]:text-primary-dark data-[state=active]:shadow-sm transition-all"
                >
                  {tab === "Cancelled" ? "Suspended" : tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* LIST MEMBERS CONTAINER */}
        <div className="space-y-4">
          {filteredMemberships.length > 0 ? (
            filteredMemberships.map((item) => (
              <div 
                key={item.id} 
                className="group flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-6 rounded-[32px] border border-primary-light/5 shadow-veloura hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,86,49,0.05)] hover:border-secondary-light/20 transition-all duration-500 ease-out"
              >
                {/* Bagian Kiri: Avatar & Profil Utama */}
                <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full lg:w-auto">
                  <div className="relative shrink-0 overflow-hidden rounded-[22px] w-24 h-24 border border-border-subtle bg-bg-soft shadow-inner">
                    <img 
                      src={item.img} 
                      alt={item.customer} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";
                      }}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="text-[10px] font-mono font-bold tracking-wider text-primary-dark/40 bg-bg-soft border border-border-subtle/60 px-2 py-0.5 rounded">
                        {item.id}
                      </span>
                      {getStatusBadge(item.status)}
                    </div>
                    <h3 className="text-xl font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300 font-semibold">
                      {item.customer}
                    </h3>
                    <p className="text-xs font-quicksand text-primary-dark/40 font-medium">
                      Status Internal: <span className="text-primary-dark/70 font-semibold">{item.statusMember}</span>
                    </p>
                  </div>
                </div>

                {/* Bagian Tengah: Detail Informasi Berjejer (Rapi & Sejajar) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-bg-main/40 p-4 rounded-2xl border border-border-subtle/30 w-full lg:max-w-md font-quicksand">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white rounded-lg border border-border-subtle/50 text-secondary-light shadow-sm">
                      <Calendar className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider leading-none">Tanggal Daftar</p>
                      <p className="text-xs font-semibold text-primary-dark/80 mt-0.5">{item.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 bg-white rounded-lg border border-border-subtle/50 text-secondary-light shadow-sm">
                      <Ticket className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider leading-none">Referral Code</p>
                      <p className="text-xs font-mono font-bold text-primary-dark/80 mt-0.5 tracking-wide">{item.referralCode}</p>
                    </div>
                  </div>
                </div>

                {/* Bagian Kanan: Level & Dropdown Aksi */}
                <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-dashed border-border-subtle/60 font-quicksand">
                  <div className="text-left lg:text-right">
                    <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider leading-none mb-1">Level Membership</p>
                    <p className="text-base font-bold text-primary-dark flex items-center gap-1.5 justify-start lg:justify-end">
                      <span className="text-sm">👑</span>
                      {item.levelMembership}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {/* INLINE ACTION DROPDOWN */}
                    <div className="flex items-center gap-1.5 bg-bg-soft/80 rounded-xl px-2.5 py-1 border border-border-subtle/50 shadow-inner">
                      <span className="text-[10px] font-bold text-primary-dark/40 uppercase tracking-wider">Aksi:</span>
                      <Select 
                        value={item.status} 
                        onValueChange={(newStatus) => handleInlineStatusChange(item.id, newStatus)}
                      >
                        <SelectTrigger className="w-[90px] h-6 bg-transparent border-none text-[11px] font-mono font-bold text-slate-800 p-0 shadow-none focus:ring-0">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-slate-200 shadow-xl rounded-xl p-1 font-quicksand z-[9999]">
                          <SelectItem value="Pending" className="text-xs font-bold text-amber-700 focus:bg-amber-50 rounded-lg cursor-pointer">Pending</SelectItem>
                          <SelectItem value="Active" className="text-xs font-bold text-emerald-700 focus:bg-emerald-50 rounded-lg cursor-pointer">Active</SelectItem>
                          <SelectItem value="Cancelled" className="text-xs font-bold text-rose-700 focus:bg-rose-50 rounded-lg cursor-pointer">Suspended</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Link 
                      to={`/memberships/${item.id}`} 
                      className="text-[10px] font-bold text-secondary-light uppercase tracking-widest border-b-2 border-secondary-light/10 hover:border-secondary-light hover:text-hover-rose transition-all pb-0.5 whitespace-nowrap"
                    >
                      Detail
                    </Link>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-white border border-dashed border-border-subtle rounded-[32px]">
              <p className="text-sm font-quicksand text-primary-dark/40 font-medium">
                Tidak ada data keanggotaan dengan kriteria "{activeTab}"
              </p>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default Memberships;