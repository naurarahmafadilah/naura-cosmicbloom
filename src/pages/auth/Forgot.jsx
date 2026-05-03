import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div>

      {/* TITLE */}
      <h2 className="text-3xl font-[var(--font-playfair)] text-teks text-center mb-2">
        Lupa Password?
      </h2>

      <p className="text-sm text-teks-soft mb-8 text-center">
        Masukkan email kamu, kami akan kirim link untuk reset password
      </p>

      {/* FORM */}
      <form className="space-y-5">

        <div>
          <label className="block text-sm text-teks-soft mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl"
          />
        </div>

        <button className="w-full bg-primary text-white py-2.5 rounded-full">
          Kirim Link Reset
        </button>

      </form>

      {/* BACK */}
      <p className="text-center text-sm text-teks-soft mt-6">
        Kembali ke{" "}
        <Link
          to="/login"
          className="text-primary hover:underline"
        >
          Login
        </Link>
      </p>

    </div>
  );
}