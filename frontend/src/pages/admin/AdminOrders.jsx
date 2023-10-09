import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import OrderItem from "../../components/account/OrderItem";
import PulseLoader from "../../components/loaders/pulseLoader";
import Error from "../../components/errorHandler/error";
import server from "../../server";

function AdminOrders() {
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
          `${server}order/get-orders?page=${currentPage}&sort=${sortQuery}`,
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

  if (isError) {
    return (
      <div className="mt-20 py-10">
        <Error message={"Failed to load data"} />
      </div>
    );
  }

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
          {` Showing ${1 + (Number(currentPage) - 1) * 20}–
          ${1 + (Number(currentPage) - 1) * 20 + 19} of ${
            products?.length
          } results`}
        </p>
        <select
          value={sortQuery}
          onChange={(e) => {
            handleSearchParams("page", 1);
            setCurrentPage(1);
            handleSort(e.target.value);
          }}
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

      {totalPages > 0 && (
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
            className={` ${currentPage / totalPages === 1 ? "hidden" : null} ${
              totalPages === 0 ? "hidden" : null
            } py-1 px-3 bg-black text-white`}
            onClick={() => hanglePageChange("next")}
          >
            Next page
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;
