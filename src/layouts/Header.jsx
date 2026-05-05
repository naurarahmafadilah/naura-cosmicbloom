import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-bg-soft flex items-center justify-between px-10 py-5 transition-all">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-playfair text-primary-dark tracking-wide cursor-pointer"
        >
          Veloura<span className="text-secondary-light">.</span>
        </h1>

        {/* MENU */}
        <div className="hidden md:flex gap-10 text-sm font-quicksand font-semibold">
          {[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: "Collection", path: "/collection" },
            { name: "Contact", path: "/contact" }
          ].map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `relative transition-colors duration-300 ${
                  isActive ? "text-primary-light" : "text-secondary-dark/60"
                } group`
              }
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-primary-light transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}
        </div>

        {/* ICONS */}
        <div className="flex items-center gap-6 text-primary-dark/70">
          <FaSearch
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-primary-light transition transform hover:scale-110"
          />

          <div className="relative cursor-pointer hover:text-primary-light transition group">
            <FaShoppingBag className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 bg-secondary-light text-white text-[10px] px-1.5 py-0.5 rounded-full font-quicksand">
              2
            </span>
          </div>

          {/* PROFILE */}
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <FaUser
              onClick={() => setProfileOpen(!profileOpen)}
              className="cursor-pointer hover:text-primary-light transition transform hover:scale-110"
            />

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-4 w-52 bg-white border border-bg-soft rounded-2xl shadow-veloura overflow-hidden animate-fade-in">
                {user ? (
                  <>
                    <div className="px-5 py-4 text-xs font-quicksand font-bold text-primary-dark border-b border-bg-soft uppercase tracking-wider">
                      Hai, {user.username || "User"} ✨
                    </div>
                    <button onClick={() => navigate("/orders")} className="w-full text-left px-5 py-3 text-sm font-quicksand hover:bg-bg-main transition-colors">
                      Pesanan Saya
                    </button>
                    <button onClick={handleLogout} className="w-full text-left px-5 py-3 text-sm font-quicksand text-error hover:bg-red-50 transition-colors">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => navigate("/login")} className="w-full text-left px-5 py-3 text-sm font-quicksand hover:bg-bg-main transition-colors">
                      Login
                    </button>
                    <button onClick={() => navigate("/register")} className="w-full text-left px-5 py-3 text-sm font-quicksand hover:bg-bg-main transition-colors">
                      Register
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* MODAL SEARCH */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/20 backdrop-blur-sm p-4" onClick={() => setOpen(false)}>
          <div className="bg-white w-full max-w-md p-8 rounded-[40px] shadow-veloura border border-bg-soft" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-3xl font-playfair text-primary-dark mb-6 text-center">
              Cari Produk<span className="text-secondary-light">.</span>
            </h2>
            <input
              type="text"
              autoFocus
              placeholder="Cari outfit impianmu..."
              className="w-full px-5 py-4 rounded-2xl bg-bg-main border border-transparent focus:border-primary-light outline-none font-quicksand text-sm transition-all"
            />
            <button
              onClick={() => setOpen(false)}
              className="mt-6 w-full bg-primary-light text-white py-3.5 rounded-full font-quicksand font-bold text-sm hover:bg-primary-dark transition-all shadow-md"
            >
              Cari Sekarang
            </button>
            <p className="text-center text-secondary-dark/50 text-xs font-accent text-xl mt-6">
              Temukan gaya terbaikmu
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;