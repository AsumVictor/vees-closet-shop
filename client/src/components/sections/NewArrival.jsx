import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../products/ProductCard";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";

function NewArrival() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let sliceData = productData.slice(0, 4);
    setData(sliceData);
  }, []);

  return (
    <div className={`${styles.section} pb-20 flex flex-col`}>
      <h2 className={`${styles.heading}`}>New arrival</h2>
      <div className=" flex flex-row justify-center flex-wrap gap-x-5 800px:grid 800px:grid-cols-3 1300px:grid-cols-4 gap-5">
        {data && data.map((product) => <ProductCard product={product} />)}
      </div>
      <Link
        to="./products"
        className="self-center mt-8 underline font-semibold"
      >
        View all
      </Link>
    </div>
  );
}

export default NewArrival;
