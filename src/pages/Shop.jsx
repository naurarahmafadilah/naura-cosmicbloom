import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// ✅ Perbaikan 1: Gunakan nama 'productsData' untuk menghindari bentrok dengan nama komponen 'Shop'
import productsData from "../data/Shop.json"; 

const Shop = () => {
  const [filter, setFilter] = useState("all");

  // ✅ Perbaikan 2: Gunakan productsData sebagai sumber data
  const filteredProducts =
    filter === "all"
      ? productsData
      : productsData.filter((p) => p.category === filter);

  return (
    <div className="space-y-12 animate-fade-in pb-20">
      <PageHeader
        title="Our Shop"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Shop" }
        ]}
      />

      {/* FILTER HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-bg-soft pb-8">
        <div className="flex items-center gap-3">
          <div className="bg-primary-dark text-white p-2 rounded-lg">
            <FaFilter size={12} />
          </div>
          <h2 className="text-xl font-playfair text-primary-dark uppercase tracking-widest">
            Kategori <span className="text-secondary-light">Pilihan</span>
          </h2>
        </div>

        <div className="flex gap-2 flex-wrap">
          {["all", "dress", "casual", "summer", "modern"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[2px] transition-all duration-300 ${
                filter === item
                  ? "bg-primary-dark text-white shadow-lg shadow-primary-dark/20"
                  : "bg-white border border-bg-soft text-secondary-dark/40 hover:border-primary-light hover:text-primary-dark"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* GRID PRODUK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {filteredProducts.map((item) => (
          <div key={item.id} className="group flex flex-col h-full">
            {/* IMAGE CONTAINER */}
            <Link 
              to={`/shop/${item.slug}`} 
              className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-bg-main shadow-sm group-hover:shadow-veloura transition-all duration-500"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-primary-dark/30 transition-all duration-500 flex items-end p-6">
                <div className="w-full bg-white/90 backdrop-blur-md text-primary-dark py-4 rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-primary-dark hover:text-white">
                  Lihat Detail
                </div>
              </div>
            </Link>

            {/* INFO */}
            <div className="mt-6 flex-1 flex flex-col items-center text-center px-2">
              <p className="text-[9px] uppercase tracking-[3px] text-secondary-light font-bold mb-2">
                Veloura Exclusive
              </p>
              <Link to={`/shop/${item.slug}`}>
                <h3 className="text-lg font-playfair text-primary-dark mb-2 line-clamp-1 hover:text-secondary-light transition-colors">
                  {item.name}
                </h3>
              </Link>
              <p className="text-secondary-dark/60 font-quicksand font-bold text-sm">
                <span className="text-[10px] mr-1 opacity-50">Rp</span>
                {item.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="py-20 text-center">
          <p className="font-accent text-3xl text-secondary-dark/20">
            Koleksi akan segera datang...
          </p>
        </div>
      )}
    </div>
  );
};

export default Shop;