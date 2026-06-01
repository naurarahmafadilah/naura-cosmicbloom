import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading"; 

// MAIN PAGES (LAZY)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shop = lazy(() => import("./pages/Shop"));
const ShopDetail = lazy(() => import("./pages/ShopDetail"));
const Collection = lazy(() => import("./pages/Collection"));
const CollectionDetail = lazy(() => import("./pages/CollectionDetail"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const WishlistDetail = lazy(() => import("./pages/WishlistDetail"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetail = lazy(() => import("./pages/OrdersDetail"));
// INTEGRASI LAZY IMPORT MEMBERSHIP BARU
const Memberships = lazy(() => import("./pages/Memberships"));
const MembershipsDetail = lazy(() => import("./pages/MembershipsDetail")); // Jika nanti kamu membuat halaman detailnya
const Sale = lazy(() => import("./pages/Sale"));
const SaleDetail = lazy(() => import("./pages/SaleDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

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
          <Route path="/" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          {/* REGISTER ROUTE MASTER MEMBERSHIP */}
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* DYNAMIC ROUTES (DETAIL) */}
          <Route path="/shop/:slug" element={<ShopDetail />} />
          <Route path="/sale/:slug" element={<SaleDetail />} />
          <Route path="/wishlist/:slug" element={<WishlistDetail />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          {/* REGISTER ROUTE DETAIL MEMBERSHIP */}
          <Route path="/memberships/:id" element={<MembershipsDetail />} />
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