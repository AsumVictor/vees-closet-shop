import React from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../../static/data";
import styles from "../../styles/styles";

const Navbar = ({ handleClick }) => {
  const normalStyle = "pb-[30px] 800px:pb-0 font-[500] px-5 cursor-pointer";

  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems.map((i) => (
          <div className="flex">
            <NavLink
              onClick={() => handleClick()}
              to={i.url}
              className={({ isActive }) =>
                isActive
                  ? `${normalStyle} text-wine_primary underline font-extrabold`
                  : `${normalStyle} text-wine_dark_deep`
              }
            >
              {i.title}
            </NavLink>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
