import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  getUserOrders,
  getUserStats,
  getSingleUser,
} from "./user.controller.js";

import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/orders", authMiddleware, getUserOrders);
router.get("/stats", authMiddleware, getUserStats);
router.get("/:id", authMiddleware, getSingleUser);

export default router;