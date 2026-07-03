import { useState, useCallback } from "react";

function useHistory() {
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const saveHistory = useCallback(
    (newShapes) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newShapes);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex],
  );

  const resetHistory = useCallback((newShapes) => {
    setHistory([newShapes]);
    setHistoryIndex(0);
  }, []);

  const handleUndo = () => {
    if (historyIndex <= 0) return null;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    return history[newIndex] || [];
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return null;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    return history[newIndex] || [];
  };

  return {
    saveHistory,
    resetHistory,
    handleUndo,
    handleRedo,
  };
}

export default useHistory;
