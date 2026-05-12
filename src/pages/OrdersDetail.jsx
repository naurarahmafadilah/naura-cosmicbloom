import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaCreditCard, FaTruck } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/Orders.json";

const OrderDetail = () => {
  const { id } = useParams();
  const order = ordersData.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="py-40 text-center animate-fade-in">
        <h2 className="font-playfair text-3xl text-primary-dark">Pesanan Tidak Ditemukan</h2>
        <Link to="/orders" className="text-secondary-light underline mt-4 inline-block">Kembali ke Daftar</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <PageHeader
        title="Order Details"
        breadcrumb={[
          { label: "Beranda", link: "/" },
          { label: "Orders", link: "/orders" },
          { label: order.id }
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 mt-10">
        <Link to="/orders" className="flex items-center gap-2 text-secondary-light text-[10px] font-bold uppercase tracking-widest mb-8 hover:text-primary-dark transition-all">
          <FaArrowLeft /> Kembali ke Daftar Pesanan
        </Link>

        <div className="bg-white rounded-[40px] border border-bg-soft overflow-hidden shadow-sm">
          {/* Status Header */}
          <div className="bg-bg-main p-8 border-b border-bg-soft flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-[10px] font-bold text-secondary-light uppercase tracking-[3px] mb-1">ID Transaksi</p>
              <h2 className="text-2xl font-playfair text-primary-dark">{order.id}</h2>
            </div>
            <div className="px-6 py-2 rounded-full border border-primary-light bg-white text-primary-dark text-[10px] font-bold uppercase tracking-widest">
              Status: {order.status}
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-2 gap-12">
            {/* Produk */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 font-playfair text-lg text-primary-dark">
                <FaBox className="text-secondary-light" /> Informasi Produk
              </div>
              <div className="flex gap-5 p-5 rounded-3xl bg-bg-soft/30 border border-bg-soft">
                <img src={order.img} alt={order.product} className="w-24 h-24 rounded-2xl object-cover shadow-sm" />
                <div>
                  <h4 className="font-bold text-primary-dark">{order.product}</h4>
                  <p className="text-xs text-secondary-dark/50 mt-1">Quantity: 1 Item</p>
                  <p className="text-primary-dark font-bold mt-2 font-quicksand text-lg">Rp {order.price}</p>
                </div>
              </div>
            </div>

            {/* Pengiriman & Bayar */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary-dark font-bold text-sm">
                  <FaMapMarkerAlt className="text-secondary-light" /> Alamat Pengiriman
                </div>
                <p className="text-sm text-secondary-dark/60 pl-7 leading-relaxed">{order.address}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-primary-dark font-bold text-sm">
                  <FaTruck className="text-secondary-light" /> Kurir & Pembayaran
                </div>
                <div className="pl-7 space-y-1">
                  <p className="text-xs text-secondary-dark/60 font-medium italic">{order.shipping}</p>
                  <p className="text-xs text-secondary-dark/80 font-bold uppercase tracking-widest">{order.payment}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Total */}
          <div className="p-8 bg-primary-dark text-white flex justify-between items-center">
            <span className="font-playfair text-lg italic">Total yang Dibayarkan</span>
            <span className="text-3xl font-bold font-quicksand">Rp {order.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;