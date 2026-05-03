import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // ambil user dari localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // auto close dropdown kalau klik luar
  useEffect(() => {
    const handleClickOutside = () => setProfileOpen(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#f1e5db] flex items-center justify-between px-10 py-5">

        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-3xl font-[var(--font-playfair)] text-teks tracking-wide cursor-pointer"
        >
          Veloura<span className="text-primary">.</span>
        </h1>

        {/* MENU */}
        <div className="hidden md:flex gap-10 text-sm font-medium">

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
                `relative transition ${
                  isActive ? "text-primary" : "text-teks-soft"
                } group`
              }
            >
              {item.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </NavLink>
          ))}

        </div>

        {/* ICON */}
        <div className="flex items-center gap-6 text-teks-soft">

          {/* SEARCH */}
          <FaSearch
            onClick={() => setOpen(true)}
            className="cursor-pointer hover:text-primary transition hover:scale-110"
          />

          {/* CART */}
          <div className="relative cursor-pointer hover:text-primary transition">
            <FaShoppingBag />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] px-1.5 rounded-full">
              2
            </span>
          </div>

          {/* PROFILE */}
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // biar ga ketutup saat klik dalam
          >
            <FaUser
              onClick={() => setProfileOpen(!profileOpen)}
              className="cursor-pointer hover:text-primary transition hover:scale-110"
            />

            {/* DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white border border-[#f1e5db] rounded-2xl shadow-md overflow-hidden">

                {user ? (
                  <>
                    <div className="px-4 py-3 text-sm text-teks border-b border-[#f1e5db]">
                      Hai, {user.email || user.username || "User"} 👋
                    </div>

                    <button
                      onClick={() => navigate("/orders")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#f6efe9]"
                    >
                      Pesanan Saya
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigate("/login")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#f6efe9]"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => navigate("/register")}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-[#f6efe9]"
                    >
                      Register
                    </button>
                  </>
                )}

              </div>
            )}
          </div>

        </div>

      </div>

      {/* MODAL SEARCH */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-[420px] p-7 rounded-3xl shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >

            <h2 className="text-2xl font-[var(--font-playfair)] text-teks mb-5">
              Cari Produk
            </h2>

            <input
              type="text"
              placeholder="Cari outfit impianmu..."
              className="w-full px-4 py-3 rounded-xl bg-[#f6efe9] outline-none focus:ring-2 focus:ring-primary text-sm"
            />

            <button
              onClick={() => setOpen(false)}
              className="mt-5 w-full bg-primary text-white py-3 rounded-full text-sm hover:opacity-90 transition"
            >
              Tutup
            </button>

            <p className="text-center text-teks-soft text-xs mt-3">
              Temukan gaya terbaikmu ✨
            </p>

          </div>
        </div>
      )}
    </>
  );
};

export default Header;