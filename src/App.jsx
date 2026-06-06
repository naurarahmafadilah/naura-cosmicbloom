import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading"; 

// MAIN PAGES (LAZY)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const DashboardGuest = lazy(() => import("./pages/GuestDashboard")); 

const Shop = lazy(() => import("./pages/Shop"));
const ShopDetail = lazy(() => import("./pages/ShopDetail"));
const Collection = lazy(() => import("./pages/Collection"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrdersDetail"));
const Sale = lazy(() => import("./pages/Sale"));
const SaleDetail = lazy(() => import("./pages/SaleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const WishlistDetail = lazy(() => import("./pages/WishlistDetail"));

// MANAGEMENT & CRM PAGES (LAZY IMPORT)
const CustomerCRM = lazy(() => import("./pages/CustomerCRM"));
const Membership = lazy(() => import("./pages/Membership")); 
const CampaignPromo = lazy(() => import("./pages/CampaignPromo"));
const FeedbackManagement = lazy(() => import("./pages/FeedbackManagement")); // 🌟 TAMBAHAN: Komponen Feedback & Komplain
const StockManagement = lazy(() => import("./pages/StockManagement")); // 🌟 TAMBAHAN: Komponen Manajemen Stok
const SupplierManagement = lazy(() => import("./pages/SupplierManagement"));
const CashierHistory = lazy(() => import("./pages/CashierHistory")); // 🌟 TAMBAHAN: Komponen Riwayat Kasir
// AUTH PAGES (LAZY)
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* MAIN LAYOUT GROUP */}
        <Route element={<MainLayout />}>
          {/* Dashboard Admin Utama & Guest */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboardguest" element={<DashboardGuest />} />

          {/* 🌟 RUTE MANAJEMEN & CRM (VELOURA HUB) */}
          <Route path="/customer-crm" element={<CustomerCRM />} />
          <Route path="/membership" element={<Membership />} /> 
          <Route path="/campaign" element={<CampaignPromo />} />
          {/* FIX: Ditambahkan penutup '/>' di bawah ini */}
          <Route path="/feedback" element={<FeedbackManagement />} /> 
          <Route path="/inventory" element={<StockManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/sales-history" element={<CashierHistory />} />

          {/* Rute toko dan navigasi lainnya */}
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/shop" element={<Shop />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/wishlist/:id" element={<WishlistDetail />} />
          {/* DYNAMIC ROUTES (DETAIL) */}
          <Route path="/shop/:slug" element={<ShopDetail />} />
          <Route path="/sale/:slug" element={<SaleDetail />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/collection/:slug" element={<CollectionDetail />} />
        </Route>

        {/* AUTH LAYOUT GROUP */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;