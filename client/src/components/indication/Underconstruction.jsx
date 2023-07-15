import React from "react";
import Lottie from "lottie-react";
import ShopAnimation from "../../assets/Animation/veesLogin.json";

function Underconstruction() {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Lottie animationData={ShopAnimation} className="w-[40rem]" />
      <p className="font-bold text-xl">Oops! page under construction</p>
    </div>
  );
}

export default Underconstruction;
