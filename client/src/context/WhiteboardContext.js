import { createContext, useContext } from "react";

export const WhiteboardContext = createContext();

export const useWhiteboard = () => {
  return useContext(WhiteboardContext);
};
