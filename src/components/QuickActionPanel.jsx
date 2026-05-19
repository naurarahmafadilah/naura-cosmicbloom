import React from "react";
import { FiZap, FiRadio, FiPercent, FiDownloadCloud } from "react-icons/fi";

const QuickActionPanel = () => {
  const actions = [
    { label: "Mulai Flash Sale", desc: "Diskon kilat berwaktu", icon: <FiZap />, color: "hover:text-amber-600 hover:bg-amber-50/50 hover:border-amber-200" },
    { label: "Broadcast WA VIP", desc: "Kirim pesan ke pelanggan", icon: <FiRadio />, color: "hover:text-emerald-600 hover:bg-emerald-50/50 hover:border-emerald-200" },
    { label: "Kupon Diskon", desc: "Buat kode potongan baru", icon: <FiPercent />, color: "hover:text-indigo-600 hover:bg-indigo-50/50 hover:border-indigo-200" },
    { label: "Backup Database", desc: "Amankan katalog produk", icon: <FiDownloadCloud />, color: "hover:text-rose-600 hover:bg-rose-50/50 hover:border-rose-200" },
  ];

  return (
    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
      <div className="mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-[2px] text-slate-400 font-quicksand">Aksi Cepat Admin</h3>
        <p className="text-xs text-slate-400 font-quicksand mt-0.5">Akses pintas instan manajemen toko</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((act, index) => (
          <button
            key={index}
            className={`flex flex-col items-start p-4 bg-slate-50 border border-slate-100 text-slate-700 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:shadow-[0_15px_30px_rgba(15,23,42,0.05)] ${act.color}`}
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/60 flex items-center justify-center text-sm shadow-sm mb-3">
              {act.icon}
            </div>
            <span className="text-xs font-bold font-quicksand tracking-wide text-slate-800">{act.label}</span>
            <span className="text-[10px] text-slate-400 font-quicksand mt-0.5">{act.desc}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActionPanel;