import React, { useEffect, useState } from "react";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import Payment from "../components/Payment/Payment.jsx";
import axios from "axios";
import server from "../../server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const PaymentPage = () => {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    getStripeApikey();
  }, []);

  return (
    <Elements stripe={loadStripe(stripeApikey)}>
      <div className="w-full min-h-screen bg-[#f6f9fc]">
        <CheckoutSteps active={2} />
        <Payment />
      </div>
    </Elements>
  );
};

export default PaymentPage;

