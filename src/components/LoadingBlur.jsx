import React from "react";

const LoadingBlur = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 w-full gap-3">
      <div className="w-6 h-6 border-2 border-secondary-light border-t-transparent rounded-full animate-spin"></div>
      <p className="font-playfair text-xs italic text-secondary-dark/40 tracking-widest">Sinkronisasi Atrium Veloura...</p>
    </div>
  );
};

export default LoadingBlur;