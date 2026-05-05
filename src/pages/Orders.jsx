import PageHeader from "../components/PageHeader";

const Orders = () => {
    // Generate 30 dummy orders
    const orders = Array.from({ length: 30 }, (_, i) => ({
        id: `VL-${2026}${100 + i}`,
        product: ["Elegant Evening Dress", "Minimalist Casual Outfit", "Summer Breeze Style", "Modern Urban Look"][i % 4],
        customer: `Customer ${i + 1}`,
        status: ["Pending", "Completed", "Cancelled"][i % 3],
        price: `${(200000 + i * 15000).toLocaleString()}`,
        date: `May ${(i % 30) + 1}, 2026`,
        img: [
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
        ][i % 3]
    }));

    const statusStyle = (status) => {
        if (status === "Completed")
            return "bg-green-50 text-green-600 border-green-100";
        if (status === "Pending")
            return "bg-amber-50 text-amber-600 border-amber-100";
        return "bg-red-50 text-red-500 border-red-100";
    };

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <PageHeader
                title="My Orders"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Pesanan Saya" }
                ]}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-2">
                <div>
                    <h2 className="text-4xl font-playfair text-primary-dark leading-tight">
                        Riwayat <span className="italic text-secondary-light">Pesanan</span>
                    </h2>
                    <p className="text-secondary-dark/50 font-quicksand text-sm mt-2">
                        Pantau status pengiriman dan detail pembelian Anda.
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="px-5 py-2 rounded-full border border-bg-soft text-[10px] font-bold uppercase tracking-widest text-primary-dark hover:bg-bg-soft transition-all">Semua</button>
                    <button className="px-5 py-2 rounded-full border border-bg-soft text-[10px] font-bold uppercase tracking-widest text-secondary-dark/40 hover:bg-bg-soft transition-all">Berjalan</button>
                </div>
            </div>

            {/* LIST ORDERS */}
            <div className="grid gap-6">
                {orders.map((item, i) => (
                    <div
                        key={i}
                        className="group flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-[35px] border border-bg-soft hover:shadow-veloura transition-all duration-500"
                    >
                        {/* IMAGE */}
                        <div className="relative shrink-0 overflow-hidden rounded-3xl w-28 h-28 shadow-inner border border-bg-soft">
                            <img
                                src={item.img}
                                alt={item.product}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                            />
                        </div>

                        {/* INFO UTAMA */}
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                <span className="text-[10px] font-bold tracking-[2px] text-secondary-light uppercase">
                                    {item.id}
                                </span>
                                <span className={`w-fit mx-auto md:mx-0 text-[9px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider ${statusStyle(item.status)}`}>
                                    {item.status}
                                </span>
                            </div>
                            
                            <h3 className="text-xl font-playfair text-primary-dark">
                                {item.product}
                            </h3>

                            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-quicksand text-secondary-dark/40">
                                <span>{item.date}</span>
                                <span className="w-1 h-1 bg-bg-soft rounded-full"></span>
                                <span>{item.customer}</span>
                            </div>
                        </div>

                        {/* HARGA & ACTION */}
                        <div className="shrink-0 flex flex-col items-center md:items-end gap-3">
                            <p className="text-xl font-bold text-primary-dark font-quicksand">
                                <span className="text-sm font-normal text-secondary-dark/40 mr-1">Rp</span>
                                {item.price}
                            </p>
                            <button className="text-[10px] font-bold text-secondary-light uppercase tracking-widest border-b-2 border-secondary-light/10 hover:border-secondary-light transition-all pb-1">
                                Detail Pesanan
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;