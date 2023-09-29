import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  isAdmin: true,
  admin: null,
  isError: false,
};

export const adminReducer = createReducer(initialState, {
  LoadAdminRequest: (state) => {
    state.isLoading = true;
    state.isError = false;
  },
  LoadAdminSuccess: (state, action) => {
    state.isAdmin = true;
    state.isLoading = false;
    state.admin = action.payload;
    state.isError = false;
  },
  LoadAdminFail: (state, action) => {
    state.isLoading = false;
    state.isAdmin = true;
    state.isError = true;
  },
});
