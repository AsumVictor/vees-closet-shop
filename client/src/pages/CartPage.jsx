import React from "react";
import Cart from "../components/cart/Cart";
import CartSummary from "../components/cart/CartSummary";
import { useSelector, useDispatch } from "react-redux";
import NoCartItem from "../components/cart/NoCartItem";
import { addTocart, removeFromCart } from "../redux/actions/cart";

function CartPage() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalAmount = cart.reduce((accumulator, item) => {
    return accumulator + item.price * item.qty;
  }, 0);

  const quantityChangeHandler = (data) => {
    dispatch(addTocart(data));
  };

  return (
    <>
      {cart && cart.length !== 0 ? (
        <div
          className={`w-full py-10 px-2 md:px-5 lg:px-10 relative grid gap-3 800px:grid-cols-10`}
        >
          <div className="py-2 800px:col-span-6 flex flex-col items-center px-2">
            <div className="w-full rounded-md pt-1 pb-5 bg-white px-2 800px:px-5">
              <h3 className="self-start font-bold text-xl">{`Shopping cart (${cart.length})`}</h3>
              <hr className="mt-2" />
              {cart.map((i, index) => (
                <Cart
                  key={index}
                  data={i}
                  quantityChangeHandler={quantityChangeHandler}
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))}
            </div>
          </div>
          <div className="py-2 800px:col-span-4 relative  px-2 800px:px-5">
            <CartSummary totalPrice={totalAmount} />
          </div>
        </div>
      ) : (
        <NoCartItem />
      )}
    </>
  );
}

export default CartPage;
