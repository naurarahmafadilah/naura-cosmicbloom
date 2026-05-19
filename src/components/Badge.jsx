import React from "react";

const Badge = ({ type = "default", children }) => {
  const styles = {
    default: "bg-bg-main text-secondary-dark/40 border-bg-soft",
    success: "bg-secondary-light/5 text-secondary-light border-secondary-light/20",
    warning: "bg-amber-500/5 text-amber-600 border-amber-500/20",
    danger: "bg-primary-dark/5 text-primary-dark/50 border-primary-dark/10 line-through"
  };

  return (
    <span className={`px-2.5 py-1 rounded-lg border text-[9px] font-mono font-bold uppercase tracking-wider ${styles[type]}`}>
      {children}
    </span>
  );
};

export default Badge;