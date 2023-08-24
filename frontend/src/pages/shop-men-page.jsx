import React from 'react'
import ReactPaginate from 'react-paginate';
import ProductCard from '../components/product/productCard';
import { Link } from 'react-router-dom';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

function ShopMenPage() {
    const hanglePageChange = (data) => {
        console.log(data.seleted);
      };
    
      return (
        <div className="py-20 w-full">
          <h2 className="flex flex-row gap-2 px-2 500px:px-10">
            <Link to={"/"} className="underline">
              Home
            </Link>
            /<Link to={"/shop"} className="underline">
              Shop
            </Link>
            /<span>Men</span>
          </h2>
          <h2 className="text-4xl mt-5 px-3 500px:px-10">Men clothing</h2>
          <div className="mt-10 w-full px-2  py-2 flex flex-row justify-between 700px:px-10">
            <p>Showing 1–12 of 90 results</p>
            <select
              value={"1"}
              className="px-2 py-1 outline-none cursor-pointer bg-slate-200"
            >
              <option option={"1"}>Sort by default</option>
              <option value={"2"}>Price: Lower to higher</option>
              <option>Price: Higher to lower</option>
              <option>Sort by Popularity</option>
              <option>Sort by latest</option>
            </select>
          </div>
          <section className="w-full py-20 bg-white">
            <div className="grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </section>
          <div className="w-full px-2 flex justify-center">
            <ReactPaginate
              breakLabel=".."
              nextLabel={<MdArrowForwardIos size={28} />}
              previousLabel={<MdArrowBackIos size={28} />}
              pageCount={60}
              onPageActive={hanglePageChange}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              containerClassName="flex flex-row w-full 600px:w-8/12 justify-center"
              pageClassName="py-1 px-3 bg-black mx-1 text-white"
              activeClassName=" bg-primary-600"
              disabledClassName=" invisible"
            />
          </div>
        </div>
        )
}

export default ShopMenPage