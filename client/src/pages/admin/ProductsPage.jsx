import React, { useEffect, useState } from "react";
import Product from "../../components/admin/product/product";
import server from "../../server";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import PulseLoader from "../../components/loaders/pulseLoader";
import Error from "../../components/errorHandler/error";
 
function ProductsPage() {
  let [searchParams, setSearchParams] = useSearchParams();
  let page = searchParams.get("page");
  let sort = searchParams.get("sort");
  let limit = searchParams.get("limit");

  let [products, setProducts] = useState(null);
  let [totalPages, setTotalPages] = useState(null);
  let [searchTerm, setSearchTerm] = useState(" ");
  let [isLoading, setLoading] = useState(true);
  let [isError, setError] = useState(false);
  let [currentPage, setCurrentPage] = useState(page || 1);
  let [sortQuery, setSortQuery] = useState(sort || "");
  let [Searchlimit, setLimit] = useState(limit || 20);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await axios(
        `${server}product/get-products?page=${currentPage}&sort=${sortQuery}&limit=${limit}&q=${searchTerm}`
      , {
        withCredentials: true,
      });
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

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [currentPage, sortQuery, Searchlimit]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      fetchProducts();
      window.scrollTo(0, 0);
    }
  }, [searchTerm]);

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

  const handleLimit = (data) => {
    handleSearchParams("limit", data);
    setLimit(data);
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
    <div className=" w-full bg-white py-1 px-3 pb-10">
      <h1 className="text-2xl px-2 underline">All products in store</h1>

      <div className="w-full grid grid-cols-2 mt-10 px-2 600px:px-10">
        <h3 className="flex flex-row gap-2 order-2 500px:order-1 items-center">
          <span>Show</span>
          <select
            value={Searchlimit}
            name="limit"
            id="limit"
            onChange={(e) => handleLimit(e.target.value)}
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
          <span>products</span>
        </h3>
        <div className="border w-full col-span-full order-1 mb-4 500px:mb-0 500px:order-2 500px:col-span-1 grid grid-cols-12 h-[1cm]">
          <input
            type="search"
            name="product"
            id="product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full col-span-8 1000px:col-span-10 outline-none border-0 px-2"
          />

          <button
            type="button"
            onClick={() => {
              if (searchTerm.trim() !== "") {
                fetchProducts();
              }
            }}
            className="px-2 bg-black text-white col-span-4 1000px:col-span-2"
          >
            Search
          </button>
        </div>
        <hr className=" mt-3 col-span-full order-3" />
      </div>

      <div className="w-full grid  mt-3 px-2 600px:px-10">
        <h3 className="flex flex-row gap-2">
          <span>Sort according to:</span>
          <select
            value={sortQuery}
            name="sort"
            id="sort"
            onChange={(e) => {
              handleSort(e.target.value);
            }}
          >
            <option value={"newest"}>Newest</option>
            <option value={"oldest"}>Oldest</option>
            <option value={"recent_update"}>Recently updated</option>
            <option value={"name_asc"}>Name: ascending</option>
            <option value={"name_desc"}>Name: decending</option>
            <option value={"price_asc"}>Price: ascending</option>
            <option value={"price_desc"}>Price: decending</option>
            <option value={"stock_asc"}>Stocks: ascending</option>
            <option value={"stock_desc"}>Stocks: decending</option>
          </select>
        </h3>

        <hr className=" mt-3 col-span-full" />
      </div>

      <div className=" py-1 w-full mt-10 flex flex-wrap justify-center gap-5">
        {products.length < 1 ? (
          <p className=" font-medium text-xl">No product found</p>
        ) : (
          products.map((product) => (
            <Product product={product} key={product._id} />
          ))
        )}
      </div>

      <div className="w-full px-2 mt-10 flex justify-center items-center">
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

export default ProductsPage;
