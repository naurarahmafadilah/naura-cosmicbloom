import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh] p-6 animate-fade-in">

      <div className="bg-white border border-bg-soft rounded-[50px] shadow-veloura overflow-hidden grid grid-cols-1 md:grid-cols-2 max-w-4xl w-full relative">
        
        {/* Dekorasi Watermark */}
        <span className="absolute -bottom-6 -right-4 font-accent text-8xl text-bg-soft opacity-30 select-none">
          Veloura
        </span>

        {/* IMAGE SIDE */}
        <div className="h-[300px] md:h-full relative overflow-hidden group">
          <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-transparent transition-colors duration-700 z-10" />
          <img
            src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"
            alt="Page not found aesthetic"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
          />
        </div>

        {/* CONTENT SIDE */}
        <div className="flex flex-col justify-center px-12 py-16 text-center md:text-left items-center md:items-start relative z-20">

          {/* CODE */}
          <h1 className="text-8xl font-playfair text-secondary-light leading-none">
            404
          </h1>

          {/* TITLE */}
          <h2 className="text-3xl font-playfair text-primary-dark mt-6 leading-tight">
            Oops… Page <span className="italic">Lost in Style</span>
          </h2>

          {/* DESC */}
          <p className="text-secondary-dark/60 font-quicksand text-sm mt-4 leading-relaxed max-w-[280px]">
            Halaman yang Anda cari mungkin sedang dalam pembaruan atau telah pindah ke koleksi baru kami.
          </p>

          {/* BUTTON */}
          <Link
            to="/"
            className="mt-10 px-10 py-3.5 bg-primary-dark text-white rounded-full text-[10px] font-bold uppercase tracking-[3px] hover:bg-secondary-light shadow-lg hover:shadow-secondary-light/30 transition-all duration-300"
          >
            Back to Home →
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFound;