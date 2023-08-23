import { useNavigate } from "react-router-dom";
import Img from "../../assets/images/hero-background-3.jpg";
import '../../styles/productCard.css'

function ProductCard() {

    const navigate = useNavigate()

  return (
    <div className="product-card flex flex-col" onClick={() => {
        navigate('/products/:name')
    }}>
      <img
        src={Img}
        className="w-full 400px:h-[5cm] 1200px:h-[8cm] 1400px:w-[9cm]"
      ></img>
      <h2 className="mt-2 400px:text-xl px-2">
        Crisp Oxford Button-Down Shirt
      </h2>
      <h2 className="mt-1 flex flex-row px-2 gap-1">
        <span className="text-[14px] font-semibold text-primary-600 whitespace-nowrap">
          GHC 200.00
        </span>
        <span className="text-[10px]">
          <del>GHC 300.00</del>
        </span>
      </h2>
    </div>
  );
}

export default ProductCard;
