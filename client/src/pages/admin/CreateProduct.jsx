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
import hasEmptyValues from "../../helpers/hasEmptyVar";
import TextEditor from "../../components/editor/TextEditor.jsx";

function CreateProduct() {
  const [images, setImages] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isVarError, setVarError] = useState(false);
  const [noImgs, setNoImgs] = useState(false);
  const [isImgDlt, setImgDlt] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    rich_description: "",
    category: null,
    hasVariations: false,
    variations: [],
    gender: null,
    actual_price: null,
    qty_in_stock: null,
    base_price: null,
    isFeatured: false,
  });
  const { isCategory, category } = useSelector((state) => state.categories);

  const handleProductUpdate = (field, data) => {
    setProduct((prev) => {
      return {
        ...prev,
        [field]: data,
      };
    });
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

      let newState = Prev_variation.filter((i) => i.variation._id !== id);

      return {
        ...prev,
        variations: newState,
      };
    });
  };

  const VariationChangeAdd = (variation) => {
    let duplicate = product.variations.some(
      (i) => i.variation === variation._id
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

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      let { isValid, variations } = hasEmptyValues(
        product.variations,
        true,
        product.hasVariations
      );
      if (!isValid) {
        return setVarError(true);
      }

      if (images.length < 1) {
        return setNoImgs(true);
      }
      setLoading(true);
      let res = await axios.post(
        `${server}product/create-product`,
        {
          ...product,
          images: images,
          variations: variations ? variations : [],
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setLoading(false);
        toast.success("Product added to store successfully");
        setImages([]);
        setProduct({
          name: "",
          description: "",
          category: null,
          hasVariations: false,
          variations: [],
          gender: null,
          actual_price: null,
          qty_in_stock: null,
          isFeatured: false,
          base_price: null,
        });
      } else {
        toast.error(res.response.data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errMsg = error?.response?.data?.message
        ? error.response.data.message
        : error.message;
      toast.error(errMsg);
    }
  };

  useEffect(() => {
    setVarError(false);
  }, [product.hasVariations, product.variations]);

  useEffect(() => {
    setNoImgs(false);
  }, [images]);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, [isLoading]);

  let error = isVarError || noImgs;

  return (
    <form
      onSubmit={createProduct}
      className=" relative w-full px-3 bg-white py-5"
    >
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
                required
                value={product.name}
                onChange={(e) => handleProductUpdate("name", e.target.value)}
                className="w-full px-2 py-1 border border-black outline-none col-span-10"
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Short description * </p>
            <div className="w-full grid grid-cols-12 justify-end items-end gap-1">
              <textarea
                rows={3}
                required
                value={product.description}
                onChange={(e) =>
                  handleProductUpdate("description", e.target.value)
                }
                className="w-full px-2 py-1 border border-black outline-none col-span-full"
              />
              <div className="w-full flex justify-end flex-row col-span-full"></div>
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Detailed description * </p>
            <div className="w-full justify-end items-end gap-1 bg-slate-400 py-2">
              <TextEditor
                content={product.rich_description}
                handleChange={(prev) =>
                  handleProductUpdate("rich_description", prev)
                }
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product category * </p>
            <div className="w-full flex flex-row gap-2">
              <select
                name="category"
                required
                id="category"
                disabled={!isCategory}
                className=" capitalize px-3 py-1 font-bold"
                value={product.category}
                onChange={(e) => {
                  handleProductUpdate("category", e.target.value);
                }}
              >
                <option value={""} className=" capitalize">
                  Select category
                </option>
                {category.map((c) => (
                  <option value={c._id} className=" capitalize">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product gender * </p>
            <div className="w-full flex flex-row gap-2">
              <select
                name="gender"
                id="gender"
                required
                className=" capitalize px-3 py-1 font-bold"
                value={product.gender}
                onChange={(e) => {
                  handleProductUpdate("gender", e.target.value);
                }}
              >
                <option value={""} className=" capitalize">
                  Select gender
                </option>

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
            </div>
          </div>

          <div className="w-full mt-5">
            <div className="w-full flex flex-row gap-2">
              <input
                type="checkbox"
                id="isVaries"
                checked={product.hasVariations}
                onChange={(e) => {
                  handleProductUpdate("hasVariations", e.target.checked);
                }}
              />
              <label htmlFor="isVaries">
                Does this product has variations ?
              </label>
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
              </div>
            </div>
          )}
          {isVarError && (
            <p className="text-red-600 py-2 px-3 text-center font-medium text-[16px] mb-2">
              ** You have check that product has variations but did not add
              variants. Add variations to the product and make sure all variants
              have value(s).
            </p>
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
                  handleProductUpdate("base_price", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Product actual price ( To be display on page ) * </p>
            <div className="w-full flex flex-row gap-2">
              <input
                type="number"
                required
                name="price-2"
                id="price-2"
                className="border border-black capitalize px-3 py-1 font-bold"
                value={product.actual_price}
                onChange={(e) =>
                  handleProductUpdate("actual_price", Number(e.target.value))
                }
              />
            </div>
          </div>

          <div className="w-full mt-5">
            <p>Number of products in stock * </p>
            <div className="w-full flex flex-row gap-2">
              <input
                type="number"
                name="stock"
                id="stock"
                required
                className="border border-black capitalize px-3 py-1 font-bold"
                value={product.qty_in_stock}
                onChange={(e) =>
                  handleProductUpdate("qty_in_stock", Number(e.target.value))
                }
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
            </div>
          </div>
        </div>

        <div className="w-full py-1 col-span-full 1000px:col-span-4 1300px:col-span-5 ">
          <h1 className="text-xl font-medium text-center ">Product images</h1>

          <div className="relative px-3 justify-center flex flex-row flex-wrap ">
            {noImgs && (
              <p className="text-red-600 py-2 px-3 text-center font-medium text-[16px]">
                ** Add at least one image of the product
              </p>
            )}
            <div className=" w-full flex flex-col justify-center items-center">
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
            </div>
          </div>
        </div>
      </div>
      {error && (
        <p className="text-red-600 py-2 px-3 text-center font-medium text-[18px] bg-red-200 my-2">
          Something bad occured! Please check if all field are filled completely
        </p>
      )}
      <button className=" px-3 py-2 bg-black text-white w-full" type="submit">
        {isLoading ? "Adding to product..." : "Create Product"}
      </button>
      {isLoading && (
        <div className="bg-[#ffffff98] flex justify-center items-center absolute top-0 left-0 h-full w-full">
          <PulseLoader />
        </div>
      )}
    </form>
  );
}

export default CreateProduct;

const UpdateButton = ({ id, field, data, classExtnd }) => {
  const [isLoading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await axios.put(`${server}product/update-product/${id}`, {
        field: field,
        data,
      });
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
