import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected Route",
    user: req.user,
  });
});
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    user: req.user,
  });
});
router.post("/logout", logoutUser);

export default router;
