import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/productCard";
import axios from "axios";
import server from "../server";
import PulseLoader from "../components/loaders/pulseLoader";
import { Helmet } from "react-helmet-async";
import Error from "../components/errorHandler/error";


function ShopWowomenPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let sort = searchParams.get("sort");
  let [products, setProducts] = useState(null);
  let [totalPages, setTotalPages] = useState(null);
  let [currentPage, setCurrentPage] = useState(page || 1);
  let [isLoading, setLoading] = useState(true);
  let [isError, setError] = useState(false);
  let [sortQuery, setSortQuery] = useState(sort || "");


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res = await axios(
          `${server}product/products-by-category?category=women&page=${currentPage}&sort=${sortQuery}`
        );
        if (res.data.success) {
          setProducts(res.data.products);
          setTotalPages(res.data.totalPages);
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
    fetchProducts();
    window.scrollTo(0, 0);
  }, [currentPage, sortQuery]);

  function handleSearchParams(key, value) {
    setSearchParams((prevParams) => {
      if ((value === null) | (value === "")) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  const goToNext = () => {
    if (currentPage / totalPages !== 1) {
      handleSearchParams("page", currentPage + 1);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      handleSearchParams("page", currentPage - 1);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const hanglePageChange = (data) => {
    if (data.toLowerCase() === "next") {
      goToNext();
    }
    if (data.toLowerCase() === "previous") {
      goToPrevious();
    }
  };

  const handleSort = (data) => {
    handleSearchParams("sort", data);
    setSortQuery(data);
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <PulseLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-20 py-10">
        <Error message={'Failed to load data'} />
      </div>
    );
  }

  return (
    <div className="py-20 w-full">
       <Helmet>
        <title>Shop high quality Women clothing - Vees closet </title>
        <meta
          name="description"
          content={`Explore our wide range of high-quality women clothing for every need. Find the perfect women fashion at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      <h2 className="flex flex-row gap-2 px-2 500px:px-10">
        <Link to={"/"} className="underline">
          Home
        </Link>
        /
        <Link to={"/shop"} className="underline">
          Shop
        </Link>
        /<span>Women</span>
      </h2>

      <h2 className="text-4xl mt-5 px-3 500px:px-10">Women</h2>

      <div className="mt-10 w-full px-2  py-2 flex flex-row justify-between 700px:px-10">
        <p>
          {` Showing ${1 + (Number(currentPage) - 1) * 12}–
          ${1 + (Number(currentPage) - 1) * 12 + 11} of ${
            products?.length
          } results`}
        </p>
        <select
          value={sortQuery}
          onChange={(e) => handleSort(e.target.value)}
          className="px-2 py-1 outline-none cursor-pointer bg-slate-200"
        >
          <option value={""}>Sort by default</option>
          <option value={"price_asc"}>Price: Lower to higher</option>
          <option value={"price_desc"}>Price: Higher to lower</option>
          <option value={"popularity"}>Sort by Popularity</option>
          <option value={"latest"}>Sort by latest</option>
        </select>
      </div>

      <section className="w-full py-20 bg-white">
      {products.length > 0 ? (
          <div className="grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-20 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
        ) : (
          <div className=" w-full py-10 flex justify-center items-center">
            <p className=" font-medium text-xl">No product found</p>
          </div>
        )}
      </section>
      <div className="w-full px-2 flex justify-center items-center">
        <button
          className={` ${
            currentPage <= 1 ? "hidden" : null
          } py-1 px-3 bg-black text-white`}
          onClick={() => hanglePageChange("previous")}
        >
          Previous page
        </button>
        <p className="flex justify-center px-2 gap-2">
          <span>{currentPage}</span>
          <span>/</span>
          <span>{totalPages}</span>
        </p>
        <button
          className={` ${
            currentPage / totalPages === 1 ? "hidden" : null
          } py-1 px-3 bg-black text-white`}
          onClick={() => hanglePageChange("next")}
        >
          Next page
        </button>
      </div>
    </div>
  );
}

export default ShopWowomenPage;
