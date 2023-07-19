import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

const ProfileSidebar = ({ setActive, active }) => {
  const { user } = useSelector((state) => state.user);
  const { logoutHandler } = useLogout();

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={20} color={active === 1 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingBag size={20} color={active === 2 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Orders
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund
          size={20}
          color={active === 3 ? "#8e1f2a" : ""}
        />
        <span
          className={`pl-3 ${
            active === 3 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Refunds
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(4) || navigate("/inbox")}
      >
        <AiOutlineMessage size={20} color={active === 4 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Inbox
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(5)}
      >
        <MdOutlineTrackChanges
          size={20}
          color={active === 5 ? "#8e1f2a" : ""}
        />
        <span
          className={`pl-3 ${
            active === 5 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Track Order
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(6)}
      >
        <RiLockPasswordLine size={20} color={active === 6 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(7)}
      >
        <TbAddressBook size={20} color={active === 7 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Address
        </span>
      </div>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
          >
            <MdOutlineAdminPanelSettings
              size={20}
              color={active === 7 ? "#8e1f2a" : ""}
            />
            <span
              className={`pl-3 ${
                active === 8 ? "text-wine_primary font-bold underline" : ""
              } 800px:block hidden`}
            >
              Admin Dashboard
            </span>
          </div>
        </Link>
      )}
      <div
        className="single_item flex items-center cursor-pointer w-full mb-8"
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogin size={20} color={active === 8 ? "#8e1f2a" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-wine_primary font-bold underline" : ""
          } 800px:block hidden`}
        >
          Log out
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
