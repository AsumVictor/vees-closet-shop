import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: null,
  success: false,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
    state.error = null;
    state.success = false;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.error = null;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isDeleting = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isDeleting = false;
    state.deleteMessage = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isDeleting = false;
    state.deleteError = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
