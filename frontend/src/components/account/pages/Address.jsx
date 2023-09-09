import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link } from "react-router-dom";

function Addresss() {
  return (
    <div className="w-full px-2">
      <div className="w-full py-1 bg-gray-100 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">My Addresses (2)</h1>
      </div>
      <div className="w-full py-1 mt-10 grid grid-cols-12 gap-4">
        <div className="w-full py-1 col-span-full 450px:col-span-6 1000px:col-span-4 border-2 px-2">
          <p className=" italic">AAN 29/B, Sunyani,</p>
          <p className=" italic">Additional address,</p>
          <p className=" italic">Sunyani,</p>
          <p className=" italic">Bono Region</p>

          <div className="mt-3 h-[0.4cm] w-[0.4cm] bg-emerald-700 rounded-full"></div>
          <hr className="mt-2" />
          <div className="w-full mt-1 flex flex-row justify-between">
            <button className=" text-deep-primary py-1 px-2 font-medium hover:bg-gray-100">
              Set As Default
            </button>
            <button className=" text-deep-primary hover:bg-slate-300 px-2">
              <CiEdit size={23} />
            </button>
            <button className="px-2 py-1 bg-red-200">
              <AiOutlineDelete color="red" size={21}/>
            </button>
          </div>
        </div>
      </div>

      <button className="py-2 mt-10 w-full px-4 bg-deep-primary text-white font-medium">
          Add New Address
        </button>
    </div>
  );
}

export default Addresss;
