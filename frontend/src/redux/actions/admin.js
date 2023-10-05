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

