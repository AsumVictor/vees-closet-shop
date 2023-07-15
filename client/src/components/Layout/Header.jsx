import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../../assets/vite.svg";
import { HiPhone } from "react-icons/hi";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import styles from "../../styles/styles";
import DropDown from "./DropDown";
import { categoriesData } from "../../static/data";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

function Header() {
  const [dropDown, setDropDown] = useState(false);

  return (
    <>
      {/* Desktop */}
      <div
        className={`shadow-sm sticky top-0 z-10 null
         transition hidden 800px:flex items-center justify-between w-full bg-white h-[70px] `}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* Categories dropdown */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[90%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowDown
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>

          {/* Navigation Links */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar />
          </div>

          <div className="flex flex-row justify-center items-center gap-x-5">


          {/* Save items in browser */}

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] flex flex-col items-center justify-center">
                <AiOutlineHeart size={30} color="#000" />
                <span className="absolute right-0 top-0 rounded-full bg-[#2660A4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  0
                </span>
                <span className="text-[14px] font-bold -mt-1 ">Saved</span>
              </div>
            </div>
          </div>

          {/* Save cart */}
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[15px] flex flex-col items-center justify-center">
              <AiOutlineShoppingCart size={30} color="#000" />
              <span className="absolute right-0 top-0 rounded-full bg-[#2660A4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                0
              </span>
              <span className="text-[14px] font-bold -mt-1">Cart</span>
            </div>
          </div>

          {/* loging in */}
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer ">
              <Link to="/login" className="flex flex-col items-center justify-center">
                <CgProfile size={30} color="rgb(0 0 0 / 83%)" />
                <span className="text-[14px] font-bold -mt-1">Login</span>
              </Link>
            </div>
          </div>
          </div>
          

        </div>
      </div>

 {/* Mobile menu */}
<MobileNav />
<Outlet />

    </>
  );
}

export default Header;
