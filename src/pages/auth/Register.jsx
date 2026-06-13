import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
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
      setError("Konfirmasi password tidak cocok!");
      return;
    }

    if (password.length < 6) {
      setError("Password minimal harus berisikan 6 karakter.");
      return;
    }

    setLoading(true);

    try {
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

      const userId = data.user?.id;

      if (!userId) {
        setError(
          "Registrasi berhasil, tetapi akun perlu konfirmasi email terlebih dahulu."
        );
        return;
      }

      const { error: userError } = await supabase.from("users").insert([
        {
          name: cleanName,
          email: cleanEmail,
          role: role,
        },
      ]);

      if (userError) throw userError;

      const { data: loginData, error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) {
        alert("Pendaftaran berhasil! Silakan login menggunakan akun baru.");
        navigate("/login");
        return;
      }

      const loggedInUser = {
        id: loginData.user.id,
        email: loginData.user.email,
        name: loginData.user.user_metadata?.name || cleanName,
        role: loginData.user.user_metadata?.role || role,
      };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      window.dispatchEvent(new Event("localUserUpdate"));

      alert("Pendaftaran berhasil! Kamu berhasil login dengan akun baru.");

      if (loggedInUser.role?.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat melakukan registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          Create Account<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Mulai perjalanan estetikamu
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleRegister}>
        {error && (
          <div className="text-xs text-red-600 bg-red-50 p-3 rounded-2xl font-quicksand font-bold text-center animate-pulse">
            {error}
          </div>
        )}

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Veloura Admin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Account Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50 appearance-none cursor-pointer"
          >
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Password
          </label>

          <div className="relative">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-dark"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Confirm Password
          </label>

          <div className="relative">
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
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary-dark"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        <p className="text-[10px] text-center text-secondary-dark/40 font-quicksand px-4">
          Dengan mendaftar, kamu menyetujui{" "}
          <span className="underline cursor-pointer">Syarat & Ketentuan</span>{" "}
          Veloura Boutique.
        </p>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/30 group disabled:bg-slate-300 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
        >
          <span className="group-hover:tracking-[5px] transition-all duration-300">
            {loading ? "Memproses Registrasi..." : "Daftar Sekarang"}
          </span>
        </button>
      </form>

      <p className="text-center text-xs text-secondary-dark/50 mt-10 font-quicksand">
        Sudah memiliki akun?{" "}
        <Link
          to="/login"
          className="text-primary-light font-bold hover:text-primary-dark transition-colors underline underline-offset-4"
        >
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}