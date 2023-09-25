import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/productCard";
import axios from "axios";
import server from "../server";
import PulseLoader from "../components/loaders/pulseLoader";


function ShopPage() {
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
        let res = await axios(`${server}product/get-all-products?page=${currentPage}&sort=${sortQuery}`);
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

  return (
    <div className="py-20 w-full">
      <h2 className="flex flex-row gap-2 px-2 500px:px-10">
        <Link to={"/"} className="underline">
          Home
        </Link>
        /<span>Shop</span>
      </h2>

      <h2 className="text-4xl mt-5 px-3 500px:px-10">Shop</h2>

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
        <div className="grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-20 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
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

export default ShopPage;
