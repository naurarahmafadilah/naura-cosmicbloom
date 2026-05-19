import React from "react";

const Button = ({ children, variant = "primary", onClick, disabled, className = "" }) => {
  const baseStyles = "px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 font-quicksand text-center";
  const variants = {
    primary: "bg-primary-dark text-white hover:bg-primary-light disabled:bg-bg-soft disabled:text-secondary-dark/30",
    secondary: "bg-white border border-bg-soft text-primary-dark hover:border-secondary-light",
    accent: "bg-secondary-light text-white hover:bg-secondary-dark",
  };

  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;