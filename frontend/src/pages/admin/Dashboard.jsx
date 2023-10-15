import React from "react";

function Dashboard() {
  return (
    <div className=" px-2 600px:px-10 w-full">
      <h2 className=" text-2xl font-semibold">Analytics</h2>
      <h2 className=" mx-4 text-[20px] mt-5 font-medium text-[#383737]">
        Sales
      </h2>
      <div className="w-full py-2 flex gap-4 flex-wrap px-10">
        <div className="w-[8cm] border-2 border-black py-1 flex flex-col px-2">
          <span className=" font-medium">Today's sales</span>
          <span className=" text-4xl text-center my-3 font-bold">
            GHC 200.00
          </span>
        </div>
      </div>

      <h2 className=" mx-4 text-[20px] mt-10 font-medium text-[#383737]">
        Today's orders
      </h2>
      <div className="w-full py-2 flex gap-4 flex-wrap px-10">
        <div className="w-[8cm] border-2 border-black py-1 flex flex-col px-2">
          <div className="">
            <span className=" font-medium px-3 py-0 rounded-md text-white bg-emerald-700 capitalize">Confirmed</span>
          </div>
          <span className=" text-4xl text-center my-3 font-bold">
            46
          </span>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
