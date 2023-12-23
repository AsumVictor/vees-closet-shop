import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const TextEditor = ({content, handleChange}) => {
  const editor = useRef(null);

  return (
    <div className=" w-full">
      <JoditEditor
        ref={editor}
        value={content}
        onChange={handleChange}
      />
    </div>
  );
};

export default TextEditor;
