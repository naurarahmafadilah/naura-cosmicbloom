import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom"; // Ditambahkan untuk navigasi ke halaman detail
import { 
  FaSearch, FaPlus, FaTimes, FaSave, FaDownload, 
  FaEdit, FaTrashAlt, FaShoppingBag, FaCalendarAlt, FaCheckCircle, 
  FaClock, FaTimesCircle, FaMoneyBillWave, FaMapMarkerAlt,
  FaCreditCard, FaTruck, FaInfoCircle
} from "react-icons/fa";

// FIX IMPORT: Mengimpor JSON secara default agar data langsung keluar
import ordersData from "../data/Orders.json";

// Components Layout Integration
import DashboardContainer from "../components/DashboardContainer";
import Footer from "../components/Footer";
import InputField from "../components/InputField";

// Helper untuk parse string harga "250.000" -> integer 250000
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  return parseInt(priceStr.toString().replace(/\./g, "")) || 0;
};

// Helper format Rupiah tampilan
const formatRupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
};

// Helper Komponen Avatar Huruf Depan (Inisial)
const CustomerAvatar = ({ name }) => {
  if (!name) return <div className="w-6 h-6 rounded-full bg-slate-200" />;
  
  // Ambil huruf depan dari kata pertama dan kata kedua (jika ada)
  const words = name.trim().split(" ");
  const initials = words.length > 1 
    ? (words[0][0] + words[1][0]).toUpperCase()
    : words[0][0].toUpperCase();

  // Daftar warna estetik bertema earth-tone (Veloura style)
  const colors = [
    "bg-[#4E5631] text-white", // Olive
    "bg-[#A47174] text-white", // Rose Muted
    "bg-[#D4A373] text-slate-900", // Sandy
    "bg-[#7F5539] text-white", // Brown
    "bg-[#B7B7A4] text-slate-900", // Sage
  ];
  
  // Pilih warna acak yang konsisten berdasarkan nama
  const colorIndex = name.length % colors.length;
  const pickedColor = colors[colorIndex];

  return (
    <div className={`w-6 h-6 rounded-full ${pickedColor} flex items-center justify-center text-[10px] font-bold font-mono tracking-tighter border border-white/20 shrink-0 shadow-2xs`}>
      {initials}
    </div>
  );
};

