import { FaHome, FaTshirt, FaShoppingBag, FaHeart, FaTag } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuClass = ({ isActive }) =>
    `group relative flex items-center justify-between px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-primary/10 text-primary font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[3px] before:bg-primary before:rounded-r-full"
        : "text-teks-soft hover:bg-[#f8f2ec] hover:text-primary"
    }`;

  const menus = [
    { name: "Home", path: "/", icon: <FaHome />, end: true },
    { name: "Collection", path: "/collection", icon: <FaTshirt />, badge: "NEW" },
    { name: "Shop", path: "/shop", icon: <FaShoppingBag /> },
    { name: "Wishlist", path: "/wishlist", icon: <FaHeart /> },
    { name: "Pesanan", path: "/orders", icon: <FaShoppingBag /> },
    { name: "Sale", path: "/sale", icon: <FaTag />, badge: "-50%" }
  ];

  return (
    <div className="w-64 bg-white min-h-screen px-6 py-8 flex flex-col justify-between border-r border-[#f1e5db]">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-10">
          <h1 className="text-3xl font-[var(--font-playfair)] text-teks">
            Veloura<span className="text-primary">.</span>
          </h1>
          <p className="text-teks-soft text-sm mt-1">
            Fashion Boutique
          </p>
        </div>

        {/* MENU */}
        <ul className="space-y-1">

          {menus.map((item, i) => (
            <li key={i}>
              <NavLink
                to={item.path}
                end={item.end}
                className={menuClass}
              >
                <div className="flex items-center justify-between w-full">

                  {/* LEFT */}
                  <div className="flex items-center gap-3">
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </div>

                  {/* BADGE */}
                  {item.badge && (
                    <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}

                </div>
              </NavLink>
            </li>
          ))}

        </ul>

        {/* HOT DEAL */}
        <div className="mt-8 bg-white border border-[#f1e5db] rounded-xl p-4 shadow-sm hover:shadow-md transition">
          <p className="text-xs text-teks-soft mb-1">Hot Deal 🔥</p>
          <p className="text-sm font-medium text-teks leading-relaxed">
            Diskon hingga 50% untuk koleksi pilihan
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="bg-[#f6efe9] p-5 rounded-2xl">

        <p className="text-sm text-teks-soft leading-relaxed">
          Koleksi terbaru sudah hadir ✨
        </p>

        <NavLink
          to="/collection"
          className="block mt-4 bg-primary text-white text-center py-2 rounded-full text-sm hover:opacity-90 hover:scale-[1.02] transition"
        >
          Jelajahi Sekarang
        </NavLink>

      </div>

    </div>
  );
};

export default Sidebar;