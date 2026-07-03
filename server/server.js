import dotenv from "dotenv";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import connectDB from "./config/db.js";
import Whiteboard from "./models/whiteboard.js";
import authRoutes from "./routes/authRoutes.js";
import whiteboardRoutes from "./routes/whiteboardRoutes.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const DEFAULT_PORT = 9002;
const preferredPort = Number(process.env.PORT) || DEFAULT_PORT;
const clientOrigin = process.env.CLIENT_ORIGIN || "http://localhost:5173";

const server = http.createServer(app);

app.use(
  cors({
    origin: clientOrigin,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/whiteboards", whiteboardRoutes);

const io = new Server(server, {
  cors: {
    origin: clientOrigin,
    methods: ["GET", "POST"],
  },
});

app.get("/test", async (req, res) => {
  const board = await Whiteboard.create({
    roomId: "test123",
    shapes: [],
  });

  res.json(board);
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join-room", async (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined ${roomId}`);
    let board = await Whiteboard.findOne({ roomId });
    if (!board) {
      board = await Whiteboard.create({
        roomId,
        shapes: [],
      });
    }
    socket.emit("load-board", board.shapes);
  });

  socket.on("draw-shape", async ({ roomId, shapes }) => {
    await Whiteboard.updateOne({ roomId }, { shapes }, { new: true });
    socket.to(roomId).emit("draw-shape", shapes);
    console.log("Drawing received");
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });

  socket.on("drag-shape", (data) => {
    socket.to(data.roomId).emit("drag-shape", data);
  });

  socket.on("transform-shape", (data) => {
    socket.to(data.roomId).emit("transform-shape", data);
  });
});

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

connectDB();

let currentPort = preferredPort;

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    currentPort += 1;
    console.warn(
      `Port ${currentPort - 1} is in use, retrying on ${currentPort}...`,
    );
    server.listen(currentPort);
    return;
  }
  throw error;
});

server.on("listening", () => {
  const address = server.address();
  if (address && typeof address === "object") {
    console.log(`Server is running on ${address.port}`);
  }
});

server.listen(currentPort);
