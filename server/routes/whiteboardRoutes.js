import express from "express";
import {
  getRecentWhiteboards,
  saveWhiteboard,
} from "../controllers/whiteboardController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/recent", authMiddleware, getRecentWhiteboards);
router.post("/:roomId/save", authMiddleware, saveWhiteboard);

export default router;
