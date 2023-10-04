import { useState } from "react";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { IoAddCircleSharp } from "react-icons/io5";
import { AiFillCloseCircle } from "react-icons/ai";

function Variant({ index, data, handleAction, handleClose }) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [isDisplay, setIsDisplay] = useState(true);
  return (
    <div>
      <div
        onClick={() => setIsDisplay((prev) => !prev)}
        className=" text-xl flex flex-row items-center cursor-pointer"
      >
        {isDisplay ? <HiChevronDown size={25} /> : <HiChevronRight size={25} />}

        <span className=" capitalize">{data.variation.name}</span>
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
                disabled={false}
                name={data.variation.name}
                id={data.variation.name}
                className="px-2 py-1"
                onChange={(e) => {
                  handleAction(index, e.target.value);
                }}
              >
                <option value="L">L</option>
                <option value="L">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
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
