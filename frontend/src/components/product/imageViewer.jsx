import React, { useState } from "react";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

function imageViewer() {
  const [activeImage, setActiveImage] = useState(1);
  const images = [
    "https://assets.manufactum.de/p/204/204351/204351_01.jpg/mens-shirt-tencel.jpg",
    "https://m.media-amazon.com/images/I/91vyFFZvv+L._AC_UY580_.jpg",
    "https://m.media-amazon.com/images/I/71Hfqa8KgSL._AC_UF350,350_QL50_.jpg",
    "https://m.media-amazon.com/images/I/31HPN3gSrDL._SY500__AC_UF420%2C420_FMjpg_.jpg",
  ];

  const handleNextImage = () => {
    if (activeImage / images.length === 1) {
      setActiveImage(1);
      return;
    }
    setActiveImage((prev) => prev + 1);
  };

  const handlePrevImage = () => {
    if (activeImage === 1) {
      setActiveImage(images.length);
      return;
    }
    setActiveImage((prev) => prev - 1);
  };

  return (
    <div className="w-full py-2 grid grid-cols-10 gap-x-2">
      <div className="py-2 col-span-full 500px:col-span-2 flex flex-row 500px:flex-col gap-y-3 order-2 500px:order-1 flex-wrap justify-center gap-x-2">
        {images.map((image, index) => (
          <img
            key={image}
            onClick={() => setActiveImage(index + 1)}
            src={image}
            alt={`img-${index + 1}`}
            className={`w-[3cm] 500px:w-11/12 self-center ${
              activeImage === index + 1 && "opacity-25"
            }`}
          />
        ))}
      </div>
      <div className="py-2 col-span-full 500px:col-span-8 px-2 order-1 500px:order-2 flex relative justify-center items-center">
        <img
          src={images[activeImage - 1]}
          alt="img-active"
          className="w-full"
        />
        <div className="absolute text-gray-800 w-full left-0 py-1 flex justify-between">
          <button className="px-3 py-2" onClick={() => handlePrevImage()}>
            <MdOutlineArrowBackIosNew size={33} />
          </button>
          <button className="px-3 py-2" onClick={() => handleNextImage()}>
            <MdOutlineArrowForwardIos size={33} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default imageViewer;
