import Project from "../models/Project.js";
import { uploadToCloudinary } from "../utils/upload.js";
import { v2 as cloudinary } from "cloudinary";

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private (admin only)

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all projects (with optional filter by type)
// @route   GET /api/projects
// @access  Public

export const getProjects = async (req, res) => {
  try {
    const filter = {};
    if (req.query.type) {
      filter.type = req.query.type;
    }
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Upload Images & Attach to Gallery
export const uploadProjectImages = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Ensure gallery size doesn't exceed 4
    if (project.gallery.length + req.files.length > 4) {
      return res
        .status(400)
        .json({ message: "Gallery cannot exceed 4 images total" });
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer, "projects")
    );
    const urls = await Promise.all(uploadPromises);

    project.gallery.push(...urls);
    await project.save();

    res.json({
      message: "Images uploaded successfully",
      gallery: project.gallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove an image from gallery
// @route   DELETE /api/projects/:id/gallery
// @access  Private (admin only)
export const removeProjectImage = async (req, res) => {
  try {
    const { id } = req.params; // project ID
    const { imageUrl } = req.body; // URL of the image to delete

    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Check if image exists in gallery
    if (!project.gallery.includes(imageUrl)) {
      return res.status(400).json({ message: "Image not found in gallery" });
    }

    // Remove image from gallery
    project.gallery = project.gallery.filter((img) => img !== imageUrl);
    await project.save();

    // Extract public_id from URL (everything after /projects/ and before extension)
    const publicId = imageUrl.split("/projects/")[1].split(".")[0];
    await cloudinary.uploader.destroy(`projects/${publicId}`);

    res.json({
      message: "Image removed successfully",
      gallery: project.gallery,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private (admin only)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private (admin only)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
