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
        : status === "pending"
        ? "bg-blue-600"
        : status === "shipped"
        ? "bg-emerald-400"
        : status === "refund"
        ? "bg-orange-600"
        : null

        // "pending",
        // "processing",
        // "shipped",
        // "delivered",
        // "refund",
        // "cancelled",
    }
    
    `}
    >
      {status}
    </span>

    </div>
  );
}

export default OrderStatus;
