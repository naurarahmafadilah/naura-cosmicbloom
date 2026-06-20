import React, { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheckCircle } from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember";
import FooterMember from "../layouts/FooterMember";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Layanan Concierge VIP",
    message: ""
  });
  
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulasi pengiriman pesan eksklusif
    setIsSent(true);
    setFormData({ name: "", email: "", subject: "Layanan Concierge VIP", message: "" });
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] flex flex-col">
      {/* HEADER INTEGRASI */}
      <HeaderMember />

      {/* KONTEN UTAMA */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 py-12 w-full font-quicksand text-[#2c3218] space-y-12">
        
        {/* HERO INTRO */}
        <section className="text-center max-w-2xl mx-auto space-y-4">
          <span className="inline-block bg-[#3a3f24]/10 text-[#3a3f24] text-[10px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">
            ✦ Veloura Private Concierge ✦
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal font-playfair tracking-wide text-[#2c3218]">
            Hubungi Hub Mode Kami
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light leading-relaxed">
            Butuh bantuan terkait fitting personal, perubahan pesanan Haute Couture, atau undangan Trunk Show eksklusif? Tim asistensi utama kami siap melayani Anda.
          </p>
        </section>

        {/* MAIN SPLIT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          
          {/* KOLOM KIRI: MAISON INFO & CARDS (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-6">
              <h3 className="text-lg font-normal font-playfair uppercase tracking-wide border-b border-[#e6e4dd] pb-4">
                Atelier Headquarters
              </h3>

              <div className="space-y-5">
                {/* Alamat (Pekanbaru) */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] flex items-center justify-center shrink-0 text-[#c97d7d]">
                    <FiMapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Main Atelier Address</h4>
                    <p className="text-sm font-medium mt-1 leading-relaxed">
                      Maison Veloura, VIP Suite Level 3,<br />
                      Jl. Jenderal Sudirman No. 128, Cinta Raja,<br />
                      Kec. Sail, Kota Pekanbaru, Riau 28121
                    </p>
                  </div>
                </div>

                {/* Telepon */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] flex items-center justify-center shrink-0 text-[#c97d7d]">
                    <FiPhone size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Private Line & WhatsApp</h4>
                    <p className="text-sm font-bold mt-1 text-[#3a3f24] hover:underline cursor-pointer">
                      +62 812-9900-1122
                    </p>
                  </div>
                </div>

                {/* Surel */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] flex items-center justify-center shrink-0 text-[#c97d7d]">
                    <FiMail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Electronic Correspondence</h4>
                    <p className="text-sm font-medium mt-1 text-stone-600">
                      concierge@veloura.com
                    </p>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="flex gap-4 border-t border-[#e6e4dd] pt-5">
                  <div className="w-10 h-10 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] flex items-center justify-center shrink-0 text-stone-400">
                    <FiClock size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">Atelier Hours</h4>
                    <p className="text-xs font-medium mt-1 text-stone-600 leading-relaxed">
                      Senin - Sabtu: <span className="font-bold text-[#2c3218]">09:00 - 20:00 WIB</span><br />
                      Minggu (Hanya Janji Temu VIP): <span className="font-bold text-[#2c3218]">11:00 - 17:00 WIB</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* EMBEDDED MAP SIMULATION */}
            <div className="w-full h-48 bg-stone-200 rounded-3xl border border-[#e6e4dd] relative overflow-hidden group shadow-2xs">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600" 
                alt="Veloura Pekanbaru Location Map" 
                className="w-full h-full object-cover filter grayscale contrast-125 brightness-95 opacity-80 group-hover:scale-105 transition duration-700" 
              />
              <div className="absolute inset-0 bg-[#2c3218]/10 group-hover:bg-transparent transition duration-500"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-[#e6e4dd] flex justify-between items-center shadow-md">
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#c97d7d]">Maison Location</p>
                  <p className="text-xs font-medium font-playfair mt-0.5 text-[#2c3218]">Sudirman, Pekanbaru</p>
                </div>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-[10px] font-bold text-white bg-[#3a3f24] px-3 py-2 rounded-lg hover:bg-[#2c3218] transition"
                >
                  Buka Peta
                </a>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: FORM DIGITAL (3/5) */}
          <div className="lg:col-span-3 bg-white p-6 sm:p-10 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-6">
            <div>
              <h3 className="text-lg font-normal font-playfair uppercase tracking-wide text-[#2c3218]">
                Kirim Memo Digital
              </h3>
              <p className="text-xs text-stone-400 mt-1">Pesan Anda akan langsung masuk ke dasbor prioritas manajer hubungan klien kami.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-stone-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Nama */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Nama Anda</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Masukkan nama lengkap"
                    className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] transition placeholder:text-stone-300" 
                  />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Alamat Email Korespondensi</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="nama@email.com"
                    className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] transition placeholder:text-stone-300" 
                  />
                </div>
              </div>

              {/* Subjek Pilihan */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Perihal Layanan</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] cursor-pointer transition"
                >
                  <option value="Layanan Concierge VIP">Layanan Concierge VIP (Umum)</option>
                  <option value="Konsultasi Gaun Custom & Fitting">Konsultasi Gaun Custom & Fitting</option>
                  <option value="Perubahan Detail / Komplain Pesanan">Perubahan Detail / Komplain Pesanan</option>
                  <option value="Kemitraan Eksklusif & Trunk Show">Kemitraan Eksklusif & Trunk Show</option>
                </select>
              </div>

              {/* Pesan */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Detail Memo / Catatan Perubahan</label>
                <textarea 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Deskripsikan kebutuhan asisten mode Anda secara rinci di sini..."
                  className="w-full p-4 bg-[#faf9f5] border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-stone-500 focus:bg-white font-medium text-sm text-[#2c3218] transition placeholder:text-stone-300 resize-none leading-relaxed"
                ></textarea>
              </div>

              {/* ACTION & NOTIFIKASI */}
              <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-stone-100 gap-4">
                <div>
                  {isSent && (
                    <span className="text-emerald-600 flex items-center gap-1.5 text-xs font-bold animate-fade-in">
                      <FiCheckCircle size={14} /> Memo terkirim! Tim kurator kami akan menghubungi dalam waktu 1x24 jam.
                    </span>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold px-8 py-4 rounded-xl shadow-md transition duration-300 transform active:scale-98 flex items-center justify-center gap-2"
                >
                  <FiSend size={13} />
                  <span>Kirim Pesan Prioritas</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* FOOTER INTEGRASI */}
      <FooterMember />
    </div>
  );
};

export default ContactUs;