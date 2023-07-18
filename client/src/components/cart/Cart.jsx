import { useState } from "react";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

function Cart() {
  const [value, setValue] = useState(1);

  return (
    <div className="w-full py-2 grid grid-cols-10 gap-x-3">
      <Link
        to="/products/item-details"
        className=" col-span-3 h-[3.5cm] overflow-hidden bg-white rounded-2xl"
      >
        <img
          src="./dressess.jpg"
          alt="dress"
          className="w-full h-full object-scale-down"
        />
      </Link>
      <Link to="/products/item-details" className=" col-span-7 py-1 800px:px-4">
        <h2 className="800px:text-[18px]">
          MBJ Women's Solid Short Sleeve Boat Neck V
        </h2>
        <p className="font-bold 800px:text-xl mt-5 flex flex-row gap-2">
          <span className="text-wine_primary ">GH₵ 300.00</span>
        </p>
        <p className="font-bold text-[16px] mt-2 flex flex-row gap-2">
          <span className="">{`Quantity: ${value}`}</span>
        </p>
      </Link>
      <div className=" col-span-full mt-7 flex flex-row justify-between">
        <button className="flex flex-row gap-1 px-2 text-[17px] text-red-600 items-center font-medium hover:bg-red-100 rounded-md py-1">
          <HiTrash />
          <span>Remove</span>
        </button>
        <div className="flex flex-row">
          <button
            className=" bg-wine_primary px-3 text-white rounded-md"
            onClick={() => {
              if (value > 1) {
                setValue((prev) => prev - 1);
              }
            }}
          >
            <HiMinus />
          </button>
          <p className="px-4 bg-white_secondary flex items-center justify-center font-semibold w-[1.5cm]">
            {value}
          </p>
          <button
            className=" bg-wine_primary px-3 text-white rounded-md"
            onClick={() => {
              setValue((prev) => prev + 1);
            }}
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
