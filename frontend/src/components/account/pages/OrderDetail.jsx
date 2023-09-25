import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import server from "../../../server";
import OrderStatus from "../OrderStatus";
import OrderDetailsItem from "../OrderDetailsItem";
import PulseLoader from "../../loaders/pulseLoader";

function OrderDetail() {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  let item = {
    variation_choice: {
      x: 0,
    },
  };

  const getOrderDetail = async () => {
    setIsLoading(true);
    try {
      let res = await axios(`${server}order/get-orders/${id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsLoading(false);
        setOrderData(res.data.order);
      }
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, []);

  if (isLoading) {
    return (
      <PulseLoader />
    );
  }

  if (isError) {
    return (
      <>
        <h1>Error occured try again...</h1>
      </>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">Order details</h1>
      </div>

      <div className=" mt-5 px-3">
        <p className=" font-medium text-xl">Order #{orderData.tracking_no}</p>
        <OrderStatus status={orderData.status} />
        <p>Placed on: {orderData.createdAt.split("T")[0]} </p>
        <p>Total: GH₵ {orderData.total_price}</p>
        <p>Shipping cost: GH₵ {orderData.charges.shipping_cost}</p>
        {orderData.charges.coupon && (
          <p>Discount: GH₵ {orderData.charges.discount}</p>
        )}
        <hr className=" h-[0.2cm] mt-2" />
      </div>

      <div className=" mt-5 bg-gray-100 px-2 py-2 ">
        <p className=" font-medium text-xl">Order Items</p>
        <div className="w-full">
          {orderData.items.map((item) => (
            <OrderDetailsItem item={item} />
          ))}
        </div>

        <hr className=" h-[0.2cm] mt-2" />
      </div>

      <div className=" mt-5 bg-gray-100 py-2 grid grid-cols-2 px-3 gap-5">
        <div className=" col-span-full 450px:col-span-1">
          <p className=" font-medium text-xl">Shipping information</p>
          <p>{orderData.shipping_address.address1},</p>
          <p>{orderData.shipping_address.address2},</p>
          <p>{orderData.shipping_address.location},</p>
          <p>{orderData.shipping_address.region},</p>
          <p>{orderData.shipping_address.phone_number}</p>
        </div>

        {/* PAYMENT */}
        <div className="  col-span-full 450px:col-span-1">
          <p className=" font-medium text-xl">Payment information</p>
          <p className="">
            Payment provider: {orderData.paymentInfo.provider.toUpperCase()}
          </p>
          <p>Mobile number: {"+233" + orderData.paymentInfo.payment_number}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
