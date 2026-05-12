import { useParams, Link } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCheckCircle, FaLayerGroup } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
// ✅ Pastikan path import benar dan nama file sesuai (Shop.json)
import productsData from "../data/Shop.json";

const ShopDetail = () => {
  const { slug } = useParams();
  
  // Mencari produk berdasarkan slug dari URL
  const product = productsData.find((p) => p.slug === slug);

  // Jika produk tidak ditemukan (Error Handling)
  if (!product) {
    return (
      <div className="py-40 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl text-primary-dark">Produk Tidak Ditemukan</h2>
        <Link to="/shop" className="text-secondary-light mt-4 inline-block underline font-bold">
          Kembali ke Koleksi Utama
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <PageHeader
        title="Product Detail"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Shop", link: "/shop" },
          { label: product.name }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-16 items-start">
        {/* BAGIAN KIRI: GAMBAR */}
        <div className="relative group">
          <div className="rounded-[50px] overflow-hidden shadow-veloura aspect-[4/5] bg-white border border-bg-soft">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
          </div>
          
          {/* Badge Kategori Melayang */}
          <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md text-primary-dark px-5 py-2 rounded-full font-bold text-[9px] tracking-widest shadow-sm flex items-center gap-2 uppercase">
            <FaLayerGroup size={10} className="text-secondary-light" /> {product.category}
          </div>
        </div>

        {/* BAGIAN KANAN: INFO DETAIL */}
        <div className="flex flex-col pt-4">
          <Link to="/shop" className="flex items-center gap-2 text-secondary-dark/40 text-[10px] font-bold uppercase tracking-[3px] mb-8 hover:text-primary-dark transition-all">
            <FaArrowLeft /> Kembali ke Katalog
          </Link>

          <p className="text-secondary-light text-xs font-bold uppercase tracking-[4px] mb-3">Veloura Premium Collection</p>
          <h1 className="text-5xl font-playfair text-primary-dark mb-6 leading-tight">{product.name}</h1>
          
          <div className="flex items-baseline gap-2 mb-8">
            <span className="text-sm font-medium text-secondary-dark/40 italic">Mulai dari</span>
            <span className="text-4xl font-bold text-primary-dark font-quicksand flex items-start">
                <span className="text-sm font-normal mt-1 mr-1">Rp</span>
                {product.price}
            </span>
          </div>

          <div className="h-[1px] bg-bg-soft w-full mb-8"></div>

          <div className="space-y-6 mb-10">
            <p className="text-secondary-dark/70 leading-relaxed font-quicksand text-lg">
              {product.description}
            </p>
            
            {/* Features List dari JSON */}
            <div className="grid grid-cols-1 gap-3">
              {product.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm text-primary-dark font-medium font-quicksand">
                  <FaCheckCircle className="text-secondary-light shrink-0" /> {feature}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-primary-dark text-white py-5 rounded-[20px] text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary-dark transition-all shadow-xl shadow-primary-dark/20 active:scale-95">
              <FaShoppingBag /> Tambah ke Keranjang
            </button>
            <button className="px-8 py-5 rounded-[20px] border border-bg-soft text-primary-dark text-[10px] font-bold uppercase tracking-widest hover:bg-bg-main transition-all">
              Wishlist
            </button>
          </div>

          <p className="mt-8 text-[10px] text-secondary-dark/30 text-center sm:text-left">
            *Pengiriman gratis untuk wilayah Jabodetabek. Syarat & Ketentuan berlaku.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;