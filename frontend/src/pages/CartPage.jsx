import React from "react";
import CartItem from "../components/cart/cartItem";

function CartPage() {
  return (
    <div className=" grid grid-cols-3 mt-10">
      <div className="py-10 col-span-full 800px:col-span-2 text-black">
        <h1 className="px-10  text-2xl">Shopping cart</h1>
        <div className=" grid grid-cols-12 px-3 1000px:px-10 mt-10">
          <div className=" py-2 col-span-8 uppercase font-semibold text-[13px]">
            Products
          </div>
          <div className="hidden 1000px:block py-2 col-span-1 uppercase font-semibold text-[13px]">
            price (₵)
          </div>
          <div className="py-2 col-span-4 1000px:col-span-2 uppercase font-semibold text-[13px] ">
            quantity
          </div>
          <div className=" hidden 1000px:block py-2 col-span-1 uppercase font-semibold text-[13px]">
            subtotal (₵)
          </div>
          <hr className=" col-span-full h-[0.04cm] bg-slate-200" />
        </div>
        <div className="w-full flex flex-col">
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
      </div>

      <div className="py-10 col-span-full 800px:col-span-1 px-5 ">
        <h1 className=" text-2xl capitalize">cart total</h1>
        <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
          <span>Subtotal</span>
          <span>₵ 200.00</span>
        </h3>

        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        <ul>
            <li className=" grid grid-cols-10">
                
            </li>
        </ul>
        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        <button className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium">
          proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CartPage;
