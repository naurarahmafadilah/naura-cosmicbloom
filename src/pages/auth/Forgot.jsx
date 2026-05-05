import { Link } from "react-router-dom";

export default function Forgot() {
  return (
    <div className="animate-fade-in">

      {/* TITLE SECTION */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-playfair text-primary-dark mb-2">
          Reset Password<span className="text-secondary-light">.</span>
        </h2>
        <p className="font-playfair text-xl text-secondary-light/70">
          Kami akan membantu menjaga akunmu
        </p>
      </div>

      <p className="text-xs text-secondary-dark/60 mb-10 text-center leading-relaxed font-quicksand max-w-[250px] mx-auto">
        Masukkan email yang terdaftar, kami akan mengirimkan instruksi pemulihan.
      </p>

      {/* FORM */}
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

        <div className="space-y-1">
          <label className="block text-[11px] uppercase tracking-[2px] font-bold text-secondary-dark/60 ml-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="nama@email.com"
            className="w-full px-5 py-3 bg-bg-main border border-transparent rounded-2xl focus:outline-none focus:border-primary-light focus:bg-white transition-all font-quicksand text-sm shadow-inner"
          />
        </div>

        <button className="w-full bg-primary-dark text-white py-4 rounded-full text-xs font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/30">
          Kirim Link Reset
        </button>

      </form>

      {/* BACK TO LOGIN */}
      <div className="mt-10 text-center">
        <Link
          to="/login"
          className="text-xs font-quicksand font-bold text-secondary-dark/40 hover:text-primary-dark transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-lg">←</span> Kembali ke Halaman Login
        </Link>
      </div>

    </div>
  );
}