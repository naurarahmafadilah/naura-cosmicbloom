import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading";

// Rute Utama & Landing
const LandingPage = lazy(() => import("./pages/LandingPage"));
const GuestLandingPage = lazy(() => import("./pages/GuestLandingPage")); // 🌟 TAMBAHAN
const CRMLandingPage = lazy(() => import("./pages/CRMLandingPage"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// ==========================================================
// KELOMPOK HALAMAN PREMIUM MEMBER (VELOURA BOUTIQUE ATELIER)
// ==========================================================
const MemberDashboard = lazy(() => import("./pages/MemberDashboard")); 
const LacakPesanan = lazy(() => import("./pages/LacakPesanan"));
const ProfilMember = lazy(() => import("./pages/ProfilMember"));
const KeranjangMember = lazy(() => import("./pages/KeranjangMember")); 
const CheckoutMember = lazy(() => import("./pages/CheckoutMember"));   
const ContactUs = lazy(() => import("./pages/ContactUs"));             

// E-Commerce & Katalog Publik / Admin
const Shop = lazy(() => import("./pages/Shop"));
const ShopDetail = lazy(() => import("./pages/ShopDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrdersDetail = lazy(() => import("./pages/OrdersDetail"));

const Membership = lazy(() => import("./pages/Membership")); 
const MembershipsDetail = lazy(() => import("./pages/MembershipsDetail"));

const Sale = lazy(() => import("./pages/Sale"));
const SaleDetail = lazy(() => import("./pages/SaleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin & Manajemen internal CRM
const CustomerCRM = lazy(() => import("./pages/CustomerCRM"));
const CampaignPromo = lazy(() => import("./pages/CampaignPromo"));
const FeedbackManagement = lazy(() => import("./pages/FeedbackManagement"));
const StockManagement = lazy(() => import("./pages/StockManagement"));
const SupplierManagement = lazy(() => import("./pages/SupplierManagement"));
const CashierHistory = lazy(() => import("./pages/CashierHistory"));
const ManageUsers = lazy(() => import("./pages/ManageUsers"));

// Autentikasi Kredensial
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
        <Route path="/guest" element={<GuestLandingPage />} /> {/* 🌟 TAMBAHAN RUTE GUEST */}
        <Route path="/crm" element={<CRMLandingPage />} />
        
        {/* Hub Utama & Modul Integrasi Member Veloura */}
        <Route path="/member" element={<MemberDashboard />} />
        <Route path="/lacak-pesanan" element={<LacakPesanan />} />
        <Route path="/profil-member" element={<ProfilMember />} />
        <Route path="/keranjang" element={<KeranjangMember />} /> 
        <Route path="/checkout" element={<CheckoutMember />} />   
        <Route path="/contact-us" element={<ContactUs />} />     
        
        {/* Kontak Publik */}
        <Route path="/contact" element={<Contact />} />

        {/* ==========================================================
            KELOMPOK INTERNAL / PRIVATE (OTOMATIS STRUKTUR SIDEBAR & HEADER)
           ========================================================== */}
        <Route element={<MainLayout />}>
          {/* Dashboard Internal Atrium */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* 🌟 MASUK SEBAGAI MANAGEMENT ADMIN (Katalog Baju) */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:slug" element={<ShopDetail />} />

          {/* Program Sale */}
          <Route path="/sale" element={<Sale />} />
          <Route path="/sale/:slug" element={<SaleDetail />} />

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