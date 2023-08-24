import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

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
      <div className="w-full flex justify-center items-center mt-1 min-h-[2cm] bg-white border"></div>
    </div>
  );
};
