import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
  user: null
};

export const userReducers = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.isAuthenticated = false;
    state.loading = false;
    state.error = action.payload;
  },
  ClearError: (state) => {
    state.error = null;
  },



});
