import React from "react";
import styles from "../../styles/styles";
import { FaShippingFast } from "react-icons/fa";
import { HiBadgeCheck } from "react-icons/hi";
import {
  MdArrowForwardIos,
  MdOutlineArrowBackIosNew,
  MdOutlinePayment,
} from "react-icons/md";

const CheckoutSteps = ({ activeTap, children }) => {
  const stepperItems = [
    {
      label: "Shipping",
      step: 1,
      icon: <FaShippingFast />,
    },
    {
      label: "Payment",
      step: 2,
      icon: <MdOutlinePayment />,
    },
    {
      label: "Complete",
      step: 3,
      icon: <HiBadgeCheck />,
    },
  ];

  return (
    <div className="w-full bg-white rounded-xl py-2 px-2 flex flex-col items-center">
      <div className=" w-full py-1 px-2 md:w-[16cm] flex flex-row justify-between relative">
        {stepperItems.map((step, index) => (
          <div
            className="z-10 h-[3cm] w-[2cm] flex flex-col items-center"
            key={step.step}
          >
            <div
              className={`h-[1.5cm] w-full rounded-2xl border-4 p-2 ${
                activeTap === step.step
                  ? "border-wine_primary bg-white"
                  : activeTap > step.step
                  ? " border-[#50C878] bg-[#50C878]"
                  : " border-gray-300 bg-white"
              } `}
            >
              <div
                className={`w-full h-full rounded-xl text-2xl flex items-center justify-center ${
                  activeTap === step.step
                    ? "border-wine_primary bg-wine_primary text-white"
                    : activeTap > step.step
                    ? " border-[#50C878] bg-[#50C878] text-white"
                    : "bg-gray-300"
                }`}
              >
                {activeTap > step.step ? <HiBadgeCheck /> : step.icon}
              </div>
            </div>
            <h2 className="font-semibold text-gray-600">Step {step.step}</h2>
            <h2 className="font-bold">{step.label}</h2>
          </div>
        ))}
        <div className=" absolute w-full top-[0.8cm] left-0  h-[0.2cm] grid grid-cols-4">
          <div
            className={`${
              activeTap > 1 ? "bg-[#50C878]" : "bg-wine_primary"
            } rounded-tl-xl rounded-bl-xl`}
          ></div>
          <div
            className={`${
              activeTap === 2
                ? "bg-wine_primary"
                : activeTap > 2
                ? "bg-[#50C878]"
                : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`${
              activeTap === 2
                ? "bg-wine_primary"
                : activeTap > 2
                ? "bg-[#50C878]"
                : "bg-gray-300"
            }`}
          ></div>
          <div
            className={`${
              activeTap === 3
                ? "bg-wine_primary"
                : activeTap > 3
                ? "bg-[#50C878]"
                : "bg-gray-300"
            }`}
          ></div>
        </div>
      </div>
      {children}
      
    </div>
  );
};

export default CheckoutSteps;

// <div className='w-full flex justify-center mt-12'>
//         <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
//                <div className={`${styles.noramlFlex}`}>
//                 <div className={`${styles.cart_button} bg-wine_primary`}>
//                        <span className={`${styles.cart_button_text}`}>1.Shipping</span>
//                 </div>
//                 <div className={`${
//                     active > 1 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-wine_dark_deep"
//                     : "w-[30px] 800px:w-[70px] h-[4px] !bg-wine_secondary"
//                 }`} />
//                </div>

//                <div className={`${styles.noramlFlex}`}>
//                 <div className={`${active > 1 ? `${styles.cart_button} bg-wine_primary` : `${styles.cart_button}  bg-wine_secondary`}`}>
//                     <span className={`${active > 1 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-wine_dark_deep`}`}>
//                         2.Payment
//                     </span>
//                 </div>
//                </div>

//                <div className={`${styles.noramlFlex}`}>
//                <div className={`${
//                     active > 3 ? "w-[30px] 800px:w-[70px] h-[4px] !bg-wine_dark_deep"
//                     : "w-[30px] 800px:w-[70px] h-[4px] !bg-wine_secondary"
//                 }`} />
//                 <div className={`${active > 2 ? `${styles.cart_button}` : `${styles.cart_button} !bg-[#e6ccc0]`}`}>
//                     <span className={`${active > 2 ? `${styles.cart_button_text}` : `${styles.cart_button_text} !text-white`}`}>
//                         3.Success
//                     </span>
//                 </div>
//                </div>
//         </div>
//     </div>
