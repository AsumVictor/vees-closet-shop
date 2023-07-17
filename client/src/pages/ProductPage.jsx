import styles from "../styles/styles";
import Products from "../components/sections/Products";
import { categoriesData, productData } from "../static/data";
import Pagination from "../components/pagination/Pagination.jsx";
import DropDown from '../components/Layout/DropDown'
import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";

function ProductPage() {

const [dropDown, setDropDown] = useState(false);

  return (
    <div className={`${styles.section}`}>
      <div className="h-[1.1cm] w-full bg-white rounded-md mt-1 flex flex-row justify-center items-center gap-2">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search items by name ..."
          className="w-8/12 border-2 px-4  border-wine_primary h-[0.8cm] rounded-md outline-none"
        />
        <button className="px-3 bg-wine_primary text-white h-[0.8cm] rounded-md">
          Search
        </button>
      </div>
      <h3 className="my-10 font-bold">{`All products (43)`}</h3>
      <Products productsData={productData} />
      <Pagination
        currentPage={1}
        totalPage={4}
        prevAction={() => console.log("Prev")}
        nextAction={() => console.log("next")}
      />
       <button onClick={() => setDropDown(!dropDown)}>
            <div className="fixed -bottom-1 h-[50px] left-0 mt-[10px] w-full block 1000px:hidden">
              <BiMenuAltLeft size={30} className="absolute top-2 left-2" />
              <button
                className={`h-[90%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              <IoIosArrowUp
                size={20}
                className="absolute right-2 top-4 cursor-pointer"
                onClick={() => setDropDown(!dropDown)}
              />
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  extendclass={'bottom-14'}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </button>
    </div>
  );
}

export default ProductPage;
