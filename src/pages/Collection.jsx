import PageHeader from "../components/PageHeader";

const Collection = () => {
  const collections = [
    {
      name: "Casual Style",
      desc: "Kenyamanan dalam kesederhanaan modern.",
      img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop",
      tag: "Everyday"
    },
    {
      name: "Elegant Dress",
      desc: "Kilau kemewahan untuk momen berhargamu.",
      img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop",
      tag: "Evening"
    },
    {
      name: "Summer Outfit",
      desc: "Sentuhan ceria untuk hari yang cerah.",
      img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop",
      tag: "Vacation"
    }
  ];

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      
      <PageHeader
        title="Our Collection"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Collection" }
        ]}
      />

      {/* FEATURED COLLECTION (HERO) */}
      <section className="relative group overflow-hidden rounded-[50px] bg-white border border-bg-soft shadow-veloura">
        <div className="grid md:grid-cols-2 items-center">
          <div className="h-[500px] overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop"
              alt="Autumn Collection"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
          </div>

          <div className="p-16 relative">
            {/* Dekorasi Font Accent */}
            <span className="absolute top-10 right-10 font-accent text-6xl text-bg-soft opacity-40">Veloura</span>
            
            <p className="text-[10px] tracking-[5px] uppercase font-bold text-secondary-light mb-4">
              New Arrival 2026
            </p>

            <h2 className="text-6xl font-playfair text-primary-dark leading-[1.1] mb-6">
              Autumn <span className="italic text-secondary-light">Collection</span>
            </h2>

            <p className="text-secondary-dark/60 font-quicksand text-sm leading-relaxed mb-8 max-w-md">
              Membawa kehangatan warna tanah ke dalam lemari pakaian Anda. Temukan potongan timeless yang mendefinisikan ulang arti elegan musim ini.
            </p>

            <button className="px-10 py-4 bg-primary-dark text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-primary-light transition-all shadow-lg">
              Explore Collection
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTION GRID */}
      <section>
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-4xl font-playfair text-primary-dark text-center mb-3">Browse by Theme</h3>
          <div className="w-12 h-1 bg-secondary-light/30 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {collections.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] shadow-md border border-bg-soft">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-white/90 px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase text-primary-dark">
                    View Details
                  </span>
                </div>
                {/* Tag Badge */}
                <span className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-bold tracking-tighter text-primary-dark shadow-sm">
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div className="mt-6 text-center px-4">
                <h4 className="text-2xl font-playfair text-primary-dark group-hover:text-secondary-light transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-secondary-dark/50 font-quicksand mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="bg-bg-soft rounded-[45px] p-16 text-center">
        <h3 className="text-3xl font-playfair text-primary-dark mb-4">Be the first to know</h3>
        <p className="text-sm text-secondary-dark/60 font-quicksand mb-8">Dapatkan update eksklusif untuk koleksi terbatas kami langsung di email Anda.</p>
        <div className="flex max-w-md mx-auto gap-2">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-1 px-6 py-3 rounded-full bg-white border-none focus:ring-2 focus:ring-primary-light outline-none text-sm font-quicksand"
          />
          <button className="bg-primary-dark text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-secondary-light transition-all">
            Join
          </button>
        </div>
      </section>

    </div>
  );
};

export default Collection;