import { useState } from "react";
import PageHeader from "../components/PageHeader";

const Shop = () => {
    const [filter, setFilter] = useState("all");

    const products = [
        {
            name: "Elegant Dress",
            price: "Rp 250.000",
            category: "dress",
            img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Casual Outfit",
            price: "Rp 180.000",
            category: "casual",
            img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Summer Style",
            price: "Rp 300.000",
            category: "summer",
            img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            name: "Modern Look",
            price: "Rp 270.000",
            category: "modern",
            img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    const filteredProducts =
        filter === "all"
            ? products
            : products.filter((p) => p.category === filter);

    return (
        <div className="space-y-10">

            <PageHeader
                title="Shop"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Shop" }
                ]}
            />

            {/* FILTER */}
            <div className="flex gap-4 flex-wrap">
                {["all", "dress", "casual", "summer", "modern"].map((item) => (
                    <button
                        key={item}
                        onClick={() => setFilter(item)}
                        className={`px-4 py-2 rounded-full text-sm capitalize transition ${filter === item
                                ? "bg-primary text-white"
                                : "bg-white border border-[#f1e5db] text-teks-soft hover:bg-primary/10"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* GRID PRODUK */}
            <div className="grid grid-cols-4 gap-8">

                {filteredProducts.map((item, i) => (
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
    );
};

export default Shop;