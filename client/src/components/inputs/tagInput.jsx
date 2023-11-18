import React, { useState } from "react";

function TagInput({ name, handleWordBreak }) {
  const [value, setValue] = useState("");

  const handleInputChange = (event) => {
    const specialCharsPattern = /[!@#$%^&*()_+{}\[\]:;<>,.'?~\\/\=|_]/g;

    if (specialCharsPattern.test(event.target.value)) {
      return null;
    }

    setValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      if (value.trim() !== "") {
        handleWordBreak(value);
        setValue("");
        event.preventDefault();
      }
    }
  };

  const handleKeyRelease = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      setValue("");
      event.preventDefault();
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => handleInputChange(event)}
      onKeyDown={(event) => handleKeyPress(event)}
      onKeyUp={(event) => handleKeyRelease(event)}
      placeholder={`add new ${name}`}
      className="px-2 py-1  w-full border-2 outline-none border-black capitalize"
    />
  );
}

export default TagInput;
