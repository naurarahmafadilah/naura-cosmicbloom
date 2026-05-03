import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-[80vh]">

      <div className="bg-white border border-[#f1e5db] rounded-3xl shadow-sm overflow-hidden grid grid-cols-2 max-w-4xl w-full">

        {/* IMAGE */}
        <div className="h-full">
          <img
            src="https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=80"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col justify-center px-10 py-12 text-center">

          {/* CODE */}
          <h1 className="text-6xl font-[var(--font-playfair)] text-primary">
            404
          </h1>

          {/* TITLE */}
          <h2 className="text-2xl text-teks mt-4">
            Oops… Halaman Tidak Ditemukan
          </h2>

          {/* DESC */}
          <p className="text-teks-soft text-sm mt-3 leading-relaxed">
            Sepertinya halaman yang kamu cari sudah tidak tersedia atau mungkin sedang berpindah tempat.
          </p>

          {/* BUTTON */}
          <Link
            to="/"
            className="mt-6 px-6 py-2 bg-primary text-white rounded-full text-sm hover:opacity-90 transition"
          >
            Kembali ke Beranda
          </Link>

        </div>

      </div>

    </div>
  );
};

export default NotFound;