import React from "react";

const Avatar = ({ name = "Veloura Staff", role = "Admin" }) => {
  const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="flex items-center gap-3 font-quicksand">
      <div className="text-right hidden sm:block">
        <p className="text-xs font-bold text-primary-dark">{name}</p>
        <p className="text-[10px] text-secondary-dark/40 font-mono">{role}</p>
      </div>
      <div className="w-10 h-10 rounded-xl bg-primary-dark text-white font-playfair font-bold flex items-center justify-center text-sm border border-bg-soft">
        {initials}
      </div>
    </div>
  );
};

export default Avatar;