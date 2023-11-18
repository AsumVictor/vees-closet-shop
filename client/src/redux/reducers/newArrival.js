import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isError: false,
  isFetchingNewProd: true,
};

export const newArrivalReducer = createReducer(initialState, {
  getNewProductsRequest: (state, action) => {
    state.isError = false;
    state.isFetchingNewProd = true;
  },
  getNewProducts: (state, action) => {
    state.products = action.payload.products;
    state.isError = false;
    state.isFetchingNewProd = false;
  },
  error: (state, action) => {
    state.isError = false;
    state.isFetchingNewProd = false;
  },
});
