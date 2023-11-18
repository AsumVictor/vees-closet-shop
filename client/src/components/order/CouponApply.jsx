import React, { useEffect, useState } from "react";
import { LabelInput } from "../inputs/labelInput";
import server from "../../server";
import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";

function CouponApply({ handleChange, handleDiscount }) {
  const { totalCost } = useSelector((state) => state.cart);
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoupon = async () => {
    setError(null);
    handleChange(null);
    handleDiscount(0);
    try {
      setLoading(true);
      let res = await axios(
        `${server}coupon/get-coupon-value/${coupon}?price=${totalCost}`
      );
      if (res.data.success) {
        handleChange("coupon", res.data.code);
        handleDiscount(res.data.value);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      let errmsg = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      setError(errmsg);
    }
  };

  useEffect(() => {
    handleChange('coupon', null);
    handleDiscount(0);
    setError(null);
  }, [coupon]);

  return (
    <div className="w-full py-1 grid grid-cols-12 mt-5">
      <LabelInput
        InputParentExtendClass=" col-span-9"
        label={"Do you coupon ?"}
        handleChange={(e) => setCoupon(e.target.value)}
        isDisabled={loading}
      />
      <button
        type="button"
        disabled={loading}
        onClick={() => getCoupon()}
        className={`py-1 px-2 ${
          loading ? "bg-slate-100" : "bg-primary-800"
        }  col-span-3 text-white flex justify-center items-center `}
      >
        {loading ? <div className="spinner"></div> : "Apply"}
      </button>

      {error && (
        <p className="col-span-full text-red-600 py-1 px-3 bg-red-100 mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default CouponApply;
