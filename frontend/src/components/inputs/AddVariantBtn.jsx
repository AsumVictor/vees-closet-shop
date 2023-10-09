import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoAddCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";

function AddVariantBtn({ handleClick }) {
  const [isSelecting, setIsSelecting] = React.useState(false);
  const { isVariation, variation } = useSelector((state) => state.variations);
  const [value, setValue] = useState("");
  return (
    <div className=" w-full flex justify-center">
      {isSelecting ? (
        <div className="mt-1 flex flex-row gap-2">
          <select
            disabled={!isVariation}

            className="px-2 py-1 capitalize"
            onChange={(e) => {
              let variation = JSON.parse(e.target.value);
              handleClick({
                _id: variation._id,
                name: variation.name,
              });
            }}
          >
            {variation.map((c) => (
              <option value={JSON.stringify(c)}>{c.name}</option>
            ))}
          </select>
          <AiFillCloseCircle
            size={20}
            cursor={"pointer"}
            onClick={() => setIsSelecting(false)}
          />
        </div>
      ) : (
        <button
          className=" cursor-pointer mt-1 flex gap-1 items-center"
          onClick={() => setIsSelecting(true)}
        >
          <IoAddCircleSharp size={27} />
          <span>Add new Variant</span>
        </button>
      )}
    </div>
  );
}

export default AddVariantBtn;
