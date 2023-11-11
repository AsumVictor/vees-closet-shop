import { useNavigate } from "react-router-dom";
import CartItem from "../components/cart/cartItem";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import PulseLoader from "../components/loaders/pulseLoader";
import Error from "../components/errorHandler/error";

function CartPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const { items, totalCost, isError, isGettingCart, removing } = useSelector(
    (state) => state.cart
  );

  if (isGettingCart) {
    return (
      <div className="mt-20 py-10">
        <PulseLoader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-20 py-10">
        <Error message={'Failed to load cart data'} />
      </div>
    );
  }

  return (
    <div className=" grid grid-cols-3 mt-10">
      <Helmet>
        <title>Shopping cart - Vees closet </title>
        <meta
          name="description"
          content={`Explore our wide range of high-quality clothing for every need. Find the perfect fashion at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>
      {items.length < 1 ? (
        <div className=" col-span-full py-40 flex flex-col justify-center items-center">
          <h1 className="text-2xl">You have no item in cart</h1>
          <button
            type="button"
            className="px-3 py-2 bg-black text-white mt-10 font-medium"
            onClick={() => navigate("/shop")}
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <>
          <div className="py-10 col-span-full 800px:col-span-2 text-black">
            <h1 className="px-10  text-2xl">Shopping cart</h1>
            <div className=" grid grid-cols-12 px-3 1000px:px-10 mt-10">
              <div className=" py-2 col-span-8 uppercase font-semibold text-[13px]">
                Products
              </div>
              <div className="hidden 1000px:block py-2 col-span-1 uppercase font-semibold text-[13px]">
                price (₵)
              </div>
              <div className="py-2 col-span-4 1000px:col-span-2 uppercase font-semibold text-[13px] ">
                quantity
              </div>
              <div className=" hidden 1000px:block py-2 col-span-1 uppercase font-semibold text-[13px]">
                subtotal (₵)
              </div>
              <hr className=" col-span-full h-[0.04cm] bg-slate-200" />
            </div>
            <div className="w-full flex flex-col">
              {items.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>
          </div>

          <div className="py-10 col-span-full 800px:col-span-1 px-5 ">
            <h1 className=" text-2xl capitalize">cart total</h1>
            <h3 className="flex justify-between mt-10 py-2 uppercase font-semibold">
              <span>Subtotal</span>
              <span>{`₵ ${totalCost}`}</span>
            </h3>

            <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
            <ul>
              <li className=" grid grid-cols-10"></li>
            </ul>
            <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
            <button
              className=" uppercase text-center w-full mt-10 py-2 bg-primary-800 text-white font-medium"
              onClick={() => navigate("/checkout")}
            >
              proceed to checkout
            </button>
          </div>
        </>
      )}

      {removing && (
        <div className=" h-screen w-full top-0 left-0 bg-[#ffffff79] z-[10] fixed flex justify-center items-center font-bold">
          <span className="py-2 px-3 bg-white">Removing...</span>
        </div>
      )}
    </div>
  );
}

export default CartPage;
