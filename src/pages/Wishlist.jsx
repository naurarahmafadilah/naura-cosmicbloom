import PageHeader from "../components/PageHeader";

const Wishlist = () => {
  const products = [
    {
      name: "Elegant Dress",
      price: "Rp 250.000",
      date: "2 hari lalu",
      img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Minimal Outfit",
      price: "Rp 270.000",
      date: "5 hari lalu",
      img: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Casual Style",
      price: "Rp 180.000",
      date: "1 minggu lalu",
      img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <div className="space-y-10">

      {/* HEADER */}
      <PageHeader
        title="Wishlist"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Wishlist" }
        ]}
      />

      {/* TITLE */}
      <div>
        <h2 className="text-3xl font-[var(--font-playfair)] text-teks">
          Favorit Kamu ❤️
        </h2>
        <p className="text-teks-soft text-sm mt-2">
          Item yang kamu simpan untuk nanti
        </p>
      </div>

      {/* GRID (SAMA KAYAK SHOP) */}
      <div className="grid grid-cols-4 gap-8">

        {products.map((item, i) => (
          <div key={i} className="group relative">

            {/* IMAGE */}
            <div className="overflow-hidden rounded-2xl bg-white border border-[#f1e5db]">
              <img
                src={item.img}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* REMOVE BUTTON (BEDA DARI SHOP) */}
            <button className="absolute top-3 right-3 bg-white/80 backdrop-blur px-2 py-1 rounded-full text-red-500 text-xs hover:bg-red-500 hover:text-white transition">
              ✕
            </button>

            {/* INFO */}
            <div className="mt-4 space-y-1">
              <h3 className="text-teks font-medium">
                {item.name}
              </h3>

              <p className="text-primary font-semibold text-sm">
                {item.price}
              </p>

              <p className="text-xs text-teks-soft">
                Ditambahkan {item.date}
              </p>
            </div>

            {/* BUTTON */}
            <button className="mt-3 w-full border border-primary text-primary py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
              Add to Cart
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Wishlist;