// add to cart
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";

export const getNewProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getNewProductsRequest",
    });
    let res = await axios(`${server}product/get-new-products?limit=12`);
    if (res.data.success) {
      dispatch({
        type: "getNewProducts",
        payload: res.data,
      });
    } else {
      dispatch({
        type: "error",
      });
    }
  } catch (error) {
    dispatch({
      type: "error",
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
