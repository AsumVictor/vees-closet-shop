import React from "react";
import HeroSection from "../components/homeSections/heroSection";
import "../styles/homePage.css";
import { PiShirtFoldedDuotone } from "react-icons/pi";
import { BsCartPlus } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import CategorySection from "../components/homeSections/CategorySection";
import GenderSection from "../components/homeSections/GenderSection";

function Homepage() {
  return (
    <div className="w-full py-1">
      <HeroSection />
      <section className="w-full py-20 bg-primary-600">
        <h2 className="mb-10 text-center text-3xl text-white font-semibold">
          HOW TO ORDER
        </h2>
        <div className="w-full py-2 flex flex-row justify-center items-center gap-5 500px:gap-20">
          <div className="gap-3 flex items-center flex-col ">
            <div className="p-5 w-[2cm] h-[2cm] flex justify-center items-center rounded-full bg-white">
              <PiShirtFoldedDuotone size={35} />
            </div>
            <h2 className="text-center text-white font-semibold uppercase">
              Look for Product
            </h2>
          </div>

          <div className="gap-3 flex items-center flex-col ">
            <div className="p-5 w-[2cm] h-[2cm] flex justify-center items-center rounded-full bg-white">
              <BsCartPlus size={35} />
            </div>
            <h2 className="text-center text-white font-semibold uppercase">
              Add to cart
            </h2>
          </div>

          <div className="gap-3 flex items-center flex-col ">
            <div className="p-5 w-[2cm] h-[2cm] flex justify-center items-center rounded-full bg-white">
              <FaRegCreditCard size={35} />
            </div>
            <h2 className="text-center text-white font-semibold uppercase">
              checkout
            </h2>
          </div>
        </div>
      </section>
      <CategorySection />
      <GenderSection />
    </div>
  );
}

export default Homepage;
