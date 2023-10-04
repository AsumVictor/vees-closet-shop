import { BiEditAlt } from "react-icons/bi";
import { HiMiniViewfinderCircle } from "react-icons/hi2";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <div className=" w-[265px] py-1 border px-2">
      <div className="w-full bg-white py-1">
        <img src={product.images[0]?.url} alt="product-img" className="w-full" />
      </div>
      <div className="w-full">
        <p className=" font-medium">{product.name}</p>
        <p className=" flex gap-2 mt-1">
          <span className="font-bold">Stocks:</span>
          <span>{product.qty_in_stock}</span>
        </p>
        <p className=" flex gap-2 mt-1">
          <span className="font-bold">Unit Price:</span>
          <span>GH₵ {product.actual_price}</span>
        </p>
      </div>
      <p className=" flex gap-2 mt-1">
        <span className="font-bold">Latest Update:</span>
        <span>{product.updatedAt.split("T")[0]}</span>
      </p>
      <div className=" mt-2 w-full flex flex-row justify-end gap-3">
        <Link
          to={`${product._id}`}
          className="flex items-center gap-2 px-3 bg-emerald-500 text-white uppercase font-semibold py-1"
        >
          <span>
            <BiEditAlt />
          </span>
          <span>Edit</span>
        </Link>
        <Link
          to={`${product._id}`}
          className="flex items-center gap-2 px-3 bg-blue-500 text-white uppercase font-semibold py-1"
        >
          <span>
            <HiMiniViewfinderCircle />
          </span>
          <span>View</span>
        </Link>
      </div>
    </div>
  );
}

export default Product;
