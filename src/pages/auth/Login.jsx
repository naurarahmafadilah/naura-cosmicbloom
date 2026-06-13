import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const cleanEmail = dataForm.email.trim().toLowerCase();

    if (!cleanEmail || !dataForm.password) {
      setError("Harap isi email dan password");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: dataForm.password,
        });

      if (authError) {
        setError("Akun tidak terdaftar. Silakan daftar terlebih dahulu.");

        setTimeout(() => {
          navigate("/register");
        }, 1500);

        return;
      }

      const user = data.user;

      const loggedInUser = {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || "User",
        role: user.user_metadata?.role || "user",
      };

      localStorage.setItem("user", JSON.stringify(loggedInUser));
      window.dispatchEvent(new Event("localUserUpdate"));

      if (loggedInUser.role?.toLowerCase() === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          Welcome Back<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Senang melihatmu kembali
        </p>
      </div>

      {error && (
        <div className="bg-red-50 mb-6 p-4 text-xs text-red-600 rounded-2xl flex items-center border border-red-100 animate-bounce-subtle">
          <BsFillExclamationDiamondFill className="me-2 flex-shrink-0 text-lg" />
          <span className="font-quicksand font-semibold">{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="Masukkan email terdaftar"
            disabled={loading}
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center px-1">
            <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60">
              Password
            </label>

            <span
              onClick={() => navigate("/forgot")}
              className="text-[10px] font-bold text-primary-light cursor-pointer hover:text-primary-dark transition-colors uppercase tracking-wider"
            >
              Lupa?
            </span>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="••••••••"
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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/30 disabled:opacity-50 flex justify-center items-center group cursor-pointer disabled:cursor-not-allowed"
        >
          {loading ? (
            <ImSpinner2 className="animate-spin text-xl" />
          ) : (
            <span className="group-hover:translate-x-1 transition-transform">
              Login ke Akun →
            </span>
          )}
        </button>
      </form>

      <p className="text-center text-xs text-secondary-dark/50 mt-10 font-quicksand">
        Belum punya akun?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-primary-light font-bold cursor-pointer hover:text-primary-dark transition-colors underline underline-offset-4"
        >
          Daftar Sekarang
        </span>
      </p>
    </div>
  );
}