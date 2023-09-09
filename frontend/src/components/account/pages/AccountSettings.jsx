import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function AccountSettings() {
  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 py-1 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">Account Settings</h1>
      </div>
      <div className="w-full flex flex-row mt-7 pr-10 gap-4 px-3 items-end justify-between">
        <h2 className="text-xl bg-white font-semibold">Profile Details</h2>
        <button
          type="button"
          className=" bg-deep-primary px-4 py-1 text-white flex flex-row gap-2"
        >
          <CiEdit size={24} />
          <span>Edit Profile</span>
        </button>
      </div>
      <div className="w-full px-3 mt-10 flex flex-col gap-3">
        <div className="">
          <p>First Name</p>
          <p className=""></p>
          <input
            type="text"
            value={"Asum"}
            disabled={true}
            name=""
            id=""
            className="w-full outline-0 text-xl font-medium"
          />
          <hr className="mt-2 border-deep-primary" />
        </div>
        <button className="py-2 px-4 bg-deep-primary text-white font-medium">
          Save Changes
        </button>
      </div>


      <div className="w-full flex flex-row mt-20 pr-10 gap-4 px-3 items-end justify-between">
        <h2 className="text-xl bg-white font-semibold">Security Settings</h2>
        
      </div>
      <div className="w-full px-3 mt-10 flex flex-col gap-3">
        <div className="">
          <p>Password</p>
          <p className=""></p>
          <input
            type="password"
            value={"*************"}
            disabled={true}
            name=""
            id=""
            className="w-full outline-0 text-xl font-medium"
          />
          <hr className="mt-2 border-deep-primary" />
        </div>
        <button className="py-2 px-4 bg-deep-primary text-white font-medium">
          Change Password
        </button>
      </div>
    </div>
  );
}

export default AccountSettings;
