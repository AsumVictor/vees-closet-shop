// add to cart
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "getCartRequest",
    });
    let res = await axios(`${server}cart/get-cart`, {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "getCart",
        payload: res.data,
      });
    } else {
      dispatch({
        type: "Error",
      });
    }
  } catch (error) {
    dispatch({
      type: "Error",
    });
  }
};

export const getCartQTY = () => async (dispatch, getState) => {
  try {
    let res = await axios(`${server}cart/get-cart`, {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "getCart",
        payload: res.data,
      });
    } else {
      dispatch({
        type: "Error",
      });
    }
  } catch (error) {
    dispatch({
      type: "Error",
    });
  }
};
// remove from cart
export const removeFromCart = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "RemoveCartRequest",
    });
    let res = await axios.post(`${server}cart/remove-from-cart`, data, {
      withCredentials: true,
    });
    if (res.data.success) {
      let res = await axios(`${server}cart/get-cart`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch({
          type: "getCart",
          payload: res.data,
        });
      }
    } else {
      dispatch({
        type: "clearRemoved",
      });
      toast.error("Failed to remove item cart. Try again", {
        toastId: "removeErr",
      });
    }
  } catch (error) {
    dispatch({
      type: "clearRemoved",
    });
    toast.error("Failed to remove item cart. Try again", {
      toastId: "removeErr",
    });
  }
};
