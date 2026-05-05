import PageHeader from "../components/PageHeader";
import { FaShoppingBag, FaTrashAlt } from "react-icons/fa";

const Wishlist = () => {
  const products = [
    {
      name: "Elegant Evening Dress",
      price: "250.000",
      date: "2 hari lalu",
      img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
    },
    {
      name: "Minimalist Silk Outfit",
      price: "270.000",
      date: "5 hari lalu",
      img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Casual Autumn Style",
      price: "180.000",
      date: "1 minggu lalu",
      img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
    }
  ];

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
          {products.length} Items Saved
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {products.map((item, i) => (
          <div key={i} className="group relative flex flex-col h-full">
            
            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-bg-main shadow-sm group-hover:shadow-veloura transition-all duration-500 border border-bg-soft">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />

              {/* REMOVE BUTTON (LUXURY STYLE) */}
              <button className="absolute top-5 right-5 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-secondary-dark/30 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
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
              <h3 className="text-lg font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-primary-dark font-bold font-quicksand">
                <span className="text-[10px] text-secondary-light align-top mr-0.5">Rp</span>
                {item.price}
              </p>
            </div>

            {/* ACTION BUTTON */}
            <button className="mt-6 w-full bg-primary-dark text-white py-4 rounded-full text-[10px] font-bold uppercase tracking-[3px] hover:bg-primary-light transition-all shadow-md flex items-center justify-center gap-3">
              <FaShoppingBag size={12} /> Add to Cart
            </button>

          </div>
        ))}

        {/* ADD MORE PLACEHOLDER */}
        <div className="border-2 border-dashed border-bg-soft rounded-[40px] flex flex-col items-center justify-center p-10 min-h-[400px] hover:border-secondary-light/30 transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-bg-soft flex items-center justify-center text-secondary-dark/20 group-hover:bg-secondary-light/10 group-hover:text-secondary-light transition-all mb-4">
             <span className="text-3xl font-light">+</span>
          </div>
          <p className="text-[11px] uppercase tracking-widest font-bold text-secondary-dark/30 group-hover:text-secondary-light transition-colors">Tambah Favorit</p>
        </div>
      </div>

    </div>
  );
};

export default Wishlist;