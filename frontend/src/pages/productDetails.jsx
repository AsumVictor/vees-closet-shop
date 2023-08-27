import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiMinus, HiPlus } from "react-icons/hi";
import ImageViewer from "../components/product/imageViewer";
import ProductCard from "../components/product/productCard";

function ProductDetails() {
  const [qty, setQty] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

      <div className=" mt-10 grid md:grid-cols-2 grid-cols-1 gap-5">
        <div className=" py-2 px-3">
          <ImageViewer />
        </div>

        <div className="py-2 flex flex-col px-5 md:px-2">
          <h1 className="text-2xl capitalize">Product Name</h1>
          <p className="mt-3 font-semibold flex flex-row gap-2 text-primary-600  text-[20px]">
            <span className="price"> ₵ 300.00</span>
            <del className="price text-[12px]"> ₵ 300.00</del>
          </p>
          <p className="mt-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
            reprehenderit itaque, asperiores consequuntur voluptatibus nesciunt
            placeat aperiam aliquid cum temporibus magnam? Ad, inventore
            dignissimos unde impedit cumque laboriosam ipsum ipsam!
          </p>
          <div className="w-full py-1 mt-5 flex flex-col gap-3">
            <div className="">
              <label htmlFor="size">Size: </label>
              <select
                name="size"
                id="size"
                className="capitalize px-2 outline-none py-1 bg-white border border-black"
              >
                <option value="" className="capitalize">
                  Select size
                </option>
                <option value="XXS">XXS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div className="">
              <label htmlFor="color">Color: </label>
              <select
                name="color"
                id="color"
                className="capitalize px-2 outline-none py-1 bg-white border border-black"
              >
                <option value="" className="capitalize">
                  Select color
                </option>
                <option value="Blue">Blue</option>
                <option value="Red">Red</option>
                <option value="Brown">Brown</option>
              </select>
            </div>
          </div>
          <div className="flex flex-row mt-5">
            <button
              type="button"
              className="px-2 py-1 border-2 border-black "
              onClick={() => {
                if (qty > 1) {
                  setQty((prev) => prev - 1);
                }
                return;
              }}
            >
              <HiMinus />
            </button>
            <input
              type="number"
              name="qty"
              id="qty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              min={1}
              className="border-2 border-black text-center px-2 py-1 outline-none invalid:border-red-600 w-[2cm]"
            />

            <button
              type="button"
              className="px-2 py-1 border-2 border-black "
              onClick={() => setQty((prev) => prev + 1)}
            >
              <HiPlus />
            </button>
          </div>
          <button
            type="button"
            className="w-full uppercase py-2 mt-5 text-white bg-black font-medium"
          >
            add to cart
          </button>
        </div>
      </div>

      <section className="w-full py-20 bg-white">
        <h2 className="mt-10 text-black 500px:text-center text-[22px] font-[500] px-3">
          You may like this products
        </h2>
        <div className="mt-3 grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
