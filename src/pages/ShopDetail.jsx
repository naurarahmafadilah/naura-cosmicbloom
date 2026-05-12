import { useParams, Link } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import products from "../data/Shop.json";
import PageHeader from "../components/PageHeader";

const ShopDetail = () => {
  const { slug } = useParams();
  
  // Mencari produk berdasarkan slug
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-playfair mb-4">Produk tidak ditemukan</h2>
        <Link to="/shop" className="text-primary-dark underline">Kembali ke Toko</Link>
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

      <div className="max-w-6xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* BAGIAN GAMBAR */}
          <div className="relative overflow-hidden rounded-[40px] shadow-veloura">
            <img
              src={product.img}
              alt={product.name}
              className="w-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* BAGIAN INFORMASI */}
          <div className="flex flex-col">
            <Link to="/shop" className="flex items-center gap-2 text-secondary-light text-xs font-bold uppercase tracking-widest mb-6 hover:text-primary-dark transition-colors">
              <FaArrowLeft size={10} /> Back to Collection
            </Link>

            <p className="text-secondary-light font-bold text-[10px] tracking-[4px] uppercase mb-2">
              Veloura Exclusive • {product.category}
            </p>
            
            <h1 className="text-4xl md:text-5xl font-playfair text-primary-dark mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-sm text-secondary-dark/40 font-bold">Rp</span>
              <span className="text-3xl font-quicksand font-bold text-primary-dark">{product.price}</span>
            </div>

            <p className="text-secondary-dark/70 leading-relaxed mb-8 text-lg italic">
              "{product.description}"
            </p>

            {/* FITUR / KEUNGGULAN */}
            <div className="space-y-3 mb-10">
              {product.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-secondary-dark/80">
                  <FaCheckCircle className="text-primary-light" size={14} />
                  <span className="text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button className="w-full md:w-max bg-primary-dark text-white px-12 py-5 rounded-full text-xs font-bold uppercase tracking-[3px] flex items-center justify-center gap-3 hover:bg-secondary-dark transition-all duration-300 shadow-xl shadow-primary-dark/20">
              <FaShoppingBag size={14} /> Add To Shopping Bag
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ShopDetail;