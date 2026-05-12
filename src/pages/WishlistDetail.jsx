import { useParams, Link } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCheckCircle, FaHeart } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import wishlistData from "../data/Wishlist.json";

const WishlistDetail = () => {
  const { slug } = useParams();
  const product = wishlistData.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-40 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl text-primary-dark">Item Tidak Ditemukan</h2>
        <Link to="/wishlist" className="text-secondary-light mt-4 inline-block underline font-bold">Kembali ke Wishlist</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <PageHeader
        title="Your Favorite Style"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Wishlist", link: "/wishlist" },
          { label: product.name }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-16 items-start">
        {/* IMAGE SECTION */}
        <div className="relative group">
          <div className="rounded-[50px] overflow-hidden shadow-veloura aspect-[4/5] bg-white border border-bg-soft">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-full shadow-xl flex items-center justify-center text-red-500 border border-bg-soft z-10 animate-bounce-slow">
            <FaHeart size={24} />
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="flex flex-col pt-4">
          <Link to="/wishlist" className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-[3px] mb-8 hover:tracking-[5px] transition-all duration-300">
            <FaArrowLeft /> Kembali ke Wishlist
          </Link>

          <div className="bg-bg-soft self-start px-4 py-1.5 rounded-full mb-6">
            <p className="text-[10px] font-bold text-secondary-dark/60 uppercase tracking-widest">
              Ditambahkan {product.date}
            </p>
          </div>

          <h1 className="text-5xl font-playfair text-primary-dark mb-6 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-primary-dark font-quicksand">
              <span className="text-sm font-normal mr-1">Rp</span>
              {product.price}
            </span>
          </div>

          <div className="h-[1px] bg-bg-soft w-full mb-8"></div>

          <p className="text-secondary-dark/70 leading-relaxed mb-8 font-quicksand text-lg italic">
            "{product.desc || 'Wujudkan tampilan impian Anda dengan koleksi eksklusif dari Veloura yang dirancang khusus untuk kenyamanan dan kemewahan Anda.'}"
          </p>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-sm text-secondary-dark/80 font-quicksand">
              <FaCheckCircle className="text-secondary-light" /> Tersedia dalam berbagai ukuran (S, M, L, XL)
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary-dark/80 font-quicksand">
              <FaCheckCircle className="text-secondary-light" /> Pengiriman Prioritas untuk Favorit Kamu
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <button className="w-full bg-primary-dark text-white py-5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary-dark shadow-xl shadow-primary-dark/20 transition-all active:scale-95">
              <FaShoppingBag /> Pindahkan ke Keranjang
            </button>
            <button className="w-full py-5 rounded-full border border-red-100 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition-all active:scale-95">
              Hapus dari Favorit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistDetail;