import React from 'react'
import Wishlist from '../components/Wishlist/Wishlist';

function WishListPage() {
    return (
        <div
          className={`w-full py-10 px-2 md:px-5 lg:px-10 relative grid gap-3 800px:grid-cols-10`}
        >
          <div className="py-2 800px:col-span-6 flex flex-col items-center px-2">
            <div className="w-full rounded-md pt-1 pb-5 bg-white px-2 800px:px-5">
              <h3 className="self-start font-bold text-xl">{`Saved to later (6)`}</h3>
              <hr className="mt-2" />
              <Wishlist />
              <Wishlist />
              <Wishlist />
              <Wishlist />
              <Wishlist />
              <Wishlist />
            </div>
          </div>
        </div>
      );
}


export default WishListPage
