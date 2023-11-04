import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalCost: 0,
    isError: false,
    isGettingCart: true,
    removing: false,
};

export const cartReducer = createReducer(initialState, {
    getCartRequest: (state) => {
        state.isError = false;
        state.isGettingCart = true;
        state.removing = false;
    },
    getCart: (state, action) => {
        state.items = action.payload.cart.productsItems;
        state.totalCost = action.payload.cart.total_cost;
        state.isError = false;
        state.isGettingCart = false;
        state.removing = false;
    },
    Error: (state) => {
        state.isError = true;
        state.isGettingCart = false;
        state.removing = false;
    },
    RemoveCartRequest: (state) => {
        return {
            ...state,
            removing: true,
        };
    },
    clearRemoved: (state) => {
        return {
            ...state,
            removing: false,
        };
    },
});
