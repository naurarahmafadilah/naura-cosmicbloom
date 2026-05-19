import React from "react";
import { FiUser, FiShoppingBag, FiClock, FiChevronRight } from "react-icons/fi";

const CustomerActivityList = () => {
  const activities = [
    { name: "Clara Setya", action: "Membeli Elegant Dress", time: "2 Menit lalu", amount: "Rp 250.000", initial: "CS" },
    { name: "Devi Rahma", action: "Menambahkan Kacamata", time: "14 Menit lalu", amount: null, initial: "DR" },
    { name: "Gisella Utama", action: "Menyelesaikan Pembayaran", time: "1 Jam lalu", amount: "Rp 270.000", initial: "GU" },
  ];

  return (
    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transform transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.04)] hover:border-slate-200">
      <div className="border-b border-slate-100 pb-4 mb-4 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold font-playfair text-primary-dark">Aktivitas Pelanggan</h3>
          <p className="text-xs text-slate-400 font-quicksand">Aliran data transaksi masuk secara live</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-600 font-quicksand">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          Live Feed
        </div>
      </div>

      <div className="space-y-3.5">
        {activities.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-50 transition-all duration-300 hover:bg-white hover:border-slate-100 hover:shadow-sm cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-800 to-primary-dark text-white font-quicksand text-xs font-bold flex items-center justify-center shadow-sm">
                {item.initial}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-800 font-quicksand group-hover:text-secondary-light transition-colors">{item.name}</h4>
                <p className="text-[11px] text-slate-400 font-quicksand flex items-center gap-1 mt-0.5">
                  <FiShoppingBag size={10} className="text-slate-300" /> {item.action}
                </p>
              </div>
            </div>
            <div className="text-right flex items-center gap-2">
              <div>
                {item.amount && <p className="text-xs font-bold text-slate-800 font-quicksand">{item.amount}</p>}
                <p className="text-[9px] text-slate-400 font-quicksand flex items-center justify-end gap-1 mt-0.5">
                  <FiClock size={9} /> {item.time}
                </p>
              </div>
              <FiChevronRight className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300" size={14} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerActivityList;