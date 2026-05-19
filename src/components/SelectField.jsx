import React from "react";

const SelectField = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5 w-full font-quicksand">
      <label className="text-[10px] font-bold uppercase tracking-wider text-secondary-dark/50">{label}</label>
      <select 
        value={value} 
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-bg-soft rounded-xl text-xs font-bold uppercase tracking-wider text-primary-dark focus:outline-none focus:border-secondary-light transition-colors cursor-pointer appearance-none"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;