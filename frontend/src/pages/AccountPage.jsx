import { Outlet, useLocation } from "react-router-dom";
import AccountNavbar from "../components/account/AccountNavbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function AccountPage() {
  const { user } = useSelector((state) => state.client);
  console.log(user);
  const location = useLocation();
  const { pathname } = location;
  let page = pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="mt-[4rem] 650px:mt-[6rem]  w-full mb-10">
      {!page && (
        <div className=" bg-deep-primary py-1 w-full text-white px-5 650px:hidden">
          <h3 className="text-xl">{`Welcome, ${user.first_name}`}</h3>
          <p>{user.email}</p>
        </div>
      )}

      <div className="w-full grid grid-cols-12 gap-5 650px:px-5 1000px:px-10">
        <div
          className={`${
            page ? "hidden" : "block"
          } w-full bg-gray-100 650px:block col-span-full 650px:col-span-4 1000px:col-span-3 650px:px-0`}
        >
          <AccountNavbar />
        </div>

        <div
          className={`${
            page ? "block" : "hidden"
          } w-full col-span-full 650px:col-span-8 650px:block 1000px:col-span-9`}
        >
          {/* <div className=" bg-deep-primary py-1 w-full text-white px-5">
            <h3 className="text-xl">Welcome, Asum</h3>
            <p>iamasum369@gmail.com</p>
          </div> */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
