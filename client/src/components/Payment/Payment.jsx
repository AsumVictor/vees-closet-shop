import React, { useState } from "react";
import { InputLabel, PaymentRadio } from "../Inputs";
import Mtn from "../../assets/images/mtn.png";
import Vodafone from "../../assets/images/vodafone.png";
import Airtel from "../../assets/images/airteligo.png";

function Payment() {
  const [paymentMethod, setpaymentMethod] = useState(null);

  return (
    <div className="w-full flex flex-col items-center py-8 bg-blue-gray-50">
      <div className="py-2 w-full grid gap-3 lg:grid-cols-3 flex-col lg:flex-row px-3 md:px-10">
        <div className="w-full lg:col-span-2">
          <div className="w-full bg-white rounded-md p-5 pb-8">
            <h5 className="text-[16px] md:text-[18px] font-[500] mb-2">
              Choose payment method
            </h5>
            <div className="w-full py-1 flex gap-x-1 justify-center 400px:justify-start gap-y-4 flex-wrap">
              <PaymentRadio
                id={"mtn-payment"}
                label={"MTN MoMo"}
                img={Mtn}
                value={"mtn"}
                handleChange={(e) => setpaymentMethod(e.target.value)}
              />
              <PaymentRadio
                id={"vodafone-payment"}
                label={"Vodafone Cash"}
                img={Vodafone}
                handleChange={(e) => setpaymentMethod(e.target.value)}
                value={"vodafone"}
              />
              <PaymentRadio
                id={"airtelTigo-payment"}
                label={"AirtelTigo Cash"}
                img={Airtel}
                handleChange={(e) => setpaymentMethod(e.target.value)}
                value={"airteltigo"}
              />
            </div>
            <h5 className="text-[16px] md:text-[18px] font-[500] mt-6">
              Mobile number
            </h5>
            <div className="w-full 400px:w-5/12">

            <InputLabel type={"number"} label={"Phone number *"} />
            </div>
          </div>
        </div>
        <div className="w-full 800px:mt-0 mt-8">
          <div className="w-full bg-[#fff] rounded-md p-5 pb-8"></div>
        </div>
      </div>
      <button
        className={` flex items-center justify-center rounded-xl bg-wine_primary py-3 font-bold cursor-pointer w-[150px] 800px:w-[280px] mt-10`}
      >
        <h5 className="text-white">Go to Payment</h5>
      </button>
    </div>
  );
}

export default Payment;
