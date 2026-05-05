import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="animate-fade-in">
      
      {/* TITLE SECTION */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          Create Account<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Mulai perjalanan estetikamu
        </p>
      </div>

      {/* FORM */}
      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* EMAIL */}
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        {/* PASSWORD */}
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        {/* TERMS (Optional aesthetic touch) */}
        <p className="text-[10px] text-center text-secondary-dark/40 font-quicksand px-4">
          Dengan mendaftar, kamu menyetujui <span className="underline cursor-pointer">Syarat & Ketentuan</span> Veloura Boutique.
        </p>

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/30 group"
        >
          <span className="group-hover:tracking-[5px] transition-all duration-300">
            Daftar Sekarang
          </span>
        </button>

      </form>

      {/* FOOTER */}
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