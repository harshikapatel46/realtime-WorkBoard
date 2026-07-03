import { Line } from "react-konva";
import { handleLineDrag, handleShapeMove } from "../../utils/dragHandlers";
import {
  handleTransformEnd,
  handleTransformMove,
} from "../../utils/transformHandlers";
import { useWhiteboard } from "../../context/WhiteboardContext";

function LineShape({ shape, updateShapes, shapeRefs, roomId }) {
  const { shapes, selectedId, setSelectedId } = useWhiteboard();

  return (
    <Line
      points={shape.points}
      onMouseDown={(e) => {
        e.cancelBubble = true;
        setSelectedId(shape.id);
      }}
      stroke={selectedId === shape.id ? "blue" : shape.color}
      strokeWidth={3}
      draggable={selectedId === shape.id}
      onDragMove={(e) => {
        handleShapeMove(e, shape, roomId);
      }}
      onDragEnd={(e) => {
        handleLineDrag(e, shape, shapes, updateShapes);
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

export default LineShape;
