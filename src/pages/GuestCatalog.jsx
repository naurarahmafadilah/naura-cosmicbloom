import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ==========================================
// IMPORT KOMPONEN SISTEM USER
// ==========================================
import GuestNavbar from "../components/GuestNavbar";
import CategoryFilter from "../components/CategoryFilter";
import GuestProductCard from "../components/GuestProductCard";
import CartDrawer from "../components/CartDrawer";

import { FiLayers } from "react-icons/fi";

// Mock Data awal produk (Otomatis tersinkron jika Anda menggunakan Supabase)
const defaultProductsMock = [
  { id: 1024, name: "Elegant Atelier Dress", price: "250.000", category: "Dress", img: "https://plus.unsplash.com/premium_photo-1728657358050-58356d4a6c64?q=80&w=1170&auto=format&fit=crop", rating: 4.9 },
  { id: 1025, name: "Casual Earth Outfit", price: "180.000", category: "Casual", img: "https://plus.unsplash.com/premium_photo-1689575247968-d1040651e57f?q=80&w=1170&auto=format&fit=crop", rating: 4.7 },
  { id: 1026, name: "Summer Breeze Dress", price: "300.000", category: "Dress", img: "https://plus.unsplash.com/premium_photo-1727427850453-144b335cd995?q=80&w=687&auto=format&fit=crop", rating: 4.8 },
  { id: 1027, name: "Modern Blazer Look", price: "270.000", category: "Formal", img: "https://plus.unsplash.com/premium_photo-1755958632983-adbc0ff3b41b?q=80&w=1170&auto=format&fit=crop", rating: 5.0 }
];

export default function GuestCatalog() {
  const navigate = useNavigate();

  // State Utama Katalog
  const [products, setProducts] = useState(defaultProductsMock);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");

  // State Manajemen Keranjang (Cart)
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load data keranjang dari localStorage saat halaman pertama kali dibuka
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // Hitung total quantity barang untuk badge di Navbar
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cartItems]);

  // ==========================================
  // LOGIKA FILTER & SORTING (REAL-TIME)
  // ==========================================
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "low-high") {
      result.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, ""), 10) - parseInt(b.price.replace(/[^0-9]/g, ""), 10));
    } else if (sortBy === "high-low") {
      result.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, ""), 10) - parseInt(a.price.replace(/[^0-9]/g, ""), 10));
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // ==========================================
  // FUNGSI AKSI KERANJANG BELANJA
  // ==========================================
  const handleAddToCart = (product) => {
    const defaultSize = "M"; // Default size jika ditekan langsung dari katalog
    let updatedCart = [...cartItems];

    const existingIndex = updatedCart.findIndex(
      (item) => item.id === product.id && item.selectedSize === defaultSize
    );

    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += 1;
    } else {
      updatedCart.push({ ...product, selectedSize: defaultSize, quantity: 1 });
    }

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setIsCartOpen(true); // Auto-open drawer agar user melihat barang masuk
  };

  const handleUpdateQuantity = (id, size, newQty) => {
    if (newQty < 1) return;
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.selectedSize === size ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id, size) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.selectedSize === size)
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleGoToCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-800 flex flex-col justify-between selection:bg-[#4E5631]/10">
      
      {/* 1. GLOBAL NAVBAR USER */}
      <GuestNavbar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* 2. HERO HEADER BRANDING */}
      <header className="max-w-7xl mx-auto w-full pt-10 px-4 sm:px-6 lg:px-8 text-center space-y-3 font-quicksand">
        <span className="text-[10px] font-bold text-[#A47174] uppercase tracking-widest block">
          Koleksi Terbatas Esensial
        </span>
        <h1 className="text-3xl sm:text-4xl font-playfair tracking-wide text-[#4E5631] max-w-xl mx-auto font-bold">
          Sentuhan Elegan untuk Kenyamanan Setiap Hari
        </h1>
        <div className="h-[2px] w-12 bg-[#A47174] mx-auto mt-2"></div>
      </header>

      {/* 3. CORE CONTROL & PRODUCT CATALOG */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-1 py-8 space-y-6">
        
        {/* Filter Bar */}
        <CategoryFilter 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Product Grid Display */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl shadow-3xs space-y-2 font-quicksand">
            <FiLayers size={24} className="mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-500">Produk tidak ditemukan.</p>
            <p className="text-xs text-slate-400">Cobalah kata kunci lain atau ubah setelan filter Anda.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <GuestProductCard 
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onProductClick={handleProductClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* 4. OVERLAY CART DRAWER */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleGoToCheckout}
      />

      {/* 5. MINIMALIST FOOTER */}
      <footer className="bg-white border-t border-slate-200/40 py-6 mt-16 text-center font-quicksand text-[11px] text-slate-400 font-medium tracking-wide">
        &copy; {new Date().getFullYear()} VELOURA Atelier. All Rights Reserved. Designed for Premium Comfort.
      </footer>

    </div>
  );
}