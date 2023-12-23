import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import server from "../../server";
import axios from "axios";
import { IoAddCircleSharp, IoChevronBackOutline } from "react-icons/io5";
import { FaSyncAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import Variant from "../../components/product/Variant";
import ProductImage from "../../components/product/ProductImage.jsx";
import { AiTwotoneDelete } from "react-icons/ai";
import { HiTrash } from "react-icons/hi";
import { BiSolidCloudUpload } from "react-icons/bi";
import PulseLoader from "../../components/loaders/pulseLoader";
import Error from "../../components/errorHandler/error";
import { useSelector } from "react-redux";
import AddVariantBtn from "../../components/inputs/AddVariantBtn.jsx";
import TextEditor from "../../components/editor/TextEditor.jsx";

function SpecificProduct() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isUploading, setUploading] = useState(false);
  const [isError, setError] = useState(false);
  const [isImgDlt, setImgDlt] = useState(false);
  const [product, setProduct] = useState(null);
  const { isCategory, category } = useSelector((state) => state.categories);

  const handleProductUpdate = (field, data) => {
    setProduct((prev) => {
      return {
        ...prev,
        [field]: data,
      };
    });
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await axios(
        `${server}product/get-product-ebece57326214432/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setProduct(res.data.product);
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  const handleVariationChange = (index, data) => {
    setProduct((prev) => {
      let newVarState = [...prev.variations];
      let values = new Set(newVarState[index].selected_values);
      values.add(data);
      newVarState[index].selected_values = [...values];
      return {
        ...prev,
        variations: newVarState,
      };
    });
  };

  const handleVariationChangeRemove = (index, data) => {
    setProduct((prev) => {
      let newVarState = [...prev.variations];

      newVarState[index].selected_values = newVarState[
        index
      ].selected_values.filter((i) => i !== data);
      return {
        ...prev,
        variations: newVarState,
      };
    });
  };

  const VariationChangeRemove = (id) => {
    setProduct((prev) => {
      let Prev_variation = [...prev.variations];

      let newVariation = Prev_variation.filter((i) => i.variation._id !== id);

      return {
        ...prev,
        variations: newVariation,
      };
    });
  };

  const VariationChangeAdd = (variation) => {
    let duplicate = product.variations.some(
      (i) => i.variation._id === variation._id
    );

    if (duplicate) {
      return null;
    }
    setProduct((prev) => {
      let Prev_variation = [...prev.variations];

      Prev_variation.push({
        variation: variation,
        selected_values: [],
      });

      return {
        ...prev,
        variations: Prev_variation,
      };
    });
  };

  const deleteImage = async (_id, url) => {
    try {
      setImgDlt(true);
      const res = await axios.delete(
        `${server}product/delete-product-image/${product._id}?_id=${_id}&ref=${url}`
      );
      if (res.data.success) {
        handleProductUpdate("images", res.data.images);
        setImgDlt(false);
      }
    } catch (error) {
      let errmsg = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(errmsg);
      setImgDlt(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const addNewImages = async () => {
    try {
      setUploading(true);
      const res = await axios.put(
        `${server}product/update-product-image-new/${product._id}`,
        { images }
      );
      if (res.data.success) {
        setUploading(false);
        handleProductUpdate("images", res.data.images);
        setImages([]);
        toast.success("Image(s) added successfuly");
      }
    } catch (error) {
      setUploading(false);
      let errmsg = error.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(errmsg);
    }
  };

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return <PulseLoader />;
  }

  if (isError) {
    return (
      <div className="mt-20 py-10">
        <Error message={"Failed to load data"} />
      </div>
    );
  }

  return (
    <div className=" w-full px-3 bg-white py-5">
      <Link
        to={".."}
        relative="path"
        className=" underline font-medium flex flex-row gap-1 items-center"
      >
        <IoChevronBackOutline size={25} />
        <span>Back to all products</span>
      </Link>
      <div className="w-full grid grid-cols-12 mt-5 gap-y-10">
        <div className="w-full py-1  col-span-full 1000px:col-span-8 1300px:col-span-7">
          <h1 className="text-xl font-medium text-center ">
            Product information
          </h1>

          <div className="w-full">
            <p>Product name * </p>
            <div className="w-full grid grid-cols-12">
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductUpdate("name", e.target.value)}
                className="w-full px-2 py-1 border border-black outline-none col-span-10"
              />
              <UpdateButton
                field={"name"}
                data={product.name}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Short description * </p>
            <div className="w-full grid grid-cols-12 justify-end items-end gap-1">
              <textarea
                rows={3}
                value={product.description}
                onChange={(e) =>
                  handleProductUpdate("description", e.target.value)
                }
                className="w-full px-2 py-1 border border-black outline-none col-span-full"
              />
              <div className="w-full flex justify-end flex-row col-span-full">
                <UpdateButton
                  classExtnd={"h-[1cm]"}
                  field={"description"}
                  data={product.description}
                  id={product._id}
                />
              </div>
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Detailed description * </p>
            <div className="w-full justify-end items-end gap-1 bg-slate-400 py-2">
              <TextEditor
                content={product?.rich_description}
                handleChange={(prev) =>
                  handleProductUpdate("rich_description", prev)
                }
              />
            </div>
            <div className="w-full flex justify-end flex-row col-span-full">
              <UpdateButton
                classExtnd={"h-[1cm]"}
                field={"rich_description"}
                data={product.rich_description}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product category * </p>
            <div className="w-full flex flex-row gap-2">
              <select
                name="category"
                id="category"
                disabled={!isCategory}
                className=" capitalize px-3 py-1 font-bold"
                value={JSON.stringify(product.category)}
                onChange={(e) => {
                  handleProductUpdate("category", JSON.parse(e.target.value));
                }}
              >
                {category.map((c) => (
                  <option value={JSON.stringify(c)} className=" capitalize">
                    {c.name}
                  </option>
                ))}
              </select>
              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"category"}
                data={product.category._id}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product gender * </p>
            <div className="w-full flex flex-row gap-2">
              <select
                name="gender"
                id="gender"
                className=" capitalize px-3 py-1 font-bold"
                value={product.gender}
                onChange={(e) => {
                  handleProductUpdate("gender", e.target.value);
                }}
              >
                <option value={"women"} className=" capitalize">
                  women
                </option>
                <option value={"men"} className=" capitalize">
                  men
                </option>
                <option value={"unisex"} className=" capitalize">
                  unisex
                </option>
              </select>
              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"gender"}
                data={product.gender}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="w-full flex flex-row gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={product.hasVariations}
                onChange={(e) => {
                  handleProductUpdate("hasVariations", e.target.checked);
                }}
              />
              <label htmlFor="isFeatured">
                Does this product has variations ?
              </label>
              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"hasVariations"}
                data={product.hasVariations}
                id={product._id}
              />
            </div>
          </div>

          {product.hasVariations && (
            <div className="w-full mt-5">
              <p>Product variations * </p>
              <div className="w-full pl-4 flex flex-col gap-4">
                {product.variations.map((variant, index) => (
                  <Variant
                    index={index}
                    data={variant}
                    handleAction={handleVariationChange}
                    handleClose={handleVariationChangeRemove}
                    removeVariant={VariationChangeRemove}
                  />
                ))}
                <AddVariantBtn handleClick={VariationChangeAdd} />
                <UpdateButton
                  classExtnd={"w-[3cm]"}
                  field={"variations"}
                  data={product.variations}
                  id={product._id}
                />
              </div>
            </div>
          )}

          <div className="w-full mt-5">
            <p>Product flat price ( without discount ) * </p>
            <div className="w-full flex flex-row gap-2">
              <input
                type="number"
                name="gender"
                id="gender"
                className="border border-black capitalize px-3 py-1 font-bold"
                value={product.base_price}
                onChange={(e) =>
                  handleProductUpdate("base_price", e.target.value)
                }
              />

              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"base_price"}
                data={product.base_price}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product actual price ( To be display on page ) * </p>
            <div className="w-full flex flex-row gap-2">
              <input
                type="number"
                name="price-2"
                id="price-2"
                className="border border-black capitalize px-3 py-1 font-bold"
                value={product.actual_price}
                onChange={(e) =>
                  handleProductUpdate("actual_price", e.target.value)
                }
              />

              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"actual_price"}
                data={product.actual_price}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Number of products in sctock * </p>
            <div className="w-full flex flex-row gap-2">
              <input
                type="number"
                name="stock"
                id="stock"
                className="border border-black capitalize px-3 py-1 font-bold"
                value={product.qty_in_stock}
                onChange={(e) =>
                  handleProductUpdate("qty_in_stock", e.target.value)
                }
              />

              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"qty_in_stock"}
                data={product.qty_in_stock}
                id={product._id}
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="w-full flex flex-row gap-2">
              <input
                type="checkbox"
                id="isFeatured"
                checked={product.isFeatured}
                onChange={(e) => {
                  handleProductUpdate("isFeatured", e.target.checked);
                }}
              />
              <label htmlFor="isFeatured">
                Will you like to feature this product ?
              </label>
              <UpdateButton
                classExtnd={"w-[3cm]"}
                field={"isFeatured"}
                data={product.isFeatured}
                id={product._id}
              />
            </div>
          </div>
        </div>

        <div className="w-full py-1 col-span-full 1000px:col-span-4 1300px:col-span-5 ">
          <h1 className="text-xl font-medium text-center ">Product images</h1>

          <div className="relative px-3 justify-center flex flex-row flex-wrap gap-2 gap-y-5">
            {product.images.map((image) => (
              <ProductImage
                handleIMageDelete={() =>
                  deleteImage(image._id, image.public_id)
                }
                product_id={product._id}
                image={image}
              />
            ))}

            <div className=" w-full flex flex-col justify-center items-center">
              <p className=" font-medium text-xl">Add new image</p>
              <div className="flex items-center justify-center w-full col-span-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple="true"
                    onChange={(e) => handleImageChange(e)}
                  />
                </label>
              </div>
            </div>

            <div className="flex col-span-full flex-row py-1 w-full justify-center gap-3 flex-wrap">
              {images.length !== 0 &&
                images.map((i, index) => (
                  <div className="w-[6cm] overflow-hidden rounded-md h-[7cm] border relative">
                    <button
                      type="button"
                      className="py-1 backdrop:blur-2xl px-3 flex gap-2 items-center justify-center cursor-pointer bg-red-100 text-red-600 font-bold top-2 right-2 absolute rounded-md"
                      onClick={() => {
                        setImages((prev) => {
                          let newImages = prev.filter(
                            (i) => images.indexOf(i) !== index
                          );
                          return newImages;
                        });
                      }}
                    >
                      <HiTrash />
                      Delete
                    </button>
                    <img src={i} alt="..." className="w-full" />
                  </div>
                ))}

              {images.length > 0 && (
                <button
                  onClick={() => addNewImages()}
                  disabled={isUploading}
                  className="flex gap-2 items-center justify-center px-3 py-1 bg-black text-white font-medium w-full disabled:opacity-50"
                >
                  <BiSolidCloudUpload />
                  <span>{isUploading ? "Uploading..." : "Upload all"}</span>
                </button>
              )}
            </div>

            {isImgDlt && (
              <div className=" absolute w-full h-full bg-[#ffffffd3] top-0 left-0 flex items-center justify-center flex-col font-medium">
                <AiTwotoneDelete color="red" size={32} />
                <p>Deleting...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecificProduct;

const UpdateButton = ({ id, field, data, classExtnd }) => {
  const [isLoading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await axios.put(
        `${server}product/update-product/${id}`,
        {
          field: field,
          data,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setLoading(false);
        toast.success("Product information updated!", {
          toastId: "update-product",
        });
      } else {
        setLoading(false);
        toast.error(res.response.data.message, {
          toastId: "update-product-err",
        });
      }
    } catch (error) {
      setLoading(false);
      let errMsg = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(errMsg, {
        toastId: "update-product-err",
      });
    }
  };

  return (
    <button
      onClick={() => fetchProducts()}
      disabled={isLoading}
      className={`${classExtnd} px-2 col-span-2 text-center flex justify-center items-center bg-black text-white disabled:opacity-25 gap-2 font-medium`}
    >
      <FaSyncAlt className={`${isLoading && "rotate"}`} />
      Update
    </button>
  );
};
