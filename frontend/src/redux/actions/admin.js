import axios from "axios";
import server from "../../server";

export const LoadAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadAdminRequest",
    });
    const { data } = await axios.get(`${server}user/getuser`, {
      withCredentials: true,
    });
    if (data.success) {
      dispatch({
        type: "LoadAdminSuccess",
        payload: data.user,
      });
    }
  } catch (error) {
    dispatch({
      type: "LoadAdminFail",
      payload: error,
    });
  }
};

// load seller
export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getShop`, {
      withCredentials: true,
    });
    if (data) {
      dispatch({
        type: "LoadSellerSuccess",
        payload: data.seller,
      });
    }
  } catch (error) {
    let errorMessage = error.response
      ? error.response.data.message
      : error.message;
    dispatch({
      type: "LoadSellerFail",
      payload: errorMessage,
    });
  }
};
