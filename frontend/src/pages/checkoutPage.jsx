import React from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import OrderSummaryBoxInfo from "../components/checkout/orderSummaryBox";
import { LabelInput } from "../components/inputs/labelInput";
import { FaShippingFast } from "react-icons/fa";

function CheckoutPage() {
  // Personal Info
  // Shipping address
  // Billing address
  // Place order
  return (
    <div className=" grid grid-cols-3 mt-20">
      <div className="py-10 col-span-full 800px:col-span-2 text-black">
        <h1 className="px-10  text-2xl">Order information</h1>
        <div className="px-4 1000px:px-10 mt-10 ">
          <div className="w-full border-l-[4px] border-deep-primary">
            <OrderSummaryBoxInfo
              title={"Personal Information"}
              icon={<MdOutlinePersonalInjury size={23} color="white" />}
            >
              <form className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
                <LabelInput
                  label={"First Name"}
                  type={"text"}
                  isRequired={true}
                />
                <LabelInput
                  label={"Last Name"}
                  type={"number"}
                  isRequired={true}
                />
                <LabelInput
                  label={"Email address"}
                  type={"email"}
                  isRequired={true}
                />
                <LabelInput
                  label={"phone number"}
                  type={"tel"}
                />
              </form>
            </OrderSummaryBoxInfo>
            <OrderSummaryBoxInfo
              title={"Shipping Information"}
              icon={<FaShippingFast size={23} color="white" />}
            >
              <form className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
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
              </form>
            </OrderSummaryBoxInfo>
          </div>
        </div>
      </div>

      <div className="py-10 col-span-full 800px:col-span-1 px-5 ">
        <h1 className=" text-2xl capitalize">cart summary</h1>
        <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
          <span>Subtotal</span>
          <span>₵ 200.00</span>
        </h3>

        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        <ul>
          <li className=" grid grid-cols-10"></li>
        </ul>
        <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        <button className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium">
          proceed to checkout
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
