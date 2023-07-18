import React, { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

function MobileImageView() {
  const [activeImage, setactiveImage] = useState(0);

  const product = {
    category: "women's clothing",
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
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

  const handleActiveImage = (type) => {
    switch (type) {
      case "MOVE_RIGHT":
        moveImageRight();
        break;
      case "MOVE_LEFT":
        moveImageLeft();
        break;
      default:
        break;
    }
  };

  const moveImageRight = () => {
    if ((activeImage + 1) / product.images.length === 1) {
      setactiveImage(0);
    } else {
      setactiveImage((prev) => prev + 1);
    }
  };

  const moveImageLeft = () => {
    if (activeImage === 0) {
      setactiveImage(3);
    } else {
      setactiveImage((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col w-full 800px:hidden">
      <div className="overflow-hidden w-full 550px:w-[400px] rounded-2xl h-[400px] bg-white-500 self-center relative flex justify-center items-center">
        <img
          src={product.images[activeImage]}
          alt=""
          className="w-full h-full absolute top-0 left-0"
        />
        <div className="w-full py-2 z-10 flex justify-between">
          <button
            className="h-[1.1cm] w-[1.1cm] text-white bg-wine_primary rounded-2xl flex justify-center items-center text-xl shadow-2xl"
            onClick={() => handleActiveImage("MOVE_LEFT")}
          >
            <HiArrowLeft />
          </button>
          <button
            className="h-[1.1cm] w-[1.1cm] text-white bg-wine_primary rounded-2xl flex justify-center items-center text-xl shadow-2xl"
            onClick={() => handleActiveImage("MOVE_RIGHT")}
          >
            <HiArrowRight />
          </button>
        </div>
      </div>
      <div className="overflow-hidden flex justify-center flex-wrap gap-2 w-full 550px:w-[400px mt-2  self-center">
        {product.images.map((image, index) => {
          return (
            <button
              className={`col-span-1 ${
                activeImage === index ? "border-4 opacity-40" : "border"
              } border-wine_primary h-[45px] object-scale-down w-[50px] rounded-md overflow-hidden cursor-pointer `}
              onClick={() => setactiveImage(index)}
            >
              <img
                src={image}
                alt={`image-${index}`}
                className="h-full w-full object-scale-down"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MobileImageView;
