import { useEffect } from "react";
import socket from "../socket/socket";

function useSocket(roomId, setShapes, resetHistory) {
  useEffect(() => {
    const handleConnect = () => {
      socket.emit("join-room", roomId);
    };

    const handleDraw = (receivedShapes) => {
      setShapes(receivedShapes);
    };

    const handleDrag = ({ id, x, y }) => {
      setShapes((prev) =>
        prev.map((shape) => (shape.id === id ? { ...shape, x, y } : shape)),
      );
    };

    const handleTransform = ({ id, x, y, scaleX, scaleY }) => {
      setShapes((prev) =>
        prev.map((shape) =>
          shape.id === id ? { ...shape, x, y, scaleX, scaleY } : shape,
        ),
      );
    };

    const handleLoadBoard = (loadedShapes) => {
      setShapes(loadedShapes);

      if (resetHistory) {
        resetHistory(loadedShapes);
      }
    };

    socket.on("connect", handleConnect);
    socket.on("draw-shape", handleDraw);
    socket.on("drag-shape", handleDrag);
    socket.on("transform-shape", handleTransform);
    socket.on("load-board", handleLoadBoard);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
      socket.off("draw-shape", handleDraw);
      socket.off("drag-shape", handleDrag);
      socket.off("transform-shape", handleTransform);
      socket.off("load-board", handleLoadBoard);
    };
  }, [roomId, resetHistory, setShapes]);
}

export default useSocket;
