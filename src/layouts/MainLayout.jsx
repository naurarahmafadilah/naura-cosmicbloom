import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase"; 
import Loading from "../components/Loading"; 
import Sidebar from "./Sidebar"; 
import Header from "./Header"; // 🌟 Sekarang aman karena jalur import di dalam Header sudah kita benerin

export default function MainLayout() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        const localUser = localStorage.getItem("user");
        if (localUser) {
          setCheckingAuth(false);
          return;
        }
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate("/login", { replace: true });
        } else {
          setCheckingAuth(false);
        }
      } catch (error) {
        console.error("Gagal memvalidasi sesi layout utama:", error);
        navigate("/login", { replace: true });
      }
    };
    verifyAccess();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    // Mengunci monitor penuh, membuang semua warna kuning/krem di pinggir luar
    <div className="flex h-screen w-screen bg-white m-0 p-0 overflow-hidden select-none">
      
      {/* 1. SEKTOR KIRI: Sidebar Utama (Menempel di ujung kiri monitor) */}
      <Sidebar />

      {/* 2. SEKTOR KANAN: Area Kerja Vertikal (Header di atas, Konten di bawah) */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white">
        
        {/* HEADER UTAMA: Membentang penuh dari batas sidebar sampai mentok kanan */}
        <Header />

        {/* AREA KONTEN (Dashboard, Membership, dll.) */}
        {/* p-0 memastikan halaman yang dipanggil dipaksa rata mentok ke ujung kanan bawah! */}
        <main className="flex-1 w-full overflow-y-auto bg-white p-0 m-0 outline-none">
          <Outlet />
        </main>

      </div>

    </div>
  );
}