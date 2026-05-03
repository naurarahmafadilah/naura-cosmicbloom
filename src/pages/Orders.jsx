import PageHeader from "../components/PageHeader";

const Orders = () => {

    const orders = Array.from({ length: 30 }, (_, i) => ({
        id: `#VL${100 + i}`,
        product: ["Elegant Dress", "Casual Outfit", "Summer Style", "Modern Look"][i % 4],
        customer: `Customer ${i + 1}`,
        status: ["Pending", "Completed", "Cancelled"][i % 3],
        price: `Rp ${(200000 + i * 10000).toLocaleString()}`,
        date: `2026-05-${(i % 30) + 1}`,

        // ✅ FIX DI SINI
        img: [
            "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80",
        ][i % 3]
    }));

    const statusStyle = (status) => {
        if (status === "Completed")
            return "bg-green-100 text-green-600";
        if (status === "Pending")
            return "bg-yellow-100 text-yellow-600";
        return "bg-red-100 text-red-500";
    };

    return (
        <div className="space-y-10">

            <PageHeader
                title="Pesanan Saya"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Pesanan Saya" }
                ]}
            />

            <div>
                <h2 className="text-3xl font-[var(--font-playfair)] text-teks">
                    Riwayat Pesanan 🛍️
                </h2>
                <p className="text-teks-soft text-sm mt-2">
                    Semua pesanan yang pernah kamu lakukan
                </p>
            </div>

            {/* LIST */}
            <div className="space-y-6">

                {orders.map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-6 bg-white p-5 rounded-2xl border border-[#f1e5db] hover:shadow-sm transition"
                    >

                        {/* IMAGE */}
                        <img
                            src={item.img}
                            className="w-24 h-24 object-cover rounded-xl"
                        />

                        {/* INFO */}
                        <div className="flex-1 space-y-1">

                            <h3 className="font-medium text-teks">
                                {item.product}
                            </h3>

                            <p className="text-sm text-teks-soft">
                                {item.id} • {item.customer}
                            </p>

                            <p className="text-xs text-teks-soft">
                                {item.date}
                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="text-right space-y-2">

                            <p className="text-primary font-semibold">
                                {item.price}
                            </p>

                            <span className={`text-xs px-3 py-1 rounded-full ${statusStyle(item.status)}`}>
                                {item.status}
                            </span>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Orders;