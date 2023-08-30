import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { HiMinus, HiPlus } from "react-icons/hi";
import ImageViewer from "../components/product/imageViewer";
import ProductCard from "../components/product/productCard";
import axios from "axios";
import server from "../server";

function ProductDetails() {
  const params = useParams();
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        setLoading(true);
        let res = await axios(`${server}product/get-product/${params.name}`);
        if (res.data.success) {
          setProduct(res.data.product);
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    const getRealtedProduct = async () => {
      try {
        let res = await axios(
          `${server}product/related-products?name=${params.name}`
        );
        if (res.data.success) {
          setRelatedProduct(res.data.products);
        }
      } catch (error) {}
    };
    getRealtedProduct();
    getProduct();
  }, [params.name]);

  if (loading) {
    return (
      <div className="py-40 mt-20 ">
        <h2 className="flex justify-center items-center">LOADING...</h2>
      </div>
    );
  }
  console.log(product);
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
        /<span>Product</span>/<span>{product.name}</span>
      </h2>

      <div className=" mt-10 grid md:grid-cols-2 grid-cols-1 gap-5">
        <div className=" py-2 px-3">
          <ImageViewer images={product.images} />
        </div>

        <div className="py-2 flex flex-col px-5 md:px-2">
          <h1 className="text-2xl capitalize">{product.name}</h1>
          <p className="mt-3 font-semibold flex flex-row gap-2  text-[20px]">
            <span className="price text-primary-600 ">
              ₵ {product.actual_price}
            </span>
            {product.base_price && (
              <del className="price text-[12px]"> ₵ {product.base_price}</del>
            )}
          </p>
          <p className="mt-3">{product.description}</p>
          {product.hasVariations && (
            <div className="w-full py-1 mt-5 flex flex-col gap-3">
              {product.variations.map((variant) => (
                <div className="">
                  <label
                    className=" capitalize"
                    htmlFor={variant.variation._id}
                  >
                    {variant.variation.name}:{" "}
                  </label>
                  <select
                    name={variant.variation._id}
                    id={variant.variation._id}
                    className="capitalize px-2 outline-none py-1 bg-white border border-black"
                  >
                    <option value="" className="capitalize">
                      Select {variant.variation.name}{" "}
                    </option>
                    {variant.selected_values.map((value) => (
                      <option value={value}>{value}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
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

      {relatedProduct.length > 0 && (
        <section className="w-full py-20 bg-white">
          <h2 className="mt-10 text-black 500px:text-center text-[22px] font-[500] px-3">
            You may like this products
          </h2>
          <div className="mt-3 grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
            {relatedProduct.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
