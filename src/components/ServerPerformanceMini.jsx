import React from "react";
import { FiCpu, FiHardDrive } from "react-icons/fi";

const ServerPerformanceMini = ({ status, speed }) => {
  return (
    <div className="bg-slate-50 border border-slate-100/80 p-4 rounded-2xl flex items-center justify-between text-slate-500 font-quicksand text-[11px] transition-all duration-300 hover:bg-white hover:shadow-sm hover:border-slate-200">
      <div className="flex items-center gap-2.5">
        <div className="w-5 h-5 rounded-md bg-white border border-slate-200 flex items-center justify-center shadow-inner">
          <FiCpu size={11} className="text-secondary-light animate-spin [animation-duration:12s]" />
        </div>
        <span>Sync Engine: <strong className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md text-[10px]">{status}</strong></span>
      </div>
      <div className="flex items-center gap-1.5 text-slate-400 font-medium">
        <FiHardDrive size={11} />
        <span>Respon Latensi: <strong className="text-slate-700 font-mono text-[10px] bg-slate-100/80 px-1.5 py-0.5 rounded-md">{speed}</strong></span>
      </div>
    </div>
  );
};

export default ServerPerformanceMini;