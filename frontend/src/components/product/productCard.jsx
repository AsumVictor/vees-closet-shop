import { useNavigate } from "react-router-dom";
import Img from "../../assets/images/hero-background-3.jpg";
import "../../styles/productCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div
      className="product-card flex flex-col cursor-pointer"
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
    </div>
  );
}

export default ProductCard;
