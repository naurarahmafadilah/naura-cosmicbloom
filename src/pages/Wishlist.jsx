import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { FaShoppingBag, FaTrashAlt, FaPlus } from "react-icons/fa";
import wishlistData from "../data/Wishlist.json"; 

const Wishlist = () => {
  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <PageHeader
        title="Your Wishlist"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Wishlist" }
        ]}
      />

      {/* HEADER TITLE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-playfair text-primary-dark">
            Favorit <span className="italic text-secondary-light">Kamu</span>
          </h2>
          <p className="text-secondary-dark/50 font-quicksand text-sm mt-2">
            Simpan gaya impianmu dan wujudkan saat kamu siap.
          </p>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-[2px] text-secondary-dark/40 bg-bg-soft px-4 py-2 rounded-full">
          {wishlistData.length} Items Saved
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {wishlistData.map((item) => (
          <div key={item.id} className="group relative flex flex-col h-full">
            
            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-bg-main shadow-sm group-hover:shadow-veloura transition-all duration-500 border border-bg-soft">
              {/* ✅ PERBAIKAN: Ubah /shop/ menjadi /wishlist/ agar masuk ke WishlistDetail */}
              <Link to={`/wishlist/${item.slug}`}>
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                />
              </Link>

              {/* REMOVE BUTTON */}
              <button 
                title="Hapus dari Wishlist"
                className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-secondary-dark/30 hover:text-red-500 hover:scale-110 transition-all shadow-sm z-10"
              >
                <FaTrashAlt size={14} />
              </button>

              {/* DATE BADGE */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[80%] bg-white/80 backdrop-blur-sm py-2 rounded-2xl text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-[9px] font-bold uppercase tracking-widest text-primary-dark">
                  Added {item.date}
                </p>
              </div>
            </div>

            {/* INFO */}
            <div className="mt-6 flex-1 text-center space-y-2">
              <Link to={`/wishlist/${item.slug}`}>
                <h3 className="text-lg font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                  {item.name}
                </h3>
              </Link>
              <p className="text-primary-dark font-bold font-quicksand">
                <span className="text-[10px] text-secondary-light align-top mr-0.5">Rp</span>
                {item.price}
              </p>
            </div>

            {/* ACTION BUTTON */}
            <button className="mt-6 w-full bg-primary-dark text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[3px] hover:bg-secondary-dark transition-all shadow-md flex items-center justify-center gap-3 active:scale-95">
              <FaShoppingBag size={12} /> Add to Cart
            </button>

          </div>
        ))}

        {/* ADD MORE PLACEHOLDER */}
        <Link 
          to="/shop"
          className="border-2 border-dashed border-bg-soft rounded-[40px] flex flex-col items-center justify-center p-10 min-h-[400px] hover:border-secondary-light/30 transition-colors cursor-pointer group"
        >
          <div className="w-16 h-16 rounded-full bg-bg-soft flex items-center justify-center text-secondary-dark/20 group-hover:bg-secondary-light/10 group-hover:text-secondary-light transition-all mb-4">
              <FaPlus className="text-xl font-light" />
          </div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-secondary-dark/30 group-hover:text-secondary-light transition-colors">Cari Inspirasi Lagi</p>
        </Link>
      </div>

    </div>
  );
};

export default Wishlist;