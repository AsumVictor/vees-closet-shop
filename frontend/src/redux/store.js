import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cart";
import { newArrivalReducer } from "./reducers/newArrival";
import { userReducers } from "./reducers/user";
import { adminReducer } from "./reducers/admin";



const Store = configureStore({
  reducer: {
    cart: cartReducer,
    newProducts: newArrivalReducer,
    client: userReducers,
    admin: adminReducer
  },
});

export default Store;
