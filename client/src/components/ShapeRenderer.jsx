import LineShape from "./shapes/LineShape";
import RectangleShape from "./shapes/RectangleShape";
import CircleShape from "./shapes/CircleShape";
import TextShape from "./shapes/TextShape";
import { useWhiteboard } from "../context/WhiteboardContext";

function ShapeRenderer({ updateShapes, shapeRefs, roomId }) {
  const { shapes, selectedId, setSelectedId } = useWhiteboard();
  return (
    <>
      {shapes.map((shape) => {
        switch (shape.tool) {
          case "Line":
          case "Pencil":
            return (
              <LineShape
                key={shape.id}
                shape={shape}
                shapes={shapes}
                roomId={roomId}
                updateShapes={updateShapes}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                shapeRefs={shapeRefs}
              />
            );

          case "Rectangle":
            return (
              <RectangleShape
                key={shape.id}
                shape={shape}
                updateShapes={updateShapes}
                shapeRefs={shapeRefs}
                roomId={roomId}
              />
            );

          case "Circle":
            return (
              <CircleShape
                key={shape.id}
                shape={shape}
                updateShapes={updateShapes}
                shapeRefs={shapeRefs}
                roomId={roomId}
              />
            );

          case "Text":
            return (
              <TextShape
                key={shape.id}
                shape={shape}
                roomId={roomId}
                updateShapes={updateShapes}
                shapeRefs={shapeRefs}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}

export default ShapeRenderer;
