import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  return (
    <div className="space-y-12 animate-fade-in">

      <PageHeader
        title="Dashboard"
        breadcrumb={[
          { label: "Beranda" }
        ]}
      />

      {/* HERO SECTION */}
      <div className="bg-white p-10 rounded-[45px] shadow-veloura flex items-center justify-between gap-12 border border-bg-soft relative overflow-hidden">
        {/* Dekorasi Aksen Latar Belakang */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-bg-soft rounded-full blur-3xl opacity-50" />
        
        <div className="max-w-xl relative z-10">
          <p className="uppercase tracking-[4px] text-[10px] font-bold text-secondary-light mb-4">
            New Collection 2026
          </p>

          <h2 className="text-5xl font-playfair text-primary-dark leading-[1.1] mb-6">
            Elegance in <span className="italic text-secondary-light">Every Detail</span>
          </h2>

          <p className="text-secondary-dark/60 font-quicksand text-sm leading-relaxed max-w-sm">
            Temukan harmoni antara kenyamanan dan kemewahan dalam koleksi terbaru kami yang dirancang khusus untuk Anda.
          </p>

          <button className="mt-8 px-10 py-3.5 bg-primary-dark text-white rounded-full text-xs font-bold font-quicksand hover:bg-primary-light transition-all shadow-lg hover:shadow-primary-light/20 tracking-widest uppercase">
            Shop Now →
          </button>
        </div>

        <div className="relative relative z-10">
          <div className="absolute inset-0 border border-secondary-light rounded-3xl translate-x-4 translate-y-4 -z-10" />
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
            alt="Hero Veloura"
            className="w-[380px] h-[320px] object-cover rounded-3xl shadow-xl"
          />
        </div>
      </div>

      {/* KATEGORI PILIHAN */}
      <section>
        <div className="flex justify-between items-end mb-8 px-2">
           <h3 className="text-3xl font-playfair text-primary-dark">Kategori Pilihan</h3>
           <button className="text-secondary-light text-sm font-quicksand font-bold border-b-2 border-secondary-light/20 hover:border-secondary-light transition-all">Lihat Semua</button>
        </div>
        
        <div className="grid grid-cols-5 gap-6">
          {[
            { name: "Tas", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
            { name: "Kaos", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200" },
            { name: "Kacamata", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200" },
            { name: "Sepatu", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
            { name: "Jam", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200" }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-[30px] text-center group hover:bg-bg-soft transition-all border border-bg-soft shadow-sm cursor-pointer"
            >
              <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-4 border-2 border-bg-soft group-hover:border-white transition-all shadow-inner">
                <img src={item.img} className="w-full h-full object-cover" alt={item.name} />
              </div>
              <p className="text-xs font-bold font-quicksand text-primary-dark tracking-wide uppercase">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUK TERPOPULER */}
      <section>
        <h3 className="text-3xl font-playfair text-primary-dark mb-8 px-2">Koleksi Terpopuler</h3>

        <div className="grid grid-cols-4 gap-8">
          {[
            { name: "Elegant Dress", price: "250.000", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop" },
            { name: "Casual Outfit", price: "180.000", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop" },
            { name: "Summer Style", price: "300.000", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop" },
            { name: "Modern Look", price: "270.000", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop" }
          ].map((item, i) => (
            <div key={i} className="group flex flex-col">
              <div className="relative overflow-hidden rounded-[35px] bg-bg-soft aspect-[3/4] mb-4">
                <img
                  src={item.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                  alt={item.name}
                />
                <div className="absolute inset-0 bg-primary-dark/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="px-2">
                <h4 className="text-lg font-playfair text-primary-dark">{item.name}</h4>
                <p className="text-secondary-light font-bold text-sm mt-1">Rp {item.price}</p>
                <button className="mt-4 w-full border border-primary-light text-primary-light py-2.5 rounded-full text-[10px] font-bold font-quicksand uppercase tracking-[2px] hover:bg-primary-light hover:text-white transition-all">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Dashboard;