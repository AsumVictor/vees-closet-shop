import React, { useEffect, useState } from "react";
import { Button } from "../components/Inputs";
import { Tooltip } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import CoupounModal from "./layout/coupounModal";
import axios from "axios";
import server from "../../server";
import { toast } from "react-toastify";
import { format } from "timeago.js";

function Coupouns() {
  const [open, setOpen] = useState(false);
  const [coupons, setCoupouns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const columns = [
    {
      field: "code",
      headerName: "Coupon Code",
      flex: 0.6,
      sortable: false,
    },
    {
      field: "value",
      headerName: "Value",
      flex: 0.6,
      sortable: true,
      renderCell: (params) => {
        const { type, value } = params.value;
        return (
          <>
            <div className="h-full flex items-center text-[14px] overflow-hidden w-full rounded-md cursor-pointer">
              {type == "fixed" ? `GH₵ ${value.toFixed(2)}` : `${value}%`}
            </div>
          </>
        );
      },
    },
    {
      field: "minValue",
      headerName: "Min Value",
      flex: 0.6,
      renderCell: (params) => {
        const { value } = params;
        return (
          <>
            <div className="h-full flex items-center text-[16px] overflow-hidden w-full rounded-md cursor-pointer">
              {value ? `GH₵ ${value.toFixed(2)}` : `-`}
            </div>
          </>
        );
      },
    },
    {
      field: "maxValue",
      headerName: "Max Value",
      minWidth: 80,
      flex: 0.5,
      renderCell: (params) => {
        const { value } = params;
        return (
          <>
            <div className="h-full flex items-center text-[16px] overflow-hidden w-full rounded-md cursor-pointer">
              {value ? `GH₵ ${value.toFixed(2)}` : `-`}
            </div>
          </>
        );
      },
    },
    {
      field: "expDate",
      headerName: "Exp. Date",
      minWidth: 130,
      flex: 0.5,
      type: "Date",
      renderCell: (params) => {
        const { value } = params;
        const expired = value && value < new Date().toISOString();
        return (
          <>
            <div
              className={`${
                expired
                  ? "text-red-500"
                  : value && !expired
                  ? "text-green-700"
                  : null
              } h-full flex items-center text-[16px] overflow-hidden w-full rounded-md cursor-pointer capitalize`}
            >
              {value && expired
                ? "Expired"
                : value && !expired
                ? `${format(value)}`
                : "-"}
            </div>
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Created At",
      minWidth: 130,
      flex: 0.4,
      type: "Date",
      renderCell: (params) => {
        const { value } = params;
        return (
          <>
            <div
              className={` h-full flex items-center text-[16px] overflow-hidden w-full rounded-md cursor-pointer`}
            >
              {format(value)}
            </div>
          </>
        );
      },
    },
    {
      field: "Delete",
      flex: 0.3,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content="Delete"
              placement="top"
              className="deleteProduct-tooltip"
            >
              <button
                onClick={() => handleDelete(params.id)}
                className="bg-red-50 px-2 py-1 rounded-md"
              >
                <AiOutlineDelete size={20} color="red" />
              </button>
            </Tooltip>
          </>
        );
      },
    },
  ];

  const row = [];

  coupons &&
    coupons.forEach((item) => {
      row.push({
        id: item._id,
        code: item.code,
        value: { value: item.discountValue, type: item.discountType },
        minValue: item.minimumAmount,
        maxValue: item.maximumAmount,
        expDate: item.expirationDate,
        createdAt: item.createdAt,
      });
    });

  useEffect(() => {
    const getCoupons = async () => {
      try {
        setIsLoading(true);
        let { data } = await axios.get(`${server}/coupon/get-coupon`, {
          ,
        });

        if (data.success) {
          setCoupouns(data.couponCodes);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error("Error occured! Try again");
        }
      } catch (error) {
        setIsLoading(false);
        let errMesg = error.response
          ? error.response.data.message
          : error.message;
        toast.error(errMesg);
      }
    };

    getCoupons();
  }, []);

  return (
    <div className="w-ful px-2 relative">
      {isLoading ? (
        <>LOADING...</>
      ) : (
        <div className="w-full bg-white rounded-md py-5">
          <div className="py-2 px-2 bg-white rounded-md flex flex-row justify-end">
            <Button
              classname={"bg-wine_primary text-white"}
              handleClick={() => setOpen(true)}
            >
              Add new coupoun
            </Button>
          </div>
          <h2 className="text-center font-semibold text-xl">All coupouns</h2>
          <div className="w-full px-2 bg-white py-5">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>

          {/* Modal */}
          {open && <CoupounModal actions={[setOpen, setCoupouns]} />}
        </div>
      )}
    </div>
  );
}

export default Coupouns;
