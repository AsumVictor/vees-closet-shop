import { Link, useNavigate } from "react-router-dom";
import OrderStatus from "./OrderStatus";

function OrderItem({ _id, trackingID, status, date, totalItems }) {
  const navigate = useNavigate();

  return (
    <div
      className=" w-full px-3 py-2 cursor-pointer"
      onClick={() => {
        navigate(`./${_id}`);
      }}
    >
      <div className="flex flex-row justify-between 400px:pr-10">
        <p className=" text-[15px] 500px:text-[18px] flex gap-1">
          <span>Order</span>
          <Link
            to={`./${_id}`}
            className=" underline hover:text-blue-500"
          >{`#${trackingID}`}</Link>
        </p>
        <button
          type="button"
          onClick={() => navigate(`./${_id}`)}
          className=" uppercase px-4 py-1 text-white bg-[#351e1696]"
        >
          See Details
        </button>
      </div>
      <OrderStatus status={status} />
      <p className="mt-2">{`On ${date}`}</p>
      <p className="mt-2">No. Items: {totalItems}</p>
      <hr />
    </div>
  );
}

export default OrderItem;
