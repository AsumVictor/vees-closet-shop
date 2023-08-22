import {Link} from "react-router-dom";

function HeroSection() {
  return (
    <section className="hero-home py-[12rem] h-[30rem] flex flex-col justify-start items-center">
      <h1 className="text-3xl text-white font-bold px-3 text-center">
      Shop the Latest Trends in Fashion!
      </h1>
      <p className="text-white mt-5 px-3 w-full 500px:w-8/12 750px:w-1/2">Explore Our Wide Range of High-Quality Products for Every Occasion. Shop Now and Elevate Your Wardrobe!</p>
      <Link to={'/shop'} className="mt-[2rem] px-3 py-1 uppercase bg-white font-semibold text-2xl">shop now</Link>
    </section>
  );
}

export default HeroSection;
