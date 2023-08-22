import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import { NavCategory } from "./navUtils";
import CartIcon from "../cart/cartIcon";
import UserAccountIcon from "../account/userAccountIcon";
import { SearchIcon, Search } from "../search/Search";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";

function Navbar() {
  // Search component
  const [isSearch, setIsSearch] = useState(false);
  // Toggle nav
  const [IsNavOpen, setIsNavOpen] = useState(false);

  return (
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
            <NavLink to="/" className={"nav-link  self-center px-3"}>
              Home
            </NavLink>
          </li>
          <li className="flex flex-col">
            <NavLink to="/shop" className={"nav-link  self-center  px-3"}>
              Shop
            </NavLink>
          </li>
          <li className="flex flex-col">
            <NavLink to="/shop/men" className={"nav-link  self-center  px-3"}>
              men
            </NavLink>
          </li>
          <li className="flex flex-col">
            <NavLink to="/shop/women" className={"nav-link  self-center"}>
              women
            </NavLink>
          </li>
          <NavCategory />
          <li className="flex flex-col">
            <NavLink to="/about" className={"nav-link  self-center  px-3"}>
              about us
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="flex flex-row px-2 gap-x-3">
        <SearchIcon handleSearch={() => setIsSearch(true)} />
        <CartIcon />
        <UserAccountIcon />
      </div>
      {isSearch && <Search handleSearch={() => setIsSearch(false)} />}
    </header>
  );
}

export default Navbar;
