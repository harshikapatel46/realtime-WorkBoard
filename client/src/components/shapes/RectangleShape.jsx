import { Rect } from "react-konva";
import { handleShapeDrag, handleShapeMove } from "../../utils/dragHandlers";
import {
  handleTransformEnd,
  handleTransformMove,
} from "../../utils/transformHandlers";
import { isPointerOnRectStroke } from "../../utils/hitTesting";
import { useWhiteboard } from "../../context/WhiteboardContext";

function RectangleShape({ shape, updateShapes, shapeRefs, roomId }) {
  const { shapes, selectedId, setSelectedId } = useWhiteboard();

  return (
    <Rect
      x={shape.x}
      y={shape.y}
      width={shape.width}
      height={shape.height}
      stroke={selectedId === shape.id ? "blue" : shape.color}
      strokeWidth={3}
      draggable={selectedId === shape.id}
      hitStrokeWidth={12}
      onDragMove={(e) => {
        handleShapeMove(e, shape, roomId);
      }}
      onDragEnd={(e) => {
        handleShapeDrag(e, shape, shapes, updateShapes);
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
      onMouseDown={(e) => {
        const pointer = e.target.getStage().getPointerPosition();

        if (!isPointerOnRectStroke(pointer, shape)) {
          setSelectedId(null);
          return;
        }

        e.cancelBubble = true;
        setSelectedId(shape.id);
      }}
    />
  );
}
export default RectangleShape;
