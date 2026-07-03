import { nanoid } from "nanoid";

const RectangleTool = {
  handleMouseDown(e, shapes, setShapes, setIsDrawing, color) {
    const pos = e.target.getStage().getPointerPosition();

    setShapes([
      ...shapes,
      {
        id: nanoid(),
        tool: "Rectangle",
        x: pos.x,
        y: pos.y,
        width: 0,
        height: 0,
        color,
      },
    ]);
    setIsDrawing(true);
  },

  handleMouseMove(e, isDrawing, shapes, setShapes, emitDraw) {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();

    const lastRectangle = {
      ...shapes[shapes.length - 1],
      width: pos.x - shapes[shapes.length - 1].x,
      height: pos.y - shapes[shapes.length - 1].y,
    };

    const updatedShapes = [...shapes.slice(0, -1), lastRectangle];

    setShapes(updatedShapes);

    emitDraw(updatedShapes);
  },

  handleMouseUp(setIsDrawing, shapes, setShapes, updateShapes) {
    setIsDrawing(false);
    updateShapes(shapes);
  },
};

export default RectangleTool;
