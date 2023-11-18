import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import server from '../../../server';
import OrderStatus from '../OrderStatus';
import OrderDetailsItem from '../OrderDetailsItem';
import PulseLoader from '../../loaders/pulseLoader';
import { Helmet } from 'react-helmet-async';
import Error from '../../errorHandler/error';

function OrderDetail() {
    const { id } = useParams();
    const [orderData, setOrderData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getOrderDetail = async () => {
        setIsLoading(true);
        try {
            let res = await axios(`${server}order/get-orders/${id}`);
            if (res.data.success) {
                setIsLoading(false);
                setOrderData(res.data.order);
            }
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
            console.log(error);
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
        <div className="w-full">
            <Helmet>
                <title>Order #{orderData.tracking_no} - Vees closet </title>
                <meta
                    name="description"
                    content={`Explore our wide range of high-quality clothing for every need. Find the perfect fashion at Vees closet.`}
                />
                <meta
                    name="keywords"
                    content="Fashion, Clothing, Apparel, Online Fashion, Fashion Store, Fashion Boutique, Women's Fashion, Men's Fashion, Kids' Fashion, Trendy Fashion, Fashion Trends, Fashionable Outfits, Designer Clothing, Affordable Fashion, Stylish Clothing, Fashion Accessories, Fashion Shoes, Fashion Bags, Fashion Jewelry, Luxury Fashion, Streetwear, Vintage Fashion, Sustainable Fashion, Plus-size Fashion, Maternity Fashion, Activewear, Swimwear, Lingerie, Formal Wear, Casual Wear, Workwear, Evening Gowns, Prom Dresses, Wedding Dresses, Men's Suits, T-Shirts, Jeans, Dresses, Tops, Bottoms, Outerwear, Footwear, Boots, Sneakers, Sandals, High Heels, Flats, Handbags, Clutches, Backpacks, Wallets, Scarves, Hats, Sunglasses, Watches, Earrings, Necklaces, Bracelets, Rings, Fashion Brands, Seasonal Fashion, Holiday Fashion, Fashion Discounts, Sale Items, New Arrivals, Fashion Blog, Fashion Tips, Fashion Inspiration, Fashion Lookbook, Sustainable Fabrics, Eco-friendly Fashion, Ethical Fashion, Fashion Influencers, Celebrity Fashion, Fashion Reviews, Online Shopping, Shop Online, Buy Fashion Online, Fashion Deals, Free Shipping, Customer Reviews, Size Guides, Return Policy, Fashion Customer Service, Fashion Newsletter, Fashion Subscription, Fashion Rewards, Fashion Gift Cards, Fashion Wishlist, Secure Payment, Payment Options, Checkout Process, Shipping and Delivery, International Shipping, Track Order, Customer Support, Fashion Trends 2023, Holiday Fashion Collection, Summer Fashion, Winter Fashion."
                />
            </Helmet>

            <div className="w-full py-1 bg-slate-100 flex flex-row gap-4 px-3 items-end">
                <Link to={'..'} relative={'path'} className="">
                    <MdOutlineKeyboardBackspace size={31} />
                </Link>
                <h1 className="text-xl">Order details</h1>
            </div>

            <div className=" mt-5 px-3">
                <p className=" font-medium text-xl">Order #{orderData.tracking_no}</p>
                <OrderStatus status={orderData.status} />
                <p>Placed on: {orderData.createdAt.split('T')[0]} </p>
                <p>Total: GH₵ {orderData.total_price.toFixed(2)}</p>
                <p>Shipping cost: GH₵ {orderData.charges.shipping_cost}</p>
                {orderData.charges.coupon && <p>Discount: GH₵ {orderData.charges.discount}</p>}
                <hr className=" h-[0.2cm] mt-2" />
            </div>

            <div className=" mt-5 bg-gray-100 px-2 py-2 ">
                <p className=" font-medium text-xl">Order Items</p>
                <div className="w-full">
                    {orderData.items.map((item) => (
                        <OrderDetailsItem item={item} key={item._id} />
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
                    <p>{orderData.shipping_address.phone_number}</p>
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
        </div>
    );
}

export default OrderDetail;
