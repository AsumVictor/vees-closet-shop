import { configureStore } from "@reduxjs/toolkit";
import { userReducers } from "./reducers/user.js";
const Store = configureStore({
  reducer: {
    user: userReducers,
  },
});

export default Store;
