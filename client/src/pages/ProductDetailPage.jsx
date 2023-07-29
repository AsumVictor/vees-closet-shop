import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import DesktopImageView from "../components/imageView/DesktopImageView";
import MobileImageView from "../components/imageView/MobileImageView";
import { HiMinus, HiPlus, HiTrash } from "react-icons/hi";
import { AiFillHeart, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, removeFromCart } from "../redux/actions/cart";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { toast } from "react-toastify";

function ProductDetailPage() {
  const { state } = useLocation();
  const { name } = useParams();
  const [product, setProduct] = useState(null);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const productName = name.replace(/-/g, " ");
  const isItemExists = cart && cart.find((i) => i._id === product?._id);
  const [value, setValue] = useState(isItemExists ? isItemExists.qty : 1);

  useEffect(() => {
    const getProduct = async () => {
      if (state) {
        setProduct(state?.productData);
      } else {
        setProduct({
          _id: 25,
          title: "Mens Casual Premium Slim Fit T-Shirts ",
          images: [
            "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
            "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
            "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          ],
          price: 22.3,
          description:
            "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
          category: "men's clothing",
          image:
            "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
          rating: {
            rate: 4.1,
            count: 259,
          },
        });
      }
    };
    getProduct();
  }, []);

  const addToCartHandler = (id) => {
    const cartData = { ...product, qty: value };
    dispatch(addTocart(cartData));
    toast.success("Item added to cart successfully!");
  };
  const removeFromCartHandler = () => {
    setValue(1);
    dispatch(removeFromCart(product));
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
    if (isItemExists) {
      const updateCartData = { ...product, qty: value + 1 };
      dispatch(addTocart(updateCartData));
    }
  };

  const decrementQuant = () => {
    if (value > 1) {
      setValue(value - 1);
      if (isItemExists) {
        const updateCartData = { ...product, qty: value - 1 };
        dispatch(addTocart(updateCartData));
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === product?._id)) {
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
  if (!product) {
    return <h1 className="text-2xl font-bold text-center m-10">LOADING</h1>;
  }
  return (
    <div className={`${styles.section} flex flex-col`}>
      <div className="w-full 800px:grid grid-cols-2 mt-10 ">
        <div className="w-full py-1">
          <DesktopImageView images={product?.images} />
          <MobileImageView images={product?.images} />
        </div>
        <div className=" w-full py-1 flex flex-col mt-10 800px:mt-0">
          <h2 className="font-bold text-2xl">{product?.name}</h2>
          <p className="mt-10 font-semibold text-wine_dark_deep">
            {`${product?.description.slice(0, 520)}...`}
          </p>
          <div className="w-full mt-6 flex flex-row justify-between">
            <p className="text-2xl font-bold text-wine_primary">
              {`GH₵ ${product?.priceWithDiscount.toFixed(2)}`}
            </p>
            <p>
            {click ? (
              <AiFillHeart
                size={30}
                className="cursor-pointer text-wine_primary"
                onClick={() => removeFromWishlistHandler(product)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={30}
                className="cursor-pointer text-wine_primary"
                onClick={() => addToWishlistHandler(product)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            </p>
           
          </div>
          <div className="flex flex-row flex-wrap gap-2 w-full mt-14 justify-center 800px:justify-start">
            <ProductQuant value={value} handleValueChange={handleValueChange} />
            {isItemExists ? (
              <button
                className="flex flex-row justify-center items-center w-full h-[40px] 550px:w-10/12 800px:w-5/12 text-xl font-semibold gap-2 py-1 px-2 bg-transparent rounded-md text-red-700 hover:bg-red-100"
                onClick={() => removeFromCartHandler()}
              >
                <HiTrash />
                <span>Remove from cart</span>
              </button>
            ) : (
              <button
                className="flex flex-row justify-center items-center w-full h-[40px] 550px:w-10/12 800px:w-5/12 text-xl font-semibold gap-2 py-1 px-2 bg-wine_primary rounded-md text-white hover:bg-wine_secondary"
                onClick={() => addToCartHandler()}
              >
                <AiOutlineShoppingCart />
                <span>Add to cart</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductQuant({ value, handleValueChange }) {
  return (
    <div className="flex flex-row bg-white_secondary justify-between px-12 800px:px-5 w-full h-[40px] 550px:w-10/12 800px:w-5/12 ">
      <button
        className=" text-wine_primary px-3 rounded-md"
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
        className=" text-wine_primary px-3 rounded-md"
        onClick={() => {
          handleValueChange("INCREMENT");
        }}
      >
        <HiPlus />
      </button>
    </div>
  );
}
export default ProductDetailPage;
