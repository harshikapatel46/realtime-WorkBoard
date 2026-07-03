import { useWhiteboard } from "../context/WhiteboardContext";

function useCanvasEvents({
  activeTool,
  isTextTool,
  setIsDrawing,
  isDrawing,
  updateShapes,
  emitDraw,
}) {
  const {
    shapes,
    setShapes,
    color,
    setSelectedId,
    editingText,
    setEditingText,
  } = useWhiteboard();

  const handleMouseMove = (e) => {
    if (!activeTool) return;
    activeTool.handleMouseMove(e, isDrawing, shapes, setShapes, emitDraw);
  };

  const handleMouseUp = () => {
    if (!activeTool) return;

    activeTool.handleMouseUp(setIsDrawing, shapes, setShapes, updateShapes);
  };
  const handleMouseDown = (e) => {
    if (editingText) return;

    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }

    if (isTextTool) {
      activeTool.handleMouseDown(
        e,
        shapes,
        setShapes,
        setIsDrawing,
        color,
        updateShapes,
        setEditingText,
      );
      return;
    }

    if (activeTool) {
      activeTool.handleMouseDown(
        e,
        shapes,
        setShapes,
        setIsDrawing,
        color,
        updateShapes,
        setEditingText,
      );
    }
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}

export default useCanvasEvents;
