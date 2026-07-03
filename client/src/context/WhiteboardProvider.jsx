import { useState } from "react";
import { WhiteboardContext } from "./WhiteboardContext";

function WhiteboardProvider({ children }) {
  const [shapes, setShapes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editingText, setEditingText] = useState(null);
  const [color, setColor] = useState("#000000");

  return (
    <WhiteboardContext.Provider
      value={{
        shapes,
        setShapes,
        selectedId,
        setSelectedId,
        editingText,
        setEditingText,
        color,
        setColor,
      }}
    >
      {children}
    </WhiteboardContext.Provider>
  );
}

export default WhiteboardProvider;
