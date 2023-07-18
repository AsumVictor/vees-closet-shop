import React from "react";
import Cart from "../components/cart/Cart";
import CartSummary from "../components/cart/CartSummary";

function CartPage() {
  return (
    <div
      className={`w-full py-10 px-2 md:px-5 lg:px-10 relative grid gap-3 800px:grid-cols-10`}
    >
      <div className="py-2 800px:col-span-6 flex flex-col items-center px-2">
        <div className="w-full rounded-md pt-1 pb-5 bg-white px-2 800px:px-5">
          <h3 className="self-start font-bold text-xl">{`Shopping cart (6)`}</h3>
          <hr className="mt-2" />
          <Cart />
          <Cart />
          <Cart />
          <Cart />
        </div>
      </div>
      <div className="py-2 800px:col-span-4 relative  px-2 800px:px-5">
        <CartSummary />
      </div>
    </div>
  );
}

export default CartPage;


