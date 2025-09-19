import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
} from "../controllers/User.controller.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { createForm } from "../controllers/Form.controller.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authUser, getProfile);

router.post("/logout", authUser, logoutUser);

router.post("/contact", createForm);

export default router;
