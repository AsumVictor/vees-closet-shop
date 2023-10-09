import { useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillCloseCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";

function Variant({ index, data, handleAction, handleClose, removeVariant }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  const { isVariation, variation } = useSelector((state) => state.variations);
  let value = [];
  if (isVariation) {
    let currentVariation = variation.find((i) => i._id === data.variation._id);
    value = currentVariation.values;
  }
  return (
    <div>
      <div className="flex flex-row gap-2 items-center">
        <AiOutlineMinusCircle
          size={25}
          color="red"
          onClick={() => removeVariant(data._id)}
        />
        <div
          onClick={() => setIsDisplay((prev) => !prev)}
          className=" text-xl flex flex-row items-center cursor-pointer"
        >
          {isDisplay ? (
            <HiChevronDown size={25} />
          ) : (
            <HiChevronRight size={25} />
          )}

          <span className=" capitalize">{data.variation.name}</span>
        </div>
      </div>
      {isDisplay && (
        <div className="ml-8">
          <ul className="mt-2 flex flex-row gap-4 flex-wrap">
            {data.selected_values.map((value) => (
              <li
                key={value}
                className="relative px-3 py-1 border font-medium capitalize"
              >
                <span>{value}</span>
                <AiFillCloseCircle
                  size={20}
                  className=" absolute -top-3 -right-3"
                  cursor={"pointer"}
                  onClick={() => handleClose(index, value)}
                />
              </li>
            ))}
          </ul>
          {isSelecting ? (
            <div className="mt-1 flex flex-row gap-2">
              <select
                disabled={!isVariation}
                name={data.variation.name}
                id={data.variation.name}
                className="px-2 py-1"
                onChange={(e) => {
                  handleAction(index, e.target.value);
                }}
              >
                {value.map((v) => (
                  <option value={v}>{v}</option>
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
              <span>Add new {data.variation.name}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default Variant;
