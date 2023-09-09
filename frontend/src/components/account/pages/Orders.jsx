import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import server from "../../../server";
import axios from "axios";
import OrderItem from "../OrderItem";

function Orders() {
  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let sort = searchParams.get("sort");
  let [products, setProducts] = useState(null);
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
          `${server}product/products-by-category?category=men&page=${currentPage}&sort=${sortQuery}`
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

  return (
    <div className="w-full">
      <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">My Orders</h1>
      </div>

      <div className="mt-10 w-full py-2 flex flex-row justify-between px-2">
        <p>
          {` Showing ${1 + (Number(currentPage) - 1) * 12}–
          ${1 + (Number(currentPage) - 1) * 12 + 11} of ${
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
          <option value={"delevered"}>Delivered</option>
          <option value={"cancelled"}>Cancelled</option>
          <option value={"processing"}>Processing</option>
        </select>
      </div>

      <div className=" flex flex-col w-full py-1 mt-5 px-2 gap-4">
        <OrderItem _id={1} trackingID={'AY83909E'} status={'cancelled'} date={'593403404238'} totalItems={7} />
      </div>

      <div className="w-full mt-10 px-2 flex justify-center items-center">
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
