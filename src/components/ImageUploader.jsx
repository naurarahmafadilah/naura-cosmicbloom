import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUploader = ({ label }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full font-quicksand">
      <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-dark/50">{label}</label>
      <div className="w-full border-2 border-dashed border-bg-soft rounded-2xl p-6 bg-white flex flex-col items-center justify-center text-center cursor-pointer hover:border-secondary-light transition-colors">
        <FaCloudUploadAlt className="text-secondary-dark/30 text-2xl mb-2" />
        <span className="text-xs font-bold text-primary-dark">Pilih Berkas Foto</span>
        <span className="text-[10px] text-secondary-dark/40 mt-0.5">Rekomendasi rasio portrait premium (4:5)</span>
      </div>
    </div>
  );
};

export default ImageUploader;