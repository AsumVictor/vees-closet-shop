import React, { useState } from "react";

export function DesktopImageView() {
  const product = {
    category: "women's clothing",
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    id: 18,
    images: [
      "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
      "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
      "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
      "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    ],
    price: 9.85,
    rating: { rate: 4.7, count: 130 },
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
  };
  const [activeImage, setactiveImage] = useState(0);
  return (
    <>
      <div className="hidden 800px:flex flex-col">
        <div className="overflow-hidden w-[370px] rounded-2xl h-[400px] bg-yellow-500 self-center">
          <img
            src={product.images[activeImage]}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="overflow-hidden grid grid-cols-4 gap-2 w-[370px] mt-2  self-center">
          {product.images.map((image, index) => {
            return (
              <button
                className={`col-span-1 ${
                  activeImage === index ? "border-4" : "border"
                } border-wine_primary h-[90px] rounded-md overflow-hidden cursor-pointer `}
                onClick={() => setactiveImage(index)}
              >
                <img
                  src={image}
                  alt={`image-${index}`}
                  className="h-full w-full"
                />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
