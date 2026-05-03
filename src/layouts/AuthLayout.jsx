import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-latar">

      <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#f1e5db] w-full max-w-md">

        {/* LOGO */}
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-3xl font-[var(--font-playfair)] text-teks">
            Veloura<span className="text-primary">.</span>
          </h1>
        </div>

        {/* CONTENT */}
        <Outlet />

        {/* FOOTER */}
        <p className="text-center text-xs text-teks-soft mt-6">
          © 2026 Veloura Boutique. All rights reserved.
        </p>

      </div>

    </div>
  );
}