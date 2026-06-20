import React, { useState } from "react";
import { FiShoppingBag, FiLayers, FiScissors, FiPackage, FiCheckCircle, FiX, FiInfo, FiClock } from "react-icons/fi";
import HeaderMember from "../layouts/HeaderMember"; // Memastikan Header terintegrasi
import FooterMember from "../layouts/FooterMember"; // Import Footer terintegrasi

const LacakPesanan = () => {
  // State untuk melacak produk mana yang sedang dilihat detail alurnya
  const [selectedTracking, setSelectedTracking] = useState(null);

  const transactions = [
    { 
      id: "VLR-88291", 
      item: "Amour Silk Evening Gown", 
      type: "Custom Tailored Haute Couture", 
      date: "24 Juni 2026", 
      status: "Sedang di-Alterasi", 
      price: "Rp 7.500.000", 
      progress: 75,
      timeline: [
        { step: "Pola Kain", status: "Completed", date: "24 Juni 2026", note: "Pemotongan pola sutra Mulberry menggunakan cetakan fitting personal garmen Anda telah selesai dilakukan oleh Master Tailor." },
        { step: "Penjahitan", status: "Completed", date: "25 Juni 2026", note: "Penjahitan struktur utama dan pemasangan furing dalam selesai. Benang sutra khusus digunakan untuk kekuatan optimal." },
        { step: "Fitting/Alterasi", status: "In Progress", date: "26 Juni 2026", note: "Sedang dalam tahap penyesuaian detail halus keliman bagian bawah gaun pasca sesi private trunk show kemarin." },
        { step: "Selesai", status: "Pending", date: "-", note: "Garmen akan melewati 3 tahap QC akhir dan sterilisasi kain sebelum dikemas ke dalam kotak premium." }
      ]
    },
    { 
      id: "VLR-87102", 
      item: "Elysian Linen Blazer Blouse", 
      type: "Ready-to-Wear Premium", 
      date: "12 Juni 2026", 
      status: "Selesai & Diserahkan", 
      price: "Rp 3.200.000", 
      progress: 100,
      timeline: [
        { step: "Pola Kain", status: "Completed", date: "12 Juni 2026", note: "Kain kempa rami organik dipotong sesuai standar ukuran pola eksklusif Veloura." },
        { step: "Penjahitan", status: "Completed", date: "13 Juni 2026", note: "Proses penjahitan struktur luar, saku dalam, serta pemasangan kancing cangkang kerang premium." },
        { step: "Fitting/Alterasi", status: "Completed", date: "14 Juni 2026", note: "Penyetrikaan uap garmen (steaming) skala atelier untuk mempertahankan rigiditas bentuk blazer." },
        { step: "Selesai", status: "Completed", date: "15 Juni 2026", note: "Garmen lolos kendali mutu penuh dan telah diserahkan langsung ke alamat perwakilan VIP member." }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#faf9f5] relative flex flex-col">
      {/* 1. HEADER MEMBER EXCLUSIVE */}
      <HeaderMember cartCount={0} wishlistCount={2} />

      {/* 2. KONTEN UTAMA TRACKING (DIBERIKAN flex-grow) */}
      <div className="flex-grow max-w-7xl mx-auto px-6 sm:px-10 py-10 font-quicksand w-full">
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#e6e4dd] shadow-xs space-y-8">
          
          {/* HEADER ARSIP */}
          <div className="flex items-center justify-between border-b border-[#e6e4dd] pb-6">
            <div>
              <h3 className="text-xl font-normal text-[#2c3218] uppercase tracking-wide font-playfair">Arsip & Pemantauan Garmen</h3>
              <p className="text-xs text-stone-400 mt-1">Lacak visual kemajuan pemotongan pola kain, pemesanan kancing, hingga penjahitan detail halus.</p>
            </div>
            <div className="p-3 bg-[#faf9f5] rounded-xl border border-[#e6e4dd] text-[#2c3218]">
              <FiShoppingBag size={20} />
            </div>
          </div>

          {/* INTERACTIVE TRACKING CARDS */}
          <div className="space-y-8">
            {transactions.map((tx) => (
              <div 
                key={tx.id} 
                onClick={() => setSelectedTracking(tx)}
                className="border border-[#e6e4dd] rounded-2xl p-6 bg-[#fcfbf9] space-y-8 hover:border-stone-400 hover:shadow-md transition-all duration-300 relative overflow-hidden cursor-pointer group"
              >
                
                {/* Top Row: Meta & Info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-200/60 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase">{tx.id} • {tx.date}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${tx.progress < 100 ? 'bg-[#c97d7d]/10 text-[#c97d7d]' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                        {tx.status}
                      </span>
                    </div>
                    <h4 className="text-base font-normal font-playfair text-[#2c3218] mt-1 group-hover:text-[#c97d7d] transition-colors">{tx.item}</h4>
                    <p className="text-xs text-stone-500 font-light">{tx.type}</p>
                  </div>
                  <div className="text-left sm:text-right flex flex-col sm:items-end">
                    <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Nilai Garmen</span>
                    <span className="text-lg font-bold text-[#2c3218] font-quicksand">{tx.price}</span>
                    <span className="text-[11px] text-[#c97d7d] font-semibold mt-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <FiInfo size={12} /> Klik untuk Detail Log
                    </span>
                  </div>
                </div>

                {/* STAGES VISUALIZER CONNECTED PROGRESS */}
                <div className="relative pt-2 pb-4">
                  {/* Background Line Connector */}
                  <div className="absolute top-[22px] left-[12.5%] right-[12.5%] h-[2px] bg-[#e6e4dd] z-0">
                    <div 
                      className="h-full bg-[#3a3f24] transition-all duration-700" 
                      style={{ width: tx.progress === 100 ? "100%" : tx.progress === 75 ? "66.6%" : tx.progress === 50 ? "33.3%" : "0%" }}
                    ></div>
                  </div>

                  {/* Steps Nodes */}
                  <div className="grid grid-cols-4 gap-2 relative z-10">
                    {[
                      { title: "Pola Kain", icon: <FiLayers />, threshold: 25 },
                      { title: "Penjahitan", icon: <FiScissors />, threshold: 50 },
                      { title: "Fitting/Alterasi", icon: <FiPackage />, threshold: 75 },
                      { title: "Selesai", icon: <FiCheckCircle />, threshold: 100 }
                    ].map((step, idx) => {
                      const isDone = tx.progress >= step.threshold;
                      const isCurrent = tx.progress === step.threshold;

                      return (
                        <div key={idx} className="text-center space-y-3">
                          <div className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center text-base border transition-all duration-500 relative ${
                            isDone 
                              ? 'bg-[#3a3f24] text-white border-transparent shadow-md scale-105' 
                              : 'bg-white text-stone-400 border-[#e6e4dd]'
                          } ${isCurrent ? 'ring-4 ring-[#3a3f24]/10 border-[#3a3f24]' : ''}`}>
                            {step.icon}
                            
                            {isCurrent && (
                              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c97d7d] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c97d7d]"></span>
                              </span>
                            )}
                          </div>
                          <span className={`text-[10px] font-bold block uppercase tracking-wide transition-colors duration-300 ${isDone ? 'text-[#2c3218]' : 'text-stone-400'}`}>
                            {step.title}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. FOOTER MEMBER UTAMA */}
      <FooterMember />

      {/* 4. MODAL DETAIL ALUR LOG PROSES TAILOR */}
      {selectedTracking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="bg-[#faf9f5] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-[#e6e4dd] flex flex-col relative max-h-[90vh]">
            
            {/* Header Modal */}
            <div className="p-6 border-b border-[#e6e4dd] bg-white flex justify-between items-center">
              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">{selectedTracking.id} • Log Kemajuan Rumah Mode</span>
                <h3 className="text-xl font-normal font-playfair text-[#2c3218] mt-0.5">{selectedTracking.item}</h3>
              </div>
              <button 
                onClick={() => setSelectedTracking(null)}
                className="p-2 bg-[#faf9f5] hover:bg-stone-100 rounded-full text-stone-700 transition"
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Body Modal: Vertical Timeline */}
            <div className="p-6 overflow-y-auto space-y-6 bg-[#faf9f5] flex-grow">
              {selectedTracking.timeline.map((log, index) => (
                <div key={index} className="flex gap-4 items-start relative">
                  
                  {/* Vertical Line Connector */}
                  {index !== selectedTracking.timeline.length - 1 && (
                    <div className="absolute left-[18px] top-9 bottom-0 w-[1.5px] bg-[#e6e4dd]"></div>
                  )}

                  {/* Indicator Node Status */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border text-xs ${
                    log.status === "Completed" ? "bg-[#3a3f24] text-white border-transparent" :
                    log.status === "In Progress" ? "bg-white text-[#c97d7d] border-[#c97d7d] ring-4 ring-[#c97d7d]/10" :
                    "bg-stone-100 text-stone-400 border-stone-200"
                  }`}>
                    {log.status === "Completed" ? <FiCheckCircle size={14} /> : <FiClock size={14} />}
                  </div>

                  {/* Log Content Specification */}
                  <div className="space-y-1 bg-white p-4 rounded-2xl border border-[#e6e4dd] flex-1 shadow-xs">
                    <div className="flex justify-between items-center">
                      <h5 className={`text-xs font-bold uppercase tracking-wider ${log.status === "Pending" ? "text-stone-400" : "text-[#2c3218]"}`}>
                        {log.step}
                      </h5>
                      <span className="text-[10px] text-stone-400 font-light">{log.date}</span>
                    </div>
                    <p className={`text-xs leading-relaxed font-light ${log.status === "Pending" ? "text-stone-400/80 italic" : "text-stone-600"}`}>
                      {log.note}
                    </p>
                  </div>

                </div>
              ))}
            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t border-[#e6e4dd] bg-white text-center">
              <button 
                onClick={() => setSelectedTracking(null)}
                className="bg-[#3a3f24] hover:bg-[#2c3218] text-white text-xs font-bold py-3 px-8 rounded-xl transition shadow-md w-full sm:w-auto"
              >
                Tutup Dokumen Pemantauan
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LacakPesanan;