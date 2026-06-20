import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiUser, FiMail, FiLock, FiLayers, FiX } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { supabase } from "../../lib/supabase";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // State untuk mengontrol kemunculan modal Syarat & Ketentuan
  const [showTerms, setShowTerms] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const cleanName = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName || !cleanEmail || !password || !confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setError("Format email tidak valid.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal harus berisikan 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      // 1. Daftarkan akun ke Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      const user = data?.user;
      if (!user) {
        throw new Error("Gagal memproses data pengguna baru.");
      }

      // 2. Catat data profil ke tabel publik database 'users'
      const { error: userError } = await supabase.from("users").insert([
        {
          id: user.id, 
          name: cleanName,
          email: cleanEmail,
          role: role,
        },
      ]);

      if (userError) {
        console.error("Gagal mencatat data ke tabel database:", userError);
      }

      // 3. DIARAHKAN KE HALAMAN LOGIN SECARA MANUAL
      alert("Pendaftaran sukses! Silakan masuk menggunakan akun baru Anda.");
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError(err.message || "Terjadi kendala saat mendaftarkan akun.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#faf9f5] font-quicksand z-50 flex overflow-hidden m-0 p-0 top-0 left-0">
      <style>{`
        input::-ms-reveal, 
        input::-ms-clear,
        input::-webkit-contacts-auto-fill-button,
        input::-webkit-credentials-auto-fill-button,
        input::-webkit-password-toggle-button {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
          opacity: 0 !important;
          width: 0 !important;
          height: 0 !important;
        }
      `}</style>

      {/* ==========================================
          SISI KIRI: FORM REGISTRASI ATELIER
          ========================================== */}
      <div className="w-full lg:w-[38%] h-full flex flex-col items-center justify-center bg-[#faf9f5] px-6 sm:px-10 overflow-y-auto relative border-r border-[#e6e4dd]">
        
        <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-[#e6e4dd] m-4 hidden sm:block pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-[#e6e4dd] m-4 hidden sm:block pointer-events-none"></div>

        <div className="w-full max-w-sm py-4 z-10">
          
          <div className="text-center mb-5">
            <h1 className="text-3xl font-bold tracking-[5px] uppercase text-[#2c3218] font-playfair m-0 p-0">
              Veloura<span className="text-[#c97d7d]">.</span>
            </h1>
            <p className="text-[8px] tracking-[4px] uppercase text-stone-400 font-bold mt-0.5">
              Private Atelier
            </p>
          </div>

          <div className="mb-4 text-center lg:text-left">
            <h2 className="text-xl font-normal text-[#2c3218] font-playfair tracking-wide mb-0.5">
              Registrasi Klien
            </h2>
            <p className="text-[11px] text-stone-500 font-light">
              Lengkapi data untuk mengakses layanan eksklusif adibusana.
            </p>
          </div>

          <form className="space-y-3" onSubmit={handleRegister}>
            {error && (
              <div className="bg-red-50 p-2.5 text-[11px] text-red-700 rounded-lg flex items-center border border-red-100/60 animate-fade-in">
                <BsFillExclamationDiamondFill className="me-2 flex-shrink-0 text-sm text-red-500" />
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* FULL NAME INPUT */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Nama Lengkap
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-stone-400">
                  <FiUser size={14} />
                </span>
                <input
                  type="text"
                  placeholder="Nama lengkap Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-[#3a3f24] focus:ring-1 focus:ring-[#3a3f24]/20 transition-all text-xs text-[#2c3218] disabled:opacity-50"
                />
              </div>
            </div>

            {/* EMAIL INPUT */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Alamat Email
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-stone-400">
                  <FiMail size={14} />
                </span>
                <input
                  type="email"
                  placeholder="nama@layanan.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-[#3a3f24] focus:ring-1 focus:ring-[#3a3f24]/20 transition-all text-xs text-[#2c3218] disabled:opacity-50"
                />
              </div>
            </div>

            {/* ACCOUNT ROLE SELECT */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Tipe Keanggotaan
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-stone-400 pointer-events-none">
                  <FiLayers size={14} />
                </span>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  disabled={loading}
                  className="w-full pl-10 pr-8 py-2.5 bg-white border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-[#3a3f24] focus:ring-1 focus:ring-[#3a3f24]/20 transition-all text-xs text-[#2c3218] disabled:opacity-50 cursor-pointer font-medium appearance-none"
                >
                  <option value="user">User / Guest Publik</option>
                  <option value="member">VIP Member</option>
                  <option value="admin">Administrator</option>
                </select>
                <div className="absolute right-3.5 pointer-events-none border-l border-stone-200 pl-2 text-stone-400 text-[9px]">▼</div>
              </div>
            </div>

            {/* PASSWORD INPUT GROUP */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-stone-400">
                  <FiLock size={14} />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-[#3a3f24] focus:ring-1 focus:ring-[#3a3f24]/20 transition-all text-xs text-[#2c3218] tracking-widest disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 p-1 text-stone-400 hover:text-[#2c3218] transition-colors focus:outline-none z-10 flex items-center justify-center"
                >
                  {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD INPUT GROUP */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Konfirmasi Kata Sandi
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-stone-400">
                  <FiLock size={14} />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#e6e4dd] rounded-xl focus:outline-none focus:border-[#3a3f24] focus:ring-1 focus:ring-[#3a3f24]/20 transition-all text-xs text-[#2c3218] tracking-widest disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 p-1 text-stone-400 hover:text-[#2c3218] transition-colors focus:outline-none z-10 flex items-center justify-center"
                >
                  {showConfirmPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                </button>
              </div>
            </div>

            <p className="text-[9px] text-center text-stone-400 font-medium px-2 pt-0.5 leading-relaxed">
              Dengan mendaftar, Anda menyetujui{" "}
              <span 
                onClick={() => setShowTerms(true)}
                className="underline cursor-pointer text-stone-500 hover:text-[#2c3218]"
              >
                Syarat & Ketentuan
              </span>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3a3f24] hover:bg-[#2c3218] text-white py-3 rounded-xl text-[11px] font-bold uppercase tracking-[2px] transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 flex justify-center items-center group cursor-pointer disabled:cursor-not-allowed mt-1"
            >
              {loading ? (
                <ImSpinner2 className="animate-spin text-sm" />
              ) : (
                <span className="group-hover:translate-x-0.5 transition-transform">
                  Daftar Anggota →
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-stone-500 font-medium mt-6">
            Sudah memiliki akun?{" "}
            <Link
              to="/login"
              className="text-[#c97d7d] font-bold hover:text-[#b06565] transition-colors underline underline-offset-4"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>

      {/* ==========================================
          SISI KANAN: PANEL COVER HERO ELEGAN
          ========================================== */}
      <div className="hidden lg:block w-[62%] h-full relative bg-[#1c1f10] select-none">
        <img 
          src="https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" 
          alt="Veloura Boutique Exclusive" 
          className="w-full h-full object-cover object-center brightness-75 contrast-[1.05] saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14160b]/90 via-transparent to-black/20 flex flex-col justify-end p-16 text-white">
          <div className="max-w-md space-y-2">
            <p className="text-[10px] uppercase tracking-[4px] font-bold text-[#c97d7d]">
              Maison Privilège
            </p>
            <h3 className="text-2xl font-light font-playfair leading-relaxed text-[#faf9f5]">
              "Koleksi busana premium dan gerbang gaya hidup elegan dimulai di sini."
            </h3>
            <div className="w-12 h-[1px] bg-[#e6e4dd]/30 mt-3"></div>
          </div>
        </div>
      </div>

      {/* ==========================================
          MODAL OVERLAY: SYARAT & KETENTUAN (TERMS)
          ========================================== */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#faf9f5] w-full max-w-xl rounded-2xl border border-[#e6e4dd] shadow-xl flex flex-col max-h-[85vh] text-[#2c3218]">
            
            {/* Header Modal */}
            <div className="p-5 border-b border-[#e6e4dd] flex items-center justify-between">
              <div>
                <h3 className="font-playfair text-lg font-bold tracking-wide">Syarat & Ketentuan Keanggotaan</h3>
                <p className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">Veloura Private Atelier</p>
              </div>
              <button 
                onClick={() => setShowTerms(false)}
                className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Konten Modal (Scrollable) */}
            <div className="p-6 overflow-y-auto text-xs space-y-4 leading-relaxed font-light text-stone-600">
              <section className="space-y-1">
                <h4 className="font-bold text-[#2c3218] font-playfair text-sm">1. Ketentuan Umum</h4>
                <p>Dengan mendaftarkan akun di Veloura Private Atelier, Anda menyatakan diri secara sah setuju untuk mematuhi semua aturan operasional, kebijakan privasi, serta standar layanan eksklusif yang ditetapkan oleh manajemen kami.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-[#2c3218] font-playfair text-sm">2. Akurasi & Keamanan Data</h4>
                <p>Klien wajib memberikan informasi identitas yang valid, akurat, dan terbaru. Anda bertanggung jawab penuh atas kerahasiaan kata sandi serta segala bentuk aktivitas yang terjadi di bawah nama akun pribadi Anda.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-[#2c3218] font-playfair text-sm">3. Hak Akses Layanan & Kelas Keanggotaan</h4>
                <p>Tingkat akses layanan, prioritas reservasi fitting, serta akses katalog digital adibusana (Haute Couture) disesuaikan sepenuhnya berdasarkan tipe keanggotaan (<span className="font-medium">User, VIP Member, atau Administrator</span>) yang diverifikasi oleh sistem.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-[#2c3218] font-playfair text-sm">4. Kebijakan Pembatalan & Pemesanan</h4>
                <p>Seluruh jadwal konsultasi tatap muka, pengukuran busana khusus, maupun pemesanan produk bersifat mengikat. Perubahan jadwal wajib dilakukan sekurang-kurangnya 24 jam sebelum waktu yang ditentukan melalui sistem admin kami.</p>
              </section>

              <section className="space-y-1">
                <h4 className="font-bold text-[#2c3218] font-playfair text-sm">5. Perubahan Ketentuan</h4>
                <p>Veloura Private Atelier berhak memperbarui, mengubah, atau mengganti bagian dari Syarat & Ketentuan ini kapan saja demi meningkatkan mutu pelayanan eksklusif tanpa pemberitahuan tertulis sebelumnya.</p>
              </section>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-[#f4f2ea] border-t border-[#e6e4dd] rounded-b-2xl flex justify-end">
              <button
                onClick={() => setShowTerms(false)}
                className="bg-[#3a3f24] hover:bg-[#2c3218] text-white px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors"
              >
                Saya Mengerti & Setuju
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}