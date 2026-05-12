import { useParams, Link } from "react-router-dom";
import { FaShoppingBag, FaArrowLeft, FaCheckCircle, FaTag, FaRegClock } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import saleProducts from "../data/Sale.json";

const SaleDetail = () => {
  const { slug } = useParams();
  const product = saleProducts.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="py-40 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl text-primary-dark">Produk Sale Tidak Ditemukan</h2>
        <Link to="/sale" className="text-secondary-light mt-4 inline-block underline font-bold">
          Kembali ke Katalog Sale
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <PageHeader
        title="Exclusive Sale"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Sale", link: "/sale" },
          { label: product.name }
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 mt-12 grid md:grid-cols-2 gap-12 items-start">
        {/* BAGIAN GAMBAR */}
        <div className="relative group">
          <div className="rounded-[40px] overflow-hidden shadow-veloura aspect-[4/5] bg-white border border-bg-soft">
            <img 
              src={product.img} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          
          {/* Badge Diskon Melayang */}
          <div className="absolute top-6 left-6 bg-secondary-light text-white px-5 py-2 rounded-full font-bold text-[10px] tracking-widest shadow-lg flex items-center gap-2">
            <FaTag size={10} /> HEMAT {product.discount}
          </div>
        </div>

        {/* BAGIAN INFO */}
        <div className="flex flex-col">
          <Link to="/sale" className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-[3px] mb-6 hover:text-primary-dark transition-all">
            <FaArrowLeft /> Kembali ke Sale
          </Link>

          <div className="flex items-center gap-2 text-primary-light text-[10px] font-bold uppercase tracking-widest mb-2">
             <FaRegClock size={12} /> Penawaran Terbatas
          </div>
          
          <h1 className="text-5xl font-playfair text-primary-dark mb-4 leading-tight">{product.name}</h1>
          
          {/* HARGA DISKON */}
          <div className="flex items-center gap-5 mb-8">
            <div className="flex flex-col">
                <span className="text-sm text-secondary-dark/40 font-bold uppercase tracking-tighter">Harga Normal</span>
                <span className="text-2xl text-secondary-dark/30 line-through font-quicksand">
                    Rp {product.oldPrice}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-sm text-secondary-light font-bold uppercase tracking-tighter">Harga Sale</span>
                <span className="text-4xl font-bold text-primary-dark font-quicksand flex items-start">
                    <span className="text-sm font-normal mt-1 mr-1">Rp</span>
                    {product.price}
                </span>
            </div>
          </div>

          <div className="h-[1px] bg-bg-soft w-full mb-8"></div>

          <p className="text-secondary-dark/70 leading-relaxed mb-8 italic font-quicksand text-lg">
            "Dapatkan koleksi premium Naura Butik dengan harga spesial musim ini. Stok sangat terbatas, pastikan Anda tidak melewatkannya."
          </p>
          
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-3 text-sm text-secondary-dark/80 font-quicksand">
              <FaCheckCircle className="text-secondary-light" /> Produk Original Naura Butik
            </div>
            <div className="flex items-center gap-3 text-sm text-secondary-dark/80 font-quicksand">
              <FaCheckCircle className="text-secondary-light" /> Pengiriman Prioritas
            </div>
          </div>

          <button className="w-full bg-primary-dark text-white py-5 rounded-3xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-secondary-dark transition-all shadow-xl shadow-primary-dark/20 active:scale-95">
            <FaShoppingBag /> Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaleDetail;