import PageHeader from "../components/PageHeader";

const Sale = () => {
    const products = [
        {
            name: "Elegant Dress",
            oldPrice: "Rp 350.000",
            price: "Rp 250.000",
            img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Casual Shirt",
            oldPrice: "Rp 250.000",
            price: "Rp 180.000",
            img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Summer Dress",
            oldPrice: "Rp 400.000",
            price: "Rp 300.000",
            img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Minimal Outfit",
            oldPrice: "Rp 320.000",
            price: "Rp 270.000",
            img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <div className="space-y-12">

            <PageHeader
                title="Special Sale 🔥"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Sale" }
                ]}
            />

            {/* TITLE */}
            <div>
                <h2 className="text-3xl font-[var(--font-playfair)] text-teks">
                    Special Sale 🔥
                </h2>
                <p className="text-teks-soft text-sm mt-2">
                    Koleksi pilihan dengan gaya elegan dan modern
                </p>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-4 gap-8">

                {products.map((item, i) => (
                    <div key={i} className="group">

                        {/* IMAGE */}
                        <div className="relative overflow-hidden rounded-2xl border border-[#f1e5db] bg-white">

                            <img
                                src={item.img}
                                className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
                            />

                            {/* BADGE */}
                            <span className="absolute top-3 left-3 bg-primary text-white text-xs px-3 py-1 rounded-full shadow">
                                SALE
                            </span>

                        </div>

                        {/* INFO */}
                        <div className="mt-4 space-y-1">

                            <h3 className="text-teks font-medium group-hover:text-primary transition">
                                {item.name}
                            </h3>

                            <div className="flex items-center gap-2">
                                <p className="text-teks-soft text-sm line-through">
                                    {item.oldPrice}
                                </p>
                                <p className="text-primary font-semibold">
                                    {item.price}
                                </p>
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button className="mt-3 w-full border border-primary text-primary py-2 rounded-full text-sm transition hover:bg-primary hover:text-white">
                            Add to Cart
                        </button>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Sale;
