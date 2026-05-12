import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaSearch } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
// ✅ Import data dengan nama yang jelas
import productsData from "../data/Shop.json"; 

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter logika: Mengambil data dari Shop.json
  const filteredProducts =
    activeCategory === "all"
      ? productsData
      : productsData.filter((p) => p.category === activeCategory);

  // Daftar kategori unik untuk tombol filter
  const categories = ["all", "dress", "casual", "summer", "modern"];

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <PageHeader
        title="Our Collections"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Shop" }
        ]}
      />

      {/* FILTER & HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-2">
        <div className="max-w-xl">
          <div className="flex items-center gap-3 text-secondary-light mb-2">
            <div className="h-[1px] w-8 bg-secondary-light"></div>
            <span className="text-[10px] font-bold uppercase tracking-[4px]">Veloura Edition</span>
          </div>
          <h2 className="text-5xl font-playfair text-primary-dark leading-tight">
            Koleksi <span className="italic text-secondary-light">Terbaik</span> Kami
          </h2>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${
                activeCategory === cat
                  ? "bg-primary-dark text-white shadow-xl shadow-primary-dark/20 scale-105"
                  : "bg-white border border-bg-soft text-secondary-dark/40 hover:border-secondary-light hover:text-secondary-light"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProducts.map((item) => (
          <div key={item.id} className="group">
            <div className="relative overflow-hidden rounded-[45px] aspect-[4/5] bg-bg-main border border-bg-soft shadow-sm group-hover:shadow-veloura transition-all duration-700">
              {/* Image */}
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
              />
              
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-primary-dark/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <Link 
                  to={`/shop/${item.slug}`}
                  className="bg-white text-primary-dark py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-secondary-light hover:text-white"
                >
                  <FaSearch size={10} /> Detail Produk
                </Link>
              </div>
            </div>

            {/* Product Info */}
            <div className="mt-8 text-center space-y-2">
              <span className="text-[9px] font-bold text-secondary-light uppercase tracking-[4px] block opacity-0 group-hover:opacity-100 transition-all duration-500">
                {item.category}
              </span>
              <Link to={`/shop/${item.slug}`}>
                <h3 className="text-xl font-playfair text-primary-dark hover:text-secondary-light transition-colors line-clamp-1">
                  {item.name}
                </h3>
              </Link>
              <div className="flex items-center justify-center gap-2 font-quicksand">
                <span className="text-[10px] text-secondary-dark/30 font-bold uppercase">Price</span>
                <p className="text-lg font-bold text-primary-dark">
                  <span className="text-xs font-normal mr-0.5">Rp</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER SHOP INFO */}
      <div className="mt-20 p-12 bg-bg-main rounded-[50px] border border-bg-soft flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <h4 className="font-playfair text-2xl text-primary-dark mb-2">Butuh Bantuan Memilih?</h4>
          <p className="text-secondary-dark/50 text-sm font-quicksand">Tim stylist kami siap membantu mencarikan outfit terbaik untuk Anda.</p>
        </div>
        <Link to="/contact" className="bg-primary-dark text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-secondary-dark transition-all">
          Hubungi Stylist
        </Link>
      </div>
    </div>
  );
};

export default Shop;