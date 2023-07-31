import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../redux/actions/product";
import { Tooltip } from "@material-tailwind/react";

const AllProducts = () => {
  const { allProducts, isLoading, isDeleting } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.shop);

  const dispatch = useDispatch();
console.log(isDeleting)
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const columns = [
    {
      field: "images",
      flex: 0.5,
      headerName: "Image",
      type: "",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              content="View image"
              placement="top"
              className="view-product-tooltip"
            >
              <div className="h-[1cm] overflow-hidden w-[1cm] rounded-md cursor-pointer">
                <img
                  src={params.value[0].url}
                  alt={params.value[0]._id}
                  className="w-full h-full"
                />
              </div>
            </Tooltip>
          </>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.6,
    },
    {
      field: "Stock",
      headerName: "Stock",
      type: "number",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "sold",
      headerName: "Sold out",
      type: "number",
      minWidth: 130,
      flex: 0.6,
    },
    {
      field: "Preview",
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
              content="View product"
              placement="top"
              className="view-product-tooltip"
            >
              <Link to={`/product/${params.id}`} className="px-2 py-1">
                <button>
                  <AiOutlineEye size={20} color="blue" />
                </button>
              </Link>
            </Tooltip>
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

  allProducts &&
    allProducts.forEach((item) => {
      row.push({
        id: item._id,
        images: item.images,
        name: item.name,
        price: "GH₵" + item.priceWithDiscount.toFixed(2),
        Stock: item.stock,
        sold: item?.sold_out,
      });
    });

  return (
    <>
      {isLoading ? (
        <>Loading...</>
      ) : (
        <div className="w-full py-10 rounded-md pt-1 px-2">
          <div className="w-full px-2 bg-white py-5">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AllProducts;
