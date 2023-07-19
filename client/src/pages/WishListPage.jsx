import React from "react";
import Wishlist from "../components/Wishlist/Wishlist";
import { useSelector } from "react-redux";
import NoCartItem from "../components/cart/NoCartItem";

function WishListPage() {
  const { wishlist } = useSelector((state) => state.wishlist);
  return (
    <div
      className={`w-full py-10 px-2 md:px-5 lg:px-10 relative flex flex-col items-center`}
    >
      {wishlist && wishlist.length !== 0 ? (
        <div className="w-full py-2 800px:w-9/12 flex flex-col items-center px-2">
          <div className="w-full rounded-md pt-1 pb-5 bg-white px-2 800px:px-5">
            <h3 className="self-start font-bold text-xl">{`Saved to later (${wishlist.length})`}</h3>
            <hr className="mt-2" />
            {wishlist.map((i, index) => (
              <Wishlist product={i} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <NoCartItem wishList={true} />
      )}
    </div>
  );
}

export default WishListPage;
