import socket from "../socket/socket";

export const handleTransformEnd = (e, shape, shapes, updateShapes) => {
  const node = e.target;

  const scaleX = node.scaleX();
  const scaleY = node.scaleY();

  node.scaleX(1);
  node.scaleY(1);

  updateShapes(
    shapes.map((s) => {
      if (s.id !== shape.id) return s;

      switch (s.tool) {
        case "Rectangle":
          return {
            ...s,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          };

        case "Circle":
          return {
            ...s,
            x: node.x(),
            y: node.y(),
            radius: Math.max(5, s.radius * scaleX),
          };

        case "Text":
          return {
            ...s,
            x: node.x(),
            y: node.y(),
            fontSize: Math.max(10, s.fontSize * scaleX),
          };

        default:
          return s;
      }
    }),
  );
};

export function handleTransformMove(e, shape, roomId) {
  const node = e.target;

  socket.emit("transform-shape", {
    roomId,
    id: shape.id,
    x: node.x(),
    y: node.y(),
    scaleX: node.scaleX(),
    scaleY: node.scaleY(),
  });
}
