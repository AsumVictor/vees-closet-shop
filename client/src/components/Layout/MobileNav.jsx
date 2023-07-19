import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../../styles/styles";
import Logo from "../../assets/vite.svg";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

function MobileNav({ handleUserDropDown }) {
  const { logoutHandler } = useLogout();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <div
      className={`shadow-md top-0 left-0 z-50 w-full h-[60px] bg-[#fff] sticky 800px:hidden flex items-center`}
    >
      <div className="w-full flex items-center justify-between px-2">
        <div>
          <BiMenuAltLeft size={40} className="" onClick={() => setOpen(true)} />
        </div>
        <div className="flex flex-row items-center gap-3">
          <Link
            to="/"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <img src={Logo} alt="Logo" className="mt-3 cursor-pointer" />
          </Link>
          <p className="text-2xl font-extrabold">Vees</p>
        </div>
        <div className="flex gap-2 items-center">
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

          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer ">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    handleUserDropDown();
                  }}
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

      {/* header sidebar */}
      {open && (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <Link
                  to="/saved-to-later"
                  className="relative mr-[15px]"
                  onClick={() => {
                    setOpen(false);
                    window.scrollTo(0, 0);
                  }}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  {wishlist && wishlist.length !== 0 && (
                    <span className="absolute right-0 top-0 rounded-full bg-[#2660A4] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </div>
              <RxCross1
                size={30}
                className="ml-4 mt-5"
                onClick={() => setOpen(false)}
              />
            </div>

            <div className="my-8 w-[92%] m-auto h-[40px relative]">
              <input
                type="search"
                placeholder="Search Product..."
                className="h-[40px] w-full px-2 border-navy_blue border-[2px] rounded-md outline-none"
              />
            </div>

            <Navbar handleClick={() => setOpen(false)} />

            <div className="flex w-full justify-center">
              {isAuthenticated ? (
                <button
                  className="px-3 flex gap-2 text-white bg-wine_primary rounded-md font-bold py-1"
                  onClick={() => logoutHandler()}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-[18px] pr-[10px] text-[#000000b7] font-bold"
                  >
                    Login /
                  </Link>
                  <Link
                    to="/signup"
                    className="text-[18px] text-[#000000b7]  font-bold"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
