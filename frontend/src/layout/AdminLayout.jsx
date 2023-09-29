import React, { useState } from "react";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { Link, NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const [IsNavOpen, setIsNavOpen] = useState(false);
  return (
    <div className="w-full">
      <header className="w-full h-[1.6cm] bg-white fixed top-0 border flex flex-row items-center justify-between z-[99]">
        <button
          type="button"
          onClick={() => setIsNavOpen((prev) => !prev)}
          className="py-1 px-2 mx-2 750px:hidden"
        >
          {IsNavOpen ? (
            <TfiClose size={27} />
          ) : (
            <HiMiniBars3BottomLeft size={30} />
          )}
        </button>
        <Link to={"/"} className="px-2 text-2xl font-semibold">
          Vees Closet
        </Link>
        <nav
          className={`bg-white ${
            IsNavOpen ? "flex" : "hidden"
          } flex justify-center
      absolute mt-[1.6cm] top-0 left-0 self-center w-full
      750px:block 750px:mt-0 750px:relative 750px:w-auto
      `}
        >
          <ul
            className="w-11/12 self-center border shadow-sm 750px:border-0
        flex-col flex 750px:flex-row gap-2 750px:w-auto 750px:shadow-none"
          >
            <li className="flex flex-col">
              <NavLink
                to="."
                end
                className={"nav-link  self-center px-3"}
                onClick={() => setIsNavOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
            <li className="flex flex-col">
              <NavLink
                onClick={() => setIsNavOpen(false)}
                to="products"
                className={"nav-link  self-center  px-3"}
              >
                Products
              </NavLink>
            </li>
            <li className="flex flex-col">
              <NavLink
                onClick={() => setIsNavOpen(false)}
                to="create-product"
                className={"nav-link  self-center  px-3"}
              >
                Create product
              </NavLink>
            </li>
            <li className="flex flex-col">
              <NavLink
                onClick={() => setIsNavOpen(false)}
                to="orders"
                className={"nav-link  self-center"}
              >
                Orders
              </NavLink>
            </li>
            <li className="flex flex-col">
              <NavLink
                onClick={() => setIsNavOpen(false)}
                to="coupons"
                className={"nav-link  self-center  px-3"}
              >
                Coupons
              </NavLink>
            </li>
            <li className="flex flex-col">
              <NavLink
                onClick={() => setIsNavOpen(false)}
                to="settings"
                className={"nav-link  self-center  px-3"}
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="w-full mt-[1.6cm] bg-gray-100 px-2 py-5">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
