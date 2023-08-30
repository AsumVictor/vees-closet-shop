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
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.error = null;
    state.success = true;
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isDeleting = true;
    state.deletingSuccess = false;
    state.deleteError = null;
    },
  deleteProductSuccess: (state, action) => {
    state.isDeleting = false;
    state.deletingSuccess = true;
    state.deleteError = null;

  },
  deleteProductFailed: (state, action) => {
    state.isDeleting = false;
    state.deleteError = action.payload;
    state.deletingSuccess = false;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isDeleting = false;
    state.deletingSuccess = false;
    state.deleteError = null;
  },

  clearErrors: (state) => {
    state.error = null;
  },
});
