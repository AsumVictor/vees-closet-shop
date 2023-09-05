export function LabelInput({
  InputParentExtendClass,
  InputExtendClass,
  handleChange,
  label,
  type,
  isRequired,
  value,
  ...rest
}) {
  //focus inputs
  function FocusOnInput(e) {
    e.target.parentNode.classList.add("active");
  }

  function BlurOnInput(e) {
    if (e.target.value == "") {
      e.target.parentNode.classList.remove("active");
    }
  }

  return (
    <div
      className={`${InputParentExtendClass} form-group w-full flex justify-start items-center relative rounded-sm px-4 h-[1.2cm]`}
    >
      <input
        {...rest}
        value={value}
        type={type}
        required={isRequired}
        onFocus={FocusOnInput}
        onBlur={BlurOnInput}
        className={`w-full h-full absolute bg-transparent top-0 left-0 outline-none text-lg px-3  invalid:text-red-600 ${InputExtendClass}`}
        onChange={handleChange}
      />
      <div className="label px-2 text-sm capitalize bg-white">
        {label}
        {isRequired && "*"}
      </div>
    </div>
  );
}
