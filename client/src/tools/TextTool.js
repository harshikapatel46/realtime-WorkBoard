import { nanoid } from "nanoid";

const TextTool = {
  handleMouseDown(
    e,
    shapes,
    setShapes,
    setIsDrawing,
    color,
    updateShapes,
    setEditingText,
  ) {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();

    const newText = {
      id: nanoid(),
      type: "text",
      tool: "Text",
      x: pointer.x,
      y: pointer.y,
      text: "",
      fontSize: 20,
      fontFamily: "sans-serif",
      color,
    };

    const updatedShapes = [...shapes, newText];

    if (typeof updateShapes === "function") {
      updateShapes(updatedShapes);
    } else {
      setShapes(updatedShapes);
    }

    setIsDrawing(false);
    setEditingText(newText);
  },

  handleMouseMove() {},

  handleMouseUp(setIsDrawing) {
    setIsDrawing(false);
  },
};

export default TextTool;
