import { MdManageAccounts } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegAddressBook } from "react-icons/fa";
import { LuPackage2 } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";

function AccountNavbar() {
  const navigate = useNavigate();

  const links = [
    {
      href: "./settings",
      icon: <MdManageAccounts />,
      text: "Account Settings",
    },
    {
      href: "./orders",
      icon: <LuPackage2 />,
      text: "My Orders",
    },
    {
      href: "./security",
      icon: <RiLockPasswordLine />,
      text: "Change Password",
    },
  ];

  return (
    <div className="w-full">
      <div className=" border flex flex-col gap-4">
        <div className=" bg-white text-center text-xl py-2 capitalize">
          My account
        </div>
        {links.map((link) => (
          <NavLink
            state={true}
            to={link.href}
            className={({ isActive }) =>
              isActive
                ? " w-full grid grid-cols-12 items-center px-4 bg-gray-300  py-2"
                : "hover:bg-gray-200 py-2 w-full grid grid-cols-12 items-center px-4"
            }
          >
            <div className="col-span-2 text-[20px]">{link.icon}</div>
            <span className=" col-span-9 text-[18px]">{link.text}</span>
            <IoIosArrowForward className="col-span-1 650px:hidden" size={27} />
          </NavLink>
        ))}
        <button
          onClick={async () => {
            try {
              let res = await axios.post(`${server}user/logout`, null, {
                withCredentials: true,
              });
              if (res.data.success) {
                navigate("/");
                window.location.reload(true);
                return;
              }
            } catch (error) {
              let errMsg = error.response?.data?.message
                ? error.response.data.message
                : error.message;
              toast.error(errMsg);
            }
          }}
          className="hover:bg-gray-200 py-2 w-full grid grid-cols-12 items-center px-4"
        >
          <div className="col-span-2 text-[20px]">
            <AiOutlineLogout />
          </div>
          <span className=" col-span-9 text-[18px] text-left">Logout</span>
          <IoIosArrowForward className="col-span-1 hidden" size={27} />
        </button>
      </div>
    </div>
  );
}

export default AccountNavbar;
