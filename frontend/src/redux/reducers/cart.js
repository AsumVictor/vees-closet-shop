import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCost: 0,
  isError: false,
  isGettingCart: true,
};

export const cartReducer = createReducer(initialState, {
  getCartRequest: (state, action) => {
    state.isError = false;
    state.isGettingCart = true;
  },
  getCart: (state, action) => {
    state.items = action.payload.cart.productsItems;
    state.totalCost = action.payload.cart.total_cost;
    state.isError = false;
    state.isGettingCart = false;
  },
  Error: (state, action) => {
    state.isError = true;
    state.isGettingCart = false;
  },
  addToCart: (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  }, 
  removeFromCart: (state, action) => {
    return {
      ...state,
      cart: state.cart.filter((i) => i._id !== action.payload),
    };
  },
});
