import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import server from "../../../server";
import axios from "axios";
import OrderItem from "../OrderItem";
import PulseLoader from "../../loaders/pulseLoader";

function Orders() {
  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let sort = searchParams.get("sort");
  let [products, setProducts] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let [currentPage, setCurrentPage] = useState(page || 1);
  let [isLoading, setLoading] = useState(true);
  let [isError, setError] = useState(false);
  let [sortQuery, setSortQuery] = useState(sort || "");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let res = await axios(
          `${server}order/get-user-orders?page=${currentPage}&sort=${sortQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          setProducts(res.data.orders);
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
    handleSearchParams("status", data);
    setSortQuery(data);
  };

  if (isLoading) {
    return <PulseLoader />;
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>My Orders - Vees closet </title>
        <meta
          name="description"
          content={`Explore our wide range of high-quality clothing for every need. Find the perfect fashion at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">My Orders</h1>
      </div>

      <div className="mt-10 w-full py-2 flex flex-row justify-between px-2">
        <p>
          {` Showing ${1 + (Number(currentPage) - 1) * 20}–
          ${1 + (Number(currentPage) - 1) * 20 + 19} of ${
            products?.length
          } results`}
        </p>
        <select
          value={sortQuery}
          onChange={(e) => handleSort(e.target.value)}
          className={`px-2 py-1 outline-none cursor-pointer
           bg-gray-300          `}
        >
          <option value={""}>All</option>
          <option value={"pending"}>Pending</option>
          <option value={"processing"}>Processing</option>
          <option value={"shipped"}>Shipped</option>
          <option value={"refund"}>Refund</option>
          <option value={"cancelled"}>Cancelled</option>
          <option value={"delivered"}>Delivered</option>
        </select>
      </div>

      <div className=" flex flex-col w-full py-1 mt-5 px-2 gap-6">
        {products.map((order, index) => (
          <div
            className={`"w-full border ${
              (index + 1) % 2 === 0 ? "bg-gray-100" : ""
            } `}
            key={order._id}
          >
            <OrderItem
              _id={order._id}
              trackingID={order.tracking_no}
              status={order.status}
              date={order.date}
              totalItems={order.items}
            />
          </div>
        ))}
      </div>

      <div className="wkey={order._id}full mt-10 px-2 flex justify-center items-center">
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

export default Orders;
