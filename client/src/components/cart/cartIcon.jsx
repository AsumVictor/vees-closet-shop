import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function CartIcon() {
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  return (
    <div
      className=" relative px-2 cursor-pointer"
      onClick={() => navigate("/cart")}
    >
      <FiShoppingCart size={22} />
      {items.length > 0 && (
        <div className=" h-[1rem] w-[1rem] flex justify-center items-center border absolute -top-[0.2rem] p-1 -right-[0.2rem] bg-white rounded-full text-[12px] border-black">
          {items.length}
        </div>
      )}
    </div>
  );
}

export default CartIcon;
