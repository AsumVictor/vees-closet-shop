import { Outlet, useLocation } from "react-router-dom";
import AccountNavbar from "../components/account/AccountNavbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { PiGitDiffFill } from "react-icons/pi";
import { TbTruckDelivery } from "react-icons/tb";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";

function SettingLayout() {
  const { user } = useSelector((state) => state.client);
  const location = useLocation();
  const { pathname } = location;
  let page = pathname.split("/")[3];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="w-full mb-10">
      
      <div className="w-full grid grid-cols-12 gap-5 650px:px-5 1000px:px-10">
        <div
          className={`${
            page ? "hidden" : "block"
          } w-full bg-gray-100 650px:block col-span-full 650px:col-span-4 1000px:col-span-3 650px:px-0`}
        >
          <div className="bg-white">
            <AccountNavbar
              links={[
                {
                  href: "./variations",
                  icon: <PiGitDiffFill />,
                  text: "Variations",
                },
                {
                  href: "./category",
                  icon: <BiCategoryAlt />,
                  text: "Categories",
                },
              ]}
              shop={'Shop settings'}
            />
          </div>
        </div>

        <div
          className={`${
            page ? "block" : "hidden"
          } w-full col-span-full 650px:col-span-8 650px:block 1000px:col-span-9`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SettingLayout;
