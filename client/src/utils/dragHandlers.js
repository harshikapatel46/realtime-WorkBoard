import socket from "../socket/socket";

export function handleShapeDrag(e, shape, shapes, updateShapes) {
  const newX = e.target.x();
  const newY = e.target.y();

  const updatedShapes = shapes.map((item) =>
    item.id === shape.id
      ? {
          ...item,
          x: newX,
          y: newY,
        }
      : item,
  );

  updateShapes(updatedShapes);
}

export function handleLineDrag(e, shape, shapes, updateShapes) {
  const dx = e.target.x();
  const dy = e.target.y();

  const updatedPoints = shape.points.map((value, index) =>
    index % 2 === 0 ? value + dx : value + dy,
  );

  const updatedShapes = shapes.map((item) =>
    item.id === shape.id ? { ...item, points: updatedPoints } : item,
  );

  updateShapes(updatedShapes);

  e.target.position({ x: 0, y: 0 });
}

export function handleShapeMove(e, shape, roomId) {
  socket.emit("drag-shape", {
    roomId,
    id: shape.id,
    x: e.target.x(),
    y: e.target.y(),
  });
}
