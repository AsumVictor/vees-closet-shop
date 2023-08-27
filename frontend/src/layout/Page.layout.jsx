import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/footer";

function PageLayout() {

  return (
    <div className="relative overflow-x-hidden overflow-y-auto  w-ful flex flex-col ">
      <Navbar />
      <Outlet/>
      <Footer />
    </div>
  );
}

export default PageLayout;
