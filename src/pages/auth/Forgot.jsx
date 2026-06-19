import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { supabase } from "../../lib/supabase";

export default function UpdatePassword() {
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
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password baru minimal harus 6 karakter.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) throw error;

      alert("Password berhasil diperbarui! Silakan login kembali.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Gagal memperbarui password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-sm mx-auto">
      {/* SOLUSI TOTAL: Blok CSS ini memaksa semua jenis indikator mata, tombol bersihkan text, dan 
          ekstensi autofill dari Google Chrome, Edge, Safari, dan iCloud Keychain untuk menghilang secara absolut */}
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

      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          New Password<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Buat password barumu yang aman
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleUpdate}>
        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-3 rounded-2xl font-quicksand font-bold text-center">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Password Baru
          </label>

          <div className="relative flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-5 py-3 pr-12 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 p-1 text-gray-400 hover:text-primary-dark transition-colors focus:outline-none z-10 flex items-center justify-center"
            >
              {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Konfirmasi Password Baru
          </label>

          <div className="relative flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="w-full px-5 py-3 pr-12 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-5 p-1 text-gray-400 hover:text-primary-dark transition-colors focus:outline-none z-10 flex items-center justify-center"
            >
              {showConfirmPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg disabled:opacity-50 cursor-pointer flex justify-center items-center"
        >
          {loading ? "Memperbarui..." : "Perbarui Password"}
        </button>
      </form>
    </div>
  );
}