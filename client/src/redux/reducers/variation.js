import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isVariation: true,
  variation: null,
  isError: false,
};

export const variationReducer = createReducer(initialState, {
  LoadVariationRequest: (state) => {
    state.isLoading = true;
    state.isError = false;
  }, 
  LoadVariationSuccess: (state, action) => {
    state.isVariation = true;
    state.isLoading = false;
    state.variation = action.payload;
    state.isError = false;
  },
  LoadVariationFail: (state, action) => {
    state.isLoading = false;
    state.isVariation = true;
    state.isError = true;
  },
  addNewVariant: (state, action) => {
    state.variation = [action.payload, ...state.variation]
  },
});

const categoryinitialState = {
  isLoading: true,
  isCategory: true,
  category: [],
  isError: false,
};

export const categoryReducer = createReducer(categoryinitialState, {
  LoadCategoryRequest: (state) => {
    state.isLoading = true;
    state.isError = false;
  }, 
  LoadCategorySuccess: (state, action) => {
    state.isCategory = true;
    state.isLoading = false;
    state.category = action.payload;
    state.isError = false;
  },
  LoadCategoryFail: (state, action) => {
    state.isLoading = false;
    state.isCategory = true;
    state.isError = true;
  },
  addNewCategory: (state, action) => {
    state.category = [action.payload, ...state.category]
  },
});