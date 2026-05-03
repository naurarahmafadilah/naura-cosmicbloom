import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div>

      {/* TITLE */}
      <h2 className="text-3xl font-[var(--font-playfair)] text-teks text-center mb-2">
        Create Account ✨
      </h2>

      <p className="text-center text-sm text-teks-soft mb-8">
        Daftar untuk mulai eksplor koleksi terbaik kami
      </p>

      {/* FORM */}
      <form className="space-y-5">

        {/* EMAIL */}
        <div>
          <label className="block text-sm text-teks-soft mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="block text-sm text-teks-soft mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="block text-sm text-teks-soft mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-2.5 border border-[#f1e5db] rounded-xl 
                       focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-primary text-white py-2.5 rounded-full text-sm 
                     hover:opacity-90 transition"
        >
          Register
        </button>

      </form>

      {/* FOOTER */}
      <p className="text-center text-sm text-teks-soft mt-6">
        Sudah punya akun?{" "}
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