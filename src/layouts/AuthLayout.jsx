import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">

      <div className="bg-white p-10 rounded-[45px] shadow-veloura border border-bg-soft w-full max-w-md relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-bg-soft rounded-full opacity-50" />

        {/* LOGO */}
        <div className="flex flex-col items-center justify-center mb-10 relative">
          <h1 className="text-4xl font-playfair text-primary-dark tracking-tight">
            Veloura<span className="text-secondary-light">.</span>
          </h1>
          <span className="font-greatvibes text-lg text-secondary-light/70 -mt-1">
            Boutique
          </span>
        </div>

        {/* CONTENT (Forms) */}
        <main className="relative">
          <Outlet />
        </main>

        {/* FOOTER */}
        <footer className="mt-12">
          <p className="text-center text-[10px] text-secondary-dark/50 font-quicksand uppercase tracking-[2px]">
            © 2026 Veloura Boutique • All rights reserved.
          </p>
        </footer>

      </div>

    </div>
  );
}