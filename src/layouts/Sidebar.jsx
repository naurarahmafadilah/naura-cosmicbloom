import { FaHome, FaTshirt, FaShoppingBag, FaHeart, FaTag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuClass = ({ isActive }) =>
    `group relative flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 font-quicksand text-sm ${
      isActive
        ? "bg-primary-light/10 text-primary-dark font-bold shadow-sm"
        : "text-secondary-dark/60 hover:bg-bg-soft hover:text-primary-dark"
    }`;

  const menus = [
    { name: "Home", path: "/", icon: <FaHome />, end: true },
    { name: "Collection", path: "/collection", icon: <FaTshirt />, badge: "NEW" },
    { name: "Shop", path: "/shop", icon: <FaShoppingBag /> },
    { name: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
    { name: "Pesanan", path: "/orders", icon: <FaShoppingBag /> },
    { name: "Sale", path: "/sale", icon: <FaTag />, badge: "-50%", isSale: true }
  ];

  return (
    <aside className="w-72 bg-white min-h-screen px-6 py-10 flex flex-col justify-between border-r border-bg-soft sticky top-0">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-12 px-2">
          <h1 className="text-3xl font-playfair text-primary-dark tracking-tight">
            Veloura<span className="text-secondary-light">.</span>
          </h1>
          <p className="text-secondary-dark/40 font-quicksand text-[10px] uppercase tracking-[3px] mt-1">
            Fashion Boutique
          </p>
        </div>

        {/* MENU */}
        <nav>
          <ul className="space-y-2">
            {menus.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={menuClass}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-lg transition-transform group-hover:scale-110 ${item.isSale ? 'text-secondary-light' : ''}`}>
                      {item.icon}
                    </span>
                    <span className="tracking-wide">{item.name}</span>
                  </div>

                  {/* BADGE */}
                  {item.badge && (
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm ${
                      item.isSale ? 'bg-secondary-light text-white' : 'bg-primary-dark text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* HOT DEAL CARD */}
        <div className="mt-10 bg-bg-soft/50 border border-bg-soft rounded-[30px] p-5 relative overflow-hidden group transition-all hover:shadow-veloura">
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-secondary-light/10 rounded-full group-hover:scale-150 transition-transform" />
          <p className="text-[10px] font-bold text-secondary-light uppercase tracking-widest mb-2">Hot Deal 🔥</p>
          <p className="text-xs font-playfair text-primary-dark leading-relaxed">
            Dapatkan potongan harga spesial hingga <span className="font-bold text-secondary-dark">50%</span> untuk koleksi musim ini.
          </p>
        </div>
      </div>

      {/* BOTTOM PROMO */}
      <div className="bg-primary-dark rounded-[35px] p-6 text-center shadow-lg relative overflow-hidden">
        {/* Dekoratif */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10" />
        
        <p className="text-white font-playfair text-2xl uppercase tracking-widest mt-1 relative z-10">Koleksi terbaru ✨</p>
        <p className="text-white/70 text-[10px] font-quicksand uppercase tracking-widest mt-2 relative z-10">
          Tampil elegan setiap hari
        </p>

        <NavLink
          to="/collection"
          className="block mt-5 bg-white text-primary-dark font-quicksand font-bold text-xs py-3 rounded-full hover:bg-secondary-light hover:text-white transition-all duration-300 relative z-10"
        >
          LIHAT SEKARANG
        </NavLink>
      </div>

    </aside>
  );
};

export default Sidebar;