import React, { useEffect, useState } from "react";
import Product from "../../components/admin/product/product";
import server from "../../server";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

function ProductsPage() {
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
    window.scrollTo(0, 0);
  }, [currentPage, sortQuery]);

  return (
    <div className=" w-full bg-white py-1 px-3 pb-10">
      <h1 className="text-2xl px-2 underline">All products in store</h1>

      <div className="w-full grid grid-cols-2 mt-10 px-2 600px:px-10">
        <h3 className="flex flex-row gap-2 order-2 500px:order-1 items-center">
          <span>Show</span>
          <select value={10} name="limit" id="limit">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>products</span>
        </h3>
        <div className="border w-full col-span-full order-1 mb-4 500px:mb-0 500px:order-2 500px:col-span-1 grid grid-cols-12 h-[1cm]">
          <input
            type="search"
            name="product"
            id="product"
            className="w-full col-span-8 1000px:col-span-10 outline-none border-0 px-2"
          />

          <button
            type="button"
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
          <select name="limit" id="limit">
            <option>Newest</option>
            <option>Oldest</option>
            <option>Recently updated</option>
            <option>Name: ascending</option>
            <option>Name: decending</option>
            <option>Price: ascending</option>
            <option>Price: decending</option>
            <option>Stocks: ascending</option>
            <option>Stocks: decending</option>
          </select>
        </h3>

        <hr className=" mt-3 col-span-full" />
      </div>

      <div className=" py-1 w-full mt-10 flex flex-wrap justify-center gap-5">
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
        <Product />
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
