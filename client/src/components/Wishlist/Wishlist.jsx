import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

function Wishlist() {
  return (
    <div className="w-full py-1 grid grid-cols-10 gap-x-3">
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
      <Link to="/products/item-details" className=" col-span-7 py-1 800px:px-4"  onClick={()=>{
        window.scrollTo(0,0)
      }}>
        <h2 className="800px:text-[18px]">
          MBJ Women's Solid Short Sleeve Boat Neck V
        </h2>
        <p className="font-bold 800px:text-xl mt-5 flex flex-row gap-2">
          <span className="text-wine_primary ">GH₵ 300.00</span>
        </p>
      </Link>
      <div className="col-span-full mt-7 flex flex-row justify-between">
        <button className="flex flex-row gap-1 px-2 text-[17px] text-red-600 items-center font-medium hover:bg-red-100 rounded-md py-1">
          <HiTrash />
          <span>Remove</span>
        </button>
        <button className="flex flex-row justify-center items-center px-4 h-[40px] text-xl font-semibold gap-2 py-1 bg-wine_primary rounded-md text-white hover:bg-wine_secondary">
          <AiOutlineShoppingCart />
          <span>Add to cart</span>
        </button>
      </div>
      <hr className=" col-span-full mt-3 mb-3" />
    </div>
  );
}

export default Wishlist;
