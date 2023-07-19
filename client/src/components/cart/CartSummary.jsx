import React from "react";
import { HiInformationCircle } from "react-icons/hi";

function CartSummary({totalPrice}) {
  return (
    <div className="pt-1 pb-5 shadow-2xl 800px:sticky 800px:top-[2.5cm] bg-white w-full px-2 550px:w-11/12 md:w-10/12 rounded-md">
      <h3 className="self-start font-bold text-xl">Cart Summary</h3>
      <hr className="mt-2" />
      <div className="flex flex-row justify-between items-center py-2">
        <span className="font-semibold">Subtotal</span>
        <span className="font-bold text-xl">{`GH₵ ${totalPrice.toFixed(2)}`}</span>
      </div>
      <hr className="mt-2" />
      <p className="flex flex-row items-center gap-2">
        <HiInformationCircle color="#2660A4" />
        <span>Shipping fee not included.</span>
      </p>
      <p className="flex flex-row items-center gap-2">
        <HiInformationCircle color="#2660A4" />
        <span> Free shipping available by area.</span>
      </p>
      <p className="flex flex-row items-center gap-2">
        <HiInformationCircle color="#2660A4" />
        <span>Coupon for reduced shipping costs.</span>
      </p>
      <hr className="mt-1" />
      <button className="py-1 w-full bg-wine_primary rounded-md text-white font-bold mt-3">{`CHECKOUT (GH₵ ${totalPrice.toFixed(2)})`}</button>
    </div>
  );
}

export default CartSummary;
