import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

function ProductCard({ title, price, image }) {
  const productUrl = title.replace(/\s+/g, "-");
  return (
    <div
      className={`h-[9cm] w-[7cm] bg-white relative rounded-xl px-2 py-2 shadow-lg hover:scale-105 transition-all`}
    >
      <AiOutlineHeart
        size={35}
        className="absolute cursor-pointer text-wine_primary"
      />
      <Link to={`/products/${productUrl}`}>
        <div className="h-[4.5cm] w-full">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-scale-down"
          />
        </div>
        <h4 className={`font-semibold pr-3 h-[1.4cm] overflow-hidden`}>
          {title}
        </h4>
        <h4 className="font-bold text-[17px] text-wine_primary mt-2">
          {`GHC ${price}`}
        </h4>
      </Link>
      <div className="w-full">
        <button className="flex flex-row justify-center items-center w-full text-xl font-semibold gap-2 py-1 px-2 bg-wine_primary rounded-md mt-5 text-white hover:bg-wine_secondary">
          <AiOutlineShoppingCart />
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
