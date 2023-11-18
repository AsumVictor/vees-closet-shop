import { Outlet, useLocation } from "react-router-dom";
import AccountNavbar from "../components/account/AccountNavbar";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { MdManageAccounts } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { LuPackage2 } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";

function AccountPage() {
  const { user } = useSelector((state) => state.client);
  const location = useLocation();
  const { pathname } = location;
  let page = pathname.split("/")[2];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="mt-[4rem] 650px:mt-[6rem]  w-full mb-10">
      <Helmet>
        <title>My account - Vees closet </title>
        <meta
          name="description"
          content={`Explore our wide range of high-quality clothing for every need. Find the perfect fashion at Vees closet.`}
        />
        <meta
          name="keywords"
          content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
        />
      </Helmet>

      {!page && (
        <div className=" bg-deep-primary py-1 w-full text-white px-5 650px:hidden">
          <h3 className="text-xl">{`Welcome, ${user.first_name}`}</h3>
          <p>{user.email}</p>
        </div>
      )}

      <div className="w-full grid grid-cols-12 gap-5 650px:px-5 1000px:px-10">
        <div
          className={`${
            page ? "hidden" : "block"
          } w-full bg-gray-100 650px:block col-span-full 650px:col-span-4 1000px:col-span-3 650px:px-0`}
        >
          <AccountNavbar
            logout={true}
            links={[
              {
                href: "./settings",
                icon: <MdManageAccounts />,
                text: "Account Settings",
              },
              {
                href: "./orders",
                icon: <LuPackage2 />,
                text: "My Orders",
              },
              {
                href: "./security",
                icon: <RiLockPasswordLine />,
                text: "Change Password",
              },
            ]}
          />
        </div>

        <div
          className={`${
            page ? "block" : "hidden"
          } w-full col-span-full 650px:col-span-8 650px:block 1000px:col-span-9`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
