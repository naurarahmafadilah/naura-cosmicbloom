import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==========================================
// SHADCN UI INTEGRATION (FOR DIALOGS)
// ==========================================
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Input } from "../components/ui/input";

// ==========================================
// ICONS
// ==========================================
import { 
  FiUser, 
  FiAward, 
  FiCalendar, 
  FiScissors, 
  FiPercent, 
  FiHeadphones,
  FiShoppingBag,
  FiHeart,
  FiCheckCircle,
  FiArrowRight,
  FiInfo,
  FiTag,
  FiMessageSquare,
  FiHelpCircle
} from "react-icons/fi";

const MemberDashboard = () => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [profile, setProfile] = useState({
    nama: "Veloura VIP Member",
    email: "client@veloura.com",
    phone: "+62 812-9900-1122",
    size: "M",
    lingkarDada: "92",
    lingkarPinggang: "74",
    tinggiBadan: "165"
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({ ...profile });
  const [claimedVouchers, setClaimedVouchers] = useState([]);

  // State untuk Input Form Feedback Member
  const [feedbackCategory, setFeedbackCategory] = useState("Pelayanan Butik");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackStatus, setFeedbackStatus] = useState("");

  const [saleProducts] = useState([
    {
      "id": "s1",
      "slug": "elegant-evening-dress",
      "name": "Elegant Evening Dress",
      "oldPrice": "350.000",
      "price": "250.000",
      "discount": "30%",
      "img": "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s2",
      "slug": "casual-autumn-shirt",
      "name": "Casual Autumn Shirt",
      "oldPrice": "250.000",
      "price": "180.000",
      "discount": "28%",
      "img": "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
    },
    {
      "id": "s3",
      "slug": "summer-breeze-dress",
      "name": "Summer Breeze Dress",
      "oldPrice": "400.000",
      "price": "300.000",
      "discount": "25%",
      "img": "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop"
    },
    {
      "id": "s4",
      "slug": "minimalist-silk-outfit",
      "name": "Minimalist Silk Outfit",
      "oldPrice": "320.000",
      "price": "270.000",
      "discount": "15%",
      "img": "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop"
    }
  ]);

  const [transactions] = useState([
    { id: "VLR-88291", item: "Amour Silk Evening Gown", type: "Custom Tailored", date: "15 Juni 2026", status: "In Alteration", price: "Rp 7.500.000" },
    { id: "VLR-87102", item: "Elysian Linen Blazer Blouse", type: "Ready-to-Wear", date: "02 Mei 2026", status: "Completed", price: "Rp 3.200.000" },
    { id: "VLR-85940", item: "Monarch Velvet Corset Accent", type: "Custom Tailored", date: "24 April 2026", status: "Completed", price: "Rp 3.800.000" }
  ]);

  const [wishlist] = useState([
    { name: "Sienna Satin Slip Dress", price: "Rp 4.200.000", img: "👗" },
    { name: "Aurora Tweed Outer Jacket", price: "Rp 5.100.000", img: "🧥" }
  ]);

  useEffect(() => {
    if (currentUser) {
      setProfile((prev) => ({
        ...prev,
        nama: currentUser.name || "Veloura Customer",
        email: currentUser.email || "client@veloura.com",
      }));
    }
  }, [currentUser]);

  useEffect(() => {
    setFormData({ ...profile });
  }, [profile, isEditDialogOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setProfile({ ...formData });
    
    if (currentUser) {
      const updatedUser = { ...currentUser, name: formData.nama };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      window.dispatchEvent(new Event("localUserUpdate"));
    }
    
    setIsEditDialogOpen(false);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackMessage.trim()) return;
    
    setFeedbackStatus("success");
    setFeedbackMessage("");
    setTimeout(() => setFeedbackStatus(""), 4000);
  };

  const toggleClaimVoucher = (title) => {
    if (claimedVouchers.includes(title)) {
      setClaimedVouchers(claimedVouchers.filter(t => t !== title));
    } else {
      setClaimedVouchers([...claimedVouchers, title]);
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg-main font-quicksand text-primary-dark pb-16">
      
      {/* HEADER UTAMA VELOURA BOUTIQUE */}
      <header className="w-full bg-white border-b border-border-subtle px-6 py-4 flex items-center justify-between shadow-veloura">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-widest font-playfair uppercase text-primary-dark">
            Veloura<span className="text-secondary-light font-accent normal-case lowercase text-3xl">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/contact")}
            className="flex items-center gap-1.5 bg-bg-soft border border-border-subtle text-primary-dark text-xs font-bold px-4 py-2 rounded-xl hover:bg-white transition cursor-pointer"
          >
            <FiHeadphones size={13} className="text-secondary-light" />
            <span>Concierge Service</span>
          </button>
          <div className="flex items-center gap-2 bg-primary-dark text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs">
            <FiUser size={13} className="text-primary-light" />
            <span>{profile.nama}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8 space-y-6">
        
        {/* HERO BANNER */}
        <section className="w-full bg-gradient-to-r from-primary-dark via-[#5c653b] to-[#3a3f24] rounded-3xl p-8 text-white shadow-veloura relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-3 max-w-2xl z-10">
            <span className="inline-block bg-primary-light/30 border border-primary-light/40 text-bg-soft text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              ✨ Member Privilege Area
            </span>
            <h2 className="text-3xl font-normal tracking-wide font-playfair text-white">
              Selamat Datang, <span className="font-family text-4xl text-bg-soft block md:inline">{profile.nama}</span>
            </h2>
            <p className="text-xs text-bg-soft/90 leading-relaxed font-medium font-quicksand max-w-xl">
              Akses koleksi teranyar desainer Anda, kelola arsip detail fitting busana pribadi, serta klaim privilese potongan harga eksklusif butik Veloura dari satu tempat terpusat.
            </p>
            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => navigate("/shop")}
                className="bg-secondary-light text-white hover:bg-hover-rose text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition cursor-pointer border border-transparent"
              >
                Jelajahi Koleksi
              </button>
              <button 
                onClick={() => navigate("/contact")}
                className="bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer"
              >
                Hubungi Personal Stylist
              </button>
            </div>
          </div>

          {/* Kotak Agenda Fitting Terdekat */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 w-full md:w-72 shadow-inner z-10">
            <p className="text-[10px] text-primary-light uppercase tracking-widest font-bold">Agenda Fitting Koleksi</p>
            <h3 className="text-base font-normal mt-1.5 text-white font-playfair">Veloura Private Trunk Show</h3>
            <div className="mt-3 space-y-2 text-xs font-quicksand text-bg-soft/90">
              <div className="flex items-center gap-2">
                <FiShoppingBag size={12} className="text-primary-light" />
                <span>VIP Suite Room - Main Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar size={12} className="text-primary-light" />
                <span>28 Juni 2026, 14:00 WIB</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl pointer-events-none"></div>
        </section>

        {/* 4 CARDS AKUN MEMBER (GRID) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-veloura flex flex-col justify-between h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 bg-bg-soft text-primary-dark rounded-xl flex items-center justify-center"><FiUser size={14} /></div>
              <span className="bg-primary-light/10 text-primary-dark text-[9px] font-bold px-2 py-0.5 rounded-md tracking-wider uppercase">VIP Tier</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">Status Akun</span>
              <p className="text-lg font-normal text-primary-dark mt-0.5 font-playfair">Active Client</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-veloura flex flex-col justify-between h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 bg-bg-soft text-secondary-light rounded-xl flex items-center justify-center"><FiAward size={14} /></div>
              <span className="bg-bg-soft text-secondary-dark text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Elite Tier</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">Level Membership</span>
              <p className="text-lg font-normal text-secondary-dark mt-0.5 font-playfair">Gold Insignia</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-veloura flex flex-col justify-between h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 bg-bg-soft text-primary-light rounded-xl flex items-center justify-center"><FiShoppingBag size={14} /></div>
              <span className="bg-stone-100 text-stone-600 text-[10px] font-bold px-2 py-0.5 rounded-md">Veloura Order</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">Total Item Koleksi</span>
              <p className="text-lg font-normal text-primary-dark mt-0.5 font-playfair">{transactions.length} Busana Terdaftar</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-veloura flex flex-col justify-between h-28">
            <div className="flex justify-between items-center">
              <div className="w-8 h-8 bg-bg-soft text-secondary-light rounded-xl flex items-center justify-center"><FiHeart size={14} /></div>
              <span className="bg-bg-soft text-secondary-light text-[10px] font-bold px-2 py-0.5 rounded-md">Maison Point</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-stone-400 block uppercase tracking-wider">Total Akumulasi Pembelian</span>
              <p className="text-lg font-normal text-primary-dark mt-0.5 font-playfair">Rp 14.500.000</p>
            </div>
          </div>
        </section>

        {/* SECTION: GALERI PRIVATE SALE */}
        <section className="bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <div>
              <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Veloura Special Selection</h3>
              <p className="text-[11px] text-stone-400 font-quicksand">Katalog penawaran khusus terkurasi hanya untuk member terdaftar.</p>
            </div>
            <div className="flex items-center gap-1.5 text-secondary-light text-xs font-bold bg-secondary-light/10 px-3 py-1 rounded-full">
              <FiTag size={12} />
              <span>Exclusive Deals</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-1">
            {saleProducts.map((product) => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/shop/${product.slug}`)}
                className="group bg-bg-soft rounded-xl border border-border-subtle overflow-hidden cursor-pointer shadow-xs hover:shadow-md hover:border-stone-300 transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-2.5 left-2.5 bg-secondary-light text-white text-[10px] font-bold px-2 py-0.5 rounded-md tracking-wider shadow-sm">
                    {product.discount} OFF
                  </span>
                </div>
                <div className="p-3.5 flex flex-col flex-grow justify-between bg-white">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-primary-dark font-playfair group-hover:text-secondary-light transition-colors line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-stone-400 tracking-wider">Veloura Limited Edition</p>
                  </div>
                  <div className="flex items-baseline justify-between pt-3 mt-auto border-t border-stone-100">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-400 line-through">Rp {product.oldPrice}</span>
                      <span className="text-xs font-bold text-primary-dark">Rp {product.price}</span>
                    </div>
                    <span className="p-1.5 bg-bg-soft text-primary-dark group-hover:bg-primary-dark group-hover:text-white rounded-lg transition-colors duration-200">
                      <FiArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: DETAIL PROFILE, VOUCHER, & ORDERS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Profil Ukuran */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-5">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Profil & Ukuran Mode</h3>
                <p className="text-[11px] text-stone-400 font-quicksand">Konfigurasi ini otomatis digunakan untuk mempermudah kustomisasi garmen Anda.</p>
              </div>
              <button 
                onClick={() => setIsEditDialogOpen(true)}
                className="flex items-center gap-1 text-white bg-primary-light hover:bg-hover-green text-xs font-bold px-3 py-1.5 rounded-xl transition cursor-pointer"
              >
                <FiScissors size={12} />
                <span>Sesuaikan Ukuran</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-quicksand">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Nama Klien</label>
                <p className="text-xs font-semibold bg-bg-soft p-3 rounded-xl border border-border-subtle text-primary-dark">{profile.nama}</p>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Email</label>
                <p className="text-xs font-semibold bg-bg-soft p-3 rounded-xl border border-border-subtle text-primary-dark truncate">{profile.email}</p>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">Kontak Telepon</label>
                <p className="text-xs font-semibold bg-bg-soft p-3 rounded-xl border border-border-subtle text-primary-dark">{profile.phone}</p>
              </div>
              <div className="grid grid-cols-4 gap-2 sm:col-span-2 mt-2">
                <div className="bg-bg-soft border border-border-subtle rounded-xl p-2.5 text-center">
                  <span className="text-[9px] text-stone-400 block uppercase font-bold">Standard</span>
                  <span className="text-sm font-bold text-primary-dark">{profile.size}</span>
                </div>
                <div className="bg-bg-soft border border-border-subtle rounded-xl p-2.5 text-center">
                  <span className="text-[9px] text-stone-400 block uppercase font-bold">L. Dada</span>
                  <span className="text-sm font-bold text-primary-dark">{profile.lingkarDada} cm</span>
                </div>
                <div className="bg-bg-soft border border-border-subtle rounded-xl p-2.5 text-center">
                  <span className="text-[9px] text-stone-400 block uppercase font-bold">L. Pinggang</span>
                  <span className="text-sm font-bold text-primary-dark">{profile.lingkarPinggang} cm</span>
                </div>
                <div className="bg-bg-soft border border-border-subtle rounded-xl p-2.5 text-center">
                  <span className="text-[9px] text-stone-400 block uppercase font-bold">Tinggi</span>
                  <span className="text-sm font-bold text-primary-dark">{profile.tinggiBadan} cm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Eksklusif Voucher */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-4">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Veloura Privileges</h3>
                <p className="text-[11px] text-stone-400 font-quicksand">Hak istimewa potongan harga butik.</p>
              </div>
              <span className="text-secondary-light"><FiPercent size={16} /></span>
            </div>

            <div className="space-y-3 font-quicksand">
              {[
                { title: "Private Couture Collection", desc: "Potongan khusus gaun sutra alam", discount: "15% OFF" },
                { title: "Complimentary Alteration", desc: "Bebas biaya perbaikan & fitting custom", discount: "FREE" }
              ].map((promo, idx) => {
                const isClaimed = claimedVouchers.includes(promo.title);
                return (
                  <div key={idx} className="bg-bg-soft p-4 rounded-xl border border-dashed border-primary-light flex justify-between items-center gap-3">
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-primary-dark truncate font-playfair">{promo.title}</h4>
                      <p className="text-[10px] text-stone-500 mt-0.5 truncate">{promo.desc}</p>
                      <button 
                        onClick={() => toggleClaimVoucher(promo.title)}
                        className={`text-[10px] font-bold mt-2 flex items-center gap-1 cursor-pointer transition ${isClaimed ? 'text-primary-light' : 'text-secondary-light hover:underline'}`}
                      >
                        {isClaimed ? (
                          <><FiCheckCircle size={10} /> <span>Claimed Code</span></>
                        ) : (
                          <><span>Gunakan Kode</span> <FiArrowRight size={10} /></>
                        )}
                      </button>
                    </div>
                    <span className={`font-bold text-[10px] tracking-wider px-2.5 py-1 rounded-lg shrink-0 ${isClaimed ? 'bg-primary-light text-white' : 'bg-primary-dark text-white'}`}>
                      {promo.discount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tabel Riwayat Pesanan */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Arsip Pesanan & Busana</h3>
                <p className="text-[11px] text-stone-400 font-quicksand">Status pelacakan serta riwayat faktur pembelian Anda.</p>
              </div>
              <FiShoppingBag className="text-primary-light" size={16} />
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse font-quicksand text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 font-bold">Invoice / Item</th>
                    <th className="py-2.5 font-bold">Kategori</th>
                    <th className="py-2.5 font-bold">Status Proses</th>
                    <th className="py-2.5 font-bold text-right">Nilai Garmen</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {transactions.map((tx, idx) => (
                    <tr key={idx} className="hover:bg-bg-soft/50 transition-colors">
                      <td className="py-3 pr-2">
                        <span className="block font-bold text-stone-400 text-[10px]">{tx.id}</span>
                        <span className="font-semibold text-primary-dark font-playfair text-xs">{tx.item}</span>
                      </td>
                      <td className="py-3 text-stone-500 font-medium">{tx.type}</td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold ${tx.status === 'In Alteration' ? 'bg-secondary-light/10 text-secondary-dark' : 'bg-primary-light/10 text-primary-dark'}`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 text-right font-bold text-primary-dark">{tx.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wishlist */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div>
                <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Radar Wishlist VIP</h3>
                <p className="text-[11px] text-stone-400 font-quicksand">Koleksi tersimpan untuk peninjauan garmen mendatang.</p>
              </div>
              <FiHeart className="text-secondary-light" size={16} />
            </div>

            <div className="space-y-3 font-quicksand">
              {wishlist.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-bg-soft rounded-xl border border-border-subtle">
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-2xl p-1 bg-white rounded-lg shadow-2xs border border-border-subtle">{item.img}</span>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-primary-dark font-playfair truncate">{item.name}</h4>
                      <p className="text-[10px] text-stone-400 mt-0.5">{item.price}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate("/shop")} className="p-2 bg-white text-primary-dark hover:bg-primary-dark hover:text-white rounded-xl transition border border-border-subtle shrink-0 cursor-pointer">
                    <FiArrowRight size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEEDBACK & HELP CENTER SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Kirim Masukan / Feedback */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura space-y-4">
            <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
              <div className="p-2 bg-bg-soft text-primary-light rounded-xl"><FiMessageSquare size={16} /></div>
              <div>
                <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Kirim Feedback</h3>
                <p className="text-[11px] text-stone-400">Suara Anda membantu Veloura menyajikan kualitas busana dan layanan terbaik.</p>
              </div>
            </div>

            <form onSubmit={handleFeedbackSubmit} className="space-y-3 font-quicksand">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Kategori Masukan</label>
                <select 
                  value={feedbackCategory}
                  onChange={(e) => setFeedbackCategory(e.target.value)}
                  className="w-full bg-bg-soft border border-border-subtle rounded-xl p-2.5 text-xs font-medium focus:outline-hidden focus:border-stone-400"
                >
                  <option value="Pelayanan Butik">Pelayanan Butik & Stylist</option>
                  <option value="Kualitas Pakaian">Kualitas Bahan & Jahitan Garmen</option>
                  <option value="Sistem Aplikasi">Aplikasi & Pengalaman Member</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pesan Anda</label>
                <textarea 
                  rows="3"
                  value={feedbackMessage}
                  onChange={(e) => setFeedbackMessage(e.target.value)}
                  placeholder="Tulis kritik, saran, atau impresi pengalaman belanja Anda di sini..."
                  className="w-full bg-bg-soft border border-border-subtle rounded-xl p-3 text-xs placeholder-stone-400 focus:outline-hidden focus:border-stone-400 resize-none"
                  required
                ></textarea>
              </div>
              
              {feedbackStatus === "success" && (
                <p className="text-[11px] text-primary-light font-semibold flex items-center gap-1">
                  <FiCheckCircle size={12} /> Terima kasih! Masukan Anda telah kami terima dengan baik.
                </p>
              )}

              <button 
                type="submit"
                className="w-full bg-primary-dark hover:bg-[#3a3f24] text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                Kirim Feedback Pribadi
              </button>
            </form>
          </div>

          {/* Butuh Bantuan / Hubungi Layanan Pelanggan */}
          <div className="bg-white p-6 rounded-2xl border border-border-subtle shadow-veloura flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-border-subtle pb-3">
                <div className="p-2 bg-bg-soft text-secondary-light rounded-xl"><FiHelpCircle size={16} /></div>
                <div>
                  <h3 className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Butuh Bantuan?</h3>
                  <p className="text-[11px] text-stone-400">Tim asisten Butik Veloura siap mendampingi kendala Anda.</p>
                </div>
              </div>

              {/* Daftar FAQ Cepat */}
              <div className="space-y-2.5 text-xs text-stone-600 font-medium font-quicksand">
                <div className="p-3 bg-bg-soft rounded-xl border border-border-subtle flex justify-between items-center group hover:bg-stone-50 transition-colors cursor-pointer">
                  <span>Bagaimana cara menjadwalkan ulang agenda fitting?</span>
                  <FiArrowRight size={12} className="text-stone-400 group-hover:text-primary-dark" />
                </div>
                <div className="p-3 bg-bg-soft rounded-xl border border-border-subtle flex justify-between items-center group hover:bg-stone-50 transition-colors cursor-pointer">
                  <span>Apakah bisa meminta modifikasi garmen di luar size standar?</span>
                  <FiArrowRight size={12} className="text-stone-400 group-hover:text-primary-dark" />
                </div>
                <div className="p-3 bg-bg-soft rounded-xl border border-border-subtle flex justify-between items-center group hover:bg-stone-50 transition-colors cursor-pointer">
                  <span>Ketentuan pengembalian produk edisi terbatas</span>
                  <FiArrowRight size={12} className="text-stone-400 group-hover:text-primary-dark" />
                </div>
              </div>
            </div>

            {/* Tombol Hubungi Live Support */}
            <div className="pt-2">
              <button 
                onClick={() => window.open("https://wa.me/6281299001122", "_blank")}
                className="w-full bg-secondary-light hover:bg-hover-rose text-white text-xs font-bold py-2.5 rounded-xl shadow-xs transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <FiHeadphones size={14} />
                <span>Hubungi Personal Concierge (WhatsApp)</span>
              </button>
            </div>
          </div>

        </section>
      </main>

      {/* SHADCN CUSTOM MODAL FOR EDIT DATA */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-2xl bg-white p-6 font-quicksand border border-border-subtle shadow-veloura">
          <DialogHeader>
            <DialogTitle className="text-base font-normal text-primary-dark uppercase tracking-wider font-playfair">Ubah Data Klien & Ukuran Garmen</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-3.5 pt-2">
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Nama Lengkap</label>
              <Input value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="rounded-xl h-9 text-xs border-border-subtle focus:ring-primary-light focus:border-primary-light" required />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Nomor Handphone</label>
              <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="rounded-xl h-9 text-xs border-border-subtle" required />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Standard Pakaian</label>
                <Input value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} placeholder="S, M, L, XL" className="rounded-xl h-9 text-xs border-border-subtle" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Lingkar Dada (cm)</label>
                <Input value={formData.lingkarDada} onChange={e => setFormData({...formData, lingkarDada: e.target.value})} className="rounded-xl h-9 text-xs border-border-subtle" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Lingkar Pinggang (cm)</label>
                <Input value={formData.lingkarPinggang} onChange={e => setFormData({...formData, lingkarPinggang: e.target.value})} className="rounded-xl h-9 text-xs border-border-subtle" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Tinggi Badan (cm)</label>
                <Input value={formData.tinggiBadan} onChange={e => setFormData({...formData, tinggiBadan: e.target.value})} className="rounded-xl h-9 text-xs border-border-subtle" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4 border-t border-border-subtle">
              <button type="button" onClick={() => setIsEditDialogOpen(false)} className="px-4 h-9 bg-bg-soft text-stone-500 text-xs font-semibold rounded-xl hover:bg-stone-200 transition">Batal</button>
              <button type="submit" className="px-4 h-9 bg-primary-dark text-white rounded-xl text-xs font-semibold hover:bg-hover-green transition">Simpan Perubahan</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MemberDashboard;