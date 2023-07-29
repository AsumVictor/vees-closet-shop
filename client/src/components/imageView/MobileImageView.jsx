import React, { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

function MobileImageView({ images }) {
  const [activeImage, setactiveImage] = useState(0);

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
    if ((activeImage + 1) / images.length === 1) {
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
      <div className="overflow-hidden w-full 550px:w-[400px] rounded-2xl h-[400px] self-center relative flex justify-center items-center">
        <img
          src={images[activeImage].url}
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
        {images.map((image, index) => {
          return (
            <button
              className={`col-span-1 ${
                activeImage === index ? "border-4 opacity-40" : "border"
              } border-wine_primary h-[45px] object-scale-down w-[50px] rounded-md overflow-hidden cursor-pointer `}
              onClick={() => setactiveImage(index)}
            >
              <img
                src={image.url}
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
