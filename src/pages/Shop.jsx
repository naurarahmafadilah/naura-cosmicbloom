import { useState } from "react";
import PageHeader from "../components/PageHeader";
import { FaShoppingBag, FaFilter } from "react-icons/fa";

const Shop = () => {
  const [filter, setFilter] = useState("all");

  const products = [
    {
      name: "Elegant Evening Dress",
      price: "250.000",
      category: "dress",
      img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
    },
    {
      name: "Minimalist Casual Outfit",
      price: "180.000",
      category: "casual",
      img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
    },
    {
      name: "Summer Breeze Style",
      price: "300.000",
      category: "summer",
      img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop"
    },
    {
      name: "Modern Silk Look",
      price: "270.000",
      category: "modern",
      img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop"
    }
  ];

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter((p) => p.category === filter);

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
        {filteredProducts.map((item, i) => (
          <div key={i} className="group flex flex-col h-full">
            {/* IMAGE CONTAINER */}
            <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] bg-bg-main shadow-sm group-hover:shadow-veloura transition-all duration-500">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
              />
              
              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-primary-dark/10 group-hover:bg-primary-dark/30 transition-all duration-500 flex items-end p-6">
                <button className="w-full bg-white/90 backdrop-blur-md text-primary-dark py-4 rounded-full text-[10px] font-bold uppercase tracking-widest translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-2 hover:bg-primary-dark hover:text-white">
                  <FaShoppingBag size={12} /> Add To Bag
                </button>
              </div>
            </div>

            {/* INFO */}
            <div className="mt-6 flex-1 flex flex-col items-center text-center px-2">
              <p className="text-[9px] uppercase tracking-[3px] text-secondary-light font-bold mb-2">
                Veloura Exclusive
              </p>
              <h3 className="text-lg font-playfair text-primary-dark mb-2 line-clamp-1">
                {item.name}
              </h3>
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
          <p className="font-accent text-3xl text-secondary-dark/20">Koleksi akan segera datang...</p>
        </div>
      )}
    </div>
  );
};

export default Shop;