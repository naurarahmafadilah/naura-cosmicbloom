import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import Loading from "./components/Loading"; // ✅ WAJIB

// MAIN PAGES (LAZY)
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Shop = lazy(() => import("./pages/Shop"));
const Collection = lazy(() => import("./pages/Collection"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Orders = lazy(() => import("./pages/Orders"));
const Sale = lazy(() => import("./pages/Sale"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import("./pages/Contact"));

// AUTH PAGES (LAZY)
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const Forgot = lazy(() => import("./pages/auth/Forgot"));

const App = () => {
  return (
    <Suspense fallback={<Loading />}> {/* ✅ INI FIX UTAMA */}

      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>

    </Suspense>
  );
};

export default App;