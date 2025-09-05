import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  uploadProjectImages,
  updateProject,
  deleteProject,
} from "../controllers/Project.controller.js";
import { authUser } from "../middlewares/authMiddleware.js";
import { validateProject, validateProjectUpdate } from "../validators/projectValidator.js";
import { upload } from "../utils/upload.js";

const router = express.Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// protected routes (admin only)
router.post("/create", authUser, validateProject, createProject);
router.put("/:id", authUser, validateProjectUpdate, updateProject);
router.delete("/:id", authUser, deleteProject);

// Upload images to gallery (max 4)
router.post(
  "/:id/gallery",
  authUser,
  upload.array("images", 4), 
  uploadProjectImages
);

export default router;
