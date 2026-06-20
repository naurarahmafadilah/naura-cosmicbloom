import React, { useState, useEffect } from "react";
import { FiScissors, FiUser, FiCheckCircle } from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember"; 
import FooterMember from "../layouts/FooterMember"; 

const ProfilMember = () => {
  const [profile, setProfile] = useState({
    nama: "Veloura VIP Member",
    email: "client@veloura.com",
    phone: "+62 812-9900-1122",
    size: "M",
    lingkarDada: "92",
    lingkarPinggang: "74",
    tinggiBadan: "165"
  });

  const [isSaved, setIsSaved] = useState(false);

  // 1. Ambil data pengguna dari localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setProfile((prevProfile) => ({
          ...prevProfile,
          nama: parsedUser.name || prevProfile.nama,
          email: parsedUser.email || prevProfile.email
        }));
      } catch (error) {
        console.error("Gagal memuat sesi data user:", error);
      }
    }
  }, []);

  // 2. Simpan pembaruan profil kembali ke localStorage
  const handleUpdate = (e) => {
    e.preventDefault();
    
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const currentUserData = JSON.parse(storedUser);
        
        // Perbarui hanya field nama (dan email jika diperlukan di masa depan)
        const updatedUserData = {
          ...currentUserData,
          name: profile.nama
        };

        // Simpan kembali ke localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));

        // Memicu event global agar perubahan nama langsung terdeteksi oleh Navbar / HeaderMember
        window.dispatchEvent(new Event("localUserUpdate"));
      } catch (error) {
        console.error("Gagal memperbarui sesi data user:", error);
      }
    }

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] flex flex-col">
      {/* HEADER MEMBER EXCLUSIVE */}
      <HeaderMember cartCount={0} wishlistCount={2} />

      {/* KONTEN UTAMA PROFIL */}
      <div className="flex-grow max-w-4xl mx-auto px-6 sm:px-10 py-10 font-quicksand w-full">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-8">
          
          {/* HEADER PROFILE ARSIVE */}
          <div className="flex items-center justify-between border-b border-[#e6e4dd] pb-6">
            <div>
              <h3 className="text-xl font-normal text-[#2c3218] uppercase tracking-wide font-playfair">Profil Atrium & Ukuran Tubuh</h3>
              <p className="text-xs text-stone-400 mt-1">Data rekam anatomi fitting personal Anda demi jaminan presisi potongan gaun desainer.</p>
            </div>
            <div className="p-3 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] text-[#2c3218]">
              <FiScissors size={20} />
            </div>
          </div>

          {/* VISUAL MINI PROFILE AVATAR CARD */}
          <div className="bg-[#fcfbf9] border border-[#e6e4dd] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-tr from-[#2c3218] to-[#3a3f24] rounded-2xl flex items-center justify-center text-white text-2xl shadow-md border border-white/10">
              <FiUser />
            </div>
            <div>
              <h4 className="text-base font-medium font-playfair text-[#2c3218] leading-tight">{profile.nama}</h4>
              <p className="text-xs text-[#c97d7d] font-semibold mt-0.5 uppercase tracking-wider text-[10px]">Veloura Private Atelier Client</p>
            </div>
          </div>

          {/* ATRIUM FORM INPUTS */}
          <form onSubmit={handleUpdate} className="space-y-6 text-xs font-semibold text-stone-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Nama Lengkap Pemilik Akses</label>
                <input 
                  type="text" 
                  value={profile.nama} 
                  onChange={(e) => setProfile({...profile, nama: e.target.value})}
                  className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] transition" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Alamat Korespondensi Elektronik</label>
                <input 
                  type="email" 
                  value={profile.email} 
                  disabled 
                  className="w-full p-4 bg-stone-100/60 border border-[#e6e4dd] rounded-xl font-medium text-sm text-stone-400 cursor-not-allowed" 
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Nomor Telepon Seluler Terverifikasi</label>
                <input 
                  type="text" 
                  value={profile.phone} 
                  onChange={(e) => setProfile({...profile, phone: e.target.value})}
                  className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] transition" 
                />
              </div>
            </div>

            {/* STANDARISASI UKURAN GARMENT */}
            <div className="pt-6 border-t border-stone-200/60 space-y-4">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">Spesifikasi Ukuran Fitting</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: "size", label: "Standard Size", type: "text" },
                  { key: "lingkarDada", label: "Lingkar Dada (cm)", type: "number" },
                  { key: "lingkarPinggang", label: "Lingkar Pinggang (cm)", type: "number" },
                  { key: "tinggiBadan", label: "Tinggi Badan (cm)", type: "number" }
                ].map((field) => (
                  <div key={field.key} className="bg-[#fcfbf9] p-4 rounded-xl border border-[#e6e4dd] text-center focus-within:border-stone-500 transition">
                    <span className="text-[9px] font-bold text-stone-400 block uppercase tracking-wider mb-1">{field.label}</span>
                    <input 
                      type={field.type} 
                      value={profile[field.key]} 
                      onChange={(e) => setProfile({...profile, [field.key]: e.target.value})}
                      className="w-full bg-transparent text-center font-bold text-base text-[#2c3218] border-b border-transparent focus:outline-none focus:border-[#c97d7d]/50 transition pb-0.5"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SUBMIT ACTION & TOAST ANCHOR */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-stone-100 gap-4">
              <div>
                {isSaved && (
                  <span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold animate-fade-in">
                    <FiCheckCircle size={14} /> Berhasil memperbarui arsip fitting kain utama!
                  </span>
                )}
              </div>
              <button 
                type="submit"
                className="w-full sm:w-auto bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold px-8 py-3.5 rounded-xl shadow-md transition duration-300 transform active:scale-98"
              >
                Simpan Profil Mode
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FOOTER MEMBER EXCLUSIVE */}
      <FooterMember />
    </div>
  );
};

export default ProfilMember;