import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const AlertNotification = ({ title, message }) => {
  return (
    <div className="bg-white border border-bg-soft rounded-2xl p-5 flex items-start gap-4 font-quicksand">
      <div className="p-3 bg-primary-dark/5 border border-primary-dark/10 rounded-xl text-primary-dark/50 shrink-0">
        <FaExclamationCircle size={16} />
      </div>
      <div className="text-xs">
        <span className="text-[9px] font-bold uppercase tracking-wider text-primary-dark/40 block">Peringatan Sistem</span>
        <h5 className="font-bold text-primary-dark mt-0.5">{title}</h5>
        <p className="text-secondary-dark/60 text-[11px] mt-1 leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default AlertNotification;