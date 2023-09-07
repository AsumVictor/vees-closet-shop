import React from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

function Orders() {
  return (
    <div className="w-full">
      <div className="w-full py-1 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">My Orders</h1>
      </div>
    </div>
  );
}

export default Orders;
