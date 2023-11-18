import React from "react";
import { Link, useNavigate } from "react-router-dom";

function OrderDetailsItem({ item, admin }) {
  const navigate = useNavigate();

  return (
    <div className=" w-full py-1 grid grid-cols-12 gap-2">
      <div className=" w-full py-1 col-span-4 450px:col-span-3 950px:col-span-3 1100px:col-span-2">
        <img
          className=" object-contain w-full"
          src={item.product.images[0].url}
          alt="img"
        />
      </div>
      <div className="px-2 w-full col-span-8 950px:col-span-7 1100px:col-span-8 flex flex-col gap-3">
        <Link
          to={`../../product/${item.product.name}`}
          className="font-medium text-[18px] cursor-pointer hover:underline"
        >
          {item.product.name}
        </Link>
        <div className="flex flex-col gap-1">
          {item.variation_choice &&
            Object.entries(item.variation_choice).map(([key, value]) => (
              <p className="flex text-[10px] flex-row gap-1" key={key}>
                <span className=" uppercase font-semibold">{key}:</span>
                <span className=" capitalize">{value}</span>
              </p>
            ))}
        </div>

        <p>QTY: {item.quantity}</p>
        <p className=" flex flex-row gap-3 ">
          <span className="price">GH₵ {item.product.actual_price}</span>
        </p>
      </div>
      <div className="w-full py-1 col-span-full 950px:col-span-2 1100px:col-span-2">
        {!admin && (
          <button
            className=" py-2 px-2 bg-deep-primary text-white text-center uppercase font-semibold w-full text-[15px]"
            onClick={() => {
              navigate(`../../product/${item.product.name}`);
            }}
          >
            By again
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderDetailsItem;
