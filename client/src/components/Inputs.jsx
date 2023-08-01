import React from 'react'

export function InputLabel({label, type, name,handleChange, value, disabled}) {
  return (
    <div className="relative h-11 w-full min-w-[200px]">
    <input
      className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-wine_primary focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
      disabled={disabled}
      placeHolder=" "
      value={value}
      onChange={handleChange}
      name={name}
      type={type}
    />
    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-wine_primary peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-wine_primary peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-wine_primary peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
      {label}
    </label>
  </div>
  )
}


export function CheckboxLabel({value, isChecked, name}){
  return (
    <div className="inline-flex items-center">
    <label
      className="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
      htmlFor="checkbox"
      data-ripple-dark="true"
    >
      <input
        type="checkbox"
        value={value}
        checked={isChecked}
        name={name}
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-wine_primary checked:bg-wine_primary checked:before:bg-wine_primary hover:before:opacity-10"
      />
      <span className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </label>
   
  </div>
  )
}

export function Button({handleClick, classname, children, disabled}){
  return (
    <button
    className={`${classname} block select-none rounded-lg  py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md  transition-all hover:shadow-lg  focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-80 disabled:shadow-none  `}
    type="button"
    data-ripple-light="true"
    onClick={handleClick}
    disabled={disabled}
  >
    {children}
  </button>
  )
}