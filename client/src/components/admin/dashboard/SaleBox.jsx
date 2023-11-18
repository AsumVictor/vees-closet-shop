import React from "react";

function SaleBox({ title, amount }) {
  return (
    <div className="rounded-md w-[8cm] border-2 border-black py-1 flex flex-col px-2">
      <span className=" font-medium">{title}</span>
      <span className=" text-[28px] text-center my-3 font-bold">
        {amount === null ? "..." : `GHC ${amount.toFixed(2)}`}
      </span>
    </div>
  );
}

export default SaleBox;
