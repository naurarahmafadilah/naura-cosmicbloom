import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { FaShoppingBag, FaTag } from "react-icons/fa";
// ✅ Gunakan nama 'saleProducts' (bukan Sale) untuk data
import saleProducts from "../data/Sale.json"; 

const Sale = () => {
    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <PageHeader
                title="End of Season Sale"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Sale" }
                ]}
            />

            {/* PROMO BANNER */}
            <div className="bg-primary-dark rounded-[40px] p-10 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between shadow-veloura">
                <div className="relative z-10 space-y-2">
                    <div className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest">
                        <FaTag /> Flash Sale Event
                    </div>
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
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-light/10 rounded-full blur-3xl" />
            </div>

            {/* GRID SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {saleProducts.map((item) => (
                    <div key={item.id} className="group relative">
                        {/* IMAGE CARD */}
                        {/* ✅ PERBAIKAN: Ubah /shop/ menjadi /sale/ di sini */}
                        <Link to={`/sale/${item.slug}`} className="block relative overflow-hidden rounded-[35px] border border-bg-soft bg-white shadow-sm aspect-[3/4]">
                            <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                            />

                            {/* DISCOUNT BADGE */}
                            <div className="absolute top-5 right-5 bg-secondary-light text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-20">
                                -{item.discount}
                            </div>

                            {/* QUICK ACTION OVERLAY */}
                            <div className="absolute inset-0 bg-primary-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                                <div className="bg-white text-primary-dark w-full py-3 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Lihat Detail
                                </div>
                            </div>
                        </Link>

                        {/* PRODUCT INFO */}
                        <div className="mt-5 text-center">
                            {/* ✅ PERBAIKAN: Ubah /shop/ menjadi /sale/ di sini juga */}
                            <Link to={`/sale/${item.slug}`}>
                                <h3 className="text-lg font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                                    {item.name}
                                </h3>
                            </Link>
                            
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