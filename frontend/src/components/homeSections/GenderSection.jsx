import React from "react";
import { Link } from "react-router-dom";

function GenderSection() {
  return (
    <div className="w-full py-20 bg-white flex flex-row justify-center flex-wrap gap-20">
      <div className=" relative h-[10cm] w-[8cm] bg-primary-400">
        <div
          className="gender-category-card women absolute h-[10cm] w-[8cm] bg-white top-2 left-2 flex justify-end py-20 items-center flex-col"
          data-image-url=""
        >
          <h3 className="text-3xl font-bold text-white uppercase">WOMEN</h3>
          <Link
            to={"/shop/women"}
            className="px-4 py-1 bg-white text-xl font-semibold capitalize mt-10"
          >
            Shop now
          </Link>
        </div>
      </div>

      <div className=" relative h-[10cm] w-[8cm] bg-primary-400">
        <div
          className="gender-category-card men absolute h-[10cm] w-[8cm] bg-white top-2 left-2 flex justify-end py-20 items-center flex-col"
          data-image-url=""
        >
          <h3 className="text-3xl font-bold text-white uppercase">MEN</h3>
          <Link
            to={"/shop/men"}
            className="px-4 py-1 bg-white text-xl font-semibold capitalize mt-10"
          >
            Shop now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GenderSection;
