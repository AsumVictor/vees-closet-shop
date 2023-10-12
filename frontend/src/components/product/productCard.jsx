import { useNavigate } from "react-router-dom";
import Img from "../../assets/images/hero-background-3.jpg";
import "../../styles/productCard.css";
import {HiBan} from "react-icons/hi";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="relative product-card flex flex-col cursor-pointer"
      onClick={() => {
        navigate(`/product/${product.name}`);
      }}
    >
      <img
        src={product.images[0].url}
        className="w-full 400px:h-[5cm] 1200px:h-[8cm] 1400px:w-[9cm]"
      ></img>
      <h2 className="mt-2 400px:text-xl px-2">{product.name}</h2>
      <h2 className="mt-1 flex flex-row px-2 gap-1">
        <span className="text-[14px] font-semibold text-primary-600 whitespace-nowrap">
          ₵ {product.actual_price}
        </span>
        {product.base_price && (
          <span className="text-[10px]">
            <del>₵ ${product.base_price}</del>
          </span>
        )}
      </h2>
   
      {product.qty_in_stock < 1 && (
        <div className=" flex gap-2 items-center justify-center absolute top-3 left-2 px-3 py-2 bg-red-400 font-medium text-white">
          <HiBan size={22} />
          Out of Stock
        </div>
      )}
    </div>
  );
}

export default ProductCard;
