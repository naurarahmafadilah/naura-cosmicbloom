import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase"; 
import Loading from "../components/Loading"; 
import Sidebar from "./Sidebar"; 
import Header from "./Header";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // 1. Cek sesi lokal atau Supabase secara berkala
        const localUser = localStorage.getItem("user");
        const { data: { session } } = await supabase.auth.getSession();

        if (localUser || session) {
          setCheckingAuth(false);
        } else {
          // Jika benar-benar tidak ada sesi, lempar ke login
          navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("Gagal memvalidasi sesi layout utama:", error);
        navigate("/login", { replace: true });
      }
    };

    verifyAccess();
  }, [navigate, location.pathname]); // Memicu pengecekan ulang setiap kali rute berpindah

  if (checkingAuth) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    // Memastikan layout flexbox membagi layar secara horizontal (Sidebar | Area Kerja)
    <div className="flex h-screen w-screen bg-white m-0 p-0 overflow-hidden select-none">
      
      {/* 1. SEKTOR KIRI: Sidebar Utama (Diberikan lebar pasti/shrink-0 agar tidak terhimpit) */}
      <div className="flex-shrink-0 z-20">
        <Sidebar />
      </div>

      {/* 2. SEKTOR KANAN: Area Kerja Vertikal */}
      <div className="flex-1 flex flex-col h-full min-w-0 bg-white relative">
        
        {/* HEADER UTAMA */}
        <div className="w-full flex-shrink-0 z-10">
          <Header />
        </div>

        {/* AREA KONTEN UTAMA */}
        <main className="flex-1 w-full overflow-y-auto bg-white p-0 m-0 outline-none block">
          <Outlet />
        </main>

      </div>

    </div>
  );
}