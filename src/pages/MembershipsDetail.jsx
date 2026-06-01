import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// ==========================================
// 1. INTEGRASI KOMPONEN SHADCN UI & ICONS
// ==========================================
import { Badge } from "../components/ui/badge";
import { 
  Calendar, 
  Ticket, 
  ArrowLeft, 
  ShoppingBag, 
  Award, 
  User, 
  Mail, 
  Coins, 
  ArrowUpRight 
} from "lucide-react";

// ==========================================
// 2. LAYOUT & DATA SOURCE EXISTING
// ==========================================
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import membershipsData from "../data/Memberships.json";

const MembershipsDetail = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  // Cari data spesifik member berdasarkan ID parameter URL
  useEffect(() => {
    const foundMember = membershipsData.find((m) => m.id === id);
    setMember(foundMember);
  }, [id]);

  // Fallback gambar jika error
  const defaultAvatar = "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80";

  // Jika data member tidak ditemukan
  if (!member) {
    return (
      <DashboardContainer>
        <div className="text-center py-24 bg-white border border-primary-light/10 rounded-[35px] max-w-xl mx-auto font-quicksand p-8">
          <p className="text-sm text-primary-dark/40 font-medium mb-6">Data anggota tidak berhasil ditemukan dalam sistem.</p>
          <Link to="/memberships" className="inline-flex items-center gap-2 text-xs font-bold text-white bg-primary-dark px-6 py-3 rounded-full uppercase tracking-wider hover:bg-secondary-light transition-all">
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Manajemen
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <div className="space-y-10 animate-fade-in pb-10 text-primary-dark">
        
        {/* TOP BAR / NAVIGATION */}
        <div className="flex items-center justify-between border-b border-border-subtle pb-6">
          <PageHeader
            title="Profil Eksklusif Member"
            breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Membership", link: "/memberships" }, { label: "Detail" }]}
          />
          <Link 
            to="/memberships" 
            className="group flex items-center gap-2 text-xs font-bold font-quicksand text-primary-dark/60 bg-white border border-border-subtle px-4 py-2.5 rounded-full shadow-sm hover:text-secondary-light transition-all duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            Kembali
          </Link>
        </div>

        {/* MAIN LUXURY DETAIL PROFILE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* KOLOM KIRI: DIGITAL MEMBER PASS / CARD */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#1A1A1A] rounded-[35px] p-8 text-white relative overflow-hidden shadow-2xl group border border-neutral-800">
              {/* Luxury Texture Glow overlay */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-secondary-light/10 blur-[60px] rounded-full transition-transform duration-[3s] group-hover:scale-125" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-light/5 blur-[40px] rounded-full" />
              
              <div className="relative z-10 flex flex-col h-full justify-between space-y-8">
                {/* Brand Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-playfair text-xl tracking-wide">Veloura<span className="text-secondary-light">.</span></h4>
                    <p className="text-[7px] font-quicksand tracking-[3px] text-white/40 uppercase font-bold mt-1">Privé Member</p>
                  </div>
                  <Badge className="bg-white/10 text-white border-none text-[8px] font-mono tracking-wider px-2 py-0.5 rounded-md">
                    {member.id}
                  </Badge>
                </div>

                {/* Avatar & Main Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/20 shrink-0 shadow-lg bg-neutral-900">
                    <img 
                      src={member.img} 
                      alt={member.customer} 
                      className="w-full h-full object-cover" 
                      onError={(e) => { e.target.src = defaultAvatar; }}
                    />
                  </div>
                  <div>
                    <p className="font-playfair text-lg leading-tight tracking-wide">{member.customer}</p>
                    <p className="text-[10px] font-quicksand text-secondary-light font-bold uppercase tracking-wider mt-1">
                      👑 {member.levelMembership}
                    </p>
                  </div>
                </div>

                {/* Footer Card Info */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-end font-mono">
                  <div>
                    <p className="text-[7px] text-white/30 uppercase tracking-widest font-quicksand">Join Date</p>
                    <p className="text-[11px] text-white/80 mt-0.5">{member.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] text-white/30 uppercase tracking-widest font-quicksand">Status</p>
                    <p className={`text-[10px] font-bold tracking-wider uppercase mt-0.5 ${member.status === "Active" ? "text-emerald-400" : "text-amber-400"}`}>
                      ● {member.status}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK CONTACT METADATA */}
            <div className="bg-white p-6 rounded-[30px] border border-primary-light/5 shadow-veloura font-quicksand space-y-4">
              <h4 className="text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Informasi Kontak</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-bg-soft rounded-xl text-primary-dark/60"><User className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] text-primary-dark/40 font-bold leading-none uppercase">Status Segmentasi</p>
                    <p className="text-xs font-semibold text-primary-dark/80 mt-1">{member.statusMember}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-bg-soft rounded-xl text-primary-dark/60"><Mail className="w-4 h-4" /></div>
                  <div>
                    <p className="text-[10px] text-primary-dark/40 font-bold leading-none uppercase">Email Terdaftar</p>
                    <p className="text-xs font-semibold text-primary-dark/80 mt-1">{member.customer.toLowerCase().replace(/\s+/g, '')}@velouraprive.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: STATISTIK BELANJA & INTEGRASI REFERRAL */}
          <div className="lg:col-span-2 space-y-6 font-quicksand">
            
            {/* STATS ROW */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-[24px] border border-primary-light/5 shadow-veloura flex items-center gap-4">
                <div className="p-3 bg-secondary-light/5 text-secondary-light rounded-2xl"><ShoppingBag className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Total Belanja</p>
                  <p className="text-lg font-bold font-playfair text-primary-dark mt-0.5">18 Transaksi</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-[24px] border border-primary-light/5 shadow-veloura flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl"><Coins className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Veloura Points</p>
                  <p className="text-lg font-bold font-playfair text-emerald-600 mt-0.5">4.250 Pts</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-[24px] border border-primary-light/5 shadow-veloura flex items-center gap-4">
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl"><Award className="w-5 h-5" /></div>
                <div>
                  <p className="text-[10px] text-primary-dark/40 font-bold uppercase tracking-wider">Referral Reward</p>
                  <p className="text-lg font-bold font-playfair text-amber-600 mt-0.5">Rp 750.000</p>
                </div>
              </div>
            </div>

            {/* REFERRAL DISTRIBUTION CARD */}
            <div className="bg-white p-6 rounded-[30px] border border-primary-light/5 shadow-veloura space-y-4">
              <div className="flex items-center justify-between border-b border-border-subtle/60 pb-3">
                <h4 className="text-xs font-bold text-primary-dark/40 uppercase tracking-wider flex items-center gap-2">
                  <Ticket className="w-4 h-4 text-secondary-light" /> Afiliasi & Program Rujukan
                </h4>
                <span className="text-[11px] font-mono font-bold bg-bg-soft px-3 py-1 rounded-lg text-primary-dark">
                  Code: {member.referralCode}
                </span>
              </div>
              <p className="text-xs text-primary-dark/60 leading-relaxed">
                Gunakan kode referral eksklusif di atas untuk melacak kontribusi penjualan dari loyalis ini. Anggota ini berhak mendapatkan komisi keuntungan sebesar <span className="font-bold text-secondary-light">5% cashback koin</span> dari setiap transaksi baru menggunakan kode rujukan mereka.
              </p>
            </div>

            {/* MOCK TRANSACTION HISTORY */}
            <div className="bg-white p-6 rounded-[30px] border border-primary-light/5 shadow-veloura space-y-4">
              <h4 className="text-xs font-bold text-primary-dark/40 uppercase tracking-wider">Riwayat Belanja Terakhir</h4>
              
              <div className="divide-y divide-border-subtle/50">
                {[
                  { id: "INV-2026-9884", item: "Silk Evening Gown - Emerald Accent", price: "Rp 3.450.000", status: "Selesai" },
                  { id: "INV-2026-9120", item: "Velvet Blazer & Tailored Pants Set", price: "Rp 2.890.000", status: "Selesai" }
                ].map((trx, index) => (
                  <div key={index} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 group/row">
                    <div>
                      <p className="text-xs font-bold text-primary-dark group-hover/row:text-secondary-light transition-colors">{trx.item}</p>
                      <p className="text-[10px] text-primary-dark/40 font-mono mt-0.5">{trx.id} <span className="mx-1">|</span> 26 Mei 2026</p>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="text-xs font-bold text-primary-dark">{trx.price}</p>
                        <p className="text-[9px] text-emerald-600 font-semibold uppercase tracking-wider mt-0.5">{trx.status}</p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-primary-dark/30 group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        <Footer />
      </div>
    </DashboardContainer>
  );
};

export default MembershipsDetail;