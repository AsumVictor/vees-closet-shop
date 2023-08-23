import React from "react";
import HeroSection from "../components/homeSections/heroSection";
import "../styles/homePage.css";
import { PiShirtFoldedDuotone } from "react-icons/pi";
import { BsArrowCounterclockwise, BsCartPlus } from "react-icons/bs";
import { FaRegCreditCard } from "react-icons/fa";
import GenderSection from "../components/homeSections/GenderSection";
import ProductCard from "../components/product/productCard";
import TestiminialSection from "../components/homeSections/testiminialSection";
import { TbTruckDelivery } from "react-icons/tb";
import { IoIosHelpBuoy } from "react-icons/io";
import { HiOutlineShieldCheck } from "react-icons/hi";

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
              check out
            </h2>
          </div>
        </div>
      </section>
      <GenderSection />
      <section className="w-full py-20 bg-white">
        <h2 className="mb-10 text-center text-2xl text-black font-semibold uppercase">
          SHop the latest
        </h2>
        <div className="grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </section>

      <TestiminialSection />
      <section className="w-full py-20 grid grid-cols-1 450px:grid-cols-2 750px:grid-cols-4 px-10 gap-y-10">
        <div className="py-1 flex flex-col items-center">
          <TbTruckDelivery size={38} />
          <h3 className="uppercase text-[16px] mt-1 font-semibold">
            EXPRESS DELIVERY
          </h3>
          <p className="text-center mt-2 px-5">
            We’ll ship the order immediately after your purchase.
          </p>
        </div>

        <div className="py-1 flex flex-col items-center">
          <BsArrowCounterclockwise size={35} />
          <h3 className="uppercase text-[16px] mt-1 font-semibold">
            FREE RETURNS
          </h3>
          <p className="text-center mt-2 px-5">
            All returns are free within 30 days of your order.
          </p>
        </div>

        <div className="py-1 flex flex-col items-center">
          <IoIosHelpBuoy size={38} />
          <h3 className="uppercase text-[16px] mt-1 font-semibold">
            Helpful support
          </h3>
          <p className="text-center mt-2 px-5">
            Our support staff is ready 24/7 to answer any questions.
          </p>
        </div>

        <div className="py-1 flex flex-col items-center">
          <HiOutlineShieldCheck size={38} />
          <h3 className="uppercase text-[16px] mt-1 font-semibold">
            SECURE PAYMENT
          </h3>
          <p className="text-center mt-2 px-5">
            All payments on our site are processed securely.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Homepage;
