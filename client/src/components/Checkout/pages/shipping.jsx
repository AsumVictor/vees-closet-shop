import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Select,
  Option,
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { InputLabel } from "../../Inputs";
import { GhanaRegions } from "../../../static/data";
import { toast } from "react-toastify";
import axios from "axios";
import server from "../../../../server";

const Shipping = ({ props }) => {
  const { cart } = useSelector((state) => state.cart);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [shippingAddress, setShippingAddress, setActiveTap] = props;
  const [discount, setDiscount] = useState(0);

  const subTotalPrice = cart.reduce((accumulator, item) => {
    return accumulator + item.priceWithDiscount * item.qty;
  }, 0);

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const totalPrice = (subTotalPrice + shipping - discount).toFixed(2);

  const submitShippingAddress = async () => {
    let canSubmit = await Object.values(shippingAddress).every(
      (value) => value !== undefined && value !== null && value !== ""
    );
    if (!canSubmit) {
      toast.error("Error occured! Please all fileds are required.");
      return null;
    }
    setActiveTap(2);
  };

  useEffect(() => {
    if (couponCodeData) {
      couponCodeData.discountType === "percentage"
        ? setDiscount((subTotalPrice * couponCodeData.discountValue) / 100)
        : setDiscount(couponCodeData.discountValue);
    } else {
      setDiscount(0);
    }
  }, [couponCodeData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-8 bg-blue-gray-50">
      <div className="py-2 w-full grid gap-3 lg:grid-cols-3 flex-col lg:flex-row px-3 md:px-10">
        <div className="w-full lg:col-span-2">
          <ShippingInfo props={props} />
        </div>
        <div className="w-full 800px:mt-0 mt-8">
          <CartData
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            discount={discount}
            setCouponCode={setCouponCodeData}
          />
        </div>
      </div>
      <button
        className={` flex items-center justify-center rounded-xl bg-wine_primary py-3 font-bold cursor-pointer w-[150px] 800px:w-[280px] mt-10`}
        onClick={() => submitShippingAddress()}
      >
        <h5 className="text-white">Go to Payment</h5>
      </button>
    </div>
  );
};

export default Shipping;

const ShippingInfo = ({ props }) => {
  const [shippingAddress, setShippingAddress] = props;
  const { user } = useSelector((state) => state.user);
  const [regionIndex, setRegionIndex] = useState(null);
  const [click, setClick] = useState(false);

  return (
    <div className="w-full bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500] mb-5">Shipping Address</h5>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        <InputLabel
          label={"Full name"}
          type="text"
          name="fullname"
          handleChange
          value={shippingAddress && shippingAddress.fullname}
          disabled={true}
        />

        <InputLabel
          label={"Email address"}
          type="email"
          name="email"
          handleChange
          value={shippingAddress && shippingAddress.email}
          disabled={true}
        />

        <InputLabel
          label={"Phone number"}
          type="phone"
          name="phoneNumber"
          handleChange={(e) =>
            setShippingAddress((prev) => {
              return { ...prev, phoneNumber: e.target.value };
            })
          }
          value={shippingAddress && shippingAddress.phoneNumber}
        />
      </div>
      <h5 className="text-[18px] font-[500] mt-5 mb-5">Address</h5>
      <button
        className={`px-2 py-1 ${
          click ? "bg-wine_primary" : "bg-[#49302a67]"
        }  font-semibold text-white rounded-md`}
        onClick={() => setClick((prev) => !prev)}
      >
        Select from saved address
      </button>
      {click && (
        <Card className="w-full max-w-[24rem]">
          <List className="flex-col">
            <ListItem className="p-0">
              <label
                htmlFor="horizontal-list-react"
                className="flex w-full cursor-pointer items-center px-3 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Radio
                    name="horizontal-list"
                    id="horizontal-list-react"
                    ripple={false}
                    className="hover:before:opacity-0"
                    containerProps={{
                      className: "p-0",
                    }}
                  />
                </ListItemPrefix>
                <Typography color="blue-gray" className="font-medium">
                  <i className="flex flex-col">
                    <span>Region: Bono</span>
                    <span>City: Bono</span>
                    <span>Address 1: Bono</span>
                    ............
                  </i>
                </Typography>
              </label>
            </ListItem>
          </List>
        </Card>
      )}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 mt-5">
        <Select
          label="Select Region"
          color="brown"
          value={shippingAddress.region}
        >
          {GhanaRegions.map((region, index) => (
            <Option
              onClick={() => {
                setShippingAddress((prev) => {
                  return {
                    ...prev,
                    region: region.region,
                  };
                });
                setRegionIndex(index);
              }}
            >
              {region.region}
            </Option>
          ))}
        </Select>

        <Select
          label="Select City"
          color="brown"
          value={shippingAddress.city}
          disabled={!regionIndex}
        >
          {regionIndex ? (
            GhanaRegions[regionIndex ? regionIndex : 0].cities.map((city) => (
              <Option
                onClick={() => {
                  setShippingAddress((prev) => {
                    return {
                      ...prev,
                      city: city,
                    };
                  });
                }}
              >
                {city}
              </Option>
            ))
          ) : (
            <Option></Option>
          )}
        </Select>

        <InputLabel
          label={"Address 1"}
          type="text"
          name="fullname"
          value={shippingAddress && shippingAddress.address1}
          handleChange={(e) =>
            setShippingAddress((prev) => {
              return { ...prev, address1: e.target.value };
            })
          }
        />
        <InputLabel
          label={"Additional address"}
          type="text"
          name="fullname"
          value={shippingAddress && shippingAddress.additionalAddress}
          handleChange={(e) =>
            setShippingAddress((prev) => {
              return { ...prev, additionalAddress: e.target.value };
            })
          }
        />
      </div>
      <h5 className="text-[18px] font-[500] mt-5 mb-5">Pickup Station</h5>
      <Select
        label="Select pickup Station"
        color="brown"
        value={shippingAddress.city}
        disabled={!regionIndex}
      >
        {regionIndex ? (
          GhanaRegions[regionIndex ? regionIndex : 0].cities.map((city) => (
            <Option
              onClick={() => {
                setShippingAddress((prev) => {
                  return {
                    ...prev,
                    pickstation: city,
                  };
                });
              }}
            >
              {city}
            </Option>
          ))
        ) : (
          <Option></Option>
        )}
      </Select>
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  discount,
  setCouponCode,
  discountPercentenge,
}) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const applyCoupon = async () => {
    if (code.trim() === "") {
      toast.error("Coupon code cannot be empty");
      return null;
    }

    try {
      setLoading(true);
      setError(null);
      setCouponCode(null);
      const { data } = await axios.get(
        `${server}/coupon/get-coupon-value/${code}?price=${subTotalPrice}`,
        { withCredentials: true }
      );

      if (data.success) {
        setLoading(false);
        toast.success("Success");
        setCouponCode(data.couponCode);
      }
    } catch (error) {
      setLoading(false);
      error.response
        ? setError(error.response.data.message)
        : toast.error(error.message);
    }
  };

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
        <h5 className="text-[18px] font-[600]">
          GH₵ {subTotalPrice.toFixed(2)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
        <h5 className="text-[18px] font-[600]">GH₵ {shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discount ? "GH₵ " + discount.toFixed(2) : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">GH₵ {totalPrice}</h5>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          applyCoupon();
        }}
      >
        {error && (
          <p className="px-2 py-1 bg-red-50 text-red-600 text-center mb-2 rouned-md">
            {error}
          </p>
        )}

        <InputLabel
          label={"Coupoun code"}
          type={"text"}
          value={code}
          handleChange={(e) => setCode(e.target.value)}
        />
        <input
          className={`w-full h-[40px] border border-wine_primary text-center text-wine_primary rounded-[3px] mt-8 cursor-pointer`}
          required
          value={loading ? "Checking..." : "Apply coupon"}
          type="submit"
        />
      </form>
    </div>
  );
};
