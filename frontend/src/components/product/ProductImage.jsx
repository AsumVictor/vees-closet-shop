import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";


function ProductImage({ image, handleIMageDelete }) {
  return (
    <div className=" w-[210px] py-1 border px-2 relative">
      <div className="w-full bg-white py-1">
        <img src={image.url} alt="product-img" className="w-full" />
      </div>
      <button className=" absolute top-0 right-0">
        <AiFillCloseCircle
          size={27}
          cursor={"pointer"}
          onClick={() => handleIMageDelete()}
        />
      </button>
    </div>
  );
}

export default ProductImage;
