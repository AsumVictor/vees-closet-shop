import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/cartItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const navigate = useNavigate();
  const { items, totalCost, isError, isGettingCart, removing } = useSelector(
    (state) => state.cart
  );

  if (isGettingCart) {
    return (
      <div className="mt-20 py-10">
        <h1 className="text-center">LOADING CART DATA..</h1>
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-3 mt-10">
      {items.length < 1 ? (
        <div className=" col-span-full py-40 flex flex-col justify-center items-center">
          <h1 className="text-2xl">You have no item in cart</h1>
          <button
            type="button"
            className="px-3 py-2 bg-black text-white mt-10 font-medium"
            onClick={() => navigate("/shop")}
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <>
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
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>

          <div className="py-10 col-span-full 800px:col-span-1 px-5 ">
            <h1 className=" text-2xl capitalize">cart total</h1>
            <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
              <span>Subtotal</span>
              <span>{`₵ ${totalCost}`}</span>
            </h3>

            <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
            <ul>
              <li className=" grid grid-cols-10"></li>
            </ul>
            <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
            <button
              className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium"
              onClick={() => navigate("/checkout")}
            >
              proceed to checkout
            </button>
          </div>
        </>
      )}

      {removing && (
        <div className=" h-screen w-full top-0 left-0 bg-[#ffffff56] z-[10] fixed flex justify-center items-center font-bold">
          <span className="py-2 px-3 bg-white">Removing...</span>
        </div>
      )}
    </div>
  );
}

export default CartPage;
