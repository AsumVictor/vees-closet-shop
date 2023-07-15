import React, { useState } from "react";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import styles from "../../styles/styles";
import { IoIosArrowForward } from "react-icons/io";
import Logo from "../../assets/vite.svg";



function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`shadow-md top-0 left-0 z-10" 
                w-full h-[60px] bg-[#fff] z-50 sticky 800px:hidden flex items-center`}
    >
      <div className="w-full flex items-center justify-between">
        <div>
          <BiMenuAltLeft
            size={40}
            className="ml-4"
            onClick={() => setOpen(true)}
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="mt-3 cursor-pointer"
            />
          </Link>
          <p className="text-2xl font-extrabold">Vees</p>
        </div>
        <div>
          <div className="relative mr-[20px]">
            <AiOutlineShoppingCart size={30} />
            <span class="absolute right-0 top-0 rounded-full bg-navy_blue w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* header sidebar */}
      {open && (
        <div className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}>
          <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
            <div className="w-full justify-between flex pr-3">
              <div>
                <div
                  className="relative mr-[15px]"
                  onClick={() => setOpen(false)}
                >
                  <AiOutlineHeart size={30} className="mt-5 ml-3" />
                  <span class="absolute right-0 top-0 rounded-full bg-navy_blue w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                    0
                  </span>
                </div>
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

            <Navbar handleClick={()=>setOpen(false)}/>

            <div className="flex w-full justify-center">
              <Link
                to="/login"
                className="text-[18px] pr-[10px] text-[#000000b7] font-bold"
              >
                Login /
              </Link>
              <Link to="/sign-up" className="text-[18px] text-[#000000b7]  font-bold">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileNav;
