import {
  AiOutlineShoppingCart,
  AiOutlineHeart,
  AiFillHeart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addTocart, removeFromCart } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import { HiMinus, HiPlus } from "react-icons/hi";
import { useEffect, useState } from "react";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist";

function ProductCard({ product }) {
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const { _id, title, images, price } = product;
  const isItemExists = cart && cart.find((i) => i._id === _id);
  const [value, setValue] = useState(isItemExists ? isItemExists.qty : 0);
  const dispatch = useDispatch();
  const productUrl = title.replace(/\s+/g, "-");

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === product._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (product) => {
    setClick(!click);
    dispatch(removeFromWishlist(product));
  };

  const addToWishlistHandler = (product) => {
    setClick(!click);
    dispatch(addToWishlist(product));
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
    <div
      className={`h-[9cm] w-[7cm] bg-white relative rounded-xl px-2 py-2 shadow-lg hover:scale-105 transition-all`}
    >
      {click ? (
        <AiFillHeart
          size={30}
          className="absolute cursor-pointer text-wine_primary"
          onClick={() => removeFromWishlistHandler(product)}
          color={click ? "red" : "#333"}
          title="Remove from wishlist"
        />
      ) : (
        <AiOutlineHeart
          size={30}
          className="absolute cursor-pointer text-wine_primary"
          onClick={() => addToWishlistHandler(product)}
          color={click ? "red" : "#333"}
          title="Add to wishlist"
        />
      )}
      <Link
        to={`/products/${productUrl}`}
        state={{ productData: product }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="h-[4.5cm] w-full">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-scale-down"
          />
        </div>
        <h4 className={`font-semibold pr-3 h-[1.4cm] overflow-hidden`}>
          {title}
        </h4>
        <h4 className="font-bold text-[17px] text-wine_primary mt-2">
          {`GH₵ ${price}`}
        </h4>
      </Link>
      <div className="w-full">
        {isItemExists ? (
          <div className="flex flex-row bg-white justify-between px-12 800px:px-5 w-full h-[40px] mt-4">
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
            className="flex flex-row justify-center items-center w-full text-xl font-semibold gap-2 py-1 px-2 bg-wine_primary rounded-md mt-5 text-white hover:bg-wine_secondary"
            onClick={() => addToCartHandler(product._id)}
          >
            <AiOutlineShoppingCart />
            <span>Add to cart</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
