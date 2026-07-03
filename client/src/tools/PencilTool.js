import { nanoid } from "nanoid";

const PencilTool = {
  handleMouseDown(e, shapes, setShapes, setIsDrawing, color) {
    const pos = e.target.getStage().getPointerPosition();

    setShapes([
      ...shapes,
      {
        id: nanoid(),
        tool: "Pencil",
        points: [pos.x, pos.y],
        color,
      },
    ]);

    setIsDrawing(true);
  },

  handleMouseMove(e, isDrawing, shapes, setShapes, emitDraw) {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();

    const previousShape = shapes[shapes.length - 1];
    const lastShape = {
      ...previousShape,
      points: previousShape.points.concat([pos.x, pos.y]),
    };

    const updatedShapes = [...shapes.slice(0, -1), lastShape];

    setShapes(updatedShapes);

    emitDraw(updatedShapes);
  },

  handleMouseUp(setIsDrawing, shapes, setShapes, updateShapes) {
    setIsDrawing(false);
    updateShapes(shapes);
  },
};

export default PencilTool;
