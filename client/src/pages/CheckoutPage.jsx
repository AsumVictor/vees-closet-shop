import React from 'react'
import CheckoutSteps from "../components/Checkout/CheckoutSteps.jsx";
import Checkout from "../components/Checkout/Checkout.jsx";

const CheckoutPage = () => {
  return (
    <div>
        <CheckoutSteps active={1} />
        <Checkout />
    </div>
  )
}

export default CheckoutPage