// add to cart
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";

export const getCart = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: "getCartRequest",
    });
    let res = await axios(`${server}cart/get-cart`);
    if (res.data.success) {
      dispatch({
        type: "getCart",
        payload: res.data.data,
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
export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data._id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  toast.info("Product removed from cart");
  return data;
};
