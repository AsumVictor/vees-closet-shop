import React, { useState } from "react";
import styles from "../styles/styles";
import DesktopImageView from "../components/imageView/DesktopImageView";
import MobileImageView from "../components/imageView/MobileImageView";
import { HiMinus, HiPlus } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ProductDetailPage() {
  const [value, setValue] = useState(0);
  const product = {
    category: "women's clothing",
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hememery",
    id: 18,
    images: [
      "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    ],
    price: 9.85,
    rating: { rate: 4.7, count: 130 },
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
  };

  const handleValueChange = (type) => {
    switch (type) {
      case "INCREMENT":
        incrementQuant();
        break;
      case "DECREMENT":
        decrementQuant();
        break;
      default:
        break;
    }
  };

  const incrementQuant = () => {
    setValue((prev) => prev + 1);
  };

  const decrementQuant = () => {
    if (value > 1) {
      setValue((prev) => prev - 1);
    }
  };

  return (
    <div className={`${styles.section} flex flex-col`}>
      <div className="w-full 800px:grid grid-cols-2 mt-10 ">
        <div className="w-full py-1">
          <DesktopImageView images={product.images} />
          <MobileImageView images={product.images} />
        </div>
        <div className=" w-full py-1 flex flex-col mt-10 800px:mt-0">
          <h2 className="font-bold text-2xl">{product.title}</h2>
          <p className="mt-10 font-semibold text-wine_dark_deep">
            {`${product.description.slice(0, 520)}...`}
          </p>
          <p className="text-2xl font-bold mt-6 text-wine_primary">
            GH₵ 300.00
          </p>
          <div className="flex flex-row flex-wrap gap-2 w-full mt-10">
            <ProductQuant value={value} handleValueChange={handleValueChange} />
            <button className="flex flex-row justify-center items-center w-full h-[40px] 550px:w-10/12 800px:w-5/12 text-xl font-semibold gap-2 py-1 px-2 bg-wine_primary rounded-md text-white hover:bg-wine_secondary">
              <AiOutlineShoppingCart />
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductQuant({ value, handleValueChange }) {
  return (
    <div className="flex flex-row bg-white_secondary justify-between px-12 800px:px-5 w-full h-[40px] 550px:w-10/12 800px:w-5/12 ">
      <button
        className=" text-wine_primary px-3 rounded-md"
        onClick={() => {
          handleValueChange("DECREMENT");
        }}
      >
        <HiMinus />
      </button>
      <p className="px-4  flex items-center justify-center font-semibold w-[1.5cm]">
        {value}
      </p>
      <button
        className=" text-wine_primary px-3 rounded-md"
        onClick={() => {
          handleValueChange("INCREMENT");
        }}
      >
        <HiPlus />
      </button>
    </div>
  );
}
export default ProductDetailPage;
