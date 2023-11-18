import React from "react";

function Error({ message }) {
  return (
    <div className="w-full px-3 py-3 flex justify-center items-center flex-col">
      <p className="w-full 600px:w-1/2 text-center font-medium text-xl">
        {" "}
        Oops! Something bad occured while loading data!{" "}
      </p>
      <p className="w-full 600px:w-1/2 text-center font-medium mt-2 text-red-600">
        {message}
      </p>
      <div className="">
        <button className="w-full px-4 py-1 bg-black text-white text-[18px] mt-10"
        type="button"
        onClick={()=>{
            window.location.reload(true)
        }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export default Error;