const Order = () => {
  const navigate = useNavigate(); // Hook untuk mengarahkan ke halaman detail
  const [orders, setOrders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [activeStatusFilter, setActiveStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingOrderId, setEditingOrderId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    customer: "",
    product: "",
    price: "",
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    status: "Pending",
    address: "",
    payment: "Bank Transfer",
    shipping: "JNE Reguler",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Diarahkan langsung ke halaman OrdersDetail yang sudah Anda buat membawa ID atau state data
  const handleDetailClick = (orderId, orderItem) => {
    // Skenario 1: Jika menggunakan URL Parameter (/orders/VL-2026101)
    navigate(`/orders/${orderId}`, { state: { order: orderItem } });
  };

  const handleEditClick = (order, e) => {
    e.stopPropagation(); 
    setFormData({
      id: order.id,
      customer: order.customer,
      product: order.product,
      price: order.price.toString().replace(/\./g, ""), 
      date: order.date,
      status: order.status,
      address: order.address || "",
      payment: order.payment || "Bank Transfer",
      shipping: order.shipping || "JNE Reguler",
      img: order.img
    });
    setEditingOrderId(order.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelOrder = (id, e) => {
    e.stopPropagation(); 
    if (window.confirm("Apakah Anda yakin ingin membatalkan pesanan eksklusif ini?")) {
      setOrders(prev => prev.map(item => 
        item.id === id ? { ...item, status: "Cancelled" } : item
      ));
    }
  };

  const handleCancelForm = () => {
    setFormData({
      id: "", customer: "", product: "", price: "", 
      date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }), 
      status: "Pending", address: "", payment: "Bank Transfer", shipping: "JNE Reguler",
      img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=600&q=80"
    });
    setEditingOrderId(null);
    setShowForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.customer || !formData.product || !formData.price) return;

    const formattedPrice = new Intl.NumberFormat("id-ID").format(parseInt(formData.price) || 0);

    if (editingOrderId) {
      setOrders(prev => prev.map((item) => 
        item.id === editingOrderId 
          ? { ...formData, price: formattedPrice }
          : item
      ));
    } else {
      const newOrder = {
        ...formData,
        id: formData.id || `VL-${Math.floor(2026100 + Math.random() * 9000)}`,
        price: formattedPrice
      };
      setOrders(prev => [newOrder, ...prev]);
    }
    handleCancelForm();
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
      const matchStatus = activeStatusFilter === "all" || item.status.toLowerCase() === activeStatusFilter.toLowerCase();
      const matchSearch = 
        item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [orders, activeStatusFilter, searchTerm]);

  const metrics = useMemo(() => {
    const validOrders = orders.filter(o => o.status !== "Cancelled");
    return {
      totalOrders: orders.length,
      revenue: validOrders.reduce((acc, curr) => acc + parsePrice(curr.price), 0),
      pending: orders.filter(o => o.status === "Pending").length,
      completed: orders.filter(o => o.status === "Completed").length
    };
  }, [orders]);

  const getStatusBadgeStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-100";
      case "cancelled": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed": return <FaCheckCircle className="text-emerald-500" size={11} />;
      case "pending": return <FaClock className="text-amber-500" size={11} />;
      default: return <FaTimesCircle className="text-rose-500" size={11} />;
    }
  };

  return (
    <DashboardContainer>
      <div className="animate-fade-in pb-12 text-slate-800 px-4 sm:px-6 lg:px-8 pt-6 select-none bg-transparent font-quicksand max-w-7xl mx-auto">
        
        {/* HEADER CONTROL */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631]">
              Veloura Order Manifest
            </h1>
            <div className="h-[2px] w-14 bg-[#A47174] mt-2"></div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-3 max-w-2xl">
              Kelola pesanan busana eksklusif Veloura. Pantau status pembayaran, logistik kurir, serta rekonsiliasi data pendapatan secara real-time.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#4E5631] hover:border-[#4E5631] shadow-xs transition-all flex items-center gap-2 cursor-pointer">
              <FaDownload size={11} /> Export CSV
            </button>
            <button 
              onClick={() => (showForm ? handleCancelForm() : setShowForm(true))}
              className="px-4 py-2.5 bg-[#4E5631] text-white rounded-xl text-xs font-semibold tracking-wider hover:bg-[#4E5631]/90 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              {showForm ? <FaTimes size={11} /> : <FaPlus size={11} />} 
              {showForm ? "Tutup Form" : "Entri Order Manual"}
            </button>
          </div>
        </div>

        {/* METRICS HUB */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-[#4E5631]/20 transition-all">
            <div className="p-3 bg-slate-50 text-slate-600 rounded-xl border border-slate-100"><FaShoppingBag size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Transaksi</p>
              <h3 className="text-lg font-bold text-slate-800 font-mono">{metrics.totalOrders} Invoice</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-[#4E5631]/20 transition-all">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100"><FaMoneyBillWave size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Gross Revenue</p>
              <h3 className="text-lg font-bold text-slate-800 font-mono">{formatRupiah(metrics.revenue)}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-[#4E5631]/20 transition-all">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100"><FaClock size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Antrean Pending</p>
              <h3 className="text-lg font-bold text-slate-800 font-mono">{metrics.pending} Orders</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-[#4E5631]/20 transition-all">
            <div className="p-3 bg-rose-50 text-[#A47174] rounded-xl border border-rose-100"><FaCheckCircle size={16} /></div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Selesai Dikirim</p>
              <h3 className="text-lg font-bold text-slate-800 font-mono">{metrics.completed} Manifest</h3>
            </div>
          </div>
        </div>

        {/* DYNAMIC FORM */}
        {showForm && (
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs mb-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 mb-5 flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold font-playfair text-slate-800">
                  {editingOrderId ? `Sesuaikan Manifes Data ${editingOrderId}` : "Pencatatan Lembar Transaksi Baru"}
                </h3>
              </div>
              <button onClick={handleCancelForm} className="text-slate-300 hover:text-slate-600 cursor-pointer"><FaTimes size={14} /></button>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <InputField label="ID Invoice" name="id" value={formData.id} onChange={handleInputChange} placeholder="Contoh: VL-2026199 (Kosongkan untuk Auto)" disabled={!!editingOrderId} />
                <InputField label="Nama Pelanggan" name="customer" value={formData.customer} onChange={handleInputChange} placeholder="Contoh: Maudy Ayunda" required />
                <InputField label="Produk Busana" name="product" value={formData.product} onChange={handleInputChange} placeholder="Contoh: Luxury Velvet Gown" required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <InputField label="Harga Produk (Angka Mentah)" type="number" name="price" value={formData.price} onChange={handleInputChange} placeholder="Contoh: 350000" required />
                <InputField label="Tanggal Nota" name="date" value={formData.date} onChange={handleInputChange} placeholder="Contoh: June 05, 2026" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Metode Pembayaran</label>
                  <select name="payment" value={formData.payment} onChange={handleInputChange} className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl px-3 text-slate-700 font-medium focus:outline-hidden">
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="QRIS">QRIS</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="E-Wallet (OVO)">E-Wallet (OVO)</option>
                    <option value="E-Wallet (Dana)">E-Wallet (Dana)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status Alur Order</label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl px-3 text-slate-700 font-medium focus:outline-hidden">
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Kurir & Layanan Pengiriman" name="shipping" value={formData.shipping} onChange={handleInputChange} placeholder="Contoh: J&T Express" />
                <InputField label="Alamat Destinasi Pengiriman Lengkap" name="address" value={formData.address} onChange={handleInputChange} placeholder="Masukkan jalan, kota, dll." />
              </div>
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <button type="button" onClick={handleCancelForm} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl font-semibold cursor-pointer">Batal</button>
                <button type="submit" className="px-4 py-2 bg-[#4E5631] text-white rounded-xl font-semibold flex items-center gap-1.5 cursor-pointer"><FaSave size={11} /> Simpan</button>
              </div>
            </form>
          </div>
        )}

        {/* CONTROLS BAR */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-4 mb-6">
          <div className="w-full lg:w-auto flex flex-row gap-1 bg-[#FAF9F5] p-1 rounded-xl border border-slate-200/40 overflow-x-auto">
            {["all", "Pending", "Completed", "Cancelled"].map((tab) => (
              <button key={tab} onClick={() => setActiveStatusFilter(tab)} className={`rounded-lg text-[10px] font-bold px-4 py-2 uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${activeStatusFilter === tab ? "bg-[#4E5631] text-white" : "text-slate-400 hover:text-slate-600"}`}>
                {tab === "all" ? "Semua Pesanan" : tab}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:max-w-md flex items-center">
            <FaSearch className="absolute left-3.5 text-slate-400" size={11} />
            <input type="text" placeholder="Cari invoice, konsumen, atau produk..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 text-xs font-medium focus:outline-hidden" />
          </div>
        </div>

        {/* TABLE VIEW */}
        {filteredOrders.length > 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                    <th className="py-4 px-6">ID & Produk</th>
                    <th className="py-4 px-4">Nama Pelanggan</th>
                    <th className="py-4 px-4">Detail Pengiriman</th>
                    <th className="py-4 px-4">Metode & Tanggal</th>
                    <th className="py-4 px-4 text-right">Nilai Tagihan</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-6 text-center">Tindakan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((item) => (
                    <tr 
                      key={item.id} 
                      className="group hover:bg-slate-50/40 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={item.img} alt={item.product} className="w-10 h-12 object-cover rounded-lg border bg-slate-100 shrink-0" />
                          <div>
                            <span className="text-[9px] font-mono font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm inline-block mb-1">{item.id}</span>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#4E5631]">{item.product}</h4>
                          </div>
                        </div>
                      </td>
                      
                      {/* UPDATE: Avatar Profil Sesuai Huruf Depan */}
                      <td className="py-4 px-4 text-xs font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <CustomerAvatar name={item.customer} />
                          <span className="truncate max-w-[140px]">{item.customer}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-xs max-w-xs">
                        <div className="flex items-center gap-1 text-[#4E5631] font-bold text-[10px] mb-1"><FaTruck size={10} /><span>{item.shipping}</span></div>
                        <p className="text-slate-400 text-[11px] truncate" title={item.address}><FaMapMarkerAlt size={9} className="inline mr-1 text-slate-300" />{item.address}</p>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600 font-medium">
                        <div className="flex items-center gap-1 text-slate-500 font-mono text-[11px] mb-1"><FaCreditCard size={10} className="text-slate-400" /><span>{item.payment}</span></div>
                        <div className="flex items-center gap-1 text-slate-400 font-mono text-[10px]"><FaCalendarAlt size={10} className="text-slate-300" /><span>{item.date}</span></div>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-xs font-bold text-slate-900">{formatRupiah(parsePrice(item.price))}</td>
                      <td className="py-4 px-4 text-center">
                        <span className={`text-[9px] font-bold tracking-wide px-2.5 py-0.5 border rounded-full inline-flex items-center gap-1.5 ${getStatusBadgeStyle(item.status)}`}>
                          {getStatusIcon(item.status)}
                          <span>{item.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* UPDATE: Icon Detail Baru & Navigasi ke Halaman OrdersDetail */}
                          <button 
                            onClick={() => handleDetailClick(item.id, item)} 
                            title="Lihat Detail Pesanan"
                            className="w-7 h-7 bg-white hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-lg flex items-center justify-center border cursor-pointer transition-colors"
                          >
                            <FaInfoCircle size={11} />
                          </button>
                          
                          <button onClick={(e) => handleEditClick(item, e)} title="Ubah Data" className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-500 hover:text-[#4E5631] rounded-lg flex items-center justify-center border cursor-pointer transition-colors"><FaEdit size={11} /></button>
                          <button onClick={(e) => handleCancelOrder(item.id, e)} title="Batalkan" className="w-7 h-7 bg-white hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-lg flex items-center justify-center border cursor-pointer transition-colors" disabled={item.status === "Cancelled" || item.status === "Completed"}><FaTrashAlt size={11} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-2xl max-w-md mx-auto px-6">
            <h3 className="font-playfair text-base font-bold text-slate-800">Order Tidak Ditemukan</h3>
            <button onClick={() => { setSearchTerm(""); setActiveStatusFilter("all"); }} className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase cursor-pointer">Reset Filter</button>
          </div>
        )}

        <div className="pt-8"><Footer /></div>
      </div>
    </DashboardContainer>
  );
};

export default Order;