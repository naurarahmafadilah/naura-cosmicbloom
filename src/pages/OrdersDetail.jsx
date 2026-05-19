import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaBox, FaMapMarkerAlt, FaCreditCard, FaTruck, FaRegCalendarAlt, FaUser, FaBarcode, FaEdit, FaCheckCircle } from "react-icons/fa";

// IMPORT LAYOUT & KOMPONEN INTERNAL PROYEK ANDA
import DashboardContainer from "../components/DashboardContainer";
import PageHeader from "../components/PageHeader";
import Footer from "../components/Footer";

// Import data master transaksi toko
import ordersData from "../data/Orders.json";

const OrderDetail = () => {
  const { id } = useParams();
  const order = ordersData.find((o) => o.id === id);

  // Jika data transaksi tidak ditemukan (Handling Error Admin)
  if (!order) {
    return (
      <DashboardContainer>
        <div className="py-40 text-center animate-fade-in font-quicksand">
          <h2 className="font-playfair text-3xl text-primary-dark">Manifest Pesanan Tidak Ditemukan</h2>
          <p className="text-xs text-primary-dark/40 mt-1">ID Transaksi tidak terdaftar atau telah diarsipkan oleh sistem.</p>
          <Link to="/orders" className="text-secondary-light font-bold text-xs uppercase tracking-wider underline mt-4 inline-block hover:text-primary-dark transition-colors">
            Kembali ke Daftar Pesanan
          </Link>
        </div>
      </DashboardContainer>
    );
  }

  // Penyesuai warna badge status audit untuk back-office Veloura
  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return "bg-green-500/10 text-green-700 border-green-500/20";
      case "Pending": return "bg-amber-500/10 text-amber-700 border-amber-500/20";
      case "Cancelled": return "bg-primary-dark/10 text-primary-dark/40 border-primary-dark/10 line-through";
      default: return "bg-bg-main text-secondary-dark/40 border-bg-soft";
    }
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-10 text-primary-dark">
        
        {/* HEADER HALAMAN */}
        <PageHeader
          title="Manajemen Manifest Order"
          breadcrumb={[
            { label: "Dashboard", link: "/" },
            { label: "Daftar Pesanan", link: "/orders" },
            { label: order.id }
          ]}
        />

        <div className="max-w-5xl mx-auto mt-12 px-4 sm:px-0">
          
          {/* Tombol Kembali ke Log Admin */}
          <Link 
            to="/orders" 
            className="inline-flex items-center gap-2 text-secondary-dark/50 text-[10px] font-bold uppercase tracking-widest mb-6 hover:text-secondary-light transition-colors"
          >
            <FaArrowLeft className="text-[9px]" /> Kembali ke Log Transaksi
          </Link>

          {/* UTAMA: PANEL INVOICE AUDIT SYSTEM */}
          <div className="bg-white rounded-[35px] border border-primary-light/10 overflow-hidden shadow-sm">
            
            {/* Top Info Bar Master Node */}
            <div className="bg-bg-main/40 p-8 border-b border-border-subtle flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-[9px] font-mono font-bold text-primary-dark/40 uppercase tracking-widest bg-bg-main border border-border-subtle px-2 py-0.5 rounded">
                  Arsip Dokumen Finansial
                </span>
                <h2 className="text-2xl font-playfair text-primary-dark mt-1.5">{order.id}</h2>
                <div className="flex items-center gap-4 text-xs text-primary-dark/40 font-quicksand mt-1">
                  <p className="flex items-center gap-1.5"><FaRegCalendarAlt className="text-[10px]" /> Waktu Transaksi: {order.date}</p>
                  <p className="flex items-center gap-1.5"><FaUser className="text-[10px]" /> ID Pembeli: {order.customer}</p>
                </div>
              </div>
              
              <div className={`px-4 py-1.5 rounded-xl border text-[10px] font-bold uppercase tracking-widest font-mono ${getStatusBadge(order.status)}`}>
                Sistem Log: {order.status === "Completed" ? "Selesai" : order.status === "Pending" ? "Menunggu" : "Dibatalkan"}
              </div>
            </div>

            {/* Grid Konten Pemrosesan */}
            <div className="grid lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border-subtle/70">
              
              {/* SISI KIRI: DATA ITEM & BREAKDOWN AUDIT NOMINAL */}
              <div className="lg:col-span-7 p-8 space-y-8">
                <div>
                  <h4 className="font-playfair text-lg text-primary-dark flex items-center gap-2.5 mb-4">
                    <FaBox className="text-secondary-light text-sm" /> Rincian Muatan Produk
                  </h4>
                  
                  {/* Kartu Komponen Produk */}
                  <div className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-bg-main/20 border border-border-subtle/60">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-border-subtle shrink-0 bg-white">
                      <img 
                        src={order.img} 
                        alt={order.product} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex flex-col justify-between py-1 flex-1">
                      <div>
                        <h5 className="font-playfair text-lg text-primary-dark leading-snug">{order.product}</h5>
                        <p className="text-xs font-quicksand text-primary-dark/40 mt-1">Volume Alokasi: 1 Unit</p>
                      </div>
                      <p className="font-quicksand font-bold text-primary-dark text-base mt-2 sm:mt-0">
                        <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span> {order.price}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Rincian Finansial Rekonsiliasi */}
                <div className="border-t border-border-subtle/60 pt-6 font-quicksand space-y-3 text-xs">
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Subtotal Nilai Barang</span>
                    <span>Rp {order.price}</span>
                  </div>
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Subsidi Ongkos Kirim ({order.shipping})</span>
                    <span className="text-secondary-light uppercase font-bold text-[10px] tracking-wider">Toko Bebas Ongkir</span>
                  </div>
                  <div className="flex justify-between text-primary-dark/60">
                    <span>Pajak Konsumsi (PPN) & Biaya Gerbang Tol</span>
                    <span>Rp 0</span>
                  </div>
                </div>
              </div>

              {/* SISI KANAN: INSTRUKSI LOGISTIK & VALIDASI GATEWAY */}
              <div className="lg:col-span-5 p-8 space-y-8 font-quicksand">
                {/* Alamat Penerima */}
                <div className="space-y-2">
                  <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <FaMapMarkerAlt className="text-secondary-light text-xs" /> Alamat Pengiriman Domestik
                  </h4>
                  <div className="pl-5 text-sm text-primary-dark/60 leading-relaxed border-l border-border-subtle">
                    <p className="font-bold text-primary-dark mb-0.5">{order.customer}</p>
                    <p>{order.address}</p>
                  </div>
                </div>

                {/* Informasi Kurir & Kode Resi */}
                <div className="space-y-2">
                  <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <FaTruck className="text-secondary-light text-xs" /> Rekomendasi Ekspedisi Mitra
                  </h4>
                  <div className="pl-5 border-l border-border-subtle space-y-2.5">
                    <div>
                      <span className="text-[10px] bg-bg-main border border-border-subtle px-2.5 py-1 rounded-md font-mono font-bold text-primary-dark/60 uppercase tracking-wider">
                        {order.shipping}
                      </span>
                    </div>
                    <p className="text-[11px] text-primary-dark/40 flex items-center gap-1.5">
                      <FaBarcode /> ID Pelacakan Manifest: <span className="font-mono font-bold text-primary-dark">VLR-{order.id}</span>
                    </p>
                  </div>
                </div>

                {/* Metode Pembayaran */}
                <div className="space-y-2">
                  <h4 className="text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                    <FaCreditCard className="text-secondary-light text-xs" /> Kluster Settlement Transaksi
                  </h4>
                  <div className="pl-5 text-xs text-primary-dark/70 font-mono tracking-widest uppercase border-l border-border-subtle">
                    {order.payment}
                  </div>
                </div>
              </div>

            </div>

            {/* PANEL AKSI DAN TOTAL SETTLEMENT ADMIN */}
            <div className="p-8 bg-primary-dark text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-t border-white/10">
              <div className="font-playfair">
                <span className="text-lg italic text-white/90">Total Nilai Penjualan</span>
                <p className="text-[10px] font-quicksand tracking-wider text-white/40 uppercase mt-0.5">
                  Telah Di-settle otomatis via kanal {order.payment}
                </p>
              </div>
              
              <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right font-quicksand">
                  <span className="text-2xl sm:text-3xl font-bold tracking-wide flex items-baseline">
                    <span className="text-xs sm:text-sm font-normal text-secondary-light mr-1">Rp</span>
                    {order.price}
                  </span>
                </div>
                
                <div className="flex gap-2 font-quicksand">
                  <button className="bg-white text-primary-dark px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-bg-main transition-all cursor-pointer shadow-md">
                    <FaEdit size={10} /> Ubah Rute
                  </button>
                  <button className="bg-secondary-light text-white px-4 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-secondary-light/90 transition-all cursor-pointer shadow-md">
                    <FaCheckCircle size={10} /> Validasi Resi
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FOOTER GLOBAL */}
        <div className="mt-16">
          <Footer />
        </div>

      </div>
    </DashboardContainer>
  );
};

export default OrderDetail;