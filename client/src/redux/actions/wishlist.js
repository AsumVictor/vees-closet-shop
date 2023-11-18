// add to wishlist
import {toast} from 'react-toastify'
export const addToWishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "addToWishlist",
      payload: data,
    });
  
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    toast.success('Product added to wishlist')
    return data;
  };
  
  // remove from wishlist
  export const removeFromWishlist = (data) => async (dispatch, getState) => {
    dispatch({
      type: "removeFromWishlist",
      payload: data._id,
    });
    localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
    toast.info('Product removed from wishlist')
    return data;
  };
  