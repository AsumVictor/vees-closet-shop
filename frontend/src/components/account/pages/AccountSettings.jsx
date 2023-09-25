import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useSelector } from "react-redux";
import { HiBadgeCheck } from "react-icons/hi";
import { toast } from "react-toastify";
import server from "../../../server";
import axios from "axios";
import { Helmet } from "react-helmet-async";


function AccountSettings() {
  const { user } = useSelector((state) => state.client);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState(null);
  const [verifying, setVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const userIformation = {
      firstName,
      lastName,
    };

    axios
      .put(`${server}user/update-info`, userIformation, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message, {
            toastId: "updateInfoSuccess",
          });
          window.location.reload(true);
        }
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.response?.data
          ? err.response.data.message
          : err.message;
        setError(errMessage);
      });
  };

  const handleVerify = async (e) => {
    setVerifying(true);
    axios
      .put(`${server}user/email-verify-req`, null, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          setVerifying(false);
          toast.success(res.data.message, {
            toastId: "verifyEmail",
          });
        }
      })
      .catch((err) => {
        setVerifying(false);
        let errMessage = err.response?.data
          ? err.response.data.message
          : err.message;
        toast.error(errMessage, {
          toastId: "verifyError",
        });
      });
  };

  return (
    <div className="w-full">
        <Helmet>
        <title>Account setting - Vees closet </title>
        <meta
          name="description"
          content={`Explore our wide range of high-quality clothing for every need. Find the perfect fashion at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      <div className="w-full bg-gray-100 py-1 flex flex-row gap-4 px-3 items-end">
        <Link to={".."} relative={"path"} className=" 650px:hidden">
          <MdOutlineKeyboardBackspace size={31} />
        </Link>
        <h1 className="text-xl">Account Settings</h1>
      </div>

      <div className="w-full flex flex-row mt-7 pr-10 gap-4 px-3 items-end justify-between">
        <h2 className="text-xl bg-white font-semibold">Profile Details</h2>
        <button
          onClick={() => setEditable((prev) => !prev)}
          disabled={loading}
          type="button"
          className={`${
            editable
              ? "bg-red-100 text-red-600"
              : "bg-deep-primary text-white  "
          } px-4 py-1  flex flex-row
           gap-2`}
        >
          {editable ? (
            "Cancel"
          ) : (
            <>
              <CiEdit size={24} />
              <span>Edit Profile</span>
            </>
          )}
        </button>
      </div>

      <form
        className="w-full px-3 mt-10 flex flex-col gap-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && (
          <p className="text-red-800 text-center bg-red-100 py-1">{error}</p>
        )}

        <div className="">
          <p>First Name</p>
          {editable ? (
            <input
              type="text"
              required={true}
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              disabled={!editable}
              name="firstName"
              id="firstName"
              className="w-full outline-0 text-xl font-medium"
            />
          ) : (
            <p className="w-full outline-0 text-xl font-medium">
              {user.first_name}
            </p>
          )}
          <hr className={`mt-2 ${editable && "border-deep-primary"} `} />
        </div>
        <div className="">
          <p>Last Name</p>
          {editable ? (
            <input
              required={true}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              disabled={!editable}
              name="firstName"
              id="firstName"
              className="w-full outline-0 text-xl font-medium"
            />
          ) : (
            <p className="w-full outline-0 text-xl font-medium">
              {user.last_name}
            </p>
          )}
          <hr className={`mt-2 ${editable && "border-deep-primary"} `} />
        </div>
        <div className="w-full">
          <p>Email Address</p>
          <div className="w-full grid grid-cols-10">
            <input
              type="text"
              value={user.email}
              disabled={true}
              name="email"
              id="email"
              className="w-full outline-0 text-xl font-medium col-span-7"
            />
            {/* <button
              type="button"
              onClick={() => handleVerify()}
              disabled={user.isEmail_verified}
              className={`py-1 px-2 ${
                !user.isEmail_verified
                  ? "bg-deep-primary text-white"
                  : "text-emerald-600"
              } ${verifying && "opacity-40"}   col-span-3 600px:col-span-2`}
            >
              {user.isEmail_verified ? (
                <div className="flex gap-1 items-center">
                  <HiBadgeCheck />
                  <span>Verfied</span>
                </div>
              ) : (
                <>{verifying ? "Wait..." : "Verify"}</>
              )}
            </button> */}
          </div>
          <hr className="mt-2 border-deep-primary" />
        </div>

        {editable && (
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 bg-deep-primary text-white font-medium disabled:opacity-30"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}

export default AccountSettings;
