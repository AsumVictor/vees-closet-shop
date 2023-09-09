import React from "react";

function OrderStatus({ status }) {
  return (
    <div className="">
    <span
      className={`px-3 uppercase text-[13px] rounded-md text-white
    ${
      status === "delivered"
        ? "bg-emerald-600"
        : status === "processing"
        ? "bg-blue-600"
        : status === "cancelled"
        ? "bg-red-600"
        : null
    }
    
    `}
    >
      {status}
    </span>

    </div>
  );
}

export default OrderStatus;
