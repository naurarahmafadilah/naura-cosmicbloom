import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex bg-bg-main min-h-screen font-playfair text-primary-dark">
      
      {/* Sidebar - Pastikan h-screen dan sticky agar tidak ikut scroll */}
      <div className="sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header - Beri bg-white atau bg-bg-main agar konten di bawahnya tidak terlihat saat scroll */}
        <Header className="sticky top-0 z-10 bg-bg-main/80 backdrop-blur-md border-b border-bg-soft" />

        {/* Main Content Area */}
        <main className="flex-1 px-8 py-10 max-w-[1440px] mx-auto w-full">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;