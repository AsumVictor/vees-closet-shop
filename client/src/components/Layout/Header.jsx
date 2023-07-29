import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { HiLogout } from "react-icons/hi";
import styles from "../../styles/styles";
import DropDown from "./DropDown";
import { categoriesData } from "../../static/data";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";
import FAQPage from "../sections/FAQPage";
import Footer from "../sections/Footer";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

function Header() {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  const { isSeller, seller } = useSelector((state) => state.shop);
  const [dropDown, setDropDown] = useState(false);
  const [userdropDown, setUserDropDown] = useState(false);
  const { logoutHandler } = useLogout();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
console.log(isSeller, seller)
  return (
    <>
      {/* Desktop */}

      {isSeller && (
        <div className="w-full py-1 sticky top-0 bg-wine_primary flex flex-row justify-end px-10">
          <Link
            to="shop"
            className="py-2 px-6 font-semibold text-wine_primary bg-white rounded-md"
          >
            My dashboard
          </Link>
        </div>
      )}

      <div
        className={`shadow-sm sticky top-0 z-50 null
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
            <Link
              to="/saved-to-later"
              className="flex"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div className={`${styles.noramlFlex}`}>
                <div className="relative cursor-pointer mr-[15px] flex flex-col items-center justify-center">
                  <AiOutlineHeart size={30} color="#000" />
                  {wishlist && wishlist.length !== 0 && (
                    <span className="absolute right-0 top-0 rounded-full bg-[#2660A4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist.length}
                    </span>
                  )}
                  <span className="text-[14px] font-bold -mt-1 ">Saved</span>
                </div>
              </div>
            </Link>

            {/* Save cart */}
            <Link
              to="/cart"
              className={`${styles.noramlFlex}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div className="relative cursor-pointer mr-[15px] flex flex-col items-center justify-center">
                <AiOutlineShoppingCart size={30} color="#000" />
                {cart.length > 0 && (
                  <span className="absolute right-0 top-0 rounded-full bg-[#2660A4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                    {cart.length}
                  </span>
                )}
                <span className="text-[14px] font-bold -mt-1">Cart</span>
              </div>
            </Link>

            {/* loging in */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer ">
                {isAuthenticated ? (
                  <button
                    onClick={() => setUserDropDown((prev) => !prev)}
                    className="flex flex-col items-center justify-center"
                  >
                    <img
                      src={user.avatar.url}
                      alt="Avatar"
                      className="h-[.8cm] w-[.8cm] border border-black rounded-full"
                    />
                    <span className="text-[14px] font-bold -mt-1">{`${user.email.slice(
                      0,
                      4
                    )}...com`}</span>
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="flex flex-col items-center justify-center"
                  >
                    <CgProfile size={30} color="rgb(0 0 0 / 83%)" />
                    <span className="text-[14px] font-bold -mt-1">Login</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <MobileNav handleUserDropDown={() => setUserDropDown((prev) => !prev)} />

      {userdropDown && (
        <div className="w-[4cm] h-[2.5cm] bg-white shadow-2xl rounded-b-md self-end right-1 fixed top-[1.65cm] z-10 px-2 flex flex-col gap-3 py-3 md:right-3">
          <Link
            to="/profile"
            className="w-full text-black font-semibold flex items-center gap-3 rounded-md text-[17px] px-2 hover:bg-wine_primary hover:text-white"
            onClick={() => setUserDropDown(false)}
          >
            <CgProfile />
            <span>Profile</span>
          </Link>
          <button
            className="w-full text-black font-semibold flex items-center gap-3 rounded-md text-[17px] px-2 hover:bg-wine_primary hover:text-white"
            onClick={() => logoutHandler()}
          >
            <HiLogout />
            <span>Logout</span>
          </button>
        </div>
      )}

      <Outlet />
      <FAQPage />
      <Footer />
    </>
  );
}

export default Header;
