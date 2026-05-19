import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// IMPORT DATA SOURCE
import ordersData from "../data/Orders.json"; 

const Orders = () => {
  // Fungsi badge status yang mengalir harmonis dengan token desain Veloura
  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed": 
        return "bg-primary-light/10 text-primary-light border-primary-light/20";
      case "Pending": 
        return "bg-secondary-light/10 text-secondary-light border-secondary-light/20";
      case "Cancelled": 
        return "bg-primary-dark/5 text-primary-dark/40 border-border-subtle line-through";
      default: 
        return "bg-bg-soft text-primary-dark/50 border-border-subtle";
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-20 text-primary-dark">
      
      {/* ADMIN CONTROL TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-6">
        <div>
          <PageHeader
            title="My Orders"
            breadcrumb={[{ label: "Beranda", link: "/" }, { label: "Pesanan" }]}
          />
        </div>

        {/* Info Kontrol Data Pesanan */}
        <div className="flex items-center gap-3 font-quicksand">
          <p className="text-[10px] font-bold uppercase tracking-[2px] text-primary-dark/60 bg-white border border-border-subtle px-4 py-2.5 rounded-full shadow-sm">
            Total: {ordersData.length} Invoice Data
          </p>
        </div>
      </div>

      {/* HEADER JUDUL */}
      <div className="px-2">
        <h2 className="text-4xl font-playfair text-primary-dark leading-tight">
          Riwayat <span className="italic text-secondary-light">Pesanan</span>
        </h2>
        <p className="text-primary-dark/60 font-quicksand text-sm mt-2">
          Pantau status pengiriman dan detail pembelian Anda secara real-time melalui sistem manajemen internal.
        </p>
      </div>

      {/* LIST INVOICE ORDERS (WITH SMOOTH 3D LIFT & SHADOW VELOURA) */}
      <div className="grid gap-6">
        {ordersData.map((item) => (
          <div 
            key={item.id} 
            className="group flex flex-col md:flex-row items-center gap-8 bg-white p-6 rounded-[35px] border border-primary-light/10 shadow-veloura hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(78,86,49,0.06)] hover:border-secondary-light/30 transition-all duration-500 ease-out"
          >
            {/* Thumbnail Image */}
            <div className="relative shrink-0 overflow-hidden rounded-[24px] w-28 h-28 border border-border-subtle bg-bg-soft shadow-inner">
              <img 
                src={item.img} 
                alt={item.product} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
              />
              <div className="absolute inset-0 bg-primary-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Info Metadata Pesanan */}
            <div className="flex-1 text-center md:text-left space-y-2">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center md:justify-start">
                <span className="text-[10px] font-mono font-bold tracking-wider text-primary-dark/50 bg-bg-soft border border-border-subtle px-2 py-0.5 rounded">
                  {item.id}
                </span>
                <span className={`text-[9px] px-3 py-1 rounded-xl border font-bold uppercase tracking-wider transition-all duration-300 ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <h3 className="text-xl font-playfair text-primary-dark group-hover:text-secondary-light transition-colors duration-300">
                {item.product}
              </h3>
              
              <p className="text-xs font-quicksand text-primary-dark/60">
                {item.date} <span className="text-border-subtle mx-1">|</span> Pelanggan: <span className="font-semibold text-primary-dark">{item.customer}</span>
              </p>
            </div>

            {/* Price & Action Sistem */}
            <div className="shrink-0 flex flex-col items-center md:items-end gap-3 font-quicksand">
              <p className="text-xl font-bold text-primary-dark transition-transform duration-300 group-hover:scale-[1.02]">
                <span className="text-xs font-normal text-secondary-light mr-0.5">Rp</span>
                {item.price}
              </p>
              
              <Link 
                to={`/orders/${item.id}`} 
                className="text-[10px] font-bold text-secondary-light uppercase tracking-widest border-b-2 border-secondary-light/10 hover:border-secondary-light hover:text-hover-rose transition-all pb-1 cursor-pointer"
              >
                Detail Pesanan
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Orders;