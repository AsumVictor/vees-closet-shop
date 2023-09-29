import { BiEditAlt } from "react-icons/bi";
import { HiMiniViewfinderCircle } from "react-icons/hi2";

function Product() {
  return (
    <div className=" w-[265px] py-1 border px-2">
      <div className="w-full bg-gray-200 py-1">
        <img
          src="https://res.cloudinary.com/dpuw5ivja/image/upload/v1693411736/products/qdntp4et3yg8rip4kcip.jpg"
          alt="img"
        />
      </div>
      <div className="w-full">
        <p className=" font-medium">
          Men Printed Round Neck Pure Cotton Red T-Shirt
        </p>
        <p className=" flex gap-2 mt-1">
          <span className="font-bold">Stocks:</span>
          <span>2</span>
        </p>
        <p className=" flex gap-2 mt-1">
          <span className="font-bold">Unit Price:</span>
          <span>2</span>
        </p>
      </div>
      <p className=" flex gap-2 mt-1">
        <span className="font-bold">Latest Update:</span>
        <span>2</span>
      </p>
      <div className=" mt-2 w-full flex flex-row justify-end gap-3">
        <button className="flex items-center gap-2 px-3 bg-emerald-500 text-white uppercase font-semibold py-1">
          <span>
            <BiEditAlt />
          </span>
          <span>Edit</span>
        </button>
        <button className="flex items-center gap-2 px-3 bg-blue-500 text-white uppercase font-semibold py-1">
          <span>
            <HiMiniViewfinderCircle />
          </span>
          <span>View</span>
        </button>
      </div>
    </div>
  );
}

export default Product;
