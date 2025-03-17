import React from "react";
import ToolbarContainer from "./utils/ToolbarContainer";

const TextBox = ({ label, labelHtmlFor, id, name, onChange, value }) => {
  const editorRef = React.useRef(null);

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
  };

  //   const [data, setData] = React.useState(undefined);

  //   const handleChange = (event) => {
  //     setData(event.data);
  //   };

  return (
    <div>
      <label
        htmlFor={labelHtmlFor}
        className="block text-sm font-medium text-gray-900"
      >
        {label}
      </label>

      {/* Kendo Toolbar */}
      <ToolbarContainer onFormat={handleFormat} />

      {/* Editable Content */}
      <div
        defaultValue={value}
        onChange={onChange}
        id={id}
        name={name}
        ref={editorRef}
        contentEditable="true"
        className="mt-2 min-h-[100px] border border-gray-300 rounded-md px-3 py-2 text-gray-900 bg-white focus:outline-indigo-600"
      ></div>
    </div>
  );
};

export default TextBox;
