import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export function NavCategory() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (value === activeElement) {
      setActiveElement("");
    } else {
      setActiveElement(value);
    }
  };
  return (
    <div className="relative flex flex-row items-center">
      <NavLink
        to="/products"
        className={"nav-link flex flex-row items-center"}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((prev) => !prev);
        }}
      >
        categories
        {isOpen ? (
          <HiOutlineChevronUp size={20} />
        ) : (
          <HiOutlineChevronDown size={20} />
        )}
      </NavLink>
      {isOpen && (
        <ul className="absolute -left-[2rem] flex flex-col px-2 top-[1.8rem] w-[4cm] bg-white border">
          <Link
            to={"/products?category=dresses"}
            className=" px-2 w-full nav-link capitalize"
          >
            Dresses
          </Link>
        </ul>
      )}
    </div>
  );
}
