import React, { useState } from "react";

function DesktopImageView({images}) {

  const [activeImage, setactiveImage] = useState(0);
  return (
    <>
      <div className="hidden 800px:flex flex-col">
        <div className="overflow-hidden w-[370px] rounded-2xl h-[400px] self-center">
          <img
            src={images[activeImage].url}
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="overflow-hidden grid grid-cols-4 gap-2 w-[370px] mt-2  self-center">
          {images.map((image, index) => {
            return (
              <button
                className={`col-span-1 ${
                  activeImage === index ? "border-4" : "border"
                } border-wine_primary h-[90px] rounded-md overflow-hidden cursor-pointer `}
                onClick={() => setactiveImage(index)}
              >
                <img
                  src={image.url}
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

export default DesktopImageView