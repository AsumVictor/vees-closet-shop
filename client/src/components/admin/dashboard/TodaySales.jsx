import React, { useEffect, useState } from "react";
import SaleBox from "./SaleBox";
import axios from "axios";
import server from "../../../server.js";

function TodaySales({ title, url }) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(null);

  const fetchSales = async () => {
    setLoading(true);
    try {
      let { data } = await axios(`${server}analytics/${url}`, {
        withCredentials: true,
      });
      if (data.success) {
        setAmount(data.sales);
        setError(false);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  if (error) {
    return (
      <>
        <div className="w-[8cm] border-2 h-[2.5cm] gap-2 items-center justify-center border-black py-2 flex flex-col px-2 rounded-md">
          <span className=" text-red-600 font-semibold">Error Occured!</span>
          <button
            className=" rounded-md bg-black text-white px-4 py-2"
            onClick={() => fetchSales()}
          >
            Try again
          </button>
        </div>
      </>
    );
  }

  return <SaleBox title={title} amount={loading ? null : amount} />;
}

export default TodaySales;
