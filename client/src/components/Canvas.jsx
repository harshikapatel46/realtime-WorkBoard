import { Stage, Layer } from "react-konva";
import { useRef } from "react";
import TransformerComponent from "./TransformerComponent";
import ShapeRenderer from "./ShapeRenderer";
import { useWhiteboard } from "../context/WhiteboardContext";
import TextEditor from "./TextEditor";

function Canvas({
  stageRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  updateShapes,
  roomId,
}) {
  const { selectedId, editingText } = useWhiteboard();
  const shapeRefs = useRef({});

  return (
    
    <>
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
      >
        <Layer>
          <ShapeRenderer
            updateShapes={updateShapes}
            shapeRefs={shapeRefs}
            roomId={roomId}
          />
          <TransformerComponent selectedId={selectedId} shapeRefs={shapeRefs} />
        </Layer>
      </Stage>
      {editingText && (
        <TextEditor key={editingText.id} updateShapes={updateShapes} />
      )}
    </>
  );
}

export default Canvas;
