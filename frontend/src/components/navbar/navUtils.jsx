import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";

export function NavCategory({ handleClick }) {
  const [isOpen, setIsOpen] = useState(false);

  document.addEventListener("click", (e) => {
    if (isOpen && !e.target.classList.contains("cat-link")) {
      setIsOpen(false);
    }
  });

  return (
    <div className="w-full flex-col 750px:w-auto relative flex 750px:flex-row items-center justify-center">
      <NavLink
        to="/category"
        className={`cat-link flex flex-row items-center`}
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
        <ul className="mt-3 750px:mt-0 750px:absolute -left-[2rem] flex flex-col px-2 top-[1.8rem] w-[4cm] bg-white border">
          <Link
            to={"/category/dresses"}
            onClick={handleClick}
            className=" px-2 w-full nav-link capitalize"
          >
            Dresses
          </Link>
        </ul>
      )}
    </div>
  );
}
