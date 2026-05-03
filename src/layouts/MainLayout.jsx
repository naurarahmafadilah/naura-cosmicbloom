import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex bg-latar min-h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Header />

        <div className="px-8 py-6">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default MainLayout;