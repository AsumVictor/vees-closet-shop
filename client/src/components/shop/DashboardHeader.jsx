import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import Logo from "../../assets/vite.svg";
import { Tooltip } from "@material-tailwind/react";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.shop);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0  flex items-center justify-between px-4">
      <div>
        <Link to="/shop">
          <img src={Logo} alt="" />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            content="Coupouns"
            placement="top"
            className="z-50"
          >
            <Link to="/shop/cupouns" className="800px:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            content="Products"
            placement="top"
            className="z-50"
          >
            <Link to="/shop/products" className="800px:block hidden">
              <FiShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            content="All orders"
            placement="top"
            className="z-50"
          >
            <Link to="/shop/orders" className="800px:block hidden">
              <FiPackage
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Tooltip
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            content="Messages"
            placement="top"
            className="z-50"
          >
            <Link to="/shop/messages" className="800px:block hidden">
              <BiMessageSquareDetail
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
              />
            </Link>
          </Tooltip>
          <Link to={`/shop/${seller._id}`}>
            <img
              src={``}
              alt=""
              className="w-[50px] h-[50px] border border-red-500 rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
