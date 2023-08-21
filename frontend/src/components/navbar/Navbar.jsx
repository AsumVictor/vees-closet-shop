import { NavLink } from "react-router-dom";
import "../../styles/navbar.css";
import { NavCategory } from "./navUtils";
import CartIcon from "../cart/cartIcon";
import UserAccountIcon from "../account/userAccountIcon";
import { SearchIcon, Search } from "../search/Search";
import { useState } from "react";

function Navbar() {
  // Search component
  const [isSearch, setIsSearch] = useState(false);

  return (
    <header className="w-full h-[1.6cm] sticky top-0 border flex flex-row items-center justify-between">
      <div className="px-2 text-2xl font-semibold">Vees Closet</div>
      <nav className="hidden 750px:block">
        <ul className="flex flex-row gap-2">
          <li>
            <NavLink to="/" className={"nav-link"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={"nav-link"}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/men" className={"nav-link"}>
              men
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop/women" className={"nav-link"}>
              women
            </NavLink>
          </li>
          <NavCategory />
          <li>
            <NavLink to="/about" className={"nav-link"}>
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
