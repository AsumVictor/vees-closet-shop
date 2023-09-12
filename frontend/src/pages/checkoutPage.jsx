import React, { useEffect, useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import OrderSummaryBoxInfo from "../components/checkout/orderSummaryBox";
import { LabelInput } from "../components/inputs/labelInput";
import { FaShippingFast } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import { PaymentRadio } from "../components/inputs/radioButton";
import mtn from "../assets/images/mtn.png";
import vodafone from "../assets/images/vodafone.png";
import airtelTigo from "../assets/images/airteligo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CouponApply from "../components/order/CouponApply";
import { AiFillInfoCircle } from "react-icons/ai";

function CheckoutPage() {
  const { user } = useSelector((state) => state.client);
  const { totalCost } = useSelector((state) => state.cart);
  const [formData, setFormData] = useState({
    delivery_cost: 45.0,
    coupon: null,
  });
  const [userDetails, setUserDetails] = useState({
    first_name: user ? user.first_name : "",
    last_name: user ? user.last_name : "",
    email: user ? user.email : "",
  });
  const [discount, setDiscount] = useState(0);

  let netCost = totalCost + formData.delivery_cost - discount;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCoupon = (data) => {
    setFormData((prev) => {
      return {
        ...prev,
        coupon: data,
      };
    });
  };
  console.log(formData);
  return (
    <div className=" grid grid-cols-3 mt-[3rem]">
      <div className="py-10 col-span-full 800px:col-span-2 text-black">
        {!user && (
          <p className="py-1 px-3 mx-3 bg-[#351e161e] border-t-2 border-t-deep-primary flex gap-2 mb-5">
            <span>Returning customer?</span>
            <Link to={"../login"} className=" hover:underline text-blue-600">
              Click here to login
            </Link>
          </p>
        )}
        <h1 className=" px-3 text-2xl">Order information</h1>

        <form className="px-4 1000px:px-10 mt-5 ">
          <div className="w-full border-l-[4px] border-deep-primary">
            <OrderSummaryBoxInfo
              title={"Personal Information"}
              icon={<MdOutlinePersonalInjury size={23} color="white" />}
            >
              <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
                <LabelInput
                  label={"First Name"}
                  type={"text"}
                  value={userDetails.first_name}
                  isRequired={true}
                  isDisabled={user}
                />
                <LabelInput
                  label={"Last Name"}
                  value={userDetails.last_name}
                  type={"text"}
                  isRequired={true}
                  isDisabled={user}
                />
                <LabelInput
                  label={"Email address"}
                  type={"email"}
                  value={userDetails.email}
                  isRequired={true}
                  isDisabled={user}
                />
              </div>
            </OrderSummaryBoxInfo>
            <OrderSummaryBoxInfo
              title={"Shipping Information"}
              icon={<FaShippingFast size={23} color="white" />}
            >
              <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
                <LabelInput
                  label={"Address 1"}
                  type={"text"}
                  isRequired={true}
                />
                <LabelInput
                  label={"Additional address"}
                  type={"number"}
                  isRequired={true}
                />
                <LabelInput
                  label={"Phone number"}
                  type={"tel"}
                  isRequired={true}
                />
                <select className="py-2 outline-none cursor-pointer bg-white border-2 border-primary-800 px-2 text-sm capitalize">
                  <option>Select a region</option>
                  <option>Ashanti region</option>
                  <option>Bono East</option>
                  <option>Central </option>
                  <option>Greater Accra </option>
                </select>
                <div className="w-full">
                  <select className="w-full py-2 outline-none cursor-pointer bg-white border-2 border-primary-800 px-2 text-sm capitalize">
                    <option>Select delivery city</option>
                    <option>Kumasi</option>
                    <option>Sunyani</option>
                    <option>Accra </option>
                    <option>Outside Accra</option>
                  </select>
                  <p>Shipping Cost: ₵ XX.00</p>
                </div>
              </div>
            </OrderSummaryBoxInfo>
            <OrderSummaryBoxInfo
              title={"Payment Information"}
              icon={<BsCreditCard size={23} color="white" />}
            >
              <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-3 gap-5">
                <h2 className="col-span-full">Choose payment provider</h2>
                <PaymentRadio
                  img={mtn}
                  label={"MTN MoMo"}
                  id={"mtn"}
                  name="paymentProvide"
                />
                <PaymentRadio
                  img={vodafone}
                  label={"Vodafone cash"}
                  id={"vodafone"}
                  name="paymentProvide"
                />
                <PaymentRadio
                  img={airtelTigo}
                  label={"Airtel Tigo cash"}
                  id={"tigo"}
                  name="paymentProvide"
                />
                <h2 className="mt-2 col-span-full">Mobile number</h2>
                <div className="w-full grid grid-cols-12 h-[1.1cm] col-span-full 550px:col-span-2">
                  <div className=" bg-gray-200 col-span-3 h-full flex items-center">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/4/40/Flag_of_Ghana.png"
                      alt="img"
                      className="w-[0.8cm] h-[0.6cm]"
                    />
                    <span>+233</span>
                  </div>
                  <div className="col-span-9 h-full">
                    <input
                      type="number"
                      name="mobileNumber"
                      id="mobileNumber"
                      className="col-span-9 w-full h-full outline-none px-2 border-2 border-deep-primary"
                    />
                  </div>
                </div>
              </div>
            </OrderSummaryBoxInfo>
          </div>
        </form>
      </div>

      <div className="sticky top-10 py-10 col-span-full 800px:col-span-1 px-5 ">
        <h1 className=" text-2xl capitalize  sticky top-0">cart summary</h1>
        <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
          <span>Subtotal</span>
          <span>₵ {totalCost}</span>
        </h3>
        <h3 className="flex justify-between py-2 uppercase font-semibold">
          <span>Shipping cost</span>
          <span>₵ {formData.delivery_cost.toFixed(2)}</span>
        </h3>
        <h3 className="flex justify-between py-2 uppercase font-semibold">
          <span>Discount</span>
          <span>{discount > 0 ? `- ${discount}` : "-"}</span>
        </h3>

        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        <h3 className="flex justify-between py-2 uppercase font-semibold">
          <span>total</span>
          <span>₵ {netCost.toFixed(2)}</span>
        </h3>
        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />

        <ul>
          <li className=" grid grid-cols-10"></li>
        </ul>
        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />

        <CouponApply handleChange={handleCoupon} handleDiscount={setDiscount} />
        {discount > 0 && (
          <p className=" items-center grid grid-cols-12 px-2 py-1 text-emerald-700 bg-emerald-200">
            <AiFillInfoCircle />
            <span className=" col-span-10">Coupon discount allowed</span>
          </p>
        )}
        <button className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium">
          Place order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
