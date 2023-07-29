import { useState } from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

function Cart({ data, quantityChangeHandler, removeFromCartHandler }) {
  const productUrl = data.name.replace(/\s+/g, "-");

  const [value, setValue] = useState(data.qty);
  const totalPrice = data.priceWithDiscount * value;

  const increment = (data) => {
    setValue(prev =>prev + 1);
    const updateCartData = { ...data, qty: value + 1 };
    quantityChangeHandler(updateCartData);
  };

  const decrement = (data) => {
    if (value > 1) {
      setValue((prev) => prev - 1);
      const updateCartData = { ...data, qty: value - 1 };
      quantityChangeHandler(updateCartData);
    }
  };

  return (
    <div className="w-full py-2 grid grid-cols-10 gap-x-3">
      <Link
        to={`/products/${productUrl}`}
        className=" col-span-3 h-[3.5cm] overflow-hidden bg-white rounded-2xl"
      >
        <img
          src={data.images[0].url}
          alt={data.name}
          className="w-full h-full"
        />
      </Link>
      <Link
        to={`/products/${productUrl}`}
        className=" col-span-7 py-1 800px:px-4"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <h2 className="800px:text-[18px]">{data.name}</h2>
        <p className="mt-5 flex flex-row gap-2">
          <span className="text-wine_primary font-bold  800px:text-xl ">{`GH₵ ${data.priceWithDiscount.toFixed(2)}`}</span>
          <span className=" text-wine_dark_deep font-semibold">{`* ${value}`}</span>{" "}
        </p>
        <p className="font-bold text-[16px] mt-2 flex flex-row gap-2">
          <span className="">{`Total: GH₵ ${totalPrice.toFixed(2)}`}</span>
        </p>
      </Link>
      <div className=" col-span-full mt-7 flex flex-row justify-between">
        <button
          className="flex flex-row gap-1 px-2 text-[17px] text-red-600 items-center font-medium hover:bg-red-100 rounded-md py-1"
          onClick={() => removeFromCartHandler(data)}
        >
          <HiTrash />
          <span>Remove</span>
        </button>
        <div className="flex flex-row">
          <button
            className=" bg-wine_primary px-3 text-white rounded-md"
            onClick={() => decrement(data)}
          >
            <HiMinus />
          </button>
          <p className="px-4 bg-white_secondary flex items-center justify-center font-semibold w-[1.5cm]">
            {data.qty}
          </p>
          <button
            className=" bg-wine_primary px-3 text-white rounded-md"
            onClick={() => increment(data)}
          >
            <HiPlus />
          </button>
        </div>
      </div>
      <hr className=" col-span-full mt-3 mb-3" />
    </div>
  );
}

export default Cart;
