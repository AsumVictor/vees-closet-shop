import React from "react";
import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div className="w-full py-20">
      <h2 className="flex flex-row gap-2 px-2 500px:px-10">
        <Link to={"/"} className="underline">
          Home
        </Link>
        /
        <Link to={"/shop"} className="underline">
          Shop
        </Link>
        /<span>Product</span>/<span>Product Name</span>
      </h2>
    </div>
  );
}

export default ProductDetails;
