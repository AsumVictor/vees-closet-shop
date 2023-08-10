import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./reducers/user";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { shopReducer } from "./reducers/shop";
import { productReducer } from "./reducers/product";
import { cartSumReducer } from "./reducers/cartSumReducer";



const Store = configureStore({
  reducer: {
    user: userReducers,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shop: shopReducer,
    product: productReducer,
    cartSummary: cartSumReducer,
  },
});

export default Store;
