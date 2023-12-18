import { useEffect, useState } from "react";
import server from "../server";
import { LabelInput } from "../components/inputs/labelInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { MdAccountCircle, MdError } from "react-icons/md";

function SignupPage() {
  const { isAuthenticated } = useSelector((state) => state.client);
  const { state } = useLocation();
  const path = state?.pathname ? state.pathname : "/";
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const canSubmit =
    email.trim() !== "" &&
    password.trim() !== "" &&
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    confirmPass.trim() === password.trim();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const userIformation = {
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    };

    axios
      .post(`${server}user/register`, userIformation)
      .then((res) => {
        setEmail("");
        setPassword("");
        setConfirmPass("");
        setFirstName("");
        setLastName("");
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
        <title> Signup - Vees closet </title>
        <meta
          name="description"
          content={`Create an account and find the perfect affordable clothing at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      <MdAccountCircle size={44} className=" text-primary-600" />

      <h1 className="text-2xl mt-3 font-extrabold uppercase">Create your account</h1>
      <p className="mt-2 text-[14px] font-semibold text-gray-400 py-1 w-full 400px:w-[10cm] text-center">
        Stay connected with us! Create your account for the latest products.
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
            type={"firstName"}
            label={"firstName"}
            isRequired={true}
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <LabelInput
            type={"lastName"}
            label={"lastName"}
            isRequired={true}
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <LabelInput
            label={"email"}
            type={"email"}
            isRequired={true}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <LabelInput
            type={"password"}
            label={"password"}
            isRequired={true}
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <LabelInput
            type={"password"}
            label={"confirm Password"}
            isRequired={true}
            value={confirmPass}
            handleChange={(e) => setConfirmPass(e.target.value)}
          />

          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="py-2 bg-primary-800 text-white font-semibold disabled:opacity-20"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
        <p className="mt-2">
          Already have an account yet?
          <Link to={"/login"} className="ml-1 text-blue-700 underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}

export default SignupPage;
