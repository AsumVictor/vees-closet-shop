import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import server from '../../server';
import PulseLoader from '../../components/loaders/pulseLoader';
import Error from '../../components/errorHandler/error';
import OrderStatus from '../../components/account/OrderStatus';
import OrderDetailsItem from '../../components/account/OrderDetailsItem';
import { toast } from 'react-toastify';

function AdminOrderDetails() {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [isError, setIsError] = useState(false);
    const [orderStatus, setOrderStatus] = useState(null);

    const getOrderDetail = async () => {
        setIsLoading(true);
        try {
            let res = await axios(`${server}order/get-order/${id}`);
            if (res.data.success) {
                setIsLoading(false);
                setOrderData(res.data.order);
                setOrderStatus(res.data.order.status);
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
        }
    };

    const changeStatus = async (status) => {
        if (status.trim() === '') {
            return null;
        }
        try {
            setUpdating(true);
            let res = await axios.patch(`${server}order/update-status`, {
                _id: orderData._id,
                status,
            });
            if (res.data.success) {
                setUpdating(false);
                setOrderStatus(res.data.status);
                toast.success('Order status updated successfully', {
                    toastId: 'fullfiled-update',
                });
            }
        } catch (error) {
            setUpdating(false);
            let err = error.response?.data?.message ? error.response.data.message : error.message;
            toast.error(err, {
                toastId: 'err-msg',
            });
        }
    };

    useEffect(() => {
        getOrderDetail();
    }, []);

    if (isLoading) {
        return <PulseLoader />;
    }

    if (isError) {
        return (
            <div className="mt-20 py-10">
                <Error message={'Failed to load data'} />
            </div>
        );
    }

    return (
        <div className="w-full relative">
            <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
                <Link to={'..'} relative={'path'} className=" 650px:hidden">
                    <MdOutlineKeyboardBackspace size={31} />
                </Link>
                <h1 className="text-xl">Order details</h1>
            </div>

            <div className=" mt-5 px-3">
                <p className=" font-medium text-xl">Order #{orderData.tracking_no}</p>
                <div className="w-full flex flex-row gap-x-10 gap-y-2 mb-4 flex-wrap">
                    <OrderStatus status={orderStatus} />
                    <div className="">
                        <p> Proccess order to: </p>
                        <select
                            onChange={(e) => changeStatus(e.target.value)}
                            className={`px-2 py-1 outline-none cursor-pointer
           bg-gray-300          `}
                        >
                            <option value={''}>Select order status</option>
                            <option value={'processing'}>Processing</option>
                            <option value={'shipped'}>Shipped</option>
                            <option value={'refund'}>Refund</option>
                            <option value={'cancelled'}>Cancelled</option>
                            <option value={'delivered'}>Delivered</option>
                        </select>
                    </div>

                    {/* */}
                </div>
                <p>Placed on: {orderData.createdAt.split('T')[0]} </p>
                <p>Total: GH₵ {orderData.total_price.toFixed(2)}</p>
                <p>Shipping cost: GH₵ {orderData.charges.shipping_cost}</p>
                {orderData.charges.coupon && <p>Discount: GH₵ {orderData.charges.discount}</p>}
                <hr className=" h-[0.2cm] mt-2" />
            </div>

            <div className=" mt-5 bg-gray-100 px-2 py-2 ">
                <p className=" font-medium text-xl">Order Items</p>
                <div className="w-full bg-white px-2">
                    {orderData.items.map((item) => (
                        <OrderDetailsItem admin={true} item={item} key={item._id} />
                    ))}
                </div>

                <hr className=" h-[0.2cm] mt-2" />
            </div>

            <div className=" mt-5 bg-gray-100 py-2 grid grid-cols-2 px-3 gap-5">
                <div className=" col-span-full 450px:col-span-1">
                    <p className=" font-medium text-xl">Shipping information</p>
                    <p>{orderData.shipping_address.address1},</p>
                    <p>{orderData.shipping_address.address2},</p>
                    <p>{orderData.shipping_address.location},</p>
                    <p>{orderData.shipping_address.region},</p>
                    <p>{orderData.shipping_address.phone_number},</p>
                    <p>
                        {orderData.user.first_name}, {orderData.user.last_name}
                    </p>
                    <p>{orderData.user.email}</p>
                </div>

                {/* PAYMENT */}
                <div className="  col-span-full 450px:col-span-1">
                    <p className=" font-medium text-xl">Payment information</p>
                    <p className="">
                        Payment provider: {orderData.paymentInfo.provider.toUpperCase()}
                    </p>
                    <p>Mobile number: {'+233' + orderData.paymentInfo.payment_number}</p>
                </div>
            </div>
            {updating && (
                <PulseLoader classextnd={'top-0 left-0 absolute bg-white opacity-50 h-full'} />
            )}
        </div>
    );
}

export default AdminOrderDetails;
