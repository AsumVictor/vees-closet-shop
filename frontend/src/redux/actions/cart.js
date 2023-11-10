// add to cart
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../server";
import deepEqual from "../../helpers/deepCheck";

export const getCart = () => async (dispatch) => {
  const cartItems = window.localStorage.getItem("cartItems");
  if (!cartItems) {
    dispatch({
      type: "getCart",
      payload: { cart: { productsItems: [], total_cost: 0 } },
    });
    return;
  }

  /**
   * itemId: string,
   * quantity: string,
   * variation: { size: string, color: string }
   */
  const items = JSON.parse(cartItems);

  try {
    dispatch({
      type: "getCartRequest",
    });
    let res = await axios.post(`${server}cart/get-cart`, { items });
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

export const addItemToCart =
  ({ _id, quantity, variation }) =>
  async (dispatch) => {
    const cartItems = window.localStorage.getItem("cartItems");
    const items = JSON.parse(cartItems ?? "[]");

    // Duplication of items with same ID and quantity

    let item = {
      itemId: _id,
      quantity,
    };

    variation && (item.variations = variation);

    let foundIndex = -1;

    const foundItem = !!items.find((item, index) => {
      if (item.itemId === _id && deepEqual(item.variations, variation)) {
        foundIndex = index;
        return true;
      }
      return false;
    });

   

     if (foundItem) {
       items[foundIndex] = {
         ...items[foundIndex],
         quantity,
       };
     }else {
         items.push(item);
     }

    window.localStorage.setItem("cartItems", JSON.stringify(items));

    try {
      dispatch({
        type: "getCartRequest",
      });

      let res = await axios.post(`${server}cart/get-cart`, { items });
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

export const updateItemQuantity = (data) => async (dispatch, getState) => {
  const cartItems = window.localStorage.getItem("cartItems");
  const itemsLocal = JSON.parse(cartItems ?? "[]");

  const index = itemsLocal.findIndex((item) => item.itemId === data._id);

  if (index === -1) {
    return;
  }

  itemsLocal[index] = { ...itemsLocal[index], quantity: data.quantity };

  window.localStorage.setItem("cartItems", JSON.stringify(itemsLocal));

  try {
    const {
      cart: { items },
    } = getState();
    const newItems = [...items];
    const itemIndex = newItems.findIndex((item) => item._id === data._id);

    newItems[itemIndex] = {
      ...newItems[index],
      qty: data.quantity,
      cost: (newItems[itemIndex].actual_price * data.quantity).toFixed(2),
    };

    dispatch({
      type: "getCart",
      payload: {
        cart: {
          productsItems: newItems,
          total_cost: newItems.reduce((total, item) => item.cost + total, 0),
        },
      },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "Error",
    });
  }
};

// remove from cart
export const removeFromCart = (data) => async (dispatch) => {
  const cartItems = window.localStorage.getItem("cartItems");

  if (!cartItems) {
    return;
  }

  let items = JSON.parse(cartItems);
  items = items.filter((item) => item.itemId !== data._id);

  window.localStorage.setItem("cartItems", JSON.stringify(items));

  try {
    dispatch({
      type: "RemoveCartRequest",
    });
    let res = await axios.post(`${server}cart/get-cart`, { items });
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
      type: "clearRemoved",
    });
    toast.error("Failed to remove item cart. Try again", {
      toastId: "removeErr",
    });
  }
};
