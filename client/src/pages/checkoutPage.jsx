import React, { useEffect, useState } from "react";
import { MdOutlinePersonalInjury } from "react-icons/md";
import OrderSummaryBoxInfo from "../components/checkout/orderSummaryBox";
import { LabelInput } from "../components/inputs/labelInput";
import { FaShippingFast } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import { PaymentRadio } from "../components/inputs/radioButton";
import mtn from "../assets/images/mtn.png";
import vodafone from "../assets/images/vodafone.png";
import airtelTigo from "../assets/images/airteligo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CouponApply from "../components/order/CouponApply";
import { AiFillInfoCircle } from "react-icons/ai";
import server from "../server";
import axios from "axios";
import { HiCheckCircle } from "react-icons/hi";
import { getCart } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

function CheckoutPage() {
  const { user } = useSelector((state) => state.client);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { totalCost, items } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [tackingID, setTackingID] = useState(null);
  const [formData, setFormData] = useState({
    shippingCost: 45.0,
    coupon: null,
    address1: "",
    address2: "",
    phone_number: "",
    region: "",
    location: "",
    paymentProvider: "",
    payment_number: "",
  });
  const [userDetails, setUserDetails] = useState({
    first_name: user ? user.first_name : "",
    last_name: user ? user.last_name : "",
    email: user ? user.email : "",
  });

  const [discount, setDiscount] = useState(0);

  let netCost = totalCost + formData.shippingCost - discount;
  useEffect(() => {
    if (items.length < 1) {
      navigate("/cart");
    }
    window.scrollTo(0, 0);
  }, []);

  const handleFormData = (field, value) => {
    setFormData((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleUserData = (field, value) => {
    setUserDetails((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  useEffect(() => {
    if (isModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isModal]);

  const handleSubmit = async (e) => {
    let url = user ? "place-order" : "guest-place-order";
    e.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post(`${server}order/${url}`, {
        userDetails,
        shipping_address: {
          address1: formData.address1,
          address2: formData.address2,
          region: formData.region,
          location: formData.location,
          phone_number: formData.phone_number,
        },
        paymentInfo: {
          provider: formData.paymentProvider,
          payment_number: formData.payment_number,
        },
        items,
        coupon: formData.coupon,
        shipping_cost: formData.shippingCost,
      }, {
        withCredentials: true,
      });
      if (res.data.success) {
        setLoading(false);
        setIsModal(true);
        setTackingID(res.data.order);
        window.localStorage.removeItem('cartItems')
        dispatch(getCart());
        
      }
    } catch (error) {
      setLoading(false);
      let errmsg = error.response.data.message
        ? error.response.data.message
        : error.message;
      toast.error(errmsg);
    }
  };

  return (
    <>
      <form className=" grid grid-cols-3 mt-[3rem]" onSubmit={handleSubmit}>
        <Helmet>
          <title> Shop Checkout - Vees closet </title>

          <meta
            name="keywords"
            content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
          />
        </Helmet>

        <div className="py-10 col-span-full 800px:col-span-2 text-black">
          {!user && (
            <p className="py-1 px-3 mx-3 bg-[#351e161e] border-t-2 border-t-deep-primary flex gap-2 mb-5">
              <span>Returning customer?</span>
              <Link to={"../login"} className=" hover:underline text-blue-600">
                Click here to login
              </Link>
            </p>
          )}
          <h1 className=" px-3 text-2xl">Order information</h1>

          <div className="px-4 1000px:px-10 mt-5 ">
            <div className="w-full border-l-[4px] border-deep-primary">
              <OrderSummaryBoxInfo
                title={"Personal Information"}
                icon={<MdOutlinePersonalInjury size={23} color="white" />}
              >
                <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
                  <LabelInput
                    label={"First Name"}
                    type={"text"}
                    value={userDetails.first_name}
                    isRequired={true}
                    isDisabled={user || loading}
                    handleChange={(e) =>
                      handleUserData("first_name", e.target.value)
                    }
                  />
                  <LabelInput
                    label={"Last Name"}
                    value={userDetails.last_name}
                    isDisabled={user || loading}
                    type={"text"}
                    handleChange={(e) =>
                      handleUserData("last_name", e.target.value)
                    }
                    isRequired={true}
                  />

                  <LabelInput
                    label={"Email address"}
                    type={"email"}
                    value={userDetails.email}
                    isRequired={true}
                    isDisabled={user || loading}
                    handleChange={(e) =>
                      handleUserData("email", e.target.value)
                    }
                  />
                </div>
              </OrderSummaryBoxInfo>
              <OrderSummaryBoxInfo
                title={"Shipping Information"}
                icon={<FaShippingFast size={23} color="white" />}
              >
                <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-2 gap-5">
                  <LabelInput
                    label={"Address 1"}
                    type={"text"}
                    isRequired={true}
                    isDisabled={loading}
                    handleChange={(e) =>
                      handleFormData("address1", e.target.value)
                    }
                  />
                  <LabelInput
                    label={"Additional address"}
                    type={"text"}
                    isRequired={false}
                    isDisabled={loading}
                    handleChange={(e) =>
                      handleFormData("address2", e.target.value)
                    }
                  />
                  <LabelInput
                    label={"Phone number"}
                    type={"tel"}
                    pattern="^0[25]\d{8}$"
                    isDisabled={loading}
                    isRequired={true}
                    handleChange={(e) =>
                      handleFormData("phone_number", e.target.value)
                    }
                  />
                  <LabelInput
                    label={"State or Region"}
                    type={"text"}
                    isDisabled={loading}
                    isRequired={true}
                    handleChange={(e) =>
                      handleFormData("region", e.target.value)
                    }
                  />

                  <LabelInput
                    label={"City"}
                    type={"text"}
                    isDisabled={loading}
                    isRequired={true}
                    handleChange={(e) =>
                      handleFormData("location", e.target.value)
                    }
                  />
                </div>
              </OrderSummaryBoxInfo>
              <OrderSummaryBoxInfo
                title={"Payment Information"}
                icon={<BsCreditCard size={23} color="white" />}
              >
                <div className="w-full py-5 px-[0.5cm] grid grid-cols-1 500px:grid-cols-3 gap-5">
                  <h2 className="col-span-full">Choose payment provider</h2>
                  <PaymentRadio
                    img={mtn}
                    label={"MTN MoMo"}
                    id={"mtn"}
                    value={"mtn"}
                    handleChange={(e) =>
                      handleFormData("paymentProvider", e.target.value)
                    }
                  />
                  <PaymentRadio
                    img={vodafone}
                    label={"Vodafone cash"}
                    id={"vodafone"}
                    value={"vodafone"}
                    handleChange={(e) =>
                      handleFormData("paymentProvider", e.target.value)
                    }
                  />
                  <PaymentRadio
                    img={airtelTigo}
                    label={"Airtel Tigo cash"}
                    id={"tigo"}
                    value={"AirtelTigo"}
                    handleChange={(e) =>
                      handleFormData("paymentProvider", e.target.value)
                    }
                  />
                  <h2 className="mt-2 col-span-full">Mobile number</h2>
                  <div className="w-full grid grid-cols-12 h-[1.1cm] col-span-full 550px:col-span-2">
                    <div className=" bg-gray-200 col-span-3 h-full flex items-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/40/Flag_of_Ghana.png"
                        alt="img"
                        className="w-[0.8cm] h-[0.6cm]"
                      />
                      <span>+233</span>
                    </div>
                    <div className="col-span-9 h-full">
                      <input
                        onChange={(e) =>
                          handleFormData("payment_number", e.target.value)
                        }
                        pattern="^(2|5)\d{8}$"
                        required
                        disabled={loading}
                        type="tel"
                        name="mobileNumber"
                        id="mobileNumber"
                        className="col-span-9 w-full h-full outline-none px-2 border-2 border-deep-primary invalid:text-red-600"
                      />
                    </div>
                  </div>
                </div>
              </OrderSummaryBoxInfo>
            </div>
          </div>
        </div>
        <div className="sticky top-10 py-10 col-span-full 800px:col-span-1 px-5 ">
          <h1 className=" text-2xl capitalize  sticky top-0">cart summary</h1>
          <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
            <span>Subtotal</span>
            <span>₵ {totalCost}</span>
          </h3>
          <h3 className="flex justify-between py-2 uppercase font-semibold">
            <span>Shipping cost</span>
            <span>₵ {formData.shippingCost.toFixed(2)}</span>
          </h3>
          <h3 className="flex justify-between py-2 uppercase font-semibold">
            <span>Discount</span>
            <span>{discount > 0 ? `- ${discount.toFixed(2)}` : "-"}</span>
          </h3>

          <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
          <h3 className="flex justify-between py-2 uppercase font-semibold">
            <span>total</span>
            <span>₵ {netCost.toFixed(2)}</span>
          </h3>
          <hr className=" col-span-full h-[0.03cm] bg-slate-200" />

          <ul>
            <li className=" grid grid-cols-10"></li>
          </ul>
          <hr className=" col-span-full h-[0.03cm] bg-slate-200" />

          <CouponApply
            handleChange={handleFormData}
            handleDiscount={setDiscount}
          />
          {discount > 0 && (
            <p className=" items-center grid grid-cols-12 px-2 py-1 text-emerald-700 bg-emerald-200">
              <AiFillInfoCircle />
              <span className=" col-span-10">Coupon discount allowed</span>
            </p>
          )}
          <button
            type="submit"
            className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium flex justify-center items-center"
          >
            {loading ? <div className="spinner"></div> : " Place order"}
          </button>
        </div>
      </form>

      {isModal && (
        <div className="h-screen w-full fixed z-[100] bg-[#444444de] flex justify-center items-center">
          <div className="w-full bg-white 500px:w-[12cm] mx-3 flex flex-col items-center py-10 px-3 rounded-md">
            <p className=" font-semibold text-xl">
              Your order has been recieved
            </p>
            <HiCheckCircle size={60} className="mt-3 text-deep-primary" />
            <p className=" font-medium mt-2 mb-1">
              Thank you for your purchase!
            </p>
            <p>Your order ID is: {tackingID}</p>
            <p className=" text-center mt-3">
              You will recieve an order confirmation email with detail of your
              order
            </p>
            <Link
              to={"/"}
              className=" mt-5 px-4 uppercase font-medium py-2 bg-deep-primary text-white"
            >
              continue shopping
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckoutPage;
