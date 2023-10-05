import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";

export const LoadVariation = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadVariationRequest",
    });
    const { data } = await axios.get(`${server}variation/get-variations`, {
      withCredentials: true,
    });
    if (data.success) {
      dispatch({
        type: "LoadVariationSuccess",
        payload: data.variations,
      });
    }
  } catch (error) {
    dispatch({
      type: "LoadVariationFail",
      payload: error,
    });
  }
};

export const UpdateVariation = () => async (dispatch) => {
    try {
     
      const { data } = await axios.get(`${server}variation/get-variations`, {
        withCredentials: true,
      });
      if (data.success) {
        dispatch({
          type: "LoadVariationSuccess",
          payload: data.variations,
        });
      }
    } catch (error) {
      toast.error('Failed to update variations!')
    }
  };

