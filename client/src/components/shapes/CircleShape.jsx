import { Circle } from "react-konva";
import { handleShapeDrag, handleShapeMove } from "../../utils/dragHandlers";
import {
  handleTransformEnd,
  handleTransformMove,
} from "../../utils/transformHandlers";
import { isPointerOnCircleStroke } from "../../utils/hitTesting";
import { useWhiteboard } from "../../context/WhiteboardContext";

function CircleShape({ shape, updateShapes, shapeRefs, roomId }) {
  const { shapes, selectedId, setSelectedId } = useWhiteboard();

  return (
    <Circle
      x={shape.x}
      y={shape.y}
      radius={shape.radius}
      stroke={selectedId === shape.id ? "blue" : shape.color}
      strokeWidth={3}
      draggable={selectedId === shape.id}
      hitStrokeWidth={12}
      onMouseDown={(e) => {
        const pointer = e.target.getStage().getPointerPosition();

        if (!isPointerOnCircleStroke(pointer, shape)) {
          setSelectedId(null);
          return;
        }

        e.cancelBubble = true;
        setSelectedId(shape.id);
      }}
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
    />
  );
}

export default CircleShape;
