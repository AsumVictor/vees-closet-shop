import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cart";
import { newArrivalReducer } from "./reducers/newArrival";
import { userReducers } from "./reducers/user";
import { adminReducer } from "./reducers/admin";
import { categoryReducer, variationReducer } from "./reducers/variation";



const Store = configureStore({
  reducer: {
    cart: cartReducer,
    newProducts: newArrivalReducer,
    client: userReducers,
    admin: adminReducer,
    variations: variationReducer,
    categories: categoryReducer
  },
});

export default Store;
