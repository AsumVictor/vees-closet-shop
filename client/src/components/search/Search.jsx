import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import useProductSearch from "../../hooks/useProductSearch";

export function SearchIcon({ handleSearch }) {
  return (
    <button type="button" onClick={handleSearch} className=" cursor-pointer">
      <IoSearchOutline size={22} />
    </button>
  );
}

export const Search = ({ handleSearch }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("xq") || ""
  );
  const [isError, setIsError] = useState(false);
  const { error, isLoading, suggestions } = useProductSearch(searchQuery);
  useEffect(() => {
    localStorage.setItem("xq", searchQuery);
  }, [searchQuery]);

  return (
    <div className="w-full 750px:w-1/2 750px:mx-0 bg-white border absolute h-[1cm] right-0 grid rounded-tl-md rounded-bl-md">
      <div className="w-full h-[1cm] right-0 grid grid-cols-10 rounded-tl-md rounded-bl-md gap-1">
        <button
          onClick={handleSearch}
          type="button"
          className=" w-[1cm] flex justify-center items-center rounded-md h-full font-bold"
        >
          <TfiClose size={20} />
        </button>
        <div className=" col-span-7 h-full">
          <input
            value={searchQuery}
            onChange={(e) => {
              setIsError(false);
              setSearchQuery(e.target.value);
            }}
            className={`h-full w-full border-0 border-b outline-none focus:border-b-primary-600 ${
              isError
                ? "border-red-600 border-2 placeholder:text-red-600"
                : "border-black"
            }`}
            placeholder="Search product..."
          />
        </div>
        <button
          type="button"
          onClick={() => {
            if (searchQuery.trim() === "") {
              setIsError(true);
              return;
            }
            navigate(`/product?q=${searchQuery}`);
            handleSearch();
          }}
          className=" w-full col-span-2 flex justify-center items-center h-full bg-black text-white self-end uppercase"
        >
          Search
        </button>
      </div>
      {isLoading && (
        <div className="w-full h-[2cm] justify-center items-center px-3 flex mt-1 bg-white border gap-3 py-4 flex-col ">
          <div class="spinner"></div>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="w-full px-3 flex mt-1 bg-white border gap-3 py-4 flex-col ">
          {suggestions.map((product) => (
            <div
              key={product.name}
              className="w-full grid grid-cols-12 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                navigate(`product/${product.name}`);
                handleSearch();
              }}
            >
              <div className=" bg-green-700 col-span-2 500px:col-span-1 750px:col-span-2 1000px:col-span-1 w-[1cm] h-[1cm] overflow-hidden rounded-md border">
                <img
                  src={product.images[0].url}
                  alt="img-1"
                  className="h-full w-full"
                />
              </div>
              <p className=" col-span-8 h-full flex items-center">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
