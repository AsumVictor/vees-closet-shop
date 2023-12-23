import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiBan, HiMinus, HiPlus } from "react-icons/hi";
import ImageViewer from "../components/product/imageViewer";
import ProductCard from "../components/product/productCard";
import axios from "axios";
import server from "../server";
import checkVariantEmpty from "../helpers/checkVariantEmpty";
import { getCart, addItemToCart } from "../redux/actions/cart";
import { useDispatch } from "react-redux";
import PulseLoader from "../components/loaders/pulseLoader";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import Error from "../components/errorHandler/error";

function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);
  const [addedToCard, setAddedToCard] = useState(false);
  const [cartData, setCartData] = useState({
    _id: null,
    qty: 1,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const getProduct = async () => {
      try {
        setLoading(true);
        let res = await axios(`${server}product/get-product/${params.name}`);
        if (res.data.success) {
          setProduct(res.data.product);
          setLoading(false);
          setCartData((prev) => {
            if (!res.data.product.hasVariations) {
              return {
                ...prev,
                _id: res.data.product._id,
              };
            }
            let variants = {};
            for (const v of res.data.product.variations) {
              let name = v.variation.name;
              variants = {
                ...variants,
                [name]: "",
              };
            }
            return {
              ...prev,
              _id: res.data.product._id,
              variation: variants,
            };
          });
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
    setSubmissionError(null);
    getRealtedProduct();
    getProduct();
  }, [params.name]);

  const addToCart = async () => {
    setSubmissionError(null);
    try {
      if (cartData.qty < 1) {
        return;
      }
      if (product.hasVariations) {
        let res = checkVariantEmpty(cartData.variation);
        if (res.isEmptyKeys) {
          setSubmissionError(
            `Select a variant(s) for the product. ${res.keys.map(
              (key) => `{${key}}`
            )}`
          );
          return;
        }
      }
      setIsAdding(true);
      dispatch(
        addItemToCart({
          _id: cartData._id,
          quantity: cartData.qty,
          variation: cartData.variation,
        })
      );
      setIsAdding(false);
      setAddedToCard(true);
      setTimeout(() => {
        setAddedToCard(false);
      }, 3000);
    } catch (error) {
      setIsAdding(false);
      let errMsg = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(errMsg, {
        toastId: "addToCart",
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-20 ">
        <PulseLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-20 py-10">
        <Error message={"Failed to load data"} />
      </div>
    );
  }

  return (
    <div className="w-full py-20 relative">
      <Helmet>
        <title>{product.name} - Vees closet </title>
        <meta
          name="description"
          content={`${product.description}. Find the perfect ${product.name} at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      {addedToCard && (
        <div
          onClick={() => navigate("/cart")}
          className="mt-16 py-2 grid grid-cols-12 bg-white border-emerald-700 border fixed z-50 left-0 w-full top-0 px-3"
        >
          <p className=" col-span-8 py-1 750px:text-right 750px:px-20">
            Added "{product.name.slice(0, 15) + "..."}" to cart
          </p>
          <div className=" col-span-4 ">
            <button className="py-1 bg-deep-primary text-white uppercase px-3">
              View cart
            </button>
          </div>
        </div>
      )}
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

        <div className="py-4 flex flex-col px-5 md:px-2">
          <h1 className="text-2xl font-medium capitalize">{product.name}</h1>
          <p className="mt-3 font-semibold flex flex-row gap-2  text-[20px]">
            <span className="price text-primary-600 ">
              GH₵ {product.actual_price.toFixed(2)}
            </span>
            {product.base_price && (
              <del className="price text-[12px]">
                GH₵ {product.base_price.toFixed(2)}
              </del>
            )}
          </p>
          <p className="mt-3">{product.description}</p>
          {product.hasVariations && (
            <div className="w-full py-1 mt-5 flex flex-col gap-3">
              {product.variations.map((variant) => (
                <div className="" key={variant._id}>
                  <label
                    className=" capitalize"
                    htmlFor={variant.variation._id}
                  >
                    {variant.variation.name}:
                  </label>
                  <select
                    name={variant.variation.name}
                    id={variant.variation._id}
                    onChange={(e) => {
                      setCartData((prev) => {
                        let name = variant.variation.name;
                        return {
                          ...prev,
                          variation: {
                            ...prev.variation,
                            [name]: e.target.value,
                          },
                        };
                      });
                      setSubmissionError(null);
                    }}
                    className="capitalize px-2 outline-none py-1 bg-white border border-black"
                  >
                    <option value="" className="capitalize">
                      Select {variant.variation.name}
                    </option>
                    {variant.selected_values.map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          )}
          {submissionError && (
            <h2 className="text-red-500 mt-2 font-medium">{submissionError}</h2>
          )}
          <div className="flex flex-row mt-5">
            <button
              type="button"
              className="px-2 py-1 border-2 border-black "
              onClick={() => {
                if (cartData.qty > 1) {
                  setCartData((prev) => {
                    return {
                      ...prev,
                      qty: prev.qty - 1,
                    };
                  });
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
              value={cartData.qty}
              onChange={(e) =>
                setCartData((prev) => {
                  let qty = parseInt(e.target.value);
                  return {
                    ...prev,
                    qty: qty,
                  };
                })
              }
              min={1}
              className="border-2 border-black text-center px-2 py-1 outline-none invalid:border-red-600 w-[2cm]"
            />
            <button
              type="button"
              className="px-2 py-1 border-2 border-black "
              onClick={() =>
                setCartData((prev) => {
                  return {
                    ...prev,
                    qty: prev.qty + 1,
                  };
                })
              }
            >
              <HiPlus />
            </button>
          </div>

          {product.qty_in_stock < 1 ? (
            <div className=" mt-10 flex gap-2 items-center justify-center  top-3 left-2 px-3 py-2 bg-red-400 font-medium text-white">
              <HiBan size={22} />
              Out of Stock
            </div>
          ) : (
            <button
              type="button"
              disabled={isAdding}
              onClick={() => addToCart()}
              className="w-full uppercase py-2 mt-5 text-white bg-black font-medium disabled:opacity-50"
            >
              {isAdding ? "Adding..." : "add to cart"}
            </button>
          )}
        </div>
      </div>

      {product.rich_description && (
        <section className="w-full px-3">
          <h2 className="mt-10 text-slate-800 text-[22px] font-[500] px-3 500px:px-10  underline underline-offset-4 decoration-primary-800">
            Description
          </h2>
          <div className="w-full 700px:w-9/12 mt-3 px-3 500px:px-10 "
            dangerouslySetInnerHTML={{__html: product.rich_description}}
          />
        </section>
      )}

      {relatedProduct.length > 0 && (
        <section className="w-full py-20 bg-white">
          <h2 className="mt-10 text-black 500px:text-center text-[22px] font-[500] px-3">
            You may like this products
          </h2>
          <div className="mt-3 grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
            {relatedProduct.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
