import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const MemberDashboard = lazy(() => import("./pages/MemberDashboard")); 

const Shop = lazy(() => import("./pages/Shop"));
const ShopDetail = lazy(() => import("./pages/ShopDetail"));
const Collection = lazy(() => import("./pages/Collection"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrdersDetail = lazy(() => import("./pages/OrdersDetail"));

const Membership = lazy(() => import("./pages/Membership")); 
const MembershipsDetail = lazy(() => import("./pages/MembershipsDetail"));

const Sale = lazy(() => import("./pages/Sale"));
const SaleDetail = lazy(() => import("./pages/SaleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const WishlistDetail = lazy(() => import("./pages/WishlistDetail"));

const CustomerCRM = lazy(() => import("./pages/CustomerCRM"));
const CampaignPromo = lazy(() => import("./pages/CampaignPromo"));
const FeedbackManagement = lazy(() => import("./pages/FeedbackManagement"));
const StockManagement = lazy(() => import("./pages/StockManagement"));
const SupplierManagement = lazy(() => import("./pages/SupplierManagement"));
const CashierHistory = lazy(() => import("./pages/CashierHistory"));
const ManageUsers = lazy(() => import("./pages/ManageUsers"));

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* ==========================================================
            KELOMPOK RUTE UMUM & MEMBER (BEBAS AKSES TANPA LOGIN / PUBLIC)
           ========================================================== */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Diakses langsung kapan saja tanpa proteksi login */}
        <Route path="/member" element={<MemberDashboard />} />
        
        {/* Rute Publik Lainnya */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:slug" element={<ShopDetail />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/sale/:slug" element={<SaleDetail />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/collection/:slug" element={<CollectionDetail />} />
        <Route path="/contact" element={<Contact />} />

        {/* ==========================================================
            KELOMPOK INTERNAL / PRIVATE (MEMERLUKAN MAIN LAYOUT / LOGIN ADMIN)
           ========================================================== */}
        <Route element={<MainLayout />}>
          {/* Kunci: /dashboard dikembalikan ke sini agar berfungsi normal setelah login */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* Kelompok Manajemen Data / Admin CRM */}
          <Route path="/customer-crm" element={<CustomerCRM />} />
          <Route path="/campaign" element={<CampaignPromo />} />
          <Route path="/feedback" element={<FeedbackManagement />} />
          <Route path="/inventory" element={<StockManagement />} />
          <Route path="/suppliers" element={<SupplierManagement />} />
          <Route path="/sales-history" element={<CashierHistory />} />
          <Route path="/manage-users" element={<ManageUsers />} />

          {/* Transaksi Riwayat Akun */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrdersDetail />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/wishlist/:id" element={<WishlistDetail />} />

          {/* Pengaturan Master Data Membership */}
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/:id" element={<MembershipsDetail />} />
        </Route>

        {/* ==========================================================
            AUTH LAYOUT
           ========================================================== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* PAGE NOT FOUND */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default App;