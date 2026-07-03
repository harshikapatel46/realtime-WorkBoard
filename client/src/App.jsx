import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Whiteboard from "./pages/Whiteboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/whiteboard/:roomId" element={<Whiteboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
