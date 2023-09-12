import { useEffect, useRef, useState } from "react";

export function LabelInput({
  InputParentExtendClass,
  InputExtendClass,
  handleChange,
  isDisabled,
  label,
  type,
  isRequired,
  value,
  ...rest
}) {
  //focus inputs
  const [isFocus, setIsFocus] = useState(true);
  const inputRef = useRef(null);
  function FocusOnInput(e) {
    setIsFocus(true);
  }

  function BlurOnInput(e) {
    if (e.target.value.trim() == "") {
      e.target.parentNode.classList.remove("active");
    }
  }

  useEffect(() => {
    if (inputRef.current.value) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [inputRef?.current?.value]);

  return (
    <div
      className={`${InputParentExtendClass} form-group w-full flex justify-start items-center relative rounded-sm px-4 h-[1.2cm] ${
        isDisabled && "disabled"
      } ${isFocus ? "active" : null} `}
    >
      <input
        {...rest}
        ref={inputRef}
        value={value}
        type={type}
        disabled={isDisabled}
        required={isRequired}
        onFocus={FocusOnInput}
        onBlur={BlurOnInput}
        className={`w-full h-full absolute bg-transparent top-0 left-0 outline-none text-lg px-3  invalid:text-red-600 disabled:opacity-30 ${InputExtendClass}`}
        onChange={handleChange}
      />
      <div className="label px-2 text-sm capitalize bg-white">
        {label}
        {isRequired && "*"}
      </div>
    </div>
  );
}
