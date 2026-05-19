import React from "react";
import { FiStar } from "react-icons/fi";

const ReviewHighlightCard = ({ reviewer, review }) => {
  return (
    <section className="bg-gradient-to-br from-white via-white to-amber-50/20 p-6 rounded-3xl border border-slate-100 shadow-sm transform transition-all duration-500 hover:shadow-[0_25px_50px_rgba(212,163,89,0.06)] hover:border-amber-500/20 cursor-pointer group relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-200/10 rounded-full blur-2xl group-hover:bg-amber-200/20 transition-all duration-500" />
      
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} fill="currentColor" size={11} className="drop-shadow-[0_2px_4px_rgba(212,163,89,0.2)]" />
          ))}
        </div>
        <span className="text-[8px] font-extrabold font-quicksand text-amber-600 bg-amber-50 border border-amber-100/60 px-2 py-0.5 rounded-md uppercase tracking-wider">VIP Member</span>
      </div>
      
      <p className="text-xs italic text-slate-600 font-quicksand leading-relaxed relative z-10 group-hover:text-slate-800 transition-colors">
        "{review}"
      </p>
      
      <div className="mt-4 border-t border-slate-100/80 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-secondary-light" />
          <span className="text-[10px] font-bold text-primary-dark font-quicksand tracking-wider uppercase">{reviewer}</span>
        </div>
        <span className="text-[9px] font-medium text-slate-400 font-quicksand">Terverifikasi</span>
      </div>
    </section>
  );
};

export default ReviewHighlightCard;