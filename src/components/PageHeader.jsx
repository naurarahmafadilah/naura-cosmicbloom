import React from "react";

const PageHeader = ({ title, breadcrumbs = [] }) => {
  return (
    <div className="mb-6 pt-2 font-quicksand">
      {/* 1. Judul Utama dengan Font Serif */}
      <h1 className="text-2xl sm:text-3xl font-playfair tracking-wide text-[#4E5631] font-medium">
        {title}
      </h1>
      
      {/* 2. Aksen Garis Marun/Terakota Khas Veloura */}
      <div className="w-16 h-[3px] bg-[#9A6060] mt-2.5 rounded-full" />
      
      {/* 3. Breadcrumbs Dinamis di Bawah Garis */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-1.5 text-[12px] sm:text-[13px] text-slate-400 mt-4 font-medium tracking-wide">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span className="text-slate-300 font-light">/</span>}
              <span 
                className={`
                  ${index === breadcrumbs.length - 1 
                    ? "text-[#4E5631] font-semibold" 
                    : "text-slate-400 hover:text-[#8C6239] transition-colors"
                  }
                `}
              >
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;