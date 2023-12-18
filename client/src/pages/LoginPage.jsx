import { useEffect, useState } from "react";
import server from "../server";
import { LabelInput } from "../components/inputs/labelInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdError } from "react-icons/md";

function LoginPage() {
  const { isAuthenticated } = useSelector((state) => state.client);
  const { state } = useLocation();
  const path = state?.pathname ? state.pathname : "/";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canSubmit = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const userIformation = {
      email,
      password,
    };

    axios
      .post(`${server}user/auth`, userIformation, {
        withCredentials: true,
      })
      .then((res) => {
        setEmail("");
        setPassword("");
        navigate(path, { replace: true });
        window.location.reload(true);
      })
      .catch((err) => {
        setLoading(false);
        let errMessage = err.response?.data
          ? err.response.data.message
          : err.message;
        setError(errMessage);
      });
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(path);
    }
  }, []);

  return (
    <div className="w-full  overflow-y-auto mt-10 py-20 flex flex-col justify-center items-center px-3">
      <Helmet>
        <title>Login - Vees closet </title>
        <meta
          name="description"
          content={`Login and find the perfect affordable clothing at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      <RiLockPasswordLine size={32} className=" text-primary-600" />

      <h1 className="text-2xl mt-3 font-extrabold uppercase">
        Welcome to Vees closet
      </h1>
      <p className="mt-2 text-[14px] font-semibold text-gray-400 py-1 w-full 400px:w-[10cm] text-center">
        Stay connected with us! Log in to your account for the latest products.
      </p>
      <form
        className=" mt-10 py-1 w-full 400px:w-[10cm]"
        onSubmit={(e) => handleSubmit(e)}
      >
        {error && (
          <p className="text-red-800 bg-red-100 py-1 px-2 rounded-md border border-red-300 font-bold mb-3 grid grid-cols-12">
            <MdError size={22} />
            <span className=" text-start col-span-11">{error}</span>
          </p>
        )}
        <div className="w-full flex flex-col gap-4">
          <LabelInput
            label={"email"}
            type={"email"}
            isRequired={true}
            value={email}
            handleChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
          />
          <div className="flex flex-col w-full">
            <LabelInput
              type={"password"}
              label={"password"}
              isRequired={true}
              value={password}
              handleChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
            />
            <Link to={"/forgot-password"} className=" text-blue-700 underline">
              Forgot password
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" disabled:opacity-50 py-2 bg-primary-800 text-white font-semibold"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
        <p className="mt-2">
          Don't have an account yet?{" "}
          <Link to={"/signup"} className=" text-blue-700 underline">
            Create account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
