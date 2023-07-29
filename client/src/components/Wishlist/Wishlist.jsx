import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";

function Wishlist({ product }) {
  const productUrl = product.name.replace(/\s+/g, "-");
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const isItemExists = cart && cart.find((i) => i._id === product._id);
  const [value, setValue] = useState(isItemExists ? isItemExists.qty : 0);

  const removeFromWishlistHandler = (product) => {
    dispatch(removeFromWishlist(product));
  };

  const addToCartHandler = (id) => {
    const cartData = { ...product, qty: 1 };
    setValue(1);
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };

  const handleValueChange = (type) => {
    switch (type) {
      case "INCREMENT":
        incrementQuant();
        break;
      case "DECREMENT":
        decrementQuant();
        break;
      default:
        break;
    }
  };

  const incrementQuant = () => {
    setValue(value + 1);
    const updateCartData = { ...product, qty: value + 1 };
    dispatch(addTocart(updateCartData));
  };

  const decrementQuant = () => {
    if (value > 1) {
      setValue(value - 1);
      const updateCartData = { ...product, qty: value - 1 };
      dispatch(addTocart(updateCartData));
    }
    if (value === 1) {
      setValue(0);
      dispatch(removeFromCart(product));
    }
  };

  return (
    <div className="w-full py-1 grid grid-cols-10 gap-x-3">
      <Link
        to={`/products/${productUrl}`}
        className=" col-span-3 h-[3.5cm] overflow-hidden bg-white rounded-2xl"
      >
        <img
          src={product?.images[0].url}
          alt={product?.name}
          className="w-full h-full"
        />
      </Link>
      <Link
        to={`/products/${productUrl}`}
        className=" col-span-7 py-1 800px:px-4"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <h2 className="800px:text-[18px]">{product.name}</h2>
        <p className="font-bold 800px:text-xl mt-5 flex flex-row gap-2">
          <span className="text-wine_primary ">{`GH₵ ${product.priceWithDiscount.toFixed(2)}`}</span>
        </p>
      </Link>
      <div className="col-span-full mt-7 flex flex-row justify-between">
        <button
          className="flex flex-row gap-1 px-2 text-[17px] text-red-600 items-center font-medium hover:bg-red-100 rounded-md py-1"
          onClick={() => removeFromWishlistHandler(product)}
        >
          <HiTrash />
          <span>Remove</span>
        </button>
        {isItemExists ? (
          <div className="flex flex-row bg-white justify-between px-12 800px:px-5  h-[40px]">
            <button
              className=" bg-wine_primary text-white px-3 rounded-md"
              onClick={() => {
                handleValueChange("DECREMENT");
              }}
            >
              <HiMinus />
            </button>
            <p className="px-4  flex items-center justify-center font-semibold w-[1.5cm]">
              {value}
            </p>
            <button
              className=" bg-wine_primary text-white px-3 rounded-md"
              onClick={() => {
                handleValueChange("INCREMENT");
              }}
            >
              <HiPlus />
            </button>
          </div>
        ) : (
          <button
            className="flex flex-row justify-center items-center  text-xl font-semibold gap-2 py-1 h-[40px] px-2 bg-wine_primary rounded-md text-white hover:bg-wine_secondary"
            onClick={() => addToCartHandler(product._id)}
          >
            <AiOutlineShoppingCart />
            <span>Add to cart</span>
          </button>
        )}
      </div>
     
      <hr className=" col-span-full mt-3 mb-3" />
    </div>
  );
}

export default Wishlist;
