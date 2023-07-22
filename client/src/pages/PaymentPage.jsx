import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Payment from "../components/Payment/Payment.jsx";
import axios from "axios";
import server from "../../server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MdArrowForwardIos, MdOutlineArrowBackIosNew } from "react-icons/md";

const PaymentPage = ({ activeTap, changeTap }) => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    getStripeApikey();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Elements stripe={loadStripe(stripeApikey)}>
      <div className="w-full min-h-screen bg-[#f6f9fc]">
        <Payment />
        <div className="flex flex-row justify-end gap-4 w-full py-1 px-2 md:w-[16cm]">
          <button
            type="button"
            className="px-4 py-1 bg-wine_primary rounded-md text-white flex gap-2 items-center font-semibold text-[18px] disabled:bg-blue-gray-50 disabled:opacity-10 disabled:cursor-not-allowed disabled:text-black"
            disabled={!(activeTap > 1)}
            onClick={() => changeTap("BACK")}
          >
            <span>
              <MdOutlineArrowBackIosNew />
            </span>
            <span>Back to Shipping address</span>
          </button>
          <button
            type="button"
            className="px-4 py-1 bg-wine_primary text-white flex gap-2 items-center font-semibold text-[18px] disabled:bg-blue-gray-50 disabled:opacity-10 rounded-md disabled:cursor-not-allowed disabled:text-black"
            disabled={!(activeTap < 2)}
            onClick={() => changeTap("NEXT")}
          >
            <span>Next</span>
            <span>
              <MdArrowForwardIos />
            </span>
          </button>
        </div>
      </div>
    </Elements>
  );
};

export default PaymentPage;
