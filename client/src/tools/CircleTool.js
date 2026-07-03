import { nanoid } from "nanoid";

const CircleTool = {
  handleMouseDown(e, shapes, setShapes, setIsDrawing, color) {
    const pos = e.target.getStage().getPointerPosition();

    setShapes([
      ...shapes,
      {
        id: nanoid(),
        tool: "Circle",
        x: pos.x,
        y: pos.y,
        radius: 0,
        color,
      },
    ]);
    setIsDrawing(true);
  },

  handleMouseMove(e, isDrawing, shapes, setShapes, emitDraw) {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();

    const previousCircle = shapes[shapes.length - 1];
    const lastCircle = {
      ...previousCircle,
      radius: Math.sqrt(
        Math.pow(pos.x - previousCircle.x, 2) +
          Math.pow(pos.y - previousCircle.y, 2),
      ),
    };

    const updatedShapes = [...shapes.slice(0, -1), lastCircle];

    setShapes(updatedShapes);

    emitDraw(updatedShapes);
  },

  handleMouseUp(setIsDrawing, shapes, setShapes, updateShapes) {
    setIsDrawing(false);
    updateShapes(shapes);
  },
};

export default CircleTool;
