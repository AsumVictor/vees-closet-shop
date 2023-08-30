import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cart";
import { newArrivalReducer } from "./reducers/newArrival";

import { userReducers } from "./reducers/user";
import { wishlistReducer } from "./reducers/wishlist";
import { shopReducer } from "./reducers/shop";
import { productReducer } from "./reducers/product";



const Store = configureStore({
  reducer: {
    cart: cartReducer,
    newProducts: newArrivalReducer,
  },
});

export default Store;
