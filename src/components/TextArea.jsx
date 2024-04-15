import { useEffect, useRef } from "react";
import "./index.scss";

function TextArea({ value, onChange }) {
  const textAreaRef = useRef();

  const resizeTextArea = (e) => {
    textAreaRef.current.style.height = "24px";
    textAreaRef.current.style.height =
      textAreaRef.current.scrollHeight + 12 + "px";
  };

  useEffect(() => {
    resizeTextArea()
  }, [value])

  return (
    <textarea
      value={value}
      onChange={onChange}
      ref={textAreaRef}
      onInput={resizeTextArea}
      className="text-area"
      placeholder="Type Something..."
    ></textarea>
  );
}

export default TextArea;
