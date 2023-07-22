import React, { useState } from "react";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import Shipping from "./pages/shipping";
import PaymentPage from "../../pages/PaymentPage";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const [Shippingaddress, setShippingAddress] = useState({
    fullname: user.fullname,
    email: user.email,
    phoneNumber: user.phoneNumber,
    region: null,
    city: null,
    address1: null,
    additionalAddress: null,
    pickstation: null,
  });

  const [activeTap, setActiveTap] = useState(1);
  const handleTapChange = (type) => {
    switch (type) {
      case "NEXT":
        nextTap();
        break;
      case "BACK":
        prevTap();
        break;
      default:
        break;
    }
  };

  const nextTap = () => {
    if (activeTap / 3 < 1) {
      setActiveTap((prev) => prev + 1);
      searchParams.set(activeTap);
    }
  };
  const prevTap = () => {
    if (activeTap > 1) {
      setActiveTap((prev) => prev - 1);
    }
  };

  return (
    <div className={`w-full py-10 px-2 md:px-10`}>
      <CheckoutSteps activeTap={activeTap}>
        {activeTap === 1 && (
          <Shipping
            props={[Shippingaddress, setShippingAddress, setActiveTap]}
          />
        )}
        {activeTap === 2 && (
          <PaymentPage activeTap={activeTap} changeTap={handleTapChange} />
        )}
      </CheckoutSteps>
    </div>
  );
};

export default Checkout;
