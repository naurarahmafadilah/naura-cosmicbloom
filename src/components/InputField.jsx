import React from "react";

const InputField = ({ label, type = "text", placeholder, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full font-quicksand">
      <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-dark/50">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-3 bg-bg-main border border-bg-soft rounded-xl text-xs font-medium text-primary-dark focus:outline-none focus:border-secondary-light transition-colors"
      />
    </div>
  );
};

export default InputField;