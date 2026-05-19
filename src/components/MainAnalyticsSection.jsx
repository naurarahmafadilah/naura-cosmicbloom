import React from "react";

const MainAnalyticsSection = () => {
  return (
    <section className="bg-white border border-bg-soft rounded-[25px] p-6">
      <div className="mb-6">
        <h4 className="font-playfair text-lg text-primary-dark">Grafik Performa Finansial</h4>
        <p className="text-[10px] text-secondary-dark/40 uppercase tracking-wider font-semibold">Komparasi Penjualan Sutra & Linen Musim Ini</p>
      </div>
      <div className="h-56 bg-bg-main/30 border border-bg-soft/60 rounded-xl flex items-end justify-between p-4 relative overflow-hidden">
        <div className="w-8 bg-secondary-light/20 border-t-2 border-secondary-light h-[85%] rounded-t-md text-center text-[9px] font-mono py-1 text-secondary-light font-bold">W1</div>
        <div className="w-8 bg-primary-dark/10 border-t-2 border-primary-dark/30 h-[60%] rounded-t-md text-center text-[9px] font-mono py-1">W2</div>
      </div>
    </section>
  );
};

export default MainAnalyticsSection;