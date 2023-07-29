import { useState } from "react";
import { Button, InputLabel } from "../components/Inputs";
import { Option, Select, Textarea } from "@material-tailwind/react";
import { categoriesData } from "../static/data";
import { HiTrash } from "react-icons/hi";
import { toast } from "react-toastify";
import { createProduct } from "../redux/actions/product";
import { useDispatch } from "react-redux";


function ShopAddProductPage() {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch()
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    category: "",
    gender: "",
    tags: "",
    originalPrice: "",
    priceWithDiscount: "",
    stock: "",
    images: images,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setProductInfo((prev) => {
      return {
        ...prev,
        [name]: value,
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

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, description, category, gender, priceWithDiscount, stock } =
      productInfo;

    let canSubmit = Object.values({
      name,
      description,
      category,
      gender,
      priceWithDiscount,
      stock,
    }).every(
      (value) => value !== undefined && value !== null && value.trim() !== ""
    );
console.log(canSubmit, productInfo)
    if (canSubmit) {
      toast.error("Please filled all required fields");
      return null;
    }

    if (canSubmit && productInfo.images < 1) {
      toast.error("Please select at least one image");
      return null;
    }

    if (productInfo.images > 4) {
      toast.error("Please select at least up to 4 images");
      return null;
    }
    dispatch(createProduct(productInfo));
  };

  return (
    <div className="w-full py-2 px-2 800px:px-10 pb-20">
      <div className="w-full bg-white py-1 rounded-md">
        <h2 className="font-bold text-wine_primary text-center text-xl">
          Add new product to store
        </h2>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="grid grid-cols-1 800px:grid-cols-2 mt-10 px-2 gap-y-5 gap-2"
        >
          <InputLabel
            label={"Product name *"}
            handleChange={handleChange}
            type={"text"}
            name={"name"}
          />

          <Select label="Category *" color="brown" value={productInfo.category}>
            {categoriesData.map((i) => (
              <Option
                onClick={() => {
                  setProductInfo((prev) => {
                    return {
                      ...prev,
                      category: i.title,
                    };
                  });
                }}
              >
                {i.title}
              </Option>
            ))}
          </Select>
          <div className="col-span-full py-1">
            <Textarea
              label="Description *"
              className=" col-span-2"
              color="brown"
              onChange={handleChange}
            />
          </div>
          <Select label="Gender *" color="brown" value={productInfo.gender}>
            <Option
              onClick={() => {
                setProductInfo((prev) => {
                  return {
                    ...prev,
                    gender: "all",
                  };
                });
              }}
            >
              All gender
            </Option>
            <Option
              onClick={() => {
                setProductInfo((prev) => {
                  return {
                    ...prev,
                    gender: "female",
                  };
                });
              }}
            >
              Female
            </Option>
            <Option
              onClick={() => {
                setProductInfo((prev) => {
                  return {
                    ...prev,
                    gender: "male",
                  };
                });
              }}
            >
              Male
            </Option>
          </Select>
          <InputLabel
            label={"Original price ( GHC )"}
            handleChange={handleChange}
            type={"number"}
            name={"originalPrice"}
          />
          <InputLabel
            label={"Price with discount ( GHC ) *"}
            handleChange={handleChange}
            type={"number"}
            name={"priceWithDiscount"}
          />

          <InputLabel
            label={"Stock *"}
            handleChange={handleChange}
            type={"number"}
            name={"stock"}
          />

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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
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

          <div className="col-span-full flex justify-center pb-20 mt-10">
            <button
              type="submit"
              className="px-5 w-10/12 md:w-8/12 lg:w-4/12 py-2 cursor-pointer rounded-md font-bold bg-wine_primary text-white"
            >
              Add product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopAddProductPage;
