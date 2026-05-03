import PageHeader from "../components/PageHeader";

const Dashboard = () => {
  return (
    <div className="space-y-10">

      <PageHeader
        title="Dashboard"
        breadcrumb={[
          { label: "Beranda" }
        ]}
      />

      {/* HERO */}
      <div className="bg-white p-8 rounded-3xl shadow-sm flex items-center justify-between gap-8 border border-[#f1e5db]">

        <div className="max-w-lg">
          <p className="uppercase tracking-[3px] text-xs text-teks-soft mb-3">
            New Collection
          </p>

          <h2 className="text-4xl font-[var(--font-playfair)] text-teks leading-tight">
            Elegance in <span className="text-primary">Every Detail</span>
          </h2>

          <p className="text-teks-soft mt-4 text-sm leading-relaxed">
            Koleksi terbaru dengan sentuhan modern luxury untuk gaya terbaikmu.
          </p>

          <button className="mt-5 px-7 py-2.5 bg-primary text-white rounded-full text-sm">
            Shop Now →
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
          className="w-[340px] h-[280px] object-cover rounded-2xl"
        />
      </div>

      {/* KATEGORI */}
      <div className="grid grid-cols-5 gap-8">

        {[
          { name: "Tas", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200" },
          { name: "Kaos", img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=200" },
          { name: "Kacamata", img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200" },
          { name: "Sepatu", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80" },
          { name: "Jam", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200" }
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-md transition border border-[#f1e5db]"
          >
            <img
              src={item.img}
              className="w-14 h-14 mx-auto rounded-full object-cover mb-3"
            />
            <p className="text-sm font-medium text-teks">
              {item.name}
            </p>
          </div>
        ))}

      </div>

      {/* PRODUK */}
      <div>

        <h2 className="text-3xl font-[var(--font-playfair)] text-teks mb-6">
          Koleksi Terpopuler
        </h2>

        <div className="grid grid-cols-4 gap-10">

          {[
            {
              name: "Elegant Dress",
              price: "Rp 250.000",
              img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              name: "Casual Outfit",
              price: "Rp 180.000",
              img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              name: "Summer Style",
              price: "Rp 300.000",
              img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
              name: "Modern Look",
              price: "Rp 270.000",
              img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          ].map((item, i) => (
            <div key={i} className="group">

              <div className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#f1e5db]">
                <img
                  src={item.img}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-teks font-medium">
                  {item.name}
                </h3>

                <p className="text-teks-soft text-sm">
                  {item.price}
                </p>
              </div>

              <button className="mt-3 w-full border border-primary text-primary py-2 rounded-full text-sm hover:bg-primary hover:text-white transition">
                Add to Cart
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default Dashboard;