import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
];
export default function TextEditor({
  text,
  setText,
  maxLength,
  placeholder,
  setStateText,
}) {
  const [symbol, setSymbol] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleChange = (e) => {
    setText(e);
  };

  const checkCharacterCount = (event) => {
    setSymbol(event.target.textContent.length);
    setVisible(true);
    setStateText(true);
    if (event.key !== "Backspace") {
      if (event.target.textContent.length >= maxLength) {
        event.preventDefault();
        setStateText(false);
      }
    }
  };

  return (
    <div style={{ padding: "15px 0px" }}>
      <ReactQuill
        onKeyDown={(e) => checkCharacterCount(e)}
        value={text}
        placeholder={placeholder}
        modules={modules}
        formats={formats}
        onChange={(e) => handleChange(e)}
      />
      <span style={{ fontSize: "12px", visibility: visible ? "visible" : "hidden" }}>
        {symbol} из {maxLength}
      </span>
    </div>
  );
}
