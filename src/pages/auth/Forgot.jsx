import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FiLock } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { supabase } from "../../lib/supabase";

export default function Forgot() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!password || !confirmPassword) {
      setError("Password dan konfirmasi password wajib diisi.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi baru minimal harus berisikan 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      alert("Kata sandi berhasil diperbarui! Silakan login kembali.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Gagal memperbarui kata sandi.");
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
          SISI KIRI: FORM NEW PASSWORD (COMPACT SIZE)
          ========================================== */}
      <div className="w-full lg:w-[38%] h-full flex flex-col items-center justify-center bg-[#faf9f5] px-6 sm:px-10 overflow-y-auto relative border-r border-[#e6e4dd]">
        
        {/* Dekorasi Sudut Minimalis */}
        <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-[#e6e4dd] m-4 hidden sm:block pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-[#e6e4dd] m-4 hidden sm:block pointer-events-none"></div>

        <div className="w-full max-w-sm py-4 z-10">
          
          {/* Identitas Butik Veloura */}
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
              Sandi Baru
            </h2>
            <p className="text-[11px] text-stone-500 font-light">
              Buat kata sandi baru yang aman untuk melindungi akun akses atelier Anda.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 mb-3 p-2.5 text-[11px] text-red-700 rounded-lg flex items-center border border-red-100/60 animate-fade-in">
              <BsFillExclamationDiamondFill className="me-2 flex-shrink-0 text-sm text-red-500" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          <form className="space-y-3" onSubmit={handleUpdate}>
            
            {/* NEW PASSWORD INPUT */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Kata Sandi Baru
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

            {/* CONFIRM NEW PASSWORD INPUT */}
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-[1.5px] font-bold text-stone-400 ml-0.5">
                Konfirmasi Kata Sandi Baru
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

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3a3f24] hover:bg-[#2c3218] text-white py-3 rounded-xl text-[11px] font-bold uppercase tracking-[2px] transition-all shadow-sm active:scale-[0.99] disabled:opacity-50 flex justify-center items-center group cursor-pointer disabled:cursor-not-allowed mt-4"
            >
              {loading ? (
                <ImSpinner2 className="animate-spin text-sm" />
              ) : (
                <span className="group-hover:translate-x-0.5 transition-transform">
                  Perbarui Sandi →
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-stone-500 font-medium mt-6">
            Kembali ke halaman{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#c97d7d] font-bold cursor-pointer hover:text-[#b06565] transition-colors underline underline-offset-4"
            >
              Log In
            </span>
          </p>
        </div>
      </div>

      {/* ==========================================
          SISI KANAN: CINEMATIC HERO COVER (GAMBAR YANG SAMA)
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

    </div>
  );
}