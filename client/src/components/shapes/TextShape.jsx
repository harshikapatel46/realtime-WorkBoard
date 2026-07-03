import { Text } from "react-konva";
import { handleShapeDrag, handleShapeMove } from "../../utils/dragHandlers";
import {
  handleTransformEnd,
  handleTransformMove,
} from "../../utils/transformHandlers";
import { useWhiteboard } from "../../context/WhiteboardContext";

function TextShape({ shape, updateShapes, shapeRefs, roomId }) {
  const { shapes, selectedId, setSelectedId, setEditingText } = useWhiteboard();
  const textColor = shape.color || shape.fill || "#000000";

  return (
    <Text
      x={shape.x}
      y={shape.y}
      text={shape.text || " "}
      fontSize={shape.fontSize ?? 20}
      fontFamily={shape.fontFamily}
      fontStyle={shape.fontStyle}
      fill={selectedId === shape.id ? "blue" : textColor}
      draggable
      onMouseDown={(e) => {
        e.cancelBubble = true;
        setSelectedId(shape.id);
      }}
      onDblClick={() => {
        setEditingText(shape);
      }}
      onDragEnd={(e) => {
        handleShapeDrag(e, shape, shapes, updateShapes);
      }}
      onDragMove={(e) => {
        handleShapeMove(e, shape, roomId);
      }}
      ref={(node) => {
        if (node) {
          shapeRefs.current[shape.id] = node;
        }
      }}
      onTransformEnd={(e) => {
        handleTransformEnd(e, shape, shapes, updateShapes);
      }}
      onTransform={(e) => {
        handleTransformMove(e, shape, roomId);
      }}
    />
  );
}

export default TextShape;
