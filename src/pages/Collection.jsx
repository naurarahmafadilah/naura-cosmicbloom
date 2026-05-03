import PageHeader from "../components/PageHeader";

const Collection = () => {
    return (
        <div className="space-y-12">

            <PageHeader
                title="Collection"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Collection" }
                ]}
            />

            {/* HERO COLLECTION */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#f1e5db] grid grid-cols-2">

                <img
                    src="https://plus.unsplash.com/premium_photo-1664202525979-80d1da46b34b?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="w-full h-full object-cover"
                />

                <div className="p-10 flex flex-col justify-center">
                    <p className="text-xs tracking-[3px] uppercase text-teks-soft mb-2">
                        New Arrival
                    </p>

                    <h2 className="text-4xl font-[var(--font-playfair)] text-teks leading-tight">
                        Autumn <span className="text-primary">Collection</span>
                    </h2>

                    <p className="text-teks-soft mt-4 text-sm leading-relaxed">
                        Koleksi musim terbaru dengan nuansa hangat dan elegan untuk tampilan yang timeless.
                    </p>

                    <button className="mt-6 w-fit px-6 py-2 bg-primary text-white rounded-full text-sm hover:opacity-90 transition">
                        Explore Now
                    </button>
                </div>

            </div>

            {/* GRID COLLECTION */}
            <div className="grid grid-cols-3 gap-8">

                {[
                    {
                        name: "Casual Style",
                        img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Elegant Dress",
                        img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    },
                    {
                        name: "Summer Outfit",
                        img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                ].map((item, i) => (
                    <div key={i} className="group cursor-pointer">

                        <div className="overflow-hidden rounded-2xl">
                            <img
                                src={item.img}
                                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
                            />
                        </div>

                        <h3 className="mt-4 text-lg font-[var(--font-playfair)] text-teks">
                            {item.name}
                        </h3>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Collection;