import { nanoid } from "nanoid";

const LineTool = {
  handleMouseDown(e, shapes, setShapes, setIsDrawing, color) {
    const pos = e.target.getStage().getPointerPosition();

    setShapes([
      ...shapes,
      {
        id: nanoid(),
        tool: "Line",
        points: [pos.x, pos.y, pos.x, pos.y],
        color,
      },
    ]);
    setIsDrawing(true);
  },

  handleMouseMove(e, isDrawing, shapes, setShapes, emitDraw) {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();

    const previousLine = shapes[shapes.length - 1];
    const lastLine = {
      ...previousLine,
      points: previousLine.points.slice(0, 2).concat([pos.x, pos.y]),
    };
    const updatedShapes = [...shapes.slice(0, -1), lastLine];

    setShapes(updatedShapes);

    emitDraw(updatedShapes);
  },

  handleMouseUp(setIsDrawing, shapes, setShapes, updateShapes) {
    setIsDrawing(false);
    updateShapes(shapes);
  },
};

export default LineTool;
