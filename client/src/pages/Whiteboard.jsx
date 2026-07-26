import { useState, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import ShareModal from "../components/shareModel";

import Tools from "../tools";
import throttle from "../utils/throttle";
import useAuth from "../hooks/useAuth";
import socket from "../socket/socket";

import useHistory from "../hooks/useHistory";
import useSocket from "../hooks/useSocket";
import useKeyboard from "../hooks/useKeyboard";
import useCanvasEvents from "../hooks/useCanvasEvents";
import { useWhiteboard } from "../context/WhiteboardContext";
import { saveWhiteboard } from "../services/whiteboardService";

import { useRef } from "react";
import { jsPDF } from "jspdf";

function Whiteboard() {
  useAuth();
  const { roomId } = useParams();
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState("Pencil");
  const [shareOpen, setShareOpen] = useState(false);
  const [saveLabel, setSaveLabel] = useState("Save");
  const navigate = useNavigate();
  const stageRef = useRef(null);

  const {
    shapes,
    setShapes,
    selectedId,
    setSelectedId,
    setEditingText,
    color,
    setColor,
  } = useWhiteboard();

  const shareLink = `${window.location.origin}/whiteboard/${roomId}`;

  const activeTool = Tools[tool];

  const {
    saveHistory,
    resetHistory,
    handleUndo: undo,
    handleRedo: redo,
  } = useHistory();

  useSocket(roomId, setShapes, resetHistory);

  const emitDraw = useMemo(
    () =>
      throttle((newShapes) => {
        socket.emit("draw-shape", {
          roomId,
          shapes: newShapes,
        });
      }, 30),
    [roomId],
  );

  const updateShapes = useCallback(
    (newShapes) => {
      setShapes(newShapes);
      saveHistory(newShapes);

      socket.emit("draw-shape", {
        roomId,
        shapes: newShapes,
      });
    },
    [roomId, saveHistory, setShapes],
  );

  const handleTextTool = useCallback(() => {
    setTool("Text");
    const newText = {
      id: nanoid(),
      tool: "Text",
      x: Math.max(24, window.innerWidth / 2 - 80),
      y: Math.max(24, window.innerHeight / 2 - 20),
      text: "",
      fontSize: 20,
      fontFamily: "sans-serif",
      color,
    };

    const nextShapes = [...shapes, newText];
    updateShapes(nextShapes);
    setEditingText(newText);
  }, [color, shapes, setEditingText, updateShapes]);

  const handleUndo = () => {
    const newShapes = undo();

    if (!newShapes) return;

    setShapes(newShapes);

    socket.emit("draw-shape", {
      roomId,
      shapes: newShapes,
    });
  };

  const handleRedo = () => {
    const newShapes = redo();

    if (!newShapes) return;

    setShapes(newShapes);

    socket.emit("draw-shape", {
      roomId,
      shapes: newShapes,
    });
  };

  const handleDelete = () => {
    if (!selectedId) return;

    const filteredShapes = shapes.filter((shape) => shape.id !== selectedId);

    setSelectedId(null);
    updateShapes(filteredShapes);
  };

  const handleSave = async () => {
    try {
      setSaveLabel("Saving...");
      await saveWhiteboard(roomId, shapes);
      setSaveLabel("Saved");

      setTimeout(() => {
        setSaveLabel("Save");
      }, 1500);
    } catch {
      setSaveLabel("Try again");

      setTimeout(() => {
        setSaveLabel("Save");
      }, 1500);
    }
  };

  useKeyboard(selectedId, handleDelete);

  const exportPNG = () =>{
    console.log("exportPNG called");
    console.log(stageRef.current);

    if ( !stageRef.current ) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = uri;
   
    link.click();
     alert("PNG exported successfully!");
    
  };
  
  const exportPDF = () => {
    if ( !stageRef.current ) return;
    const uri = stageRef.current.toDataURL({ pixelRatio: 3 });

    const pdf = new jsPDF(
      "landscape",
      "px",
      [
        stageRef.current.width() ,
        stageRef.current.height() ,
      ]
    );
    pdf.addImage(
      uri,
      "PNG",
      0,
      0,
      stageRef.current.width(),
      stageRef.current.height()
    )
     pdf.save("whiteboard.pdf");
  };

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCanvasEvents({
    activeTool,
    isTextTool: tool === "Text",
    setIsDrawing,
    isDrawing,
    updateShapes,
    emitDraw,
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fbfbfc] bg-[linear-gradient(#eef1f5_1px,transparent_1px),linear-gradient(90deg,#eef1f5_1px,transparent_1px)] bg-size-[32px_32px]">
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 z-50 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-md ring-1 ring-slate-200 hover:bg-slate-900 hover:text-white transition"
      >
        ← Back
      </button>

      <Canvas
        stageRef={stageRef}
        updateShapes={updateShapes}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        roomId={roomId}
      />

      <Toolbar
        tool={tool}
        setTool={setTool}
        handleUndo={handleUndo}
        handleRedo={handleRedo}
        handleDelete={handleDelete}
        color={color}
        setColor={setColor}
        onTextTool={handleTextTool}
        onShare={() => setShareOpen(true)}
        onSave={handleSave}
        saveLabel={saveLabel}
         onExportPNG={exportPNG}
         onExportPDF={exportPDF}
      />

      <ShareModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        shareLink={shareLink}
      />
    </div>
  );
}

export default Whiteboard;
