import React from "react";

const ReviewHighlight = ({ customer, review, rating = 5 }) => {
  return (
    <div className="bg-white border border-bg-soft rounded-2xl p-5 flex flex-col justify-between font-quicksand">
      <div className="text-xs">
        <span className="text-[9px] font-bold uppercase tracking-wider text-secondary-dark/40 block">Feedback Keaslian</span>
        <p className="italic font-playfair text-primary-dark mt-1.5 text-sm leading-snug">"{review}"</p>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] border-t border-bg-soft/40 pt-2.5">
        <span className="font-bold text-primary-dark">{customer}</span>
        <span className="text-amber-500 font-mono">{"★".repeat(rating)}</span>
      </div>
    </div>
  );
};

export default ReviewHighlight;