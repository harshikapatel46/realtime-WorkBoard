import { useEffect } from "react";

function useKeyboard(selectedId, handleDelete) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Delete" && selectedId) {
        handleDelete();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId, handleDelete]);
}

export default useKeyboard;
