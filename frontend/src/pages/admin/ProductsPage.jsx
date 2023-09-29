import React from "react";
import Product from "../../components/admin/product/product";

function ProductsPage() {
  return (
    <div className=" w-full bg-white py-1 px-3">
      <h1 className="text-2xl px-2 underline">All products in store</h1>
      <div className="w-full grid grid-cols-2 mt-10 px-2 600px:px-10">
        <h3 className="flex flex-row gap-2 order-2 500px:order-1">
          <span>Show</span>
          <select value={10} name="limit" id="limit">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <span>Items</span>
        </h3>
        <div className="border w-full col-span-full order-1 mb-4 500px:mb-0 500px:order-2 500px:col-span-1">
          <input type="search" name="product" id="product" className="w-full" />
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
    </div>
  );
}

export default ProductsPage;
