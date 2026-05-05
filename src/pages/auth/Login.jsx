import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!dataForm.username || !dataForm.password) {
      setError("Harap isi username dan password");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("https://dummyjson.com/auth/login", {
        username: dataForm.username,
        password: dataForm.password,
      });
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Username atau Password salah";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* TITLE */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          Welcome Back<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Senang melihatmu kembali
        </p>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-50 mb-6 p-4 text-xs text-error rounded-2xl flex items-center border border-red-100 animate-bounce-subtle">
          <BsFillExclamationDiamondFill className="me-2 flex-shrink-0 text-lg" />
          <span className="font-quicksand font-semibold">{error}</span>
        </div>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* USERNAME */}
        <div className="space-y-1">
          <label className="text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={dataForm.username}
            onChange={handleChange}
            placeholder="Masukkan username"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        {/* PASSWORD */}
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
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/30 disabled:opacity-50 flex justify-center items-center group"
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

      {/* FOOTER */}
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