import PageHeader from "../components/PageHeader";
import { FaShoppingBag } from "react-icons/fa";

const Sale = () => {
    const products = [
        {
            name: "Elegant Evening Dress",
            oldPrice: "350.000",
            price: "250.000",
            discount: "30%",
            img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop"
        },
        {
            name: "Casual Autumn Shirt",
            oldPrice: "250.000",
            price: "180.000",
            discount: "28%",
            img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop"
        },
        {
            name: "Summer Breeze Dress",
            oldPrice: "400.000",
            price: "300.000",
            discount: "25%",
            img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop"
        },
        {
            name: "Minimalist Silk Outfit",
            oldPrice: "320.000",
            price: "270.000",
            discount: "15%",
            img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop"
        }
    ];

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <PageHeader
                title="End of Season Sale"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Sale" }
                ]}
            />

            {/* PROMO BANNER SHORT */}
            <div className="bg-primary-dark rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-veloura">
                <div className="relative z-10 space-y-2">
                    <h2 className="text-4xl font-playfair leading-tight">
                        Penawaran <span className="italic text-secondary-light">Terbatas</span>
                    </h2>
                    <p className="font-quicksand text-sm opacity-70">Gunakan kode <span className="font-bold border-b border-secondary-light text-white">VELOURA50</span> untuk tambahan diskon.</p>
                </div>
                <div className="mt-6 md:mt-0 relative z-10">
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20">
                        <p className="text-[10px] uppercase tracking-[3px] text-center mb-1">Berakhir dalam</p>
                        <p className="text-2xl font-bold font-quicksand tracking-widest">24 : 12 : 59</p>
                    </div>
                </div>
                {/* Decoration */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/10 rounded-full blur-3xl" />
            </div>

            {/* GRID SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {products.map((item, i) => (
                    <div key={i} className="group relative">
                        {/* IMAGE CARD */}
                        <div className="relative overflow-hidden rounded-[35px] border border-bg-soft bg-white shadow-sm aspect-[3/4]">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                            />

                            {/* DISCOUNT BADGE */}
                            <div className="absolute top-5 right-5 bg-secondary-light text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg">
                                -{item.discount}
                            </div>

                            {/* QUICK ACTION OVERLAY */}
                            <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <button className="bg-white text-primary-dark w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <FaShoppingBag size={12} /> Add To Cart
                                </button>
                            </div>
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="mt-5 text-center">
                            <h3 className="text-lg font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                                {item.name}
                            </h3>
                            
                            <div className="flex items-center justify-center gap-3 mt-2 font-quicksand">
                                <p className="text-secondary-dark/30 text-sm line-through">
                                    Rp {item.oldPrice}
                                </p>
                                <p className="text-primary-dark font-bold text-lg">
                                    <span className="text-[10px] text-secondary-light align-top mr-0.5">Rp</span>
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sale;