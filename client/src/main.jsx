import { createRoot } from "react-dom/client";
import WhiteboardProvider from "./context/WhiteboardProvider";
import AuthProvider from "./context/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <WhiteboardProvider>
      <App />
    </WhiteboardProvider>
  </AuthProvider>,
);
 