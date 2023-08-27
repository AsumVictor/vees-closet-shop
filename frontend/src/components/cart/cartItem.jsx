import { GrClose } from "react-icons/gr";

function cartItem() {
  return (
    <div className=" grid grid-cols-12 px-2 1000px:px-10 mt-3">
      <div className=" py-2 col-span-8 grid grid-cols-12">
        <div className="  col-span-1 absolute 1000px:relative">
          <button
            type="button"
            className=" py-2 border bg-white font-bold px-2 rounded-full"
          >
            <GrClose fontWeight={700} />
          </button>
        </div>
        <img
          src="https://assemblylabel.com/cdn/shop/products/c01a596fd3cb4413bad785724b510096_600x.jpg?v=1689559760"
          alt="img-1"
          className=" col-span-3 1000px:col-span-2 h-[2.5cm]"
        />
        <div className=" px-2 col-span-9 justify-center flex flex-col">
          <p className=" text-primary-800">Crisp Oxford Button-Down Shirt</p>
          <div className="flex flex-col gap-1 mt-1">
            <p className="flex text-[10px] flex-row gap-1">
              <span className=" uppercase font-semibold">Size:</span>
              <span>M</span>
            </p>
          </div>
          <div className="flex flex-row items-center mt-1 1000px:hidden">
            <span className=" text-[14px]">1</span>
            <span className=" ml-1">x</span>
            <span className="text-primary-800 ml-4 text-[14px] price font-semibold">
              ₵ 200.00
            </span>
          </div>
        </div>
      </div>
      <div className="hidden 1000px:flex py-2 col-span-1 items-center">
        <span className="text-primary-800 text-[14px] price font-semibold">
          200.00
        </span>
      </div>
      <div className="py-2 400px:pr-7 col-span-4 1000px:col-span-2 flex items-center">
        <div className="h-[1cm] grid grid-cols-2 ">
          <input
            type="number"
            name="qty"
            value={1}
            min={1}
            id="qty"
            className=" border border-black outline-none text-center text-[18px]"
          />
          <div className=" grid grid-rows-2 border border-black">
            <button type="button">+</button>
            <button type="button" className="border-t border-t-black">
              -
            </button>
          </div>
        </div>
      </div>
      <div className="price text-primary-800 font-semibold hidden 1000px:flex py-2 col-span-1 text-[16px]  items-center">
        200.00
      </div>
      <hr className=" col-span-full h-[0.03cm] bg-slate-200" />
    </div>
  );
}

export default cartItem;
