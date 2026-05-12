import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/Orders.json";

const OrderDetail = () => {
    const { id } = useParams();
    const order = ordersData.find((o) => o.id === id);

    if (!order) return <div className="py-20 text-center font-playfair">Pesanan tidak ditemukan.</div>;

    return (
        <div className="space-y-12 animate-fade-in pb-20">
            <PageHeader
                title="Order Detail"
                breadcrumb={[
                    { label: "Beranda", link: "/" },
                    { label: "Orders", link: "/orders" },
                    { label: order.id }
                ]}
            />

            <div className="max-w-4xl mx-auto px-4">
                <Link to="/orders" className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest mb-8 hover:text-primary-dark transition-all">
                    <FaArrowLeft /> Kembali ke Daftar
                </Link>

                <div className="bg-white rounded-[40px] border border-bg-soft overflow-hidden shadow-sm">
                    {/* Header Detail */}
                    <div className="bg-bg-main p-8 border-b border-bg-soft flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-[10px] font-bold text-secondary-light uppercase tracking-[3px] mb-1">ID Transaksi</p>
                            <h2 className="text-2xl font-playfair text-primary-dark">{order.id}</h2>
                        </div>
                        <div className="px-6 py-2 rounded-full border border-primary-light bg-white text-primary-dark text-xs font-bold uppercase">
                            Status: {order.status}
                        </div>
                    </div>

                    <div className="p-8 grid md:grid-cols-2 gap-12">
                        {/* Info Produk */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary-dark text-white p-3 rounded-2xl"><FaBox /></div>
                                <h3 className="font-playfair text-xl text-primary-dark">Informasi Produk</h3>
                            </div>
                            <div className="flex gap-4 p-4 rounded-3xl bg-bg-main">
                                <img src={order.img} alt={order.product} className="w-20 h-20 rounded-2xl object-cover" />
                                <div>
                                    <h4 className="font-bold text-primary-dark">{order.product}</h4>
                                    <p className="text-sm text-secondary-dark/60">Qty: 1</p>
                                    <p className="text-primary-dark font-bold mt-1">Rp {order.price}</p>
                                </div>
                            </div>
                        </div>

                        {/* Pengiriman & Pembayaran */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary-dark font-bold">
                                    <FaMapMarkerAlt className="text-secondary-light" />
                                    <span>Alamat Pengiriman</span>
                                </div>
                                <p className="text-sm text-secondary-dark/60 pl-7 leading-relaxed">{order.address}</p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary-dark font-bold">
                                    <FaCreditCard className="text-secondary-light" />
                                    <span>Metode Pembayaran</span>
                                </div>
                                <p className="text-sm text-secondary-dark/60 pl-7 uppercase tracking-wider">{order.payment}</p>
                            </div>
                        </div>
                    </div>

                    {/* Ringkasan Biaya */}
                    <div className="p-8 bg-primary-dark text-white flex justify-between items-center">
                        <span className="font-playfair text-lg italic">Total Pembayaran</span>
                        <span className="text-2xl font-bold font-quicksand">Rp {order.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;