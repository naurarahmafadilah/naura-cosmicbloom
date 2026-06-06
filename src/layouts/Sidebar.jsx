import React from "react";
import { NavLink } from "react-router-dom";
import { 
  FaHome, 
  FaCrown, 
  FaTshirt, 
  FaHeart, 
  FaBoxOpen, 
  FaTag,
  FaIdCard 
} from "react-icons/fa";
import { 
  FiUsers, 
  FiTrendingUp, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut,
  FiPackage,    
  FiTruck,      
  FiShoppingBag 
} from "react-icons/fi";

const Sidebar = () => {
  // Utility class menu utama
  const menuClass = ({ isActive }) =>
    `group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 font-quicksand text-xs tracking-wide select-none ${
      isActive
        ? "bg-primary-dark text-white shadow-md shadow-primary-dark/10 font-bold"
        : "text-primary-dark/70 hover:bg-bg-soft hover:text-primary-dark"
    }`;

  const adminSections = [
    {
      title: "Utama",
      items: [
        { name: "Beranda", path: "/", icon: <FaHome />, end: true }
      ]
    },
    {
      title: "CRM & Pemasaran",
      items: [
        { name: "Customer CRM", path: "/customer-crm", icon: <FiUsers /> },
        { name: "Membership", path: "/membership", icon: <FaIdCard />, badge: "LOYAL" }, 
        { name: "Campaign Promo", path: "/campaign", icon: <FiTrendingUp />, badge: "NEW" },
        { name: "Feedback & Komplain", path: "/feedback", icon: <FiMessageSquare /> },
        { name: "Program Sale", path: "/sale", icon: <FaTag />, badge: "50%", isSale: true }
      ]
    },
    {
      title: "Stok & Produk",
      items: [
        { name: "Koleksi VIP", path: "/collection", icon: <FaCrown />, badge: "VIP" },
        { name: "Katalog Baju", path: "/shop", icon: <FaTshirt /> },
        { name: "Stok Gudang", path: "/inventory", icon: <FiPackage /> },
        { name: "Data Supplier", path: "/suppliers", icon: <FiTruck /> }
      ]
    },
    {
      title: "Transaksi Toko",
      items: [
        { name: "Pesanan Masuk", path: "/orders", icon: <FaBoxOpen />, badge: "12", isAlert: true },
        { name: "Riwayat Kasir", path: "/sales-history", icon: <FiShoppingBag /> },
        { name: "Favorit", path: "/wishlist", icon: <FaHeart /> }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-white h-screen px-4 py-6 flex flex-col border-r border-border-subtle sticky top-0 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shrink-0">
      
      {/* 1. BRANDING HEADER */}
      <div className="mb-6 px-2 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary-dark flex items-center justify-center text-white font-bold text-xs font-quicksand">
          V
        </div>
        <div>
          <h1 className="text-base font-bold text-primary-dark tracking-tight font-playfair leading-none">
            Veloura<span className="text-secondary-light">.</span>
          </h1>
          <p className="text-[9px] text-primary-dark/50 font-quicksand uppercase tracking-[2px] mt-1 font-bold">Boutique Admin</p>
        </div>
      </div>

      {/* 2. NAVIGATION SECTIONS */}
      <div className="flex-1 space-y-5">
        {adminSections.map((section, index) => (
          <nav key={index} className="space-y-1">
            <p className="text-[9px] font-bold text-primary-dark/40 uppercase tracking-[3px] px-2 mb-1.5 font-quicksand">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item, i) => (
                <li key={i}>
                  <NavLink to={item.path} end={item.end} className={menuClass}>
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-3">
                          <span className={`text-sm shrink-0 transition-colors ${
                            isActive 
                              ? 'text-white' 
                              : item.isSale 
                                ? 'text-secondary-light group-hover:text-primary-dark' 
                                : 'text-primary-dark/50 group-hover:text-primary-dark'
                          }`}>
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[8px] px-1.5 py-0.5 rounded-md font-bold tracking-tight font-quicksand ${
                            item.isAlert 
                              ? isActive ? 'bg-white text-secondary-light font-black' : 'bg-secondary-light text-white' 
                              : item.isSale
                                ? isActive ? 'bg-white text-secondary-light font-black' : 'bg-secondary-light/10 text-secondary-light group-hover:bg-primary-dark/5'
                                : isActive ? 'bg-white/20 text-white' : 'bg-primary-dark/5 text-primary-dark group-hover:bg-primary-dark/10'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* 3. UTILITY FOOTER */}
      <div className="mt-auto pt-4 border-t border-border-subtle space-y-0.5">
        <NavLink to="/settings" className={menuClass}>
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-3">
                <FiSettings className={`text-sm ${isActive ? 'text-white' : 'text-primary-dark/50 group-hover:text-primary-dark'}`} />
                <span>Pengaturan</span>
              </div>
            </>
          )}
        </NavLink>
        
        <button 
          onClick={() => alert("Keluar sistem...")} 
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide text-secondary-light hover:bg-bg-soft hover:text-secondary-dark transition-all duration-300 text-left font-quicksand cursor-pointer"
        >
          <FiLogOut className="text-sm shrink-0" />
          <span>Keluar Portal</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;