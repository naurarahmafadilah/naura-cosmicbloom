import React from "react";
import { FiAlertTriangle, FiPlus } from "react-icons/fi";

const StockAlertCard = () => {
  const lowStockItems = [
    { name: "Casual Outfit (Size M)", stock: 2, percentage: "20%", bg: "from-rose-500 to-pink-500" },
    { name: "Luxury Silk Blouse (Size L)", stock: 1, percentage: "10%", bg: "from-amber-500 to-rose-500" },
  ];

  return (
    <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm transform transition-all duration-500 hover:shadow-[0_20px_40px_rgba(15,23,42,0.04)] hover:border-slate-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-rose-600">
          <FiAlertTriangle size={15} className="animate-pulse" />
          <h3 className="text-[10px] font-bold uppercase tracking-[1.5px] font-quicksand">Stok Kritis Atelier</h3>
        </div>
        <button className="text-[10px] font-bold text-secondary-light font-quicksand hover:underline flex items-center gap-0.5">
          <FiPlus size={10} /> Restok
        </button>
      </div>
      
      <div className="space-y-4">
        {lowStockItems.map((item, idx) => (
          <div key={idx} className="space-y-2 p-3 rounded-2xl bg-stone-50/50 border border-stone-100/50">
            <div className="flex justify-between text-xs font-quicksand">
              <span className="font-bold text-slate-700">{item.name}</span>
              <span className="text-rose-600 font-extrabold bg-rose-50 px-2 py-0.5 rounded-md text-[10px]">Sisa {item.stock} Pcs</span>
            </div>
            {/* Elegant Sleek Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${item.bg} rounded-full transition-all duration-1000`}
                style={{ width: item.percentage }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StockAlertCard;