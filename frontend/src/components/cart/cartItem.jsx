import axios from 'axios';
import { useState } from 'react';
import { GrClose } from 'react-icons/gr';
import server from '../../server';
import { toast } from 'react-toastify';
import { getCartQTY, removeFromCart } from '../../redux/actions/cart';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function CartItem({ item }) {
    const dispatch = useDispatch();
    const [qty, setQty] = useState(item.qty);
    const [loading, setLoading] = useState(false);

    const handleQtyChange = async (e, type) => {
        let newQty;
        if (!type) {
            return null;
        }

        if (type === 'increment') {
            newQty = Increment();
        }

        if (type === 'decrement') {
            newQty = Decrement();
        }

        if (!newQty) {
            return null;
        }

        try {
            setLoading(true);
            let res = await axios.post(`${server}cart/add-to-cart`, {
                _id: item._id,
                qty: newQty,
                variation: item.variation_choice,
            });
            if (res.data.success) {
                setLoading(false);
                setQty(newQty);
                dispatch(getCartQTY());
            }
        } catch (error) {
            setLoading(false);
            let errMessage = error.response?.data?.message
                ? error.response.data.message
                : error.message;
            toast.error(errMessage, {
                toastId: 'changeQtyErr',
            });
        }
    };

    const Increment = () => {
        return qty + 1;
    };
    const Decrement = () => {
        if (qty <= 1) {
            return null;
        }

        return qty - 1;
    };

    return (
        <div className=" grid grid-cols-12 px-2 1000px:px-10 mt-3">
            <div className=" py-2 col-span-8 grid grid-cols-12">
                <div className="  col-span-1 absolute 1000px:relative">
                    <button
                        type="button"
                        onClick={() =>
                            dispatch(
                                removeFromCart({
                                    _id: item._id,
                                    variation: item.variation_choice,
                                })
                            )
                        }
                        className=" py-2 border bg-white font-bold px-2 rounded-full"
                    >
                        <GrClose fontWeight={700} />
                    </button>
                </div>
                <img
                    src={item.images[0].url}
                    alt="img-1"
                    className=" col-span-3 1000px:col-span-2 h-[2.5cm]"
                />
                <div className=" px-2 col-span-9 justify-center flex flex-col">
                    <Link
                        to={`../product/${item.name}`}
                        className=" text-primary-800 hover:underline"
                    >
                        {item.name}
                    </Link>
                    <div className="flex flex-col gap-1 mt-1">
                        {item.variation_choice &&
                            Object.entries(item.variation_choice).map(([key, value]) => (
                                <p className="flex text-[10px] flex-row gap-1">
                                    <span className=" uppercase font-semibold">{key}:</span>
                                    <span className=" capitalize">{value}</span>
                                </p>
                            ))}
                    </div>
                    <div className="flex flex-row items-center mt-1 1000px:hidden">
                        <span className=" text-[14px]">{qty}</span>
                        <span className=" ml-1">x</span>
                        <span className="text-primary-800 ml-4 text-[14px] price font-semibold">
                            {`₵ ${item.actual_price}`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="hidden 1000px:flex py-2 col-span-1 items-center">
                <span className="text-primary-800 text-[14px] price font-semibold">
                    {item.actual_price}
                </span>
            </div>
            <div
                className={`${
                    loading && ' opacity-30'
                }  py-2 400px:pr-7 col-span-4 1000px:col-span-2 flex items-center`}
            >
                <div className="h-[1cm] grid grid-cols-2 ">
                    <input
                        disabled={true}
                        type="number"
                        name="qty"
                        value={qty}
                        min={1}
                        id="qty"
                        className=" border border-black outline-none text-center text-[18px]"
                    />
                    <div className={`grid grid-rows-2 border border-black`}>
                        <button
                            disabled={loading}
                            type="button"
                            className=" "
                            onClick={() => handleQtyChange(null, 'increment')}
                        >
                            +
                        </button>
                        <button
                            disabled={loading}
                            type="button"
                            className="border-t border-t-black"
                            onClick={() => handleQtyChange(null, 'decrement')}
                        >
                            -
                        </button>
                    </div>
                </div>
            </div>
            <div className="price text-primary-800 font-semibold hidden 1000px:flex py-2 col-span-1 text-[16px]  items-center">
                {item.cost}
            </div>
            <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
        </div>
    );
}

export default CartItem;
