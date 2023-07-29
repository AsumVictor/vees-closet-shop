import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link, NavLink } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import {
  HiArrowNarrowLeft,
  HiArrowNarrowRight,
  HiOutlineReceiptRefund,
} from "react-icons/hi";
import { Tooltip } from "@material-tailwind/react";

const DashboardSideBar = ({ handleSideBar }) => {
  const [setOpenSide, openSide] = handleSideBar;

  const sideLinks = [
    {
      path: ".",
      title: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "orders",
      title: "All orders",
      icon: <FiShoppingBag />,
    },
    {
      path: "products",
      title: "All products",
      icon: <FiPackage />,
    },
    {
      path: "add-product",
      title: "Add product",
      icon: <AiOutlineFolderAdd />,
    },
    {
      path: "inbox",
      title: "Inbox",
      icon: <BiMessageSquareDetail />,
    },
    {
      path: "coupouns",
      title: "Coupouns",
      icon: <AiOutlineGift />,
    },
    {
      path: "refund",
      title: "Refund",
      icon: <HiOutlineReceiptRefund />,
    },
    {
      path: "setting",
      title: "Setting",
      icon: <CiSettings />,
    },
  ];

  return (
    <div className="dash-sidebar h-[100%] z-10 absolute">
      {/* single item */}
      <div
        className={`${
          openSide ? "open" : null
        } h-[90%] sha sidebar flex flex-col gap-5 relative bg-white overflow-x-hidden overflow-y-auto px-2`}
      >
        <button
          className="toggleSide shadow-md py-1 h-[1cm] w-[1cm] absolute top-0 right-3 flex justify-center items-center rounded-md "
          onClick={() => setOpenSide((prev) => !prev)}
        >
          {openSide ? <HiArrowNarrowLeft /> : <HiArrowNarrowRight />}
        </button>
        {sideLinks.map((i) => (
          <div
            className="w-full flex items-center gap-2 hover:bg-wine_dark_light  py-1 text-[18px] px-2        rounded-md"
            onClick={() => setOpenSide((prev) => false)}
          >
            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content={i.title}
              placement="right"
              className="sideToolTop"
            >
              <NavLink
                to={i.path}
                end
                className={({ isActive }) =>
                  isActive
                    ? "icon  text-wine_primary font-extrabold hover:text-white w-full flex items-center"
                    : "icon text-wine_dark_deep hover:text-white w-full flex items-center"
                }
              >
                {i.icon}
                <h5 className={`text pl-2 font-[400] `}>{i.title}</h5>
              </NavLink>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardSideBar;
