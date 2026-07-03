import { useEffect, useRef, useState } from "react";
import { useWhiteboard } from "../context/WhiteboardContext";

function TextEditor({ updateShapes }) {
  const { editingText, shapes, setEditingText, setShapes } = useWhiteboard();
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState(() => editingText?.text || "");

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, []);

  if (!editingText) return null;

  const saveText = () => {
    const nextText = textValue.trim();
    const nextShapes =
      nextText === ""
        ? shapes.filter((shape) => shape.id !== editingText.id)
        : shapes.map((shape) =>
            shape.id === editingText.id ? { ...shape, text: nextText } : shape,
          );

    if (typeof updateShapes === "function") {
      updateShapes(nextShapes);
    } else {
      setShapes(nextShapes);
    }

    setEditingText(null);
  };

  return (
    <textarea
      ref={textareaRef}
      value={textValue}
      onChange={(e) => setTextValue(e.target.value)}
      onBlur={saveText}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          saveText();
        }
        if (e.key === "Escape") {
          setEditingText(null);
        }
      }}
      style={{
        position: "fixed",
        left: editingText.x,
        top: editingText.y,
        minWidth: "120px",
        minHeight: "32px",
        padding: "4px 8px",
        border: "1px solid #3b82f6",
        borderRadius: "6px",
        backgroundColor: "rgba(255,255,255,0.96)",
        fontSize: editingText.fontSize || 20,
        fontFamily: editingText.fontFamily || "sans-serif",
        fontStyle: editingText.fontStyle || "normal",
        fontWeight: "normal",
        color: editingText.color || "#000000",
        zIndex: 10000,
        outline: "none",
        resize: "none",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
      }}
    />
  );
}

export default TextEditor;
