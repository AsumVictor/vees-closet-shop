import React from "react";
import Lottie from "lottie-react";
import ShopAnimation from "../../assets/Animation/veesLogin.json";

function Underconstruction() {
  return (
    <div className="w-full flex flex-col gap-4 items-center mt-10">
      <Lottie animationData={ShopAnimation} className="w-8/12 md:w-[35rem] lg:w-[40rem]" />
      <p className="font-bold text-[17px]">Oops! page under construction</p>
    </div>
  );
}

export default Underconstruction;
