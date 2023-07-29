import { useState } from "react";
import DashboardHeader from "../../components/shop/DashboardHeader";
import DashboardSideBar from "../../components/shop/DashboardSidebar.jsx";
import "./layout.css";
import { Outlet } from "react-router-dom";
function Layout() {
  const [openSide, setOpenSide] = useState(false);

  return (
    <div className="w-full h-screen fixed top-0 left-0 pb-10">
      <DashboardHeader />
      <div className="shop-layout-content top-0 left-0 py-1 w-full h-full relative">
        <DashboardSideBar handleSideBar={[setOpenSide, openSide]} />
        <div
          className={`${
            openSide ? "open" : null
          } dashContent w-full py-2 h-full overflow-y-auto overflow-x-hidden`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
