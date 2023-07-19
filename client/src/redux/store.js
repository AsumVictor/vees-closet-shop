import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./reducers/user";
import { cartReducer } from "./reducers/cart.js";

const Store = configureStore({
  reducer: {
    user: userReducers,
    cart: cartReducer,
  },
});

export default Store;
