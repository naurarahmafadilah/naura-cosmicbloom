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

    setLoading(true);
    setError("");

    try {
      // simulasi request axios
      await axios.post("https://jsonplaceholder.typicode.com/posts", dataForm);

      // validasi
      if (!dataForm.email || !dataForm.password) {
        setError("Harap isi email dan password");
        setLoading(false);
        return;
      }

      // simpan user
      localStorage.setItem("user", JSON.stringify(dataForm));

      // redirect
      navigate("/");

    } catch (err) {
      setError("Terjadi kesalahan");
    }

    setLoading(false);
  };

  const errorInfo = error && (
    <div className="bg-red-100 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center">
      <BsFillExclamationDiamondFill className="me-2" />
      {error}
    </div>
  );

  const loadingInfo = loading && (
    <div className="bg-gray-100 mb-5 p-4 text-sm rounded-xl flex items-center text-teks-soft">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  );

  return (
    <div>

      {/* TITLE */}
      <h2 className="text-3xl font-[var(--font-playfair)] text-teks text-center mb-2">
        Welcome Back ✨
      </h2>

      <p className="text-center text-sm text-teks-soft mb-4">
        Masuk untuk melanjutkan pengalaman belanja kamu
      </p>

      {/* INSTRUKSI */}
      <div className="text-center mb-8">
        <p className="text-sm text-teks-soft">
          Silakan masukkan
        </p>
        <p className="text-primary font-medium">
          Email & Password Anda
        </p>
      </div>

      {errorInfo}
      {loadingInfo}

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* EMAIL */}
        <div>
          <label className="text-sm text-teks-soft mb-1 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={dataForm.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm text-teks-soft mb-1 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* FORGOT */}
        <div className="text-right text-sm">
          <span
            onClick={() => navigate("/forgot")}
            className="text-primary cursor-pointer hover:underline"
          >
            Lupa password?
          </span>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-2.5 rounded-full text-sm 
                     hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Loading..." : "Login"}
        </button>

      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-teks-soft mt-6">
        Belum punya akun?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-primary cursor-pointer hover:underline"
        >
          Daftar
        </span>
      </p>

    </div>
  );
}