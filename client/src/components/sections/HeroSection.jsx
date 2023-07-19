import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className="w-full flex flex-col lg:grid lg:grid-cols-2 py-10 px-5 md:px-10  bg-white my-5 rounded-md">
      <div className="md:px-4 py-10">
        <h1 className="text-3xl font-bold text-wine_primary">
          Discover Your Style with Vee's Closet
        </h1>
        <p className="mt-10 md:pr-10">
          Experience the perfect blend of trend-setting fashion and personal
          style at Vee's Closet. Explore our curated collection of clothing,
          accessories, and more, designed to empower and inspire your unique
          expression. Unleash your fashion journey with Vee's Closet, your
          ultimate destination for self-discovery and sartorial excellence.
        </p>
        <button className="mt-14 px-5 py-2 rounded-md bg-wine_primary text-white font-bold">
          <Link to="/products"  onClick={()=>{
        window.scrollTo(0,0)
      }}>Shop now!</Link>
        </button>
      </div>
      <div className="hero-burb md:px-4 hidden lg:flex flex-col items-center im">
        <img src="./heroImage.png" alt="hero" className=" h-[12cm]"/>
      </div>
      <div className=""></div>
    </div>
  );
}

export default HeroSection;
