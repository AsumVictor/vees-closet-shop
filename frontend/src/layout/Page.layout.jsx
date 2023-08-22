import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function PageLayout() {
  return (
    <div className="overflow-x-hidden overflow-y-auto h-screen w-ful flex flex-col ">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PageLayout;
