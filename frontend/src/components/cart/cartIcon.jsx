import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function CartIcon() {
  const navigate = useNavigate();

  return (
    <div
      className=" relative px-2 cursor-pointer"
      onClick={() => navigate("/cart")}
    >
      <FiShoppingCart size={22} />
      <div className=" h-[1rem] w-[1rem] flex justify-center items-center border absolute -top-[0.2rem] p-1 -right-[0.2rem] bg-white rounded-full text-[12px] border-black">
        3
      </div>
    </div>
  );
}

export default CartIcon;
