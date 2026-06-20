import React from "react";
import { useNavigate } from "react-router-dom";
import { FiInstagram, FiFacebook, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const FooterMember = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#1c1f10] text-[#faf9f5] border-t border-[#3a3f24] font-quicksand mt-auto">
      {/* AREA UTAMA FOOTER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* KOLOM 1: BRAND ESSENCE */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-widest font-playfair uppercase text-white">
            Veloura<span className="text-[#c97d7d] font-accent text-3xl">.</span>
          </h2>
          <p className="text-xs text-stone-400 font-light leading-relaxed max-w-xs">
            Menghadirkan standar tertinggi busana adibusana secara presisi untuk kenyamanan fiting personal dan kemewahan sejati Anda.
          </p>
          {/* Sosial Media */}
          <div className="flex items-center gap-3 pt-2">
            <a href="#instagram" className="p-2 bg-[#2c3218] hover:bg-[#c97d7d] hover:text-white rounded-lg text-stone-300 transition duration-300">
              <FiInstagram size={14} />
            </a>
            <a href="#facebook" className="p-2 bg-[#2c3218] hover:bg-[#c97d7d] hover:text-white rounded-lg text-stone-300 transition duration-300">
              <FiFacebook size={14} />
            </a>
          </div>
        </div>

        {/* KOLOM 2: DIREKTORI ATELIER */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400">Navigasi Utama</h4>
          <ul className="text-xs space-y-2 text-stone-300 font-medium">
            <li>
              <button onClick={() => navigate("/member")} className="hover:text-[#c97d7d] transition">Dashboard Privé</button>
            </li>
            <li>
              <button onClick={() => navigate("/lacak-pesanan")} className="hover:text-[#c97d7d] transition">Lacak Manifes</button>
            </li>
            <li>
              <button onClick={() => navigate("/profil-member")} className="hover:text-[#c97d7d] transition">Ukuran Fitting</button>
            </li>
            <li>
              <button onClick={() => navigate("/keranjang")} className="hover:text-[#c97d7d] transition">Keranjang Atelier</button>
            </li>
          </ul>
        </div>

        {/* KOLOM 3: LAYANAN BANTUAN */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400">Dukungan VIP</h4>
          <ul className="text-xs space-y-2 text-stone-300 font-medium">
            <li>
              <button onClick={() => navigate("/contact")} className="hover:text-[#c97d7d] transition">Hubungi Kami</button>
            </li>
            <li>
              <a href="#faq" className="hover:text-[#c97d7d] transition">Panduan Fitting Mandiri</a>
            </li>
            <li>
              <a href="#privacy" className="hover:text-[#c97d7d] transition">Kebijakan Privasi Data</a>
            </li>
            <li>
              <a href="#terms" className="hover:text-[#c97d7d] transition">Syarat & Ketentuan Atrium</a>
            </li>
          </ul>
        </div>

        {/* KOLOM 4: KORESPONDENSI FISIK (SINKRON DENGAN CONTACT US - PEKANBARU) */}
        <div className="space-y-3 text-xs text-stone-300">
          <h4 className="text-xs uppercase font-bold tracking-wider text-stone-400">Veloura Maison</h4>
          <div className="flex items-start gap-2.5 font-light">
            <FiMapPin className="text-[#c97d7d] mt-0.5 shrink-0" size={14} />
            <span>Maison Veloura, VIP Suite Level 3, Jl. Jenderal Sudirman No. 128, Cinta Raja, Kec. Sail, Kota Pekanbaru, Riau 28121</span>
          </div>
          <div className="flex items-center gap-2.5 font-light">
            <FiPhone className="text-[#c97d7d] shrink-0" size={14} />
            <span>+62 812-9900-1122</span>
          </div>
          <div className="flex items-center gap-2.5 font-light">
            <FiMail className="text-[#c97d7d] shrink-0" size={14} />
            <span>concierge@veloura.com</span>
          </div>
        </div>

      </div>

      {/* FOOTNOTE COPYRIGHT */}
      <div className="w-full bg-[#14160b] py-4 border-t border-[#262a15]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-stone-500 font-medium tracking-wide">
          <span>&copy; {currentYear} Veloura Private Atelier. Hak Cipta Dilindungi.</span>
          <span className="uppercase text-[9px] text-stone-600">Standard Haute Couture House International</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterMember;