import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../product/productCard";

function NewProductsSection() {
  const { products, isFetchingNewProd, isError } = useSelector(
    (state) => state.newProducts
  );

  return (
    <section className="w-full py-20 bg-white">
      <h2 className="mb-10 text-center text-2xl text-black font-semibold uppercase">
        SHop the latest
      </h2>
      <div className="grid justify-center px-2 550px:px-5 grid-cols-2 550px:grid-cols-3 1100px:px-10 900px:grid-cols-4 gap-x-2 gap-y-[4rem] 1200px:gap-x-6">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </section>
  );
}

export default NewProductsSection;
