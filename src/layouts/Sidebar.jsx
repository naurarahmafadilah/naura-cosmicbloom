import { FaHome, FaTshirt, FaShoppingBag, FaHeart, FaTag, FaBoxOpen, FaCrown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuClass = ({ isActive }) =>
    `group relative flex items-center justify-between px-6 py-4 rounded-[22px] transition-all duration-500 font-quicksand text-sm tracking-wide ${
      isActive
        ? "bg-primary-dark text-white shadow-2xl shadow-primary-dark/30 scale-[1.02]"
        : "text-secondary-dark/40 hover:bg-bg-soft hover:text-primary-dark hover:translate-x-1"
    }`;

  const menus = [
    { name: "Beranda", path: "/", icon: <FaHome />, end: true },
    { name: "Koleksi", path: "/collection", icon: <FaCrown />, badge: "NEW" },
    { name: "Katalog", path: "/shop", icon: <FaTshirt /> },
    { name: "Favorit", path: "/wishlist", icon: <FaHeart /> },
    { name: "Pesanan", path: "/orders", icon: <FaBoxOpen /> },
    { name: "Sale", path: "/sale", icon: <FaTag />, badge: "50%", isSale: true }
  ];

  return (
    <aside className="w-80 bg-white h-screen px-8 py-12 flex flex-col border-r border-bg-soft sticky top-0 overflow-hidden">
      
      {/* 1. BRANDING (Dibuat lebih Bold & Minimalis) */}
      <div className="mb-16">
        <h1 className="text-4xl font-playfair text-primary-dark tracking-tighter leading-none">
          Veloura<span className="text-secondary-light">.</span>
        </h1>
        <p className="text-secondary-dark/30 font-quicksand text-[9px] uppercase tracking-[5px] mt-3 font-bold">
          The Art of Dressing
        </p>
      </div>

      {/* 2. NAVIGATION (Satu aliran, tanpa scrollbar terpisah) */}
      <div className="flex-1 space-y-12">
        <nav>
          <p className="text-[10px] font-bold text-secondary-dark/20 uppercase tracking-[4px] mb-8 px-2">Essential Menu</p>
          <ul className="space-y-3">
            {menus.map((item, i) => (
              <li key={i}>
                <NavLink to={item.path} end={item.end} className={menuClass}>
                  <div className="flex items-center gap-4">
                    <span className={`text-base transition-all duration-500 group-hover:rotate-6 ${item.isSale ? 'text-secondary-light' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[8px] px-2.5 py-1 rounded-lg font-black tracking-tighter shadow-sm transition-all duration-500 ${
                      item.isSale 
                        ? 'bg-secondary-light text-white group-hover:bg-white group-hover:text-secondary-light' 
                        : 'bg-primary-dark/5 text-primary-dark group-hover:bg-white/20 group-hover:text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* ELEGANT TAGLINE (Pengganti Hot Deal yang kaku) */}
        <div className="px-2">
          <div className="border-l-2 border-secondary-light/30 pl-4 py-1">
            <p className="text-[11px] font-playfair text-primary-dark italic leading-relaxed">
              "Fashion is the armor to survive the reality of everyday life."
            </p>
            <p className="text-[9px] font-quicksand text-secondary-dark/30 uppercase tracking-widest mt-2">— Bill Cunningham</p>
          </div>
        </div>
      </div>

      {/* 3. PROMO CARD (Pro & Luxury Look) */}
      <div className="mt-auto pt-8">
        <div className="bg-[#1A1A1A] rounded-[40px] p-8 text-left shadow-2xl relative overflow-hidden group">
          {/* Subtle Glow Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-light/10 blur-[50px] rounded-full transition-transform duration-[2s] group-hover:scale-150" />
          
          <div className="relative z-10">
            <h4 className="text-white font-playfair text-2xl leading-tight">Spring<br />Edition 2026</h4>
            <p className="text-white/40 text-[9px] font-quicksand uppercase tracking-[3px] mt-3">Ready to Wear</p>
            
            <NavLink
              to="/collection"
              className="flex items-center justify-center gap-2 mt-8 bg-white text-primary-dark font-bold text-[10px] py-4 rounded-[20px] hover:bg-secondary-light hover:text-white transition-all duration-500 shadow-xl active:scale-95"
            >
              LIHAT KOLEKSI
            </NavLink>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;